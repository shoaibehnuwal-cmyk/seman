import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = path.resolve('./public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Create luxury brand SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#09090B"/>
  <rect x="24" y="24" width="464" height="464" fill="none" stroke="#C5A880" stroke-width="2" stroke-opacity="0.4"/>
  <circle cx="256" cy="256" r="190" fill="none" stroke="#C5A880" stroke-width="1.5" stroke-opacity="0.3"/>
  <text x="256" y="295" font-family="'Cormorant Garamond', 'Playfair Display', 'Times New Roman', serif" font-size="190" font-weight="600" fill="#E6CA9E" text-anchor="middle" letter-spacing="2">F</text>
  <text x="256" y="360" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="24" font-weight="500" fill="#A1A1AA" text-anchor="middle" letter-spacing="8">FULHAM</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf8');

// 2. Helper to generate valid PNG buffers using pure Node.js (zlib + CRC32)
function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
}
const crcTable = createCRC32Table();
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makePngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const typeAndData = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([lenBuf, typeAndData, crcBuf]);
}

function generateIconPng(width, height, isMaskable = false) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB color type
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makePngChunk('IHDR', ihdr);

  // Raw bitmap scanlines: filter byte (0) + 3 bytes (RGB) per pixel
  const scanlineLength = 1 + width * 3;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * (isMaskable ? 0.35 : 0.42);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // filter type 0: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Deep Charcoal / Onyx base
      let r = 9, g = 9, b = 11;

      // Subtle circular golden ring accent
      if (Math.abs(dist - radius) < (width * 0.015)) {
        r = 197; g = 168; b = 128; // #C5A880
      } else if (dist < radius) {
        // Inner warm subtle tint
        r = 18; g = 18; b = 22;
        
        // Fulham F monogram, kept within the maskable safe area.
        const left = cx - radius * 0.3;
        const top = cy - radius * 0.55;
        const stroke = width * 0.075;
        const stem = x >= left && x <= left + stroke && y >= top && y <= cy + radius * 0.55;
        const topBar = x >= left && x <= cx + radius * 0.4 && y >= top && y <= top + stroke;
        const middleBar = x >= left && x <= cx + radius * 0.25 && y >= cy - stroke / 2 && y <= cy + stroke / 2;
        if (stem || topBar || middleBar) {
          r = 230; g = 202; b = 158;
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makePngChunk('IDAT', compressed);
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Write PWA icons
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generateIconPng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generateIconPng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generateIconPng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generateIconPng(180, 180, false));
const faviconPng = generateIconPng(48, 48, false);
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader[6] = 48;
icoHeader[7] = 48;
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(24, 12);
icoHeader.writeUInt32LE(faviconPng.length, 14);
icoHeader.writeUInt32LE(22, 18);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), Buffer.concat([icoHeader, faviconPng]));

console.log('Successfully generated PWA icons in /public: icon.svg, pwa-192x192.png, pwa-512x512.png, pwa-maskable-512x512.png, apple-touch-icon.png, favicon.ico');

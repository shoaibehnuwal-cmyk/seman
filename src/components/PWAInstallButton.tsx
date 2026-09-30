import React, { useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed as PWA or in standalone mode, do not render
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A880] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-black shadow-md hover:brightness-110 active:scale-95 transition-all"
        title="Install Fulham App"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A880]/50 bg-black/40 px-3 py-1.5 text-xs font-medium text-[#E6CA9E] hover:bg-[#C5A880]/10 transition-colors"
          title="Install on iPhone / iPad"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install PWA</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl text-zinc-100">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D37] flex items-center justify-center text-black font-serif font-bold text-xl shadow-inner">
                  F
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold tracking-wide text-zinc-100">Install Fulham</h3>
                  <p className="text-xs text-zinc-400">Add to Home Screen for offline access</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-zinc-300 border-t border-zinc-800/80 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-[#E6CA9E]">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Step 1:</span> Tap the <strong>Share</strong> button at the bottom of your Safari screen.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-[#E6CA9E]">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Step 2:</span> Scroll down the options and select <strong>Add to Home Screen</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-[#E6CA9E]">
                    <span className="w-4 h-4 block text-center font-bold text-[10px]">PWA</span>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Step 3:</span> Tap <strong>Add</strong> in the top-right corner to launch directly from your home screen.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-zinc-800 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop or browsers before prompt fires
  return (
    <button
      onClick={() => {
        alert('To install Fulham PWA, click the install icon in your browser address bar (Chrome/Edge) or Add to Home Screen in mobile settings.');
      }}
      className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
      title="Install PWA"
    >
      <Download className="w-3 h-3 text-[#C5A880]" />
      <span>Install PWA</span>
    </button>
  );
};

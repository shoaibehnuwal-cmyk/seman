import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-label="Offline Mode Notification"
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2.5 rounded-xl border border-amber-600/40 bg-zinc-950/95 px-4 py-2.5 text-xs font-medium text-amber-200 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
        <WifiOff className="h-3.5 w-3.5" />
      </div>
      <div>
        <span className="font-semibold text-white">Offline Mode:</span> Cached model rosters & comp cards available.
      </div>
    </aside>
  );
};

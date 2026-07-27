'use client';

import { useEffect, useRef } from 'react';

export default function VersionChecker() {
  const currentVersion = useRef<string | null>(null);

  useEffect(() => {
    // Only run this in production/Vercel environment so it doesn't constantly reload in local dev
    if (process.env.NODE_ENV === 'development') return;

    const checkVersion = async () => {
      try {
        // Adding a cache buster timestamp so the browser actually fetches fresh data
        const res = await fetch(`/api/version?t=${Date.now()}`, { cache: 'no-store' });
        const data = await res.json();
        
        if (!currentVersion.current) {
            // First load, just store the version
            currentVersion.current = data.version;
        } else if (currentVersion.current !== data.version) {
            console.log('New deployment detected! Refreshing...');
            
            // Check if user is actively typing in a form to prevent data loss
            const activeElement = document.activeElement;
            const isTyping = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';
            
            if (!isTyping) {
                // Hard refresh from server to grab new assets
                window.location.reload();
            } else {
                console.log('User is typing, delaying refresh...');
                // We'll let the next 60s interval catch them if they've stopped typing
            }
        }
      } catch (e) {
        console.error('Failed to check for new version', e);
      }
    };

    // Check every 60 seconds
    const interval = setInterval(checkVersion, 60000);
    return () => clearInterval(interval);
  }, []);

  return null; // This component renders nothing
}

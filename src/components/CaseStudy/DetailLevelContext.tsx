'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type DetailLevel = 'brief' | 'standard' | 'detailed';

interface DetailLevelContextValue {
  level: DetailLevel;
  setLevel: (level: DetailLevel) => void;
}

const DetailLevelContext = createContext<DetailLevelContextValue>({
  level: 'standard',
  setLevel: () => {},
});

const STORAGE_KEY = 'detail-level';

export function DetailLevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<DetailLevel>('standard');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'brief' || stored === 'standard' || stored === 'detailed') {
      setLevel(stored);
    }
    setMounted(true);
  }, []);

  const handleSetLevel = (newLevel: DetailLevel) => {
    setLevel(newLevel);
    localStorage.setItem(STORAGE_KEY, newLevel);
  };

  // Prevent flash of wrong content before hydration
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <DetailLevelContext.Provider value={{ level, setLevel: handleSetLevel }}>
      {children}
    </DetailLevelContext.Provider>
  );
}

export function useDetailLevel() {
  return useContext(DetailLevelContext);
}

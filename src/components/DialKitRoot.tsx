'use client';

import { usePathname } from 'next/navigation';
import { DialRoot } from 'dialkit';

export function DialKitRoot() {
  const pathname = usePathname() ?? '';
  const hideDialKit = pathname.startsWith('/projects/') || pathname.startsWith('/archive/');

  if (hideDialKit) {
    return null;
  }

  return <DialRoot />;
}

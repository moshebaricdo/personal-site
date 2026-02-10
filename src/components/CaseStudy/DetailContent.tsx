'use client';

import { type ReactNode } from 'react';
import { useDetailLevel } from './DetailLevelContext';

interface DetailContentProps {
  brief: ReactNode;
  standard: ReactNode;
  detailed: ReactNode;
}

export function DetailContent({ brief, standard, detailed }: DetailContentProps) {
  const { level } = useDetailLevel();

  const content = level === 'brief' ? brief : level === 'detailed' ? detailed : standard;

  return <>{content}</>;
}

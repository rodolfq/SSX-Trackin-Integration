'use client';

import React from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { cn } from '@/lib/utils';

export interface AppScrollbarProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  children?: React.ReactNode;
  className?: string;
  element?: string;
  options?: Record<string, any>;
}

const defaultOptions = {
  scrollbars: {
    autoHide: 'scroll' as const,
    autoHideDelay: 500,
    dragScroll: true,
    clickScroll: true,
  }
};

export function AppScrollbar({
  children,
  className,
  element = 'div',
  options,
  ...props
}: AppScrollbarProps) {
  return (
    <OverlayScrollbarsComponent
      element={element as any}
      options={options || defaultOptions}
      defer
      className={cn('app-scrollbar', className)}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

'use client';

import dynamic from 'next/dynamic';

const TrackingMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col h-[calc(100vh-80px)] p-6 space-y-4">
      <div className="h-16 w-full bg-secondary/50 animate-pulse rounded" />
      <div className="flex flex-1 gap-6">
        <div className="w-64 h-full bg-secondary/50 animate-pulse rounded" />
        <div className="flex-1 h-full bg-secondary/50 animate-pulse rounded" />
      </div>
    </div>
  )
});

export default function TrackingMapPage() {
  return <TrackingMap />;
}

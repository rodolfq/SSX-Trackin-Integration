'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Key,
  MapPin,
  Database,
  Activity,
  Search,
  Zap,
  Settings,
  ChevronDown,
  ChevronRight,
  Star
} from 'lucide-react';
import { AppScrollbar } from '@/components/AppScrollbar';
import { useEffect } from 'react';

const navigation: {
  category: string;
  items: {
    name: string;
    href?: string;
    icon?: any;
    children?: { name: string; href: string }[];
  }[];
}[] = [
  {
    category: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/', icon: BookOpen },
      { name: 'First Steps', href: '/getting-started', icon: Zap },
      { name: 'Authentication', href: '/auth', icon: Key },
    ]
  },
  {
    category: 'API Reference',
    items: [
      {
        name: 'Actuator',
        children: [
          { name: 'List', href: '/endpoints/tracking/actuator/list' },
        ],
      },
      {
        name: 'Command',
        children: [
          { name: 'SendFreeTextMessage', href: '/endpoints/tracking/command/send-free-text-message' },
          { name: 'GetCommandStatus', href: '/endpoints/tracking/command/get-command-status' },
        ],
      },
      {
        name: 'Event',
        children: [
          { name: 'List', href: '/endpoints/tracking/event/list' },
        ],
      },
      {
        name: 'Fuel',
        children: [
          { name: 'Insert', href: '/endpoints/tracking/fuel/insert' },
          { name: 'InsertList', href: '/endpoints/tracking/fuel/insert-list' },
          { name: 'List', href: '/endpoints/tracking/fuel/list' },
        ],
      },
      {
        name: 'Message',
        children: [
          { name: 'List', href: '/endpoints/tracking/message/list' },
          { name: 'SendToOnboard', href: '/endpoints/tracking/message/send-to-onboard' },
          { name: 'CheckSendStatusOnboard', href: '/endpoints/tracking/message/check-send-status-onboard' },
        ],
      },
      {
        name: 'Person',
        children: [
          { name: 'ListPerson', href: '/endpoints/tracking/person/list-person' },
          { name: 'ListPersonRole', href: '/endpoints/tracking/person/list-person-role' },
          { name: 'InsertPerson', href: '/endpoints/tracking/person/insert-person' },
          { name: 'UpdatePerson', href: '/endpoints/tracking/person/update-person' },
          { name: 'AutoGenerateIntegrationCode', href: '/endpoints/tracking/person/auto-generate-integration-code' },
        ],
      },
      {
        name: 'PositionHistory',
        children: [
          { name: 'v3 / List', href: '/endpoints/tracking/position-history' },
          { name: 'List', href: '/endpoints/tracking/position-history/list' },
          { name: 'ListSoap', href: '/endpoints/tracking/position-history/list-soap' },
          { name: 'v2 / List', href: '/endpoints/tracking/position-history/v2-list' },
        ],
      },
      {
        name: 'Report',
        children: [
          { name: 'DriverRanking', href: '/endpoints/tracking/report/driver-ranking' },
          { name: 'AreaPassage', href: '/endpoints/tracking/report/area-passage' },
          { name: 'TrackedUnitUsage', href: '/endpoints/tracking/report/tracked-unit-usage' },
          { name: 'TrackedUnitUsageConsolidated', href: '/endpoints/tracking/report/tracked-unit-usage-consolidated' },
          { name: 'ActuatorsActivation', href: '/endpoints/tracking/report/actuators-activation' },
          { name: 'SensorsActivation', href: '/endpoints/tracking/report/sensors-activation' },
          { name: 'DailyConsolidatedWorkday', href: '/endpoints/tracking/report/daily-consolidated-workday' },
          { name: 'WorkdaySteps', href: '/endpoints/tracking/report/workday-steps' },
          { name: 'Maintenance / List', href: '/endpoints/tracking/report/maintenance-list' },
        ],
      },
      {
        name: 'RuleCompatible',
        children: [
          { name: 'List', href: '/endpoints/tracking/rule-compatible/list' },
          { name: 'SetAssociationOfTrackedUnitWithRule', href: '/endpoints/tracking/rule-compatible/set-association' },
        ],
      },
      {
        name: 'RuleList',
        children: [
          { name: 'ListRulesByUnitTracked', href: '/endpoints/tracking/rule-list/list-rules-by-unit-tracked' },
          { name: 'ListUnitTrackedByRule', href: '/endpoints/tracking/rule-list/list-unit-tracked-by-rule' },
          { name: 'ListRuleOfLoggedUser', href: '/endpoints/tracking/rule-list/list-rule-of-logged-user' },
        ],
      },
      {
        name: 'RuleViolation',
        children: [
          { name: 'List', href: '/endpoints/tracking/rule-violation/list' },
          { name: 'v2 / List', href: '/endpoints/tracking/rule-violation/v2-list' },
        ],
      },
      {
        name: 'Sensor',
        children: [
          { name: 'List', href: '/endpoints/tracking/sensor/list' },
        ],
      },
      {
        name: 'Telemetry',
        children: [
          { name: 'List', href: '/endpoints/tracking/telemetry/list' },
        ],
      },
      {
        name: 'Trailer',
        children: [
          { name: 'List', href: '/endpoints/tracking/trailer/list' },
        ],
      },
      {
        name: 'Videotelemetry',
        children: [
          { name: 'GetURLStreamLink', href: '/endpoints/tracking/videotelemetry/get-url-stream-link' },
        ],
      },
    ]
  },
  {
    category: 'Catalogs & Tools',
    items: [
      { name: 'Filters Catalog', href: '/filters', icon: Search },
      { name: 'Telemetries Catalog', href: '/telemetries', icon: Activity },
      { name: 'Admin Panel', href: '/admin', icon: Settings },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ssx-favorites');
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavorites(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const newFavs = prev.includes(href) ? prev.filter(f => f !== href) : [...prev, href];
      localStorage.setItem('ssx-favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Build a flat list of favorites with their context (parent name)
  const favoriteItems = favorites.map(href => {
    for (const group of navigation) {
      if (group.category === 'Getting Started') continue;
      for (const item of group.items) {
        if (item.href === href) return { ...item, parentName: null };
        if (item.children) {
          const child = item.children.find(c => c.href === href);
          if (child) return { ...child, parentName: item.name, icon: item.icon };
        }
      }
    }
    return null;
  }).filter(Boolean) as any[];

  return (
    <aside className="w-64 border-r border-border flex flex-col shrink-0 bg-card h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-border shrink-0">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-primary-foreground">S</div>
        <span className="text-foreground font-semibold tracking-tight">SSX Developer</span>
      </div>
      
      <AppScrollbar className="flex-1 p-4 space-y-6">
        {navigation.map((group: any) => (
          <div key={group.category}>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 px-2 flex items-center gap-2">
              {group.category}
            </p>
            {group.category === 'API Reference' && favoriteItems.length > 0 && (
              <div className="mb-3 space-y-1">
                {favoriteItems.map((item: any) => (
                  <div key={`fav-${item.href}`}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? 'bg-secondary text-primary'
                          : 'text-muted-foreground hover:text-foreground',
                        'group flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors cursor-pointer bg-secondary/20 border border-yellow-500/10'
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {item.icon ? <item.icon className="w-4 h-4 shrink-0 text-yellow-600 dark:text-yellow-500" /> : <Star className="w-4 h-4 shrink-0 text-yellow-600 dark:text-yellow-500" />}
                        <span className="truncate">
                          {item.parentName ? <span className="text-muted-foreground/60 text-xs mr-1">{item.parentName} /</span> : null}
                          <span className="text-yellow-600 dark:text-yellow-500 font-medium">{item.name}</span>
                        </span>
                      </div>
                      <button onClick={(e) => toggleFavorite(e, item.href)} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            <ul className="space-y-1">
              {group.items.map((item: any) => {
                const isExpanded = !!expandedItems[item.name];
                return (
                  <li key={item.name}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? 'bg-secondary text-primary'
                            : 'text-muted-foreground hover:text-foreground',
                          'group flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors cursor-pointer'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.name}
                        </div>
                        {group.category !== 'Getting Started' && (
                          <button onClick={(e) => toggleFavorite(e, item.href)} className={cn("shrink-0 transition-opacity", favorites.includes(item.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                             <Star className={cn("w-3.5 h-3.5", favorites.includes(item.href) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground hover:text-foreground")} />
                          </button>
                        )}
                      </Link>
                    ) : (
                      <div className="mt-1">
                        <button
                          onClick={() => toggleExpand(item.name)}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-secondary/50"
                        >
                          <span className="flex items-center gap-2">
                            {item.icon && <item.icon className="w-4 h-4" />}
                            {item.name}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {isExpanded && (
                          <ul className="ml-4 border-l border-border mt-1 space-y-1">
                            {item.children?.map((child: any) => (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    pathname === child.href
                                      ? 'text-primary border-l-2 border-primary -ml-[1px]'
                                      : 'text-muted-foreground hover:text-foreground',
                                    'group flex items-center justify-between pl-4 pr-2 py-1.5 text-sm transition-colors'
                                  )}
                                >
                                  {child.name}
                                  <button onClick={(e) => toggleFavorite(e, child.href)} className={cn("shrink-0 transition-opacity", favorites.includes(child.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                                    <Star className={cn("w-3.5 h-3.5", favorites.includes(child.href) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground hover:text-foreground")} />
                                  </button>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </AppScrollbar>

      <div className="p-4 border-t border-border bg-background/50 shrink-0">
        <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest">Environment</div>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-green-500 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Production</span>
          <span className="text-muted-foreground">v3.4.0</span>
        </div>
      </div>
    </aside>
  );
}

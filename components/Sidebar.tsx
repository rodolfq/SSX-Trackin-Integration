'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
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
import { useEndpointStore } from '@/store/endpointStore';

const staticNavigation = [
  {
    category: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/', icon: BookOpen },
      { name: 'First Steps', href: '/getting-started', icon: Zap },
      { name: 'Authentication', href: '/auth', icon: Key },
    ]
  },
  {
    category: 'Catalogs & Tools',
    items: [
      { name: 'Filters Catalog', href: '/filters', icon: Search },
      { name: 'Telemetries Catalog', href: '/telemetries', icon: Activity },
      { name: 'Live Tracking Map', href: '/tracking-map', icon: MapPin },
      { name: 'Admin Panel', href: '/admin', icon: Settings },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const { endpoints } = useEndpointStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const [activeApi, setActiveApi] = useState('API Reference');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ssx-active-api');
      if (stored) {
        setActiveApi(stored);
      }
    }
  }, []);

  const apiSpaces = useMemo(() => {
    const spaces = new Set<string>(['API Reference']);
    if (endpoints && endpoints.length > 0) {
      endpoints.forEach(ep => {
        if (ep.category) {
          spaces.add(ep.category);
        }
      });
    }
    return Array.from(spaces);
  }, [endpoints]);

  // Reset to default API if the active API category was deleted
  useEffect(() => {
    if (!isMounted) return;
    if (activeApi !== 'API Reference' && apiSpaces.length > 1 && !apiSpaces.includes(activeApi)) {
      setActiveApi('API Reference');
      if (typeof window !== 'undefined') {
        localStorage.setItem('ssx-active-api', 'API Reference');
      }
    }
  }, [apiSpaces, activeApi, isMounted]);

  const [navigation, setNavigation] = useState(staticNavigation);

  useEffect(() => {
    if (endpoints && endpoints.length > 0) {
      const dynamicNav = staticNavigation.map(cat => ({
        ...cat,
        items: cat.items.map(item => ({
          ...item,
          children: (item as any).children ? [...(item as any).children] : undefined
        }))
      }));
      
      // Filter endpoints to only display those belonging to the active API Space
      const filteredEndpoints = endpoints.filter(ep => ep.category === activeApi);

      filteredEndpoints.forEach(ep => {
        let catIndex = dynamicNav.findIndex((c: any) => c.category === ep.category);
        if (catIndex === -1) {
          dynamicNav.splice(dynamicNav.length - 1, 0, { category: ep.category, items: [] });
          catIndex = dynamicNav.findIndex((c: any) => c.category === ep.category);
        }

        let groupItem: any = dynamicNav[catIndex].items.find((i: any) => i.name === ep.group);
        if (!groupItem) {
          groupItem = { name: ep.group, children: [] };
          dynamicNav[catIndex].items.push(groupItem as any);
        }

        if (!groupItem.children) groupItem.children = [];
        groupItem.children.push({ name: ep.name, href: `/endpoints/dynamic/${ep.id}` });
      });

      setNavigation(dynamicNav as any);
    } else {
      setNavigation(staticNavigation);
    }
  }, [endpoints, activeApi]);

  useEffect(() => {
    const stored = localStorage.getItem('ssx-favorites');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setFavorites(parsed);
        }
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
      if (group.category === 'Getting Started' || group.category === 'Catalogs & Tools') continue;
      for (const item of group.items) {
        const anyItem = item as any;
        if (anyItem.href === href) return { ...anyItem, parentName: null };
        if (anyItem.children) {
          const child = anyItem.children.find((c: any) => c.href === href);
          if (child) return { ...child, parentName: anyItem.name, icon: anyItem.icon };
        }
      }
    }
    return null;
  }).filter(Boolean) as any[];

  return (
    <aside className="w-64 border-r border-border flex flex-col shrink-0 bg-card h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-border shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-gerada.svg" alt="Systemsat" className="h-8 w-auto object-contain" />
        <span className="text-foreground font-semibold tracking-tight">SSX Developer</span>
      </div>
      
      {/* API Space Switcher Custom Dropdown */}
      {apiSpaces.length > 1 && (
        <div className="px-6 py-5 border-b border-border bg-secondary/10 shrink-0">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2 px-1">
            Espaço de API Ativo
          </label>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between text-xs bg-background border border-border text-foreground px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary font-medium cursor-pointer transition-all hover:bg-secondary/40 active:scale-[0.99]"
            >
              <span className="truncate">
                {activeApi === 'API Reference' ? 'SSX Tracking (Padrão)' : activeApi}
              </span>
              <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 shrink-0 ml-2", isOpen && "transform rotate-180")} />
            </button>

            {/* Custom Dropdown Option List with Animation */}
            {isOpen && (
              <>
                <style>{`
                  @keyframes dropdownFadeIn {
                    from {
                      opacity: 0;
                      transform: translateY(-4px) scale(0.98);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0) scale(1);
                    }
                  }
                  .animate-dropdown {
                    animation: dropdownFadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                  }
                `}</style>
                {/* Backdrop overlay to close when clicking outside */}
                <div 
                  className="fixed inset-0 z-40 cursor-default" 
                  onClick={() => setIsOpen(false)}
                />
                
                <ul className="absolute left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl py-0 z-50 overflow-hidden origin-top animate-dropdown">
                  {apiSpaces.map((space) => {
                    const isSelected = space === activeApi;
                    return (
                      <li key={space}>
                        <button
                          onClick={() => {
                            setActiveApi(space);
                            setIsOpen(false);
                            if (typeof window !== 'undefined') {
                              localStorage.setItem('ssx-active-api', space);
                            }
                            router.push('/');
                          }}
                          className={cn(
                            "w-full text-left text-xs px-4 py-2.5 transition-colors cursor-pointer flex items-center justify-between",
                            isSelected 
                              ? "bg-primary/10 text-primary font-semibold" 
                              : "text-foreground hover:bg-secondary/60"
                          )}
                        >
                          <span className="truncate pr-2">
                            {space === 'API Reference' ? 'SSX Tracking (Padrão)' : space}
                          </span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
      
      <AppScrollbar className="flex-1 px-6 py-5">
        <div className="flex flex-col gap-8">
          {navigation.map((group: any) => (
            <div key={group.category}>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 px-1 flex items-center gap-2">
                {group.category}
              </p>
            {group.category === 'API Reference' && favoriteItems.length > 0 && (
              <div className="mb-4 space-y-2">
                {favoriteItems.map((item: any) => (
                  <div key={`fav-${item.href}`}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? 'bg-secondary text-primary'
                          : 'text-muted-foreground hover:text-foreground',
                        'group flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-colors cursor-pointer bg-secondary/20 border border-yellow-500/10'
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
            <ul className="space-y-2">
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
                          'group flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-colors cursor-pointer'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.name}
                        </div>
                        {group.category !== 'Getting Started' && group.category !== 'Catalogs & Tools' && (
                          <button onClick={(e) => toggleFavorite(e, item.href)} className={cn("shrink-0 transition-opacity", favorites.includes(item.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                             <Star className={cn("w-3.5 h-3.5", favorites.includes(item.href) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground hover:text-foreground")} />
                          </button>
                        )}
                      </Link>
                    ) : (
                      <div className="mt-1">
                        <button
                          onClick={() => toggleExpand(item.name)}
                          className="w-full flex items-center justify-between px-2.5 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
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
                          <ul className="ml-4 border-l border-border mt-1.5 space-y-1.5">
                            {item.children?.map((child: any, idx: number) => (
                              <li key={child.href || `${child.name}-${idx}`}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    pathname === child.href
                                      ? 'text-primary border-l-2 border-primary -ml-[1px]'
                                      : 'text-muted-foreground hover:text-foreground',
                                    'group flex items-center justify-between pl-4 pr-2 py-2 text-sm transition-colors'
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
        </div>
      </AppScrollbar>

      <div className="px-6 py-5 border-t border-border bg-background/50 shrink-0 space-y-3">
        <div>
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest">Base API URL</div>
          <a
            href="https://integration.systemsatx.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-primary hover:underline truncate block"
            title="https://integration.systemsatx.com.br"
          >
            integration.systemsatx.com.br
          </a>
        </div>
        <div className="pt-2 border-t border-border/50">
          <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest">Environment</div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-green-500 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Production</span>
            <span className="text-muted-foreground">v3.4.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'SSX Integration',
  description: 'SSX Tracking Integration Documentation',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="antialiased font-sans flex h-screen overflow-hidden bg-background text-foreground" suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <Header />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

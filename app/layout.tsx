import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { source } from '@/lib/source';

export const metadata = {
  title: 'Tools',
  description: 'A collection of web-based utility tools',
};

const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'Tools',
    transparentMode: 'top',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.variable}>
      <body>
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}

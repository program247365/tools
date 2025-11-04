import type { ReactNode } from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              tools.kbr.sh
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/docs" className="hover:underline">
                Docs
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}

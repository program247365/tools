import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">tools.kbr.sh</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A collection of web-based utility tools
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Tools</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/docs/tools/time-block-planner"
              className="border rounded-lg p-6 hover:border-foreground transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">Time Block Planner</h3>
              <p className="text-muted-foreground">
                Visual time blocking tool with drag-and-drop interface for planning your day
              </p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Productivity</h3>
              <p className="text-sm text-muted-foreground">1 tool</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <Link
            href="/docs"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Browse all tools →
          </Link>
        </section>
      </div>
    </main>
  );
}

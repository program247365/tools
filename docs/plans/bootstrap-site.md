# Bootstrap Plan: tools.kbr.sh

## Overview

Create a documentation site at tools.kbr.sh to host a collection of web-based utility tools. The site will use Fumadocs framework for documentation and will be deployed on Vercel.

## Goals

1. **Framework**: Use Fumadocs for a modern, fast documentation experience
2. **Hosting**: Deploy on Vercel for easy CI/CD and global CDN
3. **Content**: Host a collection of self-contained HTML/JavaScript tools
4. **Documentation**: Each tool should have proper documentation pages
5. **Discovery**: Easy navigation and search functionality
6. **Mobile-first**: Responsive design that works great on all devices

## First Tool

Starting with **Time Block Planner** - a visual time blocking tool with:
- Drag to create time blocks (15-minute increments)
- Click to edit, drag edges to resize
- Export to Markdown or JSON
- Black/white brutalist design using Tailwind CSS
- Fully self-contained HTML file

Location: `/Users/kevin/Downloads/time-block-planner.html`

## Architecture Overview

- Fumadocs framework with Next.js
- MDX files for documentation pages
- Tools hosted as static HTML files in `public/tools/`
- Vercel hosting with automatic deployments
- Modern documentation features (search, navigation, themes)

## Phase 1: Bootstrap Fumadocs Site

### 1.1 Initialize Fumadocs Project

```bash
# Run the Fumadocs CLI installer
npm create fumadocs-app

# Choose options:
# - Framework: Next.js
# - Content source: Fumadocs MDX
# - Package manager: npm (or your preference)
```

### 1.2 Add First Tool

After initialization:

```bash
# Create tools directory
mkdir -p public/tools

# Copy the time block planner
cp /Users/kevin/Downloads/time-block-planner.html public/tools/

# Create docs directory structure
mkdir -p content/docs/tools
```

### 1.3 Project Structure

```
/Users/kevin/.kevin/code/tools/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── docs/
│       ├── layout.tsx           # Docs layout (Fumadocs UI)
│       └── [[...slug]]/
│           └── page.tsx         # Dynamic docs pages
├── content/
│   └── docs/                    # MDX documentation files
│       ├── index.mdx            # Docs homepage
│       └── tools/               # Tool documentation
│           ├── index.mdx
│           └── [tool-name].mdx
├── public/
│   └── tools/                   # Static HTML tools
│       └── [tool-name].html
├── components/                  # React components
│   └── ToolEmbed.tsx           # Component to embed tools
├── lib/
│   └── source.ts               # Fumadocs content source config
├── package.json
├── next.config.mjs
├── tsconfig.json
└── tailwind.config.js
```

### 1.4 Configure Fumadocs

**lib/source.ts**:
```typescript
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { docs, meta } from '@/.source';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});
```

**app/layout.tsx**:
```typescript
import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
```

## Phase 2: Adding Tools

### 2.1 Tool Hosting Approach

Tools will be hosted as static HTML files:
- Copy .html files to `public/tools/`
- Create corresponding MDX documentation pages
- Tools remain self-contained and portable
- Simple iframe embedding for documentation
- Future option: convert popular tools to React components for tighter integration

### 2.2 Tool Documentation Structure

Each tool should have:

**content/docs/tools/time-block-planner.mdx** (example):
```mdx
---
title: Time Block Planner
description: Visual time blocking tool with drag-and-drop interface for planning your day
category: Productivity
tags: [time-management, calendar, planning]
---

import { ToolEmbed } from '@/components/ToolEmbed';

## Overview

A minimalist time blocking tool that lets you visually plan your day in 15-minute increments. Features a brutalist black-and-white design with intuitive drag-and-drop controls.

## How to Use

1. **Create blocks**: Click and drag on the timeline to create time blocks
2. **Edit blocks**: Click on any block to edit its label and times
3. **Resize blocks**: Drag the top or bottom edges of blocks to adjust duration
4. **Move blocks**: Click and drag blocks to different times
5. **Delete blocks**: Click the × button or right-click to delete
6. **Export**: Export your schedule to Markdown or JSON format

### Quick Actions

- Use the quick label buttons (MEETING, WORK, BREAK) for faster entry
- Press ESC to cancel editing
- Shift-click to edit without delay

## Try It

<ToolEmbed src="/tools/time-block-planner.html" height="800px" />

## Technical Details

- Fully client-side, no data sent to servers
- Uses Tailwind CSS for styling
- 15-minute time slot increments
- Touch-enabled for mobile devices
- Export formats: Markdown, JSON
```

### 2.3 ToolEmbed Component

**components/ToolEmbed.tsx**:
```typescript
export function ToolEmbed({
  src,
  height = '500px'
}: {
  src: string;
  height?: string;
}) {
  return (
    <div className="tool-embed rounded-lg border overflow-hidden my-6">
      <iframe
        src={src}
        className="w-full border-0"
        style={{ height }}
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />
    </div>
  );
}
```

## Phase 3: Homepage and Navigation

### 3.1 Homepage Design

**app/page.tsx**:
```typescript
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
            {/* Tool cards will go here */}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {/* Category cards */}
          </div>
        </section>
      </div>
    </main>
  );
}
```

### 3.2 Navigation Structure

**content/docs/index.mdx**:
```mdx
---
title: Tools Documentation
---

# Welcome to tools.kbr.sh

Browse our collection of web-based utilities.

## Available Tools

### Productivity

- [Time Block Planner](/docs/tools/time-block-planner) - Visual time blocking for planning your day

_More tools coming soon!_

## About

Each tool is self-contained, runs entirely in your browser, and requires no sign-up or data collection. Tools are open source and can be used offline once loaded.
```

## Phase 4: Build Scripts and Automation

### 4.1 Tool Metadata Collection

Create a script to automate tool discovery and listings:
- Scan `public/tools/` directory
- Extract metadata from HTML files (title, description)
- Generate tool listings for homepage
- Track creation/update dates from git history

**scripts/gather-tools.ts**:
```typescript
import fs from 'fs/promises';
import path from 'path';

interface ToolMetadata {
  slug: string;
  title: string;
  description: string;
  created: string;
  updated: string;
}

async function gatherTools() {
  const toolsDir = path.join(process.cwd(), 'public/tools');
  const files = await fs.readdir(toolsDir);
  const tools: ToolMetadata[] = [];

  for (const file of files) {
    if (file.endsWith('.html')) {
      // Extract metadata from HTML
      // Get git dates
      // Add to tools array
    }
  }

  // Write to tools.json
  await fs.writeFile(
    'content/tools.json',
    JSON.stringify(tools, null, 2)
  );
}
```

### 4.2 Tool Listings

Create components that display tools on the homepage:
- **Featured tools**: Manually curated list of highlight tools
- **All tools**: Automatically generated from `tools.json`
- **Category views**: Group tools by category/tag
- **Search integration**: Fumadocs search will index all tool pages

## Phase 5: Vercel Deployment

### 5.1 Vercel Configuration

**vercel.json**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "routes": [
    {
      "src": "/tools/(.*)",
      "dest": "/tools/$1",
      "headers": {
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": "frame-ancestors 'self'"
      }
    }
  ]
}
```

### 5.2 Deployment Steps

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Link Project**:
   ```bash
   vercel link
   ```

3. **Configure Custom Domain**:
   - In Vercel dashboard, add domain `tools.kbr.sh`
   - Update DNS records as instructed

4. **Set up GitHub Integration**:
   - Connect repository to Vercel
   - Enable automatic deployments on push to main
   - Configure preview deployments for PRs

### 5.3 Environment Variables

If needed for API keys or configuration:
```bash
vercel env add NEXT_PUBLIC_SITE_URL
# Set to: https://tools.kbr.sh
```

## Phase 6: Search and Discovery

### 6.1 Fumadocs Search

Fumadocs includes built-in search. Configure in `app/docs/layout.tsx`:

```typescript
import { DocsLayout } from 'fumadocs-ui/layout';

export default function Layout({ children }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: 'tools.kbr.sh',
      }}
      links={[
        { text: 'Home', url: '/' },
        { text: 'Documentation', url: '/docs' },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
```

### 6.2 Tool Categories and Tags

Add frontmatter to tool MDX files:

```mdx
---
title: Tool Name
description: Brief description
category: Text and Document
tags: [markdown, converter, utility]
---
```

## Phase 7: Testing and Quality

### 7.1 Testing Strategy

Similar to tools-simonw's Playwright tests:

**tests/tools.spec.ts**:
```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('tools.kbr.sh');
});

test('tool page loads and embeds tool', async ({ page }) => {
  await page.goto('/docs/tools/example-tool');
  await expect(page.locator('iframe')).toBeVisible();
});
```

### 7.2 CI/CD Pipeline

**github/workflows/test.yml**:
```yaml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npx playwright install
      - run: npm test
```

## Phase 8: Launch Checklist

### 8.1 Initial Setup

- [ ] Set up Fumadocs project
- [ ] Configure Vercel deployment
- [ ] Create tool documentation template
- [ ] Add Time Block Planner as first tool
- [ ] Create homepage with tool listings
- [ ] Set up categories and navigation
- [ ] Implement search functionality

### 8.2 Infrastructure

- [ ] Configure custom domain (tools.kbr.sh)
- [ ] Set up SSL/TLS certificates (automatic with Vercel)
- [ ] Configure CDN and caching
- [ ] Set up analytics (optional)
- [ ] Configure error monitoring (optional)

### 8.3 Documentation

- [ ] Write contribution guidelines
- [ ] Create tool submission process
- [ ] Document local development setup
- [ ] Add README with project overview

## Why Fumadocs + Vercel?

### Framework Benefits

1. **Modern DX**: TypeScript, React, modern tooling
2. **Built-in Search**: Full-text search out of the box
3. **Theming**: Dark mode and custom themes included
4. **Components**: Rich interactive MDX components
5. **Performance**: Optimized Next.js build and SSG

### Hosting Benefits

1. **Vercel Platform**: Zero-config deployment
2. **Global CDN**: Fast worldwide access
3. **Preview Deployments**: Automatic PR previews
4. **Analytics**: Easy integration with Vercel Analytics
5. **Auto HTTPS**: SSL certificates handled automatically

### Inspiration

This project is inspired by [tools.simonwillison.net](https://tools.simonwillison.net/), which demonstrates the value of building and sharing simple, focused web tools. While that site uses a static approach with Python scripts, tools.kbr.sh leverages modern documentation frameworks for enhanced discoverability and user experience.

## Next Steps

1. Run `npm create fumadocs-app` to bootstrap the project
2. Configure basic site structure and navigation
3. Add Time Block Planner as first tool
4. Create documentation page for Time Block Planner
5. Set up Vercel deployment
6. Configure custom domain (tools.kbr.sh)
7. Begin adding more tools to the collection

## Resources

- [Fumadocs Documentation](https://fumadocs.dev/docs)
- [Fumadocs GitHub](https://github.com/fuma-nama/fumadocs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [tools.simonwillison.net](https://tools.simonwillison.net/) (inspiration)

## Timeline Estimate

- **Phase 1**: 0.5 days (Bootstrap Fumadocs)
- **Phase 2**: 0.5 days (Add first tool)
- **Phase 3-4**: 1 day (Homepage + automation scripts)
- **Phase 5**: 0.5 days (Vercel setup)
- **Phase 6**: 0.5 days (Search configuration)
- **Phase 7**: 1 day (Testing setup)
- **Phase 8**: Ongoing (add more tools)

**Total bootstrap time**: ~4 days for a working site with first tool live.

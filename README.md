# tools.kbr.sh

A collection of web-based utility tools built with [Fumadocs](https://fumadocs.dev) and hosted on Vercel.

## Overview

This project hosts self-contained web tools with comprehensive documentation. Each tool runs entirely in the browser with no data collection or server-side processing.

## Current Tools

- **[Time Block Planner](http://localhost:3000/tools/time-block-planner)** - Visual time blocking tool with drag-and-drop interface

## Development

### Prerequisites

- Node.js 20+
- [Bun](https://bun.sh)

### Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

The development server runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── [[...slug]]/       # Catch-all documentation routes
│   ├── api/search/        # Search API endpoint
│   └── layout.tsx         # Root layout with DocsLayout
├── content/               # MDX documentation files
│   ├── index.mdx          # Homepage
│   └── tools/             # Tool documentation
├── components/            # React components
│   └── ToolEmbed.tsx      # Component for embedding tools
├── lib/
│   └── source.ts          # Fumadocs content source
└── public/
    └── tools/             # Static HTML tools
```

## Adding New Tools

1. **Add the HTML file** to `public/tools/`
2. **Create documentation** at `content/tools/[tool-name].mdx`
3. **Run MDX generation**: `bun run postinstall`
4. **Update homepage** if desired in `content/index.mdx`

### Tool Documentation Template

```mdx
---
title: Tool Name
description: Brief description
---

import { ToolEmbed } from '@/components/ToolEmbed';

# Tool Name

Description and overview.

## How to Use

Instructions...

## Try It

<ToolEmbed src="/tools/tool-name.html" height="600px" />

## Features

- Feature list...
```

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Documentation**: [Fumadocs](https://fumadocs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Deployment**: Vercel (planned)

## Features

- 🚀 Fast, modern documentation framework
- 🔍 Built-in search functionality
- 🌙 Dark mode support
- 📱 Mobile-responsive design
- 🎨 Clean, minimalist interface
- 🔒 Privacy-focused (no tracking, no data collection)

## Deployment

Deployment to Vercel is planned. Once configured:

```bash
# Deploy to production
vercel --prod
```

Custom domain: `tools.kbr.sh`

## Inspiration

This project is inspired by [tools.simonwillison.net](https://tools.simonwillison.net/), which demonstrates the value of building and sharing simple, focused web tools.

## License

ISC

## Contributing

This is a personal project, but feel free to fork and adapt for your own use!

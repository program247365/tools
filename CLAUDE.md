# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based documentation site for hosting standalone web-based utility tools. These are interactive tools that users can directly use in their browser - some are pure HTML/CSS/JavaScript, while others may be Rust compiled to WebAssembly for performance-critical functionality. The site uses Fumadocs for MDX-based documentation and embeds tools via iframes with sandbox restrictions.

## Development Commands

```bash
# Development
npm run dev          # Start dev server on port 3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run Next.js linter

# MDX
npm run postinstall  # Generate MDX source files (runs automatically after install)
```

## Architecture

### Content System (Fumadocs MDX)

The site uses Fumadocs MDX for content management with a custom loader setup:

- **Source Configuration**: `source.config.ts` defines where content lives (`content/` directory)
- **Content Loader**: `lib/source.ts` creates the source loader using Fumadocs runtime
- **Generated Files**: MDX content is compiled to `.source/` directory (gitignored)
- **Page Generation**: `app/[[...slug]]/page.tsx` dynamically generates pages from MDX files

Content structure:
- `content/index.mdx` → Homepage
- `content/tools/*.mdx` → Tool documentation pages

After adding/modifying MDX files, run `npm run postinstall` to regenerate the source.

### Tool Embedding System

Tools are standalone, self-contained HTML files that users interact with directly in their browser. They may be pure HTML/CSS/JavaScript or include Rust compiled to WebAssembly (WASM) for performance. These are embedded in documentation pages:

1. **HTML Storage**: Tools live as single-file HTML in `public/` directory (e.g., `public/time-block-planner.html`)
   - Tools should be self-contained (all JS/CSS/WASM inlined or bundled)
   - WASM-based tools should include the .wasm file inline or reference it from the same directory
2. **Documentation**: Each tool has a corresponding MDX file in `content/tools/` that describes it
3. **Embedding Component**: `components/ToolEmbed.tsx` provides an iframe wrapper with:
   - Sandboxing for security (`allow-scripts allow-same-origin allow-downloads`)
   - Configurable height
   - Lazy loading

Example tool documentation pattern:
```mdx
---
title: Tool Name
description: Brief description
---

import { ToolEmbed } from '@/components/ToolEmbed';

# Tool Name

Description...

<ToolEmbed src="/time-block-planner.html" height="600px" />
```

### Layout Structure

- **Root Layout** (`app/layout.tsx`): Wraps entire app with Fumadocs DocsLayout, providing navigation sidebar
- **Page Layout** (`app/[[...slug]]/page.tsx`): Renders MDX content with table of contents
- **Global Provider**: Uses `RootProvider` from `fumadocs-ui/provider/next` for theme and UI state

### Search

The `/api/search/route.ts` endpoint provides full-text search using Fumadocs' built-in search functionality powered by the content source.

## Styling (Tailwind CSS v4)

This project uses Tailwind CSS v4 with important configuration differences from v3:

- **PostCSS Plugin**: Uses `@tailwindcss/postcss` (v4-specific plugin)
- **CSS Import**: `app/globals.css` uses `@import "tailwindcss"` (not the old `@tailwind` directives)
- **Config**: `tailwind.config.js` is standard, includes Fumadocs UI components in content paths

## TypeScript Configuration

- **Path Alias**: `@/*` maps to root directory
- **Module Resolution**: Uses `bundler` mode for Next.js
- **JSX**: Uses `react-jsx` transform

## Adding a New Tool

1. Add the HTML file to `public/` (e.g., `public/my-tool.html`)
2. Create documentation at `content/tools/my-tool.mdx`:
   ```mdx
   ---
   title: My Tool
   description: What it does
   ---

   import { ToolEmbed } from '@/components/ToolEmbed';

   # My Tool

   <ToolEmbed src="/my-tool.html" height="600px" />
   ```
3. Run `npm run postinstall` to regenerate MDX sources
4. Restart dev server to see changes

## Key Dependencies

- **Next.js 16**: App Router, React Server Components
- **React 19**: Latest React version
- **Fumadocs**: MDX-powered documentation framework
  - `fumadocs-core`: Core utilities and source loader
  - `fumadocs-mdx`: MDX compilation and source generation
  - `fumadocs-ui`: Pre-built UI components (DocsLayout, DocsPage, etc.)
- **Tailwind CSS v4**: Utility-first CSS framework
- **Geist Font**: Sans-serif font family

## Important Notes

- Tools are sandboxed for security - be mindful of iframe sandbox attributes
- The `.source/` directory is auto-generated - never edit directly
- Fumadocs uses a compile-time source generation approach, so MDX changes require running postinstall
- All pages are statically generated at build time via `generateStaticParams()`

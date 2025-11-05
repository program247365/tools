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
   - **Design Aesthetic**: All tools use a brutalist Jack Butcher style (details below)
2. **Documentation**: Each tool has a corresponding MDX file in `content/tools/` that describes it
3. **Embedding Component**: `components/ToolEmbed.tsx` provides an iframe wrapper with:
   - Sandboxing for security (`allow-scripts allow-same-origin allow-downloads allow-modals allow-forms`)
     - `allow-modals` is required for file picker dialogs
     - `allow-forms` is required for form inputs including file inputs
   - Configurable height
   - Lazy loading

### Brutalist Jack Butcher Design System

All tools should follow this consistent design aesthetic:

**Typography:**
- Font: `Space Mono` (monospace) from Google Fonts
- Weight: 400 (regular) and 700 (bold)
- All text: UPPERCASE with increased letter-spacing (0.5px - 2px)
- Font sizes: 0.75em - 2.5em range
- No decorative emojis in text (use simple symbols like ▶, ×, ✓, ▼)

**Color Palette:**
- Background: `#000` (pure black)
- Foreground: `#fff` (pure white)
- No gradients, no colors - only black and white
- Inverted on hover: black background becomes white, white text becomes black

**Layout & Spacing:**
- Borders: 2px or 3px solid
- No border-radius (sharp corners)
- No box-shadows
- Padding: 15px - 60px range
- Margin: 10px - 30px range

**Interaction States:**
- No transitions (`transition: none`)
- Hover: Invert colors (black ↔ white)
- No transform animations
- No opacity changes (except for subtle secondary text at 0.7-0.8)

**Buttons:**
- Background: `#000`, Border: `2px solid #fff`, Color: `#fff`
- Hover: Background: `#fff`, Color: `#000`
- Text: UPPERCASE, bold (700), letter-spacing: 0.5px - 1px
- Disabled: Background: `#333`, Color: `#666`, Border: `#666`

**Example CSS Structure:**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

* {
    font-family: 'Space Mono', monospace;
}

body {
    background: #000;
    color: #fff;
}

.btn {
    background: #000;
    color: #fff;
    border: 2px solid #fff;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: none;
}

.btn:hover {
    background: #fff;
    color: #000;
}
```

Example tool documentation pattern:
```mdx
---
title: Tool Name
description: Brief description
---

import { ToolEmbed } from '@/components/ToolEmbed';

# Tool Name

Description...

## Try It Now

<div className="not-prose -mt-4 mb-6">
  <a href="/tool-name.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm hover:text-fd-primary transition-colors">
    Open in new window ↗
  </a>
</div>

<ToolEmbed src="/tool-name.html" height="600px" />
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

**This is a TypeScript project. NEVER use `any` type except under very special circumstances.**

- **Path Alias**: `@/*` maps to root directory
- **Module Resolution**: Uses `bundler` mode for Next.js
- **JSX**: Uses `react-jsx` transform
- **Type Safety**: Always use proper TypeScript types and interfaces
  - Create custom type definitions in `lib/types.ts` when needed
  - Use type assertions (`as CustomType`) sparingly and only when necessary
  - Prefer `unknown` over `any` when type is truly unknown
  - Use proper generic types when working with Fumadocs APIs

### Custom Frontmatter and Type Safety

When working with custom MDX frontmatter fields (beyond the default `title` and `description`):

1. Define custom fields in `lib/types.ts`:
   ```typescript
   export interface CustomFrontmatter {
     tags?: string;
     date?: string | Date;
   }
   ```

2. Access custom frontmatter via `_exports.frontmatter` pattern:
   ```typescript
   const pageData = page.data as any; // Only acceptable any usage - Fumadocs internal API
   const frontmatter = pageData._exports?.frontmatter as CustomFrontmatter | undefined;
   const tags = frontmatter?.tags;
   ```

3. **Note**: Using `any` for `page.data` is acceptable here because Fumadocs doesn't export proper types for the internal `_exports` structure. However, immediately cast the frontmatter to your custom type.

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

   Description of the tool...

   ## Try It Now

   <div className="not-prose -mt-4 mb-6">
     <a href="/my-tool.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm hover:text-fd-primary transition-colors">
       Open in new window ↗
     </a>
   </div>

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

## Self-Hosting Large Dependencies (e.g., FFmpeg.wasm)

Some tools may use large external libraries that can have CORS issues when loaded from CDN. **Always self-host these files** in the `public/` directory.

### File Organization Pattern

- **JavaScript files** → `public/js/` directory
- **WASM/binary files** → `public/` root directory
- **Other assets** → `public/` root or appropriate subdirectories

### Example: FFmpeg.wasm

Download and organize ALL the files (main library + core files):
```bash
# Create js directory if it doesn't exist
mkdir -p public/js

# Download main FFmpeg library and chunks to public/js/
cd public/js
curl -O https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/umd/ffmpeg.js
curl -O https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/umd/814.ffmpeg.js

# Download core JavaScript files to public/js/
curl -O https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js
curl -O https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.worker.js

# Download WASM file to public/ root
cd ..
curl -O https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm
```

This creates:
- `public/js/ffmpeg.js` (~4KB - main library wrapper)
- `public/js/814.ffmpeg.js` (~3KB - webpack chunk)
- `public/js/ffmpeg-core.js` (~115KB - core JavaScript)
- `public/js/ffmpeg-core.worker.js` (~60 bytes - worker)
- `public/ffmpeg-core.wasm` (~32MB - WASM binary)

Then reference from the HTML tool:
```html
<script src="/js/ffmpeg.js"></script>
<script>
    // Initialize FFmpeg
    let FFmpeg = FFmpegWASM.FFmpeg;

    // Helper to convert File to Uint8Array (fetchFile not exported in v0.12)
    async function fileToUint8Array(file) {
        return new Uint8Array(await file.arrayBuffer());
    }
</script>
```

And in the load() call:
```javascript
const ffmpeg = new FFmpeg();
await ffmpeg.load({
    coreURL: '/js/ffmpeg-core.js',
    wasmURL: '/ffmpeg-core.wasm',
    workerURL: '/js/ffmpeg-core.worker.js'
});

// Use fileToUint8Array instead of fetchFile
const fileData = await fileToUint8Array(inputFile);
await ffmpeg.writeFile('input', fileData);
```

**Note:** The v0.12 library does not export `fetchFile` - use `fileToUint8Array` helper instead.

### Benefits of Self-Hosting

- ✅ No CORS issues
- ✅ Works in all contexts (iframe, standalone, localhost)
- ✅ Faster load times (no CDN latency)
- ✅ Works offline
- ✅ Version control and consistency

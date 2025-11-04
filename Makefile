.PHONY: dev build start lint postinstall install clean help

help:
	@echo "Available targets:"
	@echo "  make dev         - Start development server (next dev)"
	@echo "  make build       - Build production application (next build)"
	@echo "  make start       - Start production server (next start)"
	@echo "  make lint        - Run linter (next lint)"
	@echo "  make postinstall - Run postinstall script (fumadocs-mdx)"
	@echo "  make install     - Install dependencies (bun install)"
	@echo "  make clean       - Clean build artifacts"

dev:
	bunx next dev

build:
	bunx next build

start:
	bunx next start

lint:
	bunx next lint

postinstall:
	bunx fumadocs-mdx

install:
	bun install

clean:
	rm -rf .next node_modules

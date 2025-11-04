.PHONY: dev build start lint postinstall install clean help

help:
	@echo "Available targets:"
	@echo "  make dev         - Start development server (next dev)"
	@echo "  make build       - Build production application (next build)"
	@echo "  make start       - Start production server (next start)"
	@echo "  make lint        - Run linter (next lint)"
	@echo "  make postinstall - Run postinstall script (fumadocs-mdx)"
	@echo "  make install     - Install dependencies (npm install)"
	@echo "  make clean       - Clean build artifacts"

dev:
	npx next dev

build:
	npx next build

start:
	npx next start

lint:
	npx next lint

postinstall:
	npx fumadocs-mdx

install:
	npm install

clean:
	rm -rf .next node_modules

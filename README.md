# Infinivista Front-end Application

## Introduction

Infinivista is a social media application built with Next.js and TailwindCSS, designed to deliver a seamless and modern user experience.

## Project Structure

- app: main application folder.
- components: contains reusable UI components.
    - commons: large, configurable components like the header, footer, empty states, tables, and dropdowns. These require additional customization if shadcn/ui components are insufficient.
    - ui: pre-configured shadcn/ui components that are ready for immediate use with minimal configuration (e.g., buttons, badges).
- hooks: contains reusable custom React hooks.
- lib: utility functions for shared logic.
- modules: handles API interactions and services.
- routes: stores application routing information.

## Demo Env

To set up the application locally, use the following environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_VERSION=v1
```

## Git Convention

### Pre-Commit Checklist

Before committing changes, ensure your code passes all checks:

```
npm run lint       # Check for linting errors
npm run lint:fix   # Automatically fix linting issues
npm run format     # Format code using Prettier
npm run build      # Verify successful project builds
```

### Branch Naming Convention

When creating a new branch for a feature or bug fix:

- Use the prefix feat/ for features (e.g., feat/component, feat/auth).
- Use the prefix bug/ for bug fixes (e.g., bug/axios).
- Branch names should be concise, descriptive, and use nouns or noun phrases.

### Commit Message Guidelines

Write clear and structured commit messages following the [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) standard.
Examples:

- feat: Add new feature or functionality.
- fix: Resolve a bug or issue.
- docs: Update documentation.
- style: Improve formatting, remove unused code, or clean up the codebase.
- refactor: Restructure code without changing its behavior.
- test: Add or update tests.

# Express TypeScript Template

A modern Express.js template with TypeScript, featuring:

- 🚀 [Express.js](https://expressjs.com/) with TypeScript
- 📦 [Drizzle ORM](https://orm.drizzle.team/) for PostgreSQL
- 🔒 Built-in security with [Helmet](https://helmetjs.github.io/)
- ✨ [Prettier](https://prettier.io/) for code formatting
- 🚦 [Eslint](https://https://eslint.org/) for code linting
- 🧪 [Vitest](https://vitest.dev/) for testing
- 🔄 Server-Sent Events support with [better-sse](https://github.com/MatthewWid/better-sse)
- ✅ Request validation with [Zod](https://zod.dev/)
- 🏗 [Esbuild](https://esbuild.github.io/) for bundling
- 🧾 Api documentation with [Zod-to-openapi](https://www.npmjs.com/package/@asteasolutions/zod-to-openapi) and Swagger UI.

## Prerequisites

- Node.js
- PostgreSQL

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env.local` and configure your environment variables
3. Install dependencies:
   ```bash
   npm install
   ```
4. Push drizzle database schema;
   ```bash
   npm run db:push
   ```
5. Start development server;
   ```bash
   npm run dev
   ```
6. Visit localhost:8000/docs to view api docs.
7. Create and query posts from api docs.

## Database

This template uses Drizzle ORM with PostgreSQL. Configure your database connection in the `.env.local` file.

## Licence

MIT

## Created By

[Jesse Ajioh](https://github.com/ajiohjesse)

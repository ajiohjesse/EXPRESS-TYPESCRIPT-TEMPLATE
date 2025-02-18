# Express TypeScript Template

A modern Express.js template with TypeScript, featuring:

- 🚀 [Express.js](https://expressjs.com/) with TypeScript
- 📦 [Drizzle ORM](https://orm.drizzle.team/) for PostgreSQL
- 🔒 Built-in security with [Helmet](https://helmetjs.github.io/)
- ✨ [Prettier](https://prettier.io/) for code formatting
- 🧪 [Vitest](https://vitest.dev/) for testing
- 🔄 Server-Sent Events support with [better-sse](https://github.com/MatthewWid/better-sse)
- ✅ Request validation with [Zod](https://zod.dev/)

## Prerequisites

- Node.js
- PostgreSQL
- Bun (for development)

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run format` - Format code with Prettier
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## Database

This template uses Drizzle ORM with PostgreSQL. Configure your database connection in the `.env` file.

## Project Structure

```
src/
├── app/           # Express app setup
├── database/      # Database configuration and schemas
├── events/        # SSE channels and event emitters
├── helpers/       # Utility functions
├── jobs/          # Background jobs and queues
├── libs/          # External library integrations
├── middlewares/   # Express middlewares
└── modules/       # Feature modules (auth, etc.)
```

## License

ISC

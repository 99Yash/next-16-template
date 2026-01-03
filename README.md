# Next.js 16 Template

A production-ready Next.js 16 template with authentication, database setup, and modern tooling.

## Features

- ⚡ **Next.js 16** with App Router
- 🔐 **Better Auth** - Complete authentication solution with email/password and OAuth
- 🗄️ **PostgreSQL** with Drizzle ORM
- 🎨 **Tailwind CSS v4** with custom design system
- 📦 **shadcn/ui** components
- 🌓 **Dark mode** support
- ✅ **TypeScript** with strict type checking
- 🧪 **Type-safe environment variables** with [T3 Env](https://env.t3.gg) and Zod
- 🔒 **Security middleware** with security headers
- 📊 **Vercel Analytics** integration
- 🎯 **Error boundaries** and error handling
- 💾 **Connection pooling** for database

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd next-16-template
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
BETTER_AUTH_SECRET=your-secret-key-here-must-be-at-least-32-characters-long
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

5. Set up the database:

```bash
# Generate migrations from schema
pnpm db:generate

# Push schema to database (development)
pnpm db:push

# Or run migrations (production)
pnpm db:migrate
```

6. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push schema to database (dev only)
- `pnpm db:studio` - Open Drizzle Studio

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth routes group
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Auth API handlers
│   │   │   └── health/        # Health check endpoint
│   │   ├── error.tsx          # Global error boundary
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── layouts/           # Layout components
│   │   ├── ui/                # UI components (shadcn/ui)
│   │   └── error-boundary.tsx # Error boundary component
│   ├── db/                    # Database configuration
│   │   ├── schemas/           # Drizzle schemas
│   │   └── index.ts           # Database connection
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   │   ├── auth/              # Auth configuration
│   │   ├── env.ts             # Environment variable validation
│   │   ├── errors.ts          # Error handling utilities
│   │   └── utils.ts           # General utilities
│   └── middleware.ts          # Next.js middleware
├── drizzle/                   # Database migrations
└── public/                    # Static assets
```

## Environment Variables

All environment variables are validated using [T3 Env](https://env.t3.gg) with Zod schemas. This provides type-safe environment variables with automatic validation. See `.env.example` for required variables.

T3 Env automatically:

- Separates server and client-side environment variables
- Validates variables on application startup
- Provides TypeScript autocomplete for env variables
- Prevents accidental exposure of server variables to the client

### Server Variables (Required)

- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret key for Better Auth (min 32 characters)

### Server Variables (Optional)

- `BETTER_AUTH_URL` - Base URL for auth API (defaults to `NEXT_PUBLIC_APP_URL`)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

### Client Variables (Optional)

- `NEXT_PUBLIC_APP_URL` - Public application URL (accessible on both client and server)

**Note**: Set `SKIP_ENV_VALIDATION=true` to skip validation during builds if needed (e.g., for CI/CD pipelines where env vars are set at runtime).

## Authentication

The template uses [Better Auth](https://better-auth.com) for authentication. It supports:

- Email/password authentication
- OAuth providers (Google configured, easily extensible)

### Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add credentials to `.env` file

## Database

The template uses [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL. Database schemas are defined in `src/db/schemas/`.

### Database Operations

- **Generate migrations**: `pnpm db:generate` - Creates migration files from schema changes
- **Push schema**: `pnpm db:push` - Syncs schema directly to database (dev only)
- **Run migrations**: `pnpm db:migrate` - Applies migrations to database
- **Open Studio**: `pnpm db:studio` - Opens Drizzle Studio for database inspection

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

1. Build the application: `pnpm build`
2. Start the production server: `pnpm start`
3. Ensure environment variables are set
4. Run database migrations: `pnpm db:migrate`

## Security

The template includes security best practices:

- Security headers via middleware (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS)
- Environment variable validation
- Type-safe database queries
- Error boundary for graceful error handling
- Connection pooling for database

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

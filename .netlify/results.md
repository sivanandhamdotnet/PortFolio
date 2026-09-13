Configured the Next.js project explicitly for Netlify deployment. The repository now tells Netlify to run the application build, publish the generated Next.js output, and use the official Next.js adapter so requests are routed to the application instead of falling through to Netlify’s 404 page.

Added the adapter as a locked development dependency to keep local and hosted installs reproducible. TypeScript checks and ESLint validation completed successfully after the change.

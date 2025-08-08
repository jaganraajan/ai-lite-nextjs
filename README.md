# Next.js Gemini Chatbot Lite

A simplified AI-powered chatbot built with Next.js, Google Gemini AI SDK, Tailwind CSS, and TypeScript. This project offers a minimalistic foundation for creating, customizing, and extending AI chatbots. It is designed for quick experimentation and learning the basics of building AI-integrated applications.

## Features

- **Quick setup with Google Gemini AI SDK**
- **Built using Next.js and React**
- **Chat history storage (requires login/account)**
- **Fully customizable and extendable**
- **Streaming chat responses with Gemini 1.5 Flash model**
- **User authentication (NextAuth + Neon database)**
- **Modern design with Tailwind CSS and Geist fonts**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the chatbot.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

- `src/app/` — Next.js app directory (routes, layout, authentication, actions, etc.)
- `src/components/` — UI components (chat, header, cards, icons)
- `src/pages/api/` — API routes (chat history, authentication)
- `src/lib/` — Utilities and helpers
- `public/` — Static assets

## Authentication

Authentication uses NextAuth with a Neon database adapter. Users can register, log in, and store their chat history securely.

## AI Integration

AI chat leverages the Google Gemini SDK. Streaming responses are supported, and the model used is `gemini-1.5-flash`. You need a Google Generative AI API key—set it in your environment variables (`NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY`).

## Customization

- Modify UI components in `src/components/`
- Update chat logic in `src/app/actions.tsx`
- Extend authentication features in `src/pages/api/auth/[...nextauth].ts`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Google Generative AI](https://ai.google.dev/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Check out [the GitHub repository](https://github.com/jaganraajan/ai-lite-nextjs) and start building your own AI chatbot!

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import Link from "next/link";
  
  export default function AboutCard() {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Next.js Gemini Chatbot</CardTitle>
            <CardDescription>A simplified AI project built with Next.js and AI SDK</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground/90 leading-normal prose">
            <p className="mb-3">
              This is a side project I built as a simplified Next.js Gemini AI chatbot. The main reason why I built it was because I wanted to quickly experiment with AI integrations and learn the basics of building AI-powered applications.
            </p>
            <p className="mb-3">
              Built with <strong>Next.js</strong>, <strong>AI SDK</strong>, <strong>Tailwind CSS</strong>, and <strong>TypeScript</strong>, this project provides a minimalistic foundation for creating AI chatbots. The goal is to make it easy to customize and extend while focusing on simplicity and speed.
            </p>
            <p className="mb-3 font-semibold">Key Features:</p>
            <ul className="flex flex-col mb-2">
              <li>→ Quick setup with AI SDK</li>
              <li>→ Built using Next.js and React</li>
              <li>→ Store chat history by logging in with an account</li>
              <li>→ Fully customizable and extendable</li>
            </ul>
            <p>
              <Link href="https://github.com/jaganraajan/nextjs-ai-chatbot" className="underline">
                Check out my GitHub repository and start building your own AI chatbot!
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
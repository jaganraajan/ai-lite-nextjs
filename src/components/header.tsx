import * as React from 'react'
import Link from 'next/link'
import EnvCard from './cards/envcard'
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0">  
      <EnvCard />
      <Link href="/" rel="nofollow" className="mr-2 font-bold">
        Next.js Gemini AI
      </Link>
      {/* Social Links */}
      <ul className="flex space-x-6 items-center">
          <li>
            <a
              href="https://www.linkedin.com/in/jagan-raajan/"
              className="flex items-center text-gray-300 hover:text-primary-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
              <span className="ml-2 hidden sm:inline">jagan-raajan</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jaganraajan/"
              className="flex items-center text-gray-300 hover:text-primary-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
              <span className="ml-2 hidden sm:inline">jaganraajan</span>
            </a>
          </li>
        </ul>
    </header>
  )
}
'use client';

import * as React from 'react'
import { useState } from 'react'
import Link from 'next/link'
// import EnvCard from './cards/envcard'
import { FaGithub, FaLinkedin, FaBars } from 'react-icons/fa';
import { CoreMessage } from 'ai';

export function Header({ setMessages }: { setMessages: React.Dispatch<React.SetStateAction<CoreMessage[]>> }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClearChat = () => {
    setMessages([]); // Clear the messages
    console.log('Chat cleared');
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center w-full h-16 px-4 border-b shrink-0">  
      {/* <EnvCard /> */}
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 ${
          isSidebarOpen ? 'left-64' : 'left-4'
        } z-50 text-gray-600 hover:text-gray-900 focus:outline-none transition-all duration-300`}
        aria-label={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        <FaBars size={24} />
      </button>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold">Gemini Chatbot</h2>
          <button
            onClick={handleClearChat}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            aria-label="Clear Chat and Show About"
          >
            +
          </button>
          <p>Login to save and revisit previous chats!</p>
        </div>
      </div>
      <Link href="/" rel="nofollow" className="mr-2 font-bold">
        Next.js Gemini AI
      </Link>
      {/* Social Links and Login Button */}
      <div className="flex items-center ml-auto space-x-6">
        {/* Login Button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <a href="/login">Login</a>
        </button>

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
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
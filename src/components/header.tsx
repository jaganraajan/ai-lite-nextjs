'use client';

import * as React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
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

  const SidebarLeftIcon = ({ size = 16 }: { size?: number }) => (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: 'currentcolor' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.245 2.5H14.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H6.245V2.5ZM4.995 2.5H1.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H4.995V2.5ZM0 1H1.5H14.5H16V2.5V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V2.5V1Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center w-full h-16 px-4 border-b shrink-0">  
      {/* <EnvCard /> */}
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-6 ${
          isSidebarOpen ? 'left-64 ml-2' : 'left-4'
        } z-50 md:px-2 md:h-fit focus:outline-none transition-all duration-300`}
        aria-label={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        <SidebarLeftIcon size={20}/>
      </button>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Gemini Chatbot</h2>
            <button
              onClick={handleClearChat}
              className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Clear Chat and Show About"
            >
              +
            </button>
          </div>
          <p className='mt-8'>Login to save and revisit previous chats!</p>
          {/* Login Button */}
        <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <a href="/login">Login</a>
        </button>
        </div>
      </div>
      <Link href="/" rel="nofollow" className="ml-auto font-bold">
        Next.js Gemini AI
      </Link>
      {/* Social Links and Login Button */}
      <div className="flex items-center ml-auto space-x-6">

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
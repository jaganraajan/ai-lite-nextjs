'use client';

import * as React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { CoreMessage } from 'ai';
import axios from 'axios';

export function Header({ setMessages, id }: { setMessages: React.Dispatch<React.SetStateAction<CoreMessage[]>>, id?: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State to handle loading

  // eslint-disable-next-line @typescript-eslint/no-explicit-any  
  const [chatHistory, setChatHistory] = useState<any[]>([]); // State to store chat history

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClearChat = () => {
    setMessages([]); // Clear the messages
    console.log('Chat cleared');
    toggleSidebar(); // Close the sidebar
  };

  // Fetch chat history when id exists
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (id) {
        setLoading(true); // Set loading to true while fetching
        try {
          const response = await axios.get(`/api/getChatHistory`, {
            params: { id }, // Pass the id as a query parameter
          });
          console.log(response.data.chats); // Set the fetched chat history
          setChatHistory(response.data.chats); // Set the fetched chat history
        } catch (error) {
          console.error('Error fetching chat history:', error);
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchChatHistory();
  }, [id]);

  function truncateContent(content: string, maxLength: number): string {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...'; // Trim and add ellipsis
    }
    return content; // Return the full content if it's within the limit
  }

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

  const handleSelectChat = (chat: { messages: { content: string; role: string }[] }) => {
    setMessages(
      chat.messages.map((message) => ({
        content: message.content,
        role: message.role as 'user' | 'assistant', // Ensure role matches CoreMessage type
      }))
    );
    toggleSidebar(); // Close the sidebar
  };

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
          {id ? (
            <div className="mt-4">
              <h2 className="text-lg font-bold">Chat History</h2>
              {loading ? (
                <p className="text-gray-500 mt-2">Loading chat history...</p>
              ) : chatHistory.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {chatHistory.map((chat: { messages: { content: string; role: string }[] }, index: number) => (
                    <li 
                      key={index}
                      className="text-sm text-gray-700 bg-gray-100 p-2 rounded-lg"
                      onClick={() => handleSelectChat(chat)}
                    >
                      {/* Display the content of all messages in the chat */}
                      {chat.messages.map((message, messageIndex) => (
                        <div key={messageIndex} className="mb-2">
                          <strong>{message.role === 'user' ? 'User' : 'Assistant'}:</strong> {truncateContent(message.content, 100)}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No chat history found.</p>
              )}
            </div>
          ) : (
            <div>
              <p className="mt-8">Login to save and revisit previous chats!</p>
              <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <a href="/login">Login</a>
              </button>
            </div>
          )}
          
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
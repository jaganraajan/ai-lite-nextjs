'use client';

import 'dotenv/config';
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconArrowUp } from './ui/icons';
import AboutCard from './cards/aboutcard';
import { continueTextConversation } from '@/app/actions';
import { CoreMessage } from 'ai';
import ReactMarkdown from 'react-markdown';
import { AiOutlineRobot } from 'react-icons/ai';
import { HiOutlineUser } from "react-icons/hi";
import axios from "axios";

export default function Chat({ messages, setMessages, id }: { messages: CoreMessage[]; setMessages: React.Dispatch<React.SetStateAction<CoreMessage[]>>, id?: string }) {
    const [input, setInput] = useState<string>('');  
    const [error, setError] = useState<string | null>(null); // State to track errors
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for the chat container

    const handleStoreMessages = async (updatedMessages: CoreMessage[]) => {
        if (!id) {
          console.log("User is not logged in. Cannot store messages.");
          return;
        }
    
        try {
          // Send a POST request to the API to store chat history
          await axios.post("/api/storeChatHistory", {
            userId: id, // Pass the logged-in user's ID
            messages: updatedMessages, // Pass the updated messages
          });
          console.log("Chat history stored successfully!");
        } catch (error) {
          console.error("Failed to store chat history:", error);
        }
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newMessages: CoreMessage[] = [
          ...messages,
          { content: input, role: 'user' },
        ];
        setMessages(newMessages);
        setInput('');

        try {
            const resultTextStream = await continueTextConversation(newMessages);
            // Create a variable to accumulate the streamed text
            let accumulatedText = '';

            for await (const textPart of resultTextStream) {
                accumulatedText += textPart; // Append the new text part to the accumulated text

                // Update the last message in the messages array to reflect the accumulated text
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];

                    // Check if the last message is from the assistant
                    const lastMessage = updatedMessages[updatedMessages.length - 1];
                    if (lastMessage?.role === 'assistant') {
                        // Update the last assistant message with the accumulated text
                        updatedMessages[updatedMessages.length - 1] = {
                            ...lastMessage,
                            content: accumulatedText,
                        };
                    } else {
                        // Add a new assistant message if none exists
                        updatedMessages.push({
                            role: 'assistant',
                            content: accumulatedText,
                        });
                    }

                    return updatedMessages;
                });
            }

            // Call handleStoreMessages after the AI content is fully streamed
            handleStoreMessages([...newMessages, { role: "assistant", content: accumulatedText }]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.response?.status === 429) {
                setError('Too many requests. Please try again later.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
      };

    // Scroll to the bottom of the chat container whenever messages are updated
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div 
            ref={chatContainerRef} // Attach the ref to the chat container
            className="group w-full overflow-auto "
        >
            {messages.length <= 0 ? ( 
                <AboutCard />  
            ) 
            : (
                <div className="max-w-xl mx-auto mt-10 mb-24">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start mb-4 ${message.role === 'user' ? 'ml-4 justify-end' : 'mr-4'}`}>
                        {/* Display user or AI icon */}
                        {message.role === 'assistant' && (
                            <div className="p-2">
                                <AiOutlineRobot className="text-white" size={24} />
                            </div>
                        )}
                        {/* Display the message content */}
                        <div
                            className={`p-2 rounded-lg max-w-m ${
                                message.role === 'user'
                                    ? 'bg-blue-100 text-blue-900 ml-auto'
                                    : 'bg-gray-200 text-gray-900'
                            }`}
                        >
                            <ReactMarkdown>{message.content as string}</ReactMarkdown>
                        </div>
                        {message.role === 'user' && (
                            <div className="p-2">
                                <HiOutlineUser size={24} className="text-blue-200" />
                            </div>
                        )}
                    </div>
                ))}
                </div>
            )}

            {/* Error Popup */}
            {error && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm text-center">
                        <p className="text-red-500 font-bold">{error}</p>
                        <button
                            onClick={() => setError(null)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="fixed inset-x-0 bottom-10 w-full bg-black">
                <div className="w-full max-w-xl mx-auto">
                <Card className="p-2">
                    <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <Input
                        type="text"
                        value={input}
                        onChange={event => {
                            setInput(event.target.value);
                        }}
                        className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                        placeholder='Ask me anything...'
                        />
                        <Button >
                        <IconArrowUp />
                        </Button>
                    </div>
                    </form>
                </Card>
                </div>
            </div>
        </div>
    );
}
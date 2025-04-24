'use client';

import 'dotenv/config';
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconArrowUp } from './ui/icons';
import AboutCard from './cards/aboutcard';
import { continueTextConversation } from '@/app/actions';
import { CoreMessage } from 'ai';
import ReactMarkdown from 'react-markdown';


export default function Chat() {
    const [input, setInput] = useState<string>('');  
    const [messages, setMessages] = useState<CoreMessage[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newMessages: CoreMessage[] = [
          ...messages,
          { content: input, role: 'user' },
        ];
        setMessages(newMessages);
        setInput('');
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

        console.log('Updated Messages:', newMessages);
        console.log('Updated Messages:', messages);
      }

    return (
        <div className="group w-full overflow-auto ">
            {messages.length <= 0 ? ( 
                <AboutCard />  
            ) 
            : (
                <div className="max-w-xl mx-auto mt-10 mb-24">
                {messages.map((message, index) => (
                    <div key={index} className="whitespace-pre-wrap flex mb-5">
                    <div className={`${message.role === 'user' ? 'ml-auto' : 'bg-transparent'} p-2 rounded-lg`}>
                        <ReactMarkdown>{message.content as string}</ReactMarkdown>
                    </div>
                    </div>
                ))}
                </div>
            )}
            <div className="fixed inset-x-0 bottom-10 w-full ">
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
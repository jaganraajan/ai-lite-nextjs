'use client';

import React, { useState } from 'react';
import Chat from "@/components/chat";
import { Header } from "@/components/header";
import { CoreMessage } from 'ai';

export default function Home() {
  const [messages, setMessages] = useState<CoreMessage[]>([]); // Shared state for messages

  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10 flex-col">
      <Header setMessages={setMessages} />
      <Chat messages={messages} setMessages={setMessages}/>
    </div>
  );
}

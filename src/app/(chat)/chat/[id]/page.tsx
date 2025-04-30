'use client';

import React, { useState } from 'react';
import Chat from "@/components/chat";
import { Header } from "@/components/header";
import { CoreMessage } from 'ai';
import { useParams } from 'next/navigation';

export default function Home() {
  const params = useParams();
  const id = params?.id as string | '';
  const [messages, setMessages] = useState<CoreMessage[]>([]); // Shared state for messages

  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10 flex-col">
      <Header setMessages={setMessages} id={id}/>
      <Chat messages={messages} setMessages={setMessages} id={id}/>
    </div>
  );
}

'use client';

import { FC, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import ChatMessageComponent from './ChatMessage';

const ChatHistory: FC = () => {
  const messages = useAppStore((state) => state.messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat history on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto">
      {messages.map((msg, index) => (
        // We only render messages with content and a valid role for display
        (msg.role === 'user' || msg.role === 'assistant') && msg.content ? 
          <ChatMessageComponent key={index} message={msg} /> : null
      ))}
    </div>
  );
};

export default ChatHistory;
'use client';

import { FC } from 'react';
import ChatHistory from '../chat/ChatHistory';
import ChatInput from '../chat/ChatInput';

const MainContent: FC = () => {
  return (
    <main className="flex h-screen flex-1 flex-col bg-gray-800">
      <ChatHistory />
      <ChatInput />
    </main>
  );
};

export default MainContent;
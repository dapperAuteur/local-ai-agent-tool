'use client';

import { FC } from 'react';
import { Download } from 'lucide-react';
import ChatHistory from '../chat/ChatHistory';
import ChatInput from '../chat/ChatInput';
import { useAppStore } from '@/store/useAppStore';

const MainContent: FC = () => {
  const activeAgent = useAppStore((state) => 
    state.agents.find(agent => agent.id === state.activeAgentId)
  );
  const messages = useAppStore((state) => state.messages);
  const exportActiveChatHistory = useAppStore((state) => state.exportActiveChatHistory);

  return (
    <main className="flex h-screen flex-1 flex-col bg-gray-800">
      {/* New Header */}
      <header className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-6 py-3">
        <h2 className="text-lg font-semibold text-white">
          {activeAgent ? activeAgent.name : 'Chat'}
        </h2>
        <button
          onClick={exportActiveChatHistory}
          disabled={!activeAgent || messages.length === 0}
          className="flex items-center gap-2 rounded-md border border-gray-600 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-indigo-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          title={messages.length > 0 ? "Export this chat" : "No chat history to export"}
        >
          <Download size={14} />
          Export Chat
        </button>
      </header>

      <ChatHistory />
      <ChatInput />
    </main>
  );
};

export default MainContent;
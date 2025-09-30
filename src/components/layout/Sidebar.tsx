'use client';

import { FC, useEffect } from 'react';
import { BotMessageSquare, Plus } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import clsx from 'clsx';

const Sidebar: FC = () => {
  const agents = useAppStore((state) => state.agents);
  const activeAgentId = useAppStore((state) => state.activeAgentId);
  const setActiveAgent = useAppStore((state) => state.setActiveAgent);
  const fetchOllamaModels = useAppStore((state) => state.fetchOllamaModels);
  const openNewAgentModal = useAppStore((state) => state.openNewAgentModal);

  // Fetch models from Ollama when the application loads
  useEffect(() => {
    fetchOllamaModels();
  }, [fetchOllamaModels]);

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r border-gray-700 bg-gray-900 p-4">
      <div className="mb-6 flex items-center gap-2">
        <BotMessageSquare size={28} className="text-indigo-400" />
        <h1 className="text-xl font-bold text-white">AI Agents</h1>
      </div>
      
      <button 
        onClick={openNewAgentModal}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
        <Plus size={16} />
        New Agent
      </button>

      <nav className="flex-1 space-y-2">
        {agents.length === 0 ? (
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>No agents created yet.</p>
            <p>Click &quot;+ New Agent&quot; to begin.</p>
          </div>
        ) : (
          agents.map((agent) => (
            <a
              key={agent.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveAgent(agent.id);
              }}
              className={clsx(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                {
                  'bg-gray-700/50 text-white': agent.id === activeAgentId,
                  'text-gray-400 hover:bg-gray-800 hover:text-white': agent.id !== activeAgentId,
                }
              )}
            >
              <span className="truncate">{agent.name}</span>
            </a>
          ))
        )}
      </nav>
      
      <div className="mt-auto">
        <p className="text-xs text-gray-500">v1.0.0-MVP</p>
      </div>
    </aside>
  );
};

export default Sidebar;
'use client'; // This component now uses hooks, so it must be a client component.

import { FC } from 'react';
import { Cog, FileText, AlertTriangle, Loader } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const RightPanel: FC = () => {
  // Connect to the global state store
  const models = useAppStore((state) => state.models);
  const selectedModel = useAppStore((state) => state.selectedModel);
  const setSelectedModel = useAppStore((state) => state.setSelectedModel);
  const ollamaConnectionStatus = useAppStore((state) => state.ollamaConnectionStatus);
  const agents = useAppStore((state) => state.agents);
  const activeAgentId = useAppStore((state) => state.activeAgentId);

  // Find the currently active agent to display its system prompt
  const activeAgent = agents.find((agent) => agent.id === activeAgentId);

  const renderModelSelector = () => {
    switch (ollamaConnectionStatus) {
      case 'pending':
        return (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader size={16} className="animate-spin" />
            Loading models...
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertTriangle size={16} />
            Connection failed.
          </div>
        );
      case 'success':
        if (models.length === 0) {
          return <p className="text-sm text-yellow-400">No models found.</p>;
        }
        return (
          <select
            id="model-select"
            className="w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={selectedModel ?? ''}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {models.map((model) => (
              <option key={model.digest} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
        );
    }
  };

  return (
    <aside className="hidden h-screen w-80 flex-col border-l border-gray-700 bg-gray-900 p-4 lg:flex">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Cog size={20} />
          Configuration
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="model-select" className="mb-2 block text-sm font-medium text-gray-300">
            Model
          </label>
          {renderModelSelector()}
        </div>

        <div>
           <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
            <FileText size={16} />
            System Prompt
           </h3>
           <div className="max-h-96 overflow-y-auto rounded-md border border-gray-700 bg-gray-800/50 p-3">
             <p className="whitespace-pre-wrap text-xs text-gray-400">
                {activeAgent ? activeAgent.systemPrompt : 'No active agent selected.'}
             </p>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
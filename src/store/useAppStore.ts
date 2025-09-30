// File: /src/store/useAppStore.ts


import { create } from 'zustand';
import { ollamaClient } from '@/lib/ollama/client';
import { OllamaModel } from '@/lib/ollama/types';
import { ChatMessage, Agent } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { persist, createJSONStorage } from 'zustand/middleware';
import { exportAgentAsJson } from '@/lib/utils';

// Define the structure of our application's state
interface AppState {
  // Ollama-related state
  ollamaConnectionStatus: 'pending' | 'success' | 'error';
  models: OllamaModel[];
  selectedModel: string | null;

  // Agent and Chat state
  agents: Agent[];
  activeAgentId: string | null;
  messages: ChatMessage[];
  isStreamingResponse: boolean;

  isNewAgentModalOpen: boolean;
  

  // Actions: functions that modify the state
  fetchOllamaModels: () => Promise<void>;
  setActiveAgent: (agentId: string) => void;
  setSelectedModel: (modelName: string) => void;
  sendMessage: (message: string) => Promise<void>;
  addAgent: (agent: { name: string; systemPrompt: string }) => void;
  openNewAgentModal: () => void;
  closeNewAgentModal: () => void;
  exportActiveAgent: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
  ollamaConnectionStatus: 'pending',
  models: [],
  selectedModel: null,
  agents: [],
  activeAgentId: null,
  messages: [],
  isStreamingResponse: false,
  isNewAgentModalOpen: false,
  fetchOllamaModels: async () => {
    try {
      set({ ollamaConnectionStatus: 'pending' });
      const models = await ollamaClient.listModels();
      set({ models, ollamaConnectionStatus: 'success' });
      // If no model is selected, default to the first one
      if (!get().selectedModel && models.length > 0) {
        set({ selectedModel: models[0].name });
      }
    } catch (error) {
      console.error('Failed to fetch Ollama models:', error);
      set({ ollamaConnectionStatus: 'error' });
    }
  },
  addAgent: ({ name, systemPrompt }) => {
    const newAgent: Agent = { id: uuidv4(), name, systemPrompt };
    set((state) => ({ agents: [...state.agents, newAgent] }));
  },
  exportActiveAgent: () => {
    const { agents, activeAgentId } = get();
    const activeAgent = agents.find(agent => agent.id === activeAgentId);
    if (activeAgent) {
      exportAgentAsJson(activeAgent);
    } else {
      console.error("No active agent to export.");
    }
  },

  /**
   * Sets the currently active agent.
   */
  setActiveAgent: (agentId: string) => {
    set({ activeAgentId: agentId, messages: [] }); // Clear messages when switching agents
  },

  /**
   * Sets the model to be used for chat completions.
   */
  setSelectedModel: (modelName: string) => {
    set({ selectedModel: modelName });
  },
  openNewAgentModal: () => set({ isNewAgentModalOpen: true }),
  closeNewAgentModal: () => set({ isNewAgentModalOpen: false }),

  /**
   * Sends a user message and streams the assistant's response.
   */
  sendMessage: async (messageContent: string) => {
    const { activeAgentId, agents, selectedModel, messages } = get();
    if (!selectedModel) return;

    const userMessage: ChatMessage = { role: 'user', content: messageContent };
    const messagesForApi: ChatMessage[] = [...messages, userMessage];
    
    // Update the UI immediately with the user's message and an empty placeholder for the assistant's response
    set({ 
      messages: [...messagesForApi, { role: 'assistant', content: '' }],
      isStreamingResponse: true,
    });
    
    // Construct the full message history including the system prompt
    const activeAgent = agents.find(a => a.id === activeAgentId);
    const systemPrompt = activeAgent?.systemPrompt || '';
    
    // This is the final, complete array sent to the Ollama client
    const fullMessagesForApi: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messagesForApi,
    ];

    try {
      await ollamaClient.generateChatCompletionStream(
        selectedModel,
        fullMessagesForApi,
        (chunk) => {
          if (!chunk.done) {
            set((state) => {
              // Append the new content to the last message (the assistant's response)
              const newMessages = [...state.messages];
              newMessages[newMessages.length - 1].content += chunk.content;
              return { messages: newMessages };
            });
          } else {
            set({ isStreamingResponse: false });
          }
        }
      );
    } catch (error) {
      console.error('Failed to stream response:', error);
      set((state) => {
        const newMessages = [...state.messages];
        newMessages[newMessages.length - 1].content += '\n\n**Error:** Could not get a response from the model.';
        return { messages: newMessages, isStreamingResponse: false };
      });
    }
  },
    }),
    {
      name: 'local-ai-agent-storage', // The key used in localStorage
      // We only want to persist a subset of the state.
      // We don't save messages, connection status, or the model list.
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        agents: state.agents,
        activeAgentId: state.activeAgentId,
        selectedModel: state.selectedModel,
      }),
      // This function runs after the stored state has been loaded.
      onRehydrateStorage: () => (state) => {
        if (state) {
          // If there is no active agent but there are agents in storage,
          // default to selecting the first one.
          if (!state.activeAgentId && state.agents.length > 0) {
            state.activeAgentId = state.agents[0].id;
          }
        }
      },
    }
  )
);
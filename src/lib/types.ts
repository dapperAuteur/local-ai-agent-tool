// File: /src/lib/types.ts
// ---
// This file defines the core data structures for our application's internal state,
// keeping them separate from the Ollama-specific API types.

/**
 * Represents a single message in the chat history.
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Represents a customizable AI agent persona.
 */
export interface Agent {
  id: string; // A unique identifier for the agent
  name: string;
  systemPrompt: string; // The instruction set for the agent
}

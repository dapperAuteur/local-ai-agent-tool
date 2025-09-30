import { Agent, ChatMessage } from "./types";

/**
 * Triggers a browser download for the given JSON data.
 * @param data The agent object to be downloaded.
 */
export function exportAgentAsJson(data: Agent): void {
  // Sanitize the agent name to create a valid filename
  const filename = `agent-${data.name.toLowerCase().replace(/\s+/g, '-')}.json`;
  
  // Create a JSON string from the agent data
  const jsonString = JSON.stringify(data, null, 2);
  
  // Create a Blob, which is a file-like object
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element to trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up the temporary element and URL
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Converts a chat history to a Markdown string and triggers a download.
 * @param agent The agent with whom the chat took place.
 * @param messages The array of chat messages.
 */
export function exportChatHistoryAsMarkdown(agent: Agent, messages: ChatMessage[]): void {
  // Sanitize the agent name for the filename
  const filename = `chat-with-${agent.name.toLowerCase().replace(/\s+/g, '-')}.md`;

  // Format the chat history into a Markdown string
  let markdownContent = `# Chat with ${agent.name}\n\n`;
  messages.forEach(message => {
    if (message.role === 'user' || message.role === 'assistant') {
      const role = message.role.charAt(0).toUpperCase() + message.role.slice(1);
      markdownContent += `**${role}:**\n${message.content}\n\n---\n\n`;
    }
  });

  const blob = new Blob([markdownContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
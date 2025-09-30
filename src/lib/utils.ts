import { Agent } from "./types";

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
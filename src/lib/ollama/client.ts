import {
  OllamaTagsResponseSchema,
  OllamaGenerateChatCompletionResponseSchema,
  OllamaModel,
} from './types';

/**
 * A client for interacting with the Ollama API.
 * This class is designed to be used on the client-side and communicates
 * with an Ollama server assumed to be running on localhost.
 */
class OllamaApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = 'http://127.0.0.1:11434') {
    // In a browser context, we can use the window's host and port
    // to dynamically construct the base URL, which is useful for Electron.
    if (typeof window !== 'undefined') {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}:11434`;
    } else {
        this.baseUrl = baseUrl;
    }
  }

  /**
   * Fetches the list of available models from the Ollama server.
   * Corresponds to the '/api/tags' endpoint.
   * @returns A promise that resolves to an array of OllamaModel objects.
   * @throws An error if the API call fails or the response is invalid.
   */
  public async listModels(): Promise<OllamaModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }
      const json = await response.json();
      
      // Validate the response against our Zod schema
      const parsed = OllamaTagsResponseSchema.safeParse(json);
      if (!parsed.success) {
        console.error('Invalid API response:', parsed.error);
        throw new Error('Invalid data structure received from Ollama API.');
      }
      
      return parsed.data.models;
    } catch (error) {
      console.error('Error in listModels:', error);
      throw error;
    }
  }

  /**
   * Generates a chat completion and streams the response.
   * Corresponds to the '/api/chat' endpoint.
   * @param model - The name of the model to use (e.g., 'llama3').
   * @param messages - An array of message objects for the chat history.
   * @param onStream - A callback function that will be called for each chunk of the response.
   * @throws An error if the API call fails.
   */
  public async generateChatCompletionStream(
    model: string,
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
    onStream: (chunk: { content: string; done: boolean }) => void
  ) {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
        }),
      });

      if (!response.body) {
        throw new Error('Response body is null.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          onStream({ content: '', done: true });
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Process all complete JSON objects in the buffer
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];
          if (line.trim() === '') continue;

          const parsed = OllamaGenerateChatCompletionResponseSchema.safeParse(JSON.parse(line));
          if (parsed.success) {
            onStream({ content: parsed.data.message.content, done: parsed.data.done });
          } else {
            console.warn('Skipping invalid chunk:', parsed.error);
          }
        }
        
        // Keep the last, possibly incomplete, line in the buffer
        buffer = lines[lines.length - 1];
      }
    } catch (error) {
      console.error('Error in generateChatCompletionStream:', error);
      throw error;
    }
  }
}

// Export a singleton instance of the client for use throughout the app.
export const ollamaClient = new OllamaApiClient();

'use client';

import { FC, useState, KeyboardEvent } from 'react';
import { SendHorizonal } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppStore } from '@/store/useAppStore';

const ChatInput: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const sendMessage = useAppStore((state) => state.sendMessage);
  const isStreaming = useAppStore((state) => state.isStreamingResponse);

  const handleSubmit = () => {
    if (inputValue.trim() && !isStreaming) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-700 bg-gray-900 p-4">
      <div className="relative">
        <TextareaAutosize
          className="w-full resize-none rounded-md border border-gray-600 bg-gray-800 p-4 pr-16 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
          placeholder={isStreaming ? "Assistant is thinking..." : "Type your message..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          maxRows={5}
        />
        <button
          onClick={handleSubmit}
          disabled={isStreaming || !inputValue.trim()}
          className="absolute bottom-2.5 right-2.5 rounded-md bg-indigo-600 p-2 text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
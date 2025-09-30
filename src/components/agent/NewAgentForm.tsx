'use client';

import { FC, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const NewAgentForm: FC = () => {
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const addAgent = useAppStore((state) => state.addAgent);
  const closeModal = useAppStore((state) => state.closeNewAgentModal);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        setSystemPrompt(fileContent);
      };
      reader.readAsText(file);
    }
  }, []);

  // Configure the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] }, // Only accept .txt files
    maxFiles: 1,
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && systemPrompt.trim()) {
      addAgent({ name, systemPrompt });
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="agent-name" className="mb-2 block text-sm font-medium text-gray-300">
          Agent Name
        </label>
        <input
          id="agent-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g., Senior TypeScript Developer"
          required
        />
      </div>
      <div>
        <label htmlFor="system-prompt" className="mb-2 block text-sm font-medium text-gray-300">
          System Prompt
        </label>
        <div
          {...getRootProps()}
          className={`mb-2 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-600 p-4 text-center transition-colors hover:border-indigo-500 ${isDragActive ? 'border-indigo-500 bg-gray-800' : ''}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mb-2 h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-400">
            {isDragActive
              ? "Drop the file here..."
              : "Drag & drop a .txt file here, or click to select"}
          </p>
        </div>
        <textarea
          id="system-prompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className="h-48 w-full resize-none rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="You are a helpful AI assistant that..."
          required
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-md border border-gray-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!name.trim() || !systemPrompt.trim()}
        >
          Create Agent
        </button>
      </div>
    </form>
  );
};

export default NewAgentForm;
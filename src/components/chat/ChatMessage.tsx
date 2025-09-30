/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, HTMLAttributes } from 'react';
import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChatMessage } from '@/lib/types';

// Create a strongly-typed custom component for code blocks
const CodeBlock: FC<HTMLAttributes<HTMLElement>> = ({ className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      style={vscDarkPlus as any} // Use 'as any' to bypass the complex style type issue
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const ChatMessageComponent: FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';

  // Define the custom components for ReactMarkdown
  const markdownComponents: Components = {
    code: CodeBlock,
  };

  return (
    <div className={clsx('flex items-start gap-4 p-4', { 'bg-gray-800/50': !isUser })}>
      <div
        className={clsx('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', {
          'bg-indigo-500': !isUser,
          'bg-gray-600': isUser,
        })}
      >
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      <div className="prose prose-invert prose-sm max-w-none flex-1">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessageComponent;
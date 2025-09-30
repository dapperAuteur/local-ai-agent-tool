import { FC } from 'react';
import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChatMessage } from '@/lib/types';

const ChatMessageComponent: FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';

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
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
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
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessageComponent;
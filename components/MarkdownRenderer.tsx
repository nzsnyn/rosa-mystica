'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          // Custom image component to use Next.js Image
          img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') return null;
            
            return (
              <span className="block my-8">
                <Image
                  src={src}
                  alt={alt || 'Gambar artikel'}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg object-cover w-full h-auto border"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
                {alt && alt !== 'Gambar' && (
                  <em className="block text-sm text-gray-500 text-center mt-3 italic font-medium">
                    {alt}
                  </em>
                )}
              </span>
            );
          },
          // Custom paragraph component
          p: ({ children }) => (
            <p className="mb-4 text-gray-700 leading-relaxed">
              {children}
            </p>
          ),
          // Custom heading components
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
              {children}
            </h3>
          ),
          // Custom list components
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-1">
              {children}
            </li>
          ),
          // Custom blockquote component
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic">
              {children}
            </blockquote>
          ),
          // Custom code component
          code: ({ children, className }) => {
            const isInline = !className;
            
            if (isInline) {
              return (
                <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              );
            }
            
            return (
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                <code className="text-sm text-gray-800">
                  {children}
                </code>
              </pre>
            );
          },
          // Custom link component
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

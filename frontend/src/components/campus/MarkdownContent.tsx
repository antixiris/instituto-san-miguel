import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Función para detectar y convertir URLs de YouTube en embeds
  const processContent = (text: string): string => {
    // Convertir URLs de YouTube en embeds HTML
    const youtubeRegex = /https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/g;

    return text.replace(youtubeRegex, (match, p1, p2, videoId) => {
      return `
<div class="youtube-embed">
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/${videoId}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>`;
    });
  };

  const processedContent = processContent(content);

  return (
    <div className="markdown-content prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Personalizar enlaces para que se abran en nueva pestaña
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 underline" />
          ),
          // Personalizar imágenes
          img: ({ node, ...props }) => (
            <img {...props} className="rounded-lg shadow-lg my-6 max-w-full h-auto" loading="lazy" />
          ),
          // Personalizar código inline
          code: ({ node, inline, ...props }) => (
            inline ? (
              <code {...props} className="bg-neutral-100 dark:bg-neutral-800 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded text-sm font-mono" />
            ) : (
              <code {...props} className="block bg-neutral-900 dark:bg-neutral-950 text-neutral-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono" />
            )
          ),
          // Personalizar bloques de código
          pre: ({ node, ...props }) => (
            <pre {...props} className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 p-4 rounded-lg overflow-x-auto my-4" />
          ),
          // Personalizar títulos
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-3xl font-bold text-neutral-900 dark:text-white mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-2xl font-bold text-neutral-900 dark:text-white mt-6 mb-3" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-xl font-semibold text-neutral-900 dark:text-white mt-5 mb-2" />
          ),
          // Personalizar listas
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc list-inside my-4 space-y-2 text-neutral-700 dark:text-neutral-300" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal list-inside my-4 space-y-2 text-neutral-700 dark:text-neutral-300" />
          ),
          // Personalizar párrafos
          p: ({ node, ...props }) => (
            <p {...props} className="my-4 text-neutral-700 dark:text-neutral-300 leading-relaxed" />
          ),
          // Personalizar blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote {...props} className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/10 pl-4 py-2 my-4 italic text-neutral-700 dark:text-neutral-300" />
          ),
          // Personalizar tablas
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table {...props} className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700" />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead {...props} className="bg-neutral-50 dark:bg-neutral-800" />
          ),
          th: ({ node, ...props }) => (
            <th {...props} className="px-4 py-2 text-left text-sm font-semibold text-neutral-900 dark:text-white" />
          ),
          td: ({ node, ...props }) => (
            <td {...props} className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700" />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>

      <style>{`
        .youtube-embed {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          max-width: 100%;
          margin: 2rem 0;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .youtube-embed iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}

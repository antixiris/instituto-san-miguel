import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft, Tag, Eye } from 'lucide-react';
import { articlesService } from '../../services/articles.service';

/**
 * ArticleDetailPage - Vista de artículo individual
 * Diseño tipo Medium con foco en lectura inmersiva
 */

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesService.getArticleBySlug(slug!),
    enabled: !!slug,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600 dark:text-neutral-400">Cargando artículo...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          No se pudo cargar el artículo
        </p>
        <Link
          to="/notebook"
          className="text-orange-600 dark:text-orange-500 hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Notebook
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header - Volver */}
      <div className="py-6 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container-narrow">
          <Link
            to="/notebook"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Volver al Notebook</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            {article.category && (
              <span
                className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-6"
                style={{
                  backgroundColor: article.category.color ? `${article.category.color}20` : undefined,
                  color: article.category.color || undefined,
                }}
              >
                {article.category.name}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 font-light">
                {article.subtitle}
              </p>
            )}

            {/* Meta información */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 pb-8 border-b border-neutral-200 dark:border-neutral-800">
              {/* Author */}
              <div className="flex items-center gap-2">
                {article.author.avatar ? (
                  <img
                    src={article.author.avatar}
                    alt={`${article.author.firstName} ${article.author.lastName}`}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-medium">
                    {article.author.firstName[0]}{article.author.lastName[0]}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-neutral-900 dark:text-white font-medium">
                    {article.author.firstName} {article.author.lastName}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedAt || article.createdAt)}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readingTime} min
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views} vistas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {article.coverImage && (
              <div className="my-12">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full rounded-xl"
                />
              </div>
            )}

            {/* Article Content - Typography optimizada para lectura */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                className="article-content leading-relaxed text-neutral-800 dark:text-neutral-200"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Footnotes */}
            {article.footnotes && article.footnotes.length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-orange-500 mb-6">
                  Notas
                </h3>
                <div className="space-y-3">
                  {article.footnotes.map((footnote) => (
                    <div key={footnote.id} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        {footnote.number}
                      </span>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {footnote.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {article.author.bio && (
              <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex gap-4">
                  {article.author.avatar ? (
                    <img
                      src={article.author.avatar}
                      alt={`${article.author.firstName} ${article.author.lastName}`}
                      className="w-16 h-16 rounded-full flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-lg font-medium flex-shrink-0">
                      {article.author.firstName[0]}{article.author.lastName[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-semibold text-orange-600 dark:text-orange-500 mb-2">
                      Sobre {article.author.firstName} {article.author.lastName}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </article>

      <style>{`
        .article-content h2 {
          @apply text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mt-12 mb-4;
        }
        .article-content h3 {
          @apply text-xl md:text-2xl font-semibold text-neutral-900 dark:text-orange-500 mt-8 mb-3;
        }
        .article-content h4 {
          @apply text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mt-6 mb-2;
        }
        .article-content p {
          @apply text-lg leading-relaxed mb-6 text-neutral-700 dark:text-neutral-300;
        }
        .article-content a {
          @apply text-orange-600 dark:text-orange-500 hover:underline;
        }
        .article-content ul, .article-content ol {
          @apply my-6 ml-6 space-y-2;
        }
        .article-content li {
          @apply text-lg text-neutral-700 dark:text-neutral-300;
        }
        .article-content code {
          @apply bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-sm font-mono;
        }
        .article-content pre {
          @apply bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg my-6 overflow-x-auto;
        }
        .article-content pre code {
          @apply bg-transparent p-0;
        }
        .article-content blockquote {
          @apply border-l-4 border-orange-600 dark:border-orange-500 pl-6 my-6 italic text-neutral-600 dark:text-neutral-400;
        }
        .article-content img {
          @apply rounded-lg my-8 w-full;
        }
      `}</style>
    </div>
  );
}

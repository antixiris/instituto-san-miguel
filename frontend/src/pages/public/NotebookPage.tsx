import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Clock, Calendar, Tag, TrendingUp } from 'lucide-react';
import { articlesService } from '../../services/articles.service';
import Button from '../../components/ui/Button';

/**
 * NotebookPage - Listado de artículos de investigación
 * Diseño minimalista inspirado en Medium
 */

export default function NotebookPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  // Fetch articles
  const { data: articlesData, isLoading } = useQuery({
    queryKey: ['articles', { category: selectedCategory, page }],
    queryFn: () => articlesService.getArticles({
      category: selectedCategory,
      page,
      limit: 12,
    }),
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['article-categories'],
    queryFn: () => articlesService.getCategories(),
  });

  // Fetch featured articles
  const { data: featuredData } = useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: () => articlesService.getArticles({
      featured: true,
      limit: 3,
    }),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-4">
              Notebook
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Artículos, investigaciones y estudios sobre computación basada en IA y Procesamiento del Lenguaje Natural (PLN)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredData && featuredData.articles.length > 0 && (
        <section className="section bg-neutral-50 dark:bg-neutral-900">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
                Artículos destacados
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredData.articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/notebook/${article.slug}`}>
                      <div className="card-hover h-full group">
                        {article.coverImage && (
                          <div className="relative h-48 overflow-hidden rounded-t-xl">
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="card-body">
                          {article.category && (
                            <span
                              className="inline-block px-2 py-1 text-xs font-medium rounded mb-3"
                              style={{
                                backgroundColor: article.category.color ? `${article.category.color}20` : undefined,
                                color: article.category.color || undefined,
                              }}
                            >
                              {article.category.name}
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-orange-500 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readingTime} min
                            </span>
                            <span>·</span>
                            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      {categories && categories.length > 0 && (
        <section className="py-6 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-minimal pb-2">
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    !selectedCategory
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  Todos
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="section bg-white dark:bg-neutral-950">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-neutral-600 dark:text-neutral-400">Cargando artículos...</p>
              </div>
            ) : articlesData && articlesData.articles.length > 0 ? (
              <>
                <div className="space-y-8">
                  {articlesData.articles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link to={`/notebook/${article.slug}`}>
                        <div className="group">
                          <div className="flex gap-6">
                            {/* Content */}
                            <div className="flex-1">
                              {/* Author */}
                              <div className="flex items-center gap-2 mb-3">
                                {article.author.avatar ? (
                                  <img
                                    src={article.author.avatar}
                                    alt={`${article.author.firstName} ${article.author.lastName}`}
                                    className="w-6 h-6 rounded-full"
                                  />
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-medium">
                                    {article.author.firstName[0]}{article.author.lastName[0]}
                                  </div>
                                )}
                                <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                                  {article.author.firstName} {article.author.lastName}
                                </span>
                              </div>

                              {/* Title */}
                              <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                                {article.title}
                              </h2>

                              {/* Subtitle */}
                              {article.subtitle && (
                                <p className="text-base text-neutral-600 dark:text-neutral-400 mb-3">
                                  {article.subtitle}
                                </p>
                              )}

                              {/* Excerpt */}
                              <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                                {article.excerpt}
                              </p>

                              {/* Meta */}
                              <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(article.publishedAt || article.createdAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {article.readingTime} min de lectura
                                </span>
                                {article.category && (
                                  <span className="flex items-center gap-1">
                                    <Tag className="w-4 h-4" />
                                    {article.category.name}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Thumbnail */}
                            {article.coverImage && (
                              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                                <img
                                  src={article.coverImage}
                                  alt={article.title}
                                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>

                      {index < articlesData.articles.length - 1 && (
                        <div className="divider mt-8" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {articlesData.pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                      Anterior
                    </Button>
                    <span className="flex items-center px-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Página {page} de {articlesData.pagination.totalPages}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={page === articlesData.pagination.totalPages}
                      onClick={() => setPage(p => Math.min(articlesData.pagination.totalPages, p + 1))}
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-600 dark:text-neutral-400">
                  No hay artículos disponibles en este momento.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

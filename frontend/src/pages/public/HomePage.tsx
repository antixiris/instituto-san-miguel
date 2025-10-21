import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Lightbulb, Code, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../../services/courses.service';
import { articlesService } from '../../services/articles.service';
import { FadeInWords, SemanticShift } from '../../components/TokenAnimation';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

/**
 * HomePage - Diseño Minimalista Conceptual
 * Inspirado en la interfaz de Claude
 * "La palabra como unidad, el lenguaje como sistema, la semántica como dinámica"
 */

export default function HomePage() {
  // Fetch featured courses
  const { data: featuredCourses } = useQuery({
    queryKey: ['courses', 'featured'],
    queryFn: () => coursesService.getCourses({ featured: true, limit: 3 }),
  });

  // Fetch recent articles
  const { data: recentArticles } = useQuery({
    queryKey: ['articles', 'recent'],
    queryFn: () => articlesService.getArticles({ limit: 3 }),
  });

  return (
    <div className="pt-16">
      {/* === HERO - Declaración Conceptual === */}
      <section className="section-lg bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Pequeña etiqueta */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
              Instituto de Investigación en PLN
            </div>

            {/* Titular principal con cambio semántico */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-white mb-6 leading-tight">
              <SemanticShift
                words={[
                  'La investigación destruye la incertidumbre.',
                  'El conocimiento destruye la ignorancia.',
                  'La ciencia destruye la confusión.',
                  'La tecnología destruye nuestros límites.'
                ]}
                className="text-neutral-900 dark:text-white"
                highlightWord={true}
              />
            </h1>

            {/* Subtítulo con animación de tokens */}
            <div className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
              <FadeInWords
                text="Tres fundamentos: la palabra como unidad, el lenguaje como sistema, la semántica como dinámica"
                stagger={40}
              />
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/campus">
                <Button variant="primary" size="lg">
                  Explorar Campus
                </Button>
              </Link>
              <Link to="/notebook">
                <Button variant="secondary" size="lg">
                  Ver Notebook
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === PILARES CONCEPTUALES - Tarjetas Minimalistas === */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-4">
              Tres pilares
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Educación, investigación y aplicación trabajando como un solo sistema
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Campus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
            >
              <Link to="/campus">
                <div className="card-hover h-full group">
                  <div className="card-body">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 dark:bg-neutral-700 flex items-center justify-center mb-4 group-hover:bg-orange-600 dark:group-hover:bg-orange-600 transition-colors duration-200">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-500 mb-2">Campus</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      Programas formativos de especialización profesional y nivel experto en IA basada en Procesamiento del Lenguaje Natural
                    </p>
                    <div className="flex items-center text-sm font-medium text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                      Saber más
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Notebook - Investigación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link to="/notebook">
                <div className="card-hover h-full group">
                  <div className="card-body">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 dark:bg-neutral-700 flex items-center justify-center mb-4 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-600 transition-colors duration-200">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-500 mb-2">Notebook</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      Artículos, papers y conferencias de investigación en PLN
                    </p>
                    <div className="flex items-center text-sm font-medium text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-500 transition-colors">
                      Ver publicaciones
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Soluciones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="card-hover h-full group cursor-pointer">
                <div className="card-body">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 dark:bg-neutral-700 flex items-center justify-center mb-4 group-hover:bg-neutral-700 dark:group-hover:bg-neutral-600 transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-500 mb-2">Soluciones</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    Consultoría y desarrollo de IA personalizado para aplicaciones empresariales
                  </p>
                  <div className="flex items-center text-sm font-medium text-neutral-900 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                    Próximamente
                    <ArrowRight className="w-4 h-4 ml-1 opacity-50" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === PUBLICACIONES RECIENTES - Tarjetas Minimalistas === */}
      <section className="section bg-white dark:bg-neutral-950">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Publicaciones recientes
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Últimas contribuciones de investigación</p>
              </div>
              <Link to="/notebook" className="hidden md:block">
                <Button variant="ghost" size="sm">
                  Ver todas
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentArticles && recentArticles.articles.length > 0 ? (
                recentArticles.articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link to={`/notebook/${article.slug}`}>
                      <div className="card-hover group cursor-pointer">
                        <div className="p-6 flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-orange-600 dark:text-orange-500 mb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {article.category?.name || 'Investigación'} · {article.author.firstName} {article.author.lastName}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-orange-600 dark:text-orange-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Próximamente encontrarás artículos de investigación aquí
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === SECCIÓN I+D - Áreas de Investigación === */}
      <section className="section bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-4">
                Investigación y Desarrollo
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Avanzando el estado del arte en Procesamiento del Lenguaje Natural a través de investigación fundamental y aplicada
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Área 1: Modelos de Lenguaje */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="card-hover group"
              >
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-500 mb-2">
                    Modelos de Lenguaje
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Desarrollo de arquitecturas transformer avanzadas y técnicas de preentrenamiento para español y lenguas ibéricas
                  </p>
                </div>
              </motion.div>

              {/* Área 2: Semántica Computacional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="card-hover group"
              >
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-500 mb-2">
                    Semántica Computacional
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Investigación en representaciones semánticas, embeddings contextuales y comprensión profunda del lenguaje
                  </p>
                </div>
              </motion.div>

              {/* Área 3: IA Ética y Responsable */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="card-hover group"
              >
                <div className="card-body">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-500 mb-2">
                    IA Ética
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Mitigación de sesgos, interpretabilidad de modelos y desarrollo responsable de sistemas de lenguaje
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CTA to Research */}
            <div className="mt-10 text-center">
              <Link to="/notebook">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Estado del Arte: IA y PLN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === PROGRAMAS - Si están disponibles === */}
      {featuredCourses?.courses && featuredCourses.courses.length > 0 && (
        <section className="section bg-white dark:bg-neutral-950">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Programas actuales
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Formación especializada en PLN</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {featuredCourses.courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/cursos/${course.slug}`}>
                      <div className="card-hover h-full group">
                        {/* Imagen */}
                        {course.thumbnail && (
                          <div className="relative h-40 overflow-hidden rounded-t-xl">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <div className="card-body">
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{course.level}</div>
                          <h3 className="text-base font-semibold text-orange-600 dark:text-orange-500 mb-2 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                            {course.shortDescription || course.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500 dark:text-neutral-400">
                              {course.duration ? `${course.duration}h` : 'A tu ritmo'}
                            </span>
                            {course.price === 0 ? (
                              <span className="font-medium text-green-600 dark:text-green-500">Gratis</span>
                            ) : (
                              <span className="font-medium text-neutral-900 dark:text-white">${course.price}</span>
                            )}
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

      {/* === CTA FINAL - Minimalista === */}
      <section className="section-lg bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-4">
              Únete a la comunidad
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
              Comienza tu camino en la investigación y educación del Procesamiento del Lenguaje Natural
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/registro">
                <Button variant="primary" size="lg">
                  Empezar ahora
                </Button>
              </Link>
              <Link to="/campus">
                <Button variant="secondary" size="lg">
                  Explorar programas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

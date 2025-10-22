import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../../services/courses.service';
import { Search, Filter, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['courses', page, search],
    queryFn: () => coursesService.getCourses({ page, limit: 12, search }),
  });

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen">
      {/* Hero Section Mejorado */}
      <div className="relative bg-gradient-to-br from-orange-600 to-orange-700 text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background pattern sutil */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-balance">Explora Nuestros Cursos</h1>
            <p className="text-xl md:text-2xl text-orange-50 leading-relaxed">
              Encuentra el curso perfecto para impulsar tu carrera en tecnología
            </p>
          </div>
        </div>

        {/* Gradiente de transición sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-neutral-950" />
      </div>

      {/* Content Section con mejor spacing */}
      <div className="relative -mt-12 pb-16">
        <div className="container-custom">
          {/* Search Card - Elevated above content */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="course-search" className="sr-only">Buscar cursos</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-5 h-5" />
                  <input
                    id="course-search"
                    type="text"
                    placeholder="Buscar por nombre, tecnología o instructor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input pl-12 pr-4 w-full h-12 text-base border-neutral-300 dark:border-neutral-700
                               focus:border-orange-500 focus:ring-orange-500 dark:bg-neutral-800 dark:text-white
                               transition-all duration-200"
                  />
                </div>
              </div>
              <button
                className="btn btn-secondary h-12 px-6 whitespace-nowrap"
                aria-label="Abrir panel de filtros"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  {/* Image skeleton con gradiente sutil */}
                  <div className="h-48 bg-gradient-to-br from-neutral-100 to-neutral-200
                                  dark:from-neutral-800 dark:to-neutral-900 relative overflow-hidden">
                    {/* Shimmer effect - luz que pasa */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]
                                    bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  <div className="card-body space-y-4">
                    {/* Badge skeleton */}
                    <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />

                    {/* Title skeleton - 2 líneas */}
                    <div className="space-y-2">
                      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
                      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
                    </div>

                    {/* Description skeleton - 3 líneas */}
                    <div className="space-y-2 pt-2">
                      <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-full" />
                      <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-full" />
                      <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-2/3" />
                    </div>

                    {/* Meta skeleton */}
                    <div className="flex gap-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="h-4 w-16 bg-neutral-100 dark:bg-neutral-900 rounded" />
                      <div className="h-4 w-24 bg-neutral-100 dark:bg-neutral-900 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {data?.courses?.map((course) => (
                <Link
                  key={course.id}
                  to={`/cursos/${course.slug}`}
                  className="group card hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-900
                             transition-all duration-300 overflow-hidden focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                >
                  {/* Image/Gradient Header con overlay sutil */}
                  <div className="relative h-48 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700
                                  overflow-hidden">
                    {/* Pattern overlay para textura */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                      }}
                    />

                    {/* Badge de nivel en overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                     bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white
                                     backdrop-blur-sm border border-white/20">
                        {course.level}
                      </span>
                    </div>

                    {/* Precio en overlay superior derecha */}
                    {course.price !== undefined && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold
                                       bg-white dark:bg-neutral-900 text-orange-600 dark:text-orange-500">
                          {course.price === 0 ? 'GRATIS' : `$${course.price}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body con mejor spacing */}
                  <div className="card-body space-y-3">
                    {/* Título con hover effect */}
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white
                                   group-hover:text-orange-600 dark:group-hover:text-orange-500
                                   transition-colors duration-200 line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Descripción con mejor contraste */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
                      {course.shortDescription}
                    </p>

                    {/* Meta información */}
                    <div className="flex items-center gap-4 pt-3 mt-auto text-xs text-neutral-500 dark:text-neutral-500
                                    border-t border-neutral-100 dark:border-neutral-800">
                      {course.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}h</span>
                        </div>
                      )}
                      {course._count?.enrollments !== undefined && (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>{(course._count.enrollments || 0) + 244} alumnos</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Paginación si hay más de una página */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    page === pageNum
                      ? 'bg-orange-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

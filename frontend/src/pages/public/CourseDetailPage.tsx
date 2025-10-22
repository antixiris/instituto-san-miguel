import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../../services/courses.service';
import { Clock, Users, Award, CheckCircle, BookOpen, ChevronDown } from 'lucide-react';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: courseData, isLoading } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesService.getCourseBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-950 min-h-screen">
        {/* Hero Skeleton */}
        <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 text-white py-16 md:py-24 lg:py-32">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-6 animate-pulse">
                <div className="h-12 bg-neutral-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-neutral-700 rounded w-full"></div>
                  <div className="h-6 bg-neutral-700 rounded w-2/3"></div>
                </div>
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="h-5 bg-neutral-700 rounded w-32"></div>
                  <div className="h-5 bg-neutral-700 rounded w-32"></div>
                  <div className="h-5 bg-neutral-700 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container-custom py-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8 animate-pulse">
              <div className="space-y-4">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-48"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-full"></div>
                  <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-full"></div>
                  <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="bg-white dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="container-custom py-24 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-neutral-400 dark:text-neutral-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Curso no encontrado
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              El curso que buscas no existe o ha sido eliminado.
            </p>
            <Link
              to="/cursos"
              className="btn btn-primary inline-flex"
            >
              Ver todos los cursos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Parsear JSON strings
  const course = {
    ...courseData,
    learningGoals: courseData.learningGoals
      ? (typeof courseData.learningGoals === 'string'
        ? JSON.parse(courseData.learningGoals)
        : courseData.learningGoals)
      : [],
    prerequisites: courseData.prerequisites
      ? (typeof courseData.prerequisites === 'string'
        ? JSON.parse(courseData.prerequisites)
        : courseData.prerequisites)
      : []
  };

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen">
      {/* Hero Section Mejorado */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background pattern sutil */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {/* Badge de nivel */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                               bg-white/10 text-white backdrop-blur-sm border border-white/20">
                  De principiante a experto
                </span>
              </div>

              <h1 className="mb-6 text-balance text-4xl md:text-5xl lg:text-6xl font-bold leading-tight
                           text-white lg:text-orange-500">
                {course.title}
              </h1>

              <p className="text-xl md:text-2xl text-neutral-100 leading-relaxed mb-8 font-medium">
                {course.shortDescription}
              </p>

              {/* Meta información con mejor diseño */}
              <div className="flex flex-wrap gap-6 text-base">
                {course.duration && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-neutral-300 text-xs">Duración</div>
                      <div className="font-semibold text-white">{course.duration}h de contenido</div>
                    </div>
                  </div>
                )}
                {course._count?.enrollments !== undefined && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-neutral-300 text-xs">Alumnos</div>
                      <div className="font-semibold text-white">{(course._count.enrollments || 0) + 244}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-neutral-300 text-xs">Certificado</div>
                    <div className="font-semibold text-white">Incluido</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Card - Sticky en desktop */}
            <div className="lg:relative">
              <div className="lg:sticky lg:top-8">
                <div className="card overflow-hidden shadow-2xl border-neutral-200 dark:border-neutral-800">
                  <div className="card-body space-y-6">
                    {/* Precio destacado */}
                    <div className="text-center py-4 border-b border-neutral-100 dark:border-neutral-800">
                      <div className="text-5xl font-bold text-orange-600 dark:text-orange-500 mb-2">
                        {course.price === 0 ? 'GRATIS' : `€${course.price}`}
                      </div>
                      {course.price === 0 ? (
                        <p className="text-base text-neutral-600">
                          Acceso completo sin costo
                        </p>
                      ) : (
                        <p className="text-base text-neutral-600">
                          Pago único • Acceso de por vida
                        </p>
                      )}
                    </div>

                    {/* CTA Principal */}
                    {course.isEnrolled ? (
                      <Link
                        to={`/campus/curso/${course.id}`}
                        className="btn btn-primary w-full h-14 text-lg font-semibold
                                 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Continuar Curso
                      </Link>
                    ) : (
                      <Link
                        to="/registro"
                        className="btn btn-primary w-full h-14 text-lg font-semibold
                                 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Inscribirme Ahora
                      </Link>
                    )}

                    {/* Características incluidas */}
                    <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                        Este curso incluye:
                      </p>
                      <ul className="space-y-2 text-base text-neutral-700">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Acceso de por vida</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Certificado de finalización</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{course.modules?.length || 0} módulos completos</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Ejercicios prácticos</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradiente de transición */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-neutral-950" />
      </div>

      {/* Content Section con mejor spacing */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Descripción */}
            <section>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                Descripción
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {course.description}
                </p>
              </div>
            </section>

            {/* Learning Goals */}
            {course.learningGoals && course.learningGoals.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                  ¿Qué aprenderás?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.learningGoals.map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900
                               border border-neutral-200 dark:border-neutral-800
                               hover:border-orange-200 dark:hover:border-orange-900 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-base text-neutral-700 dark:text-neutral-300">{goal}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contenido del Curso - Accordions */}
            <section>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                Contenido del Curso
              </h2>
              <div className="space-y-3">
                {course.modules?.map((module, moduleIndex) => (
                  <details
                    key={module.id}
                    className="group card overflow-hidden hover:shadow-lg transition-all duration-300"
                    open={moduleIndex === 0}
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer
                                      list-none select-none focus:outline-none focus:ring-2
                                      focus:ring-orange-600 focus:ring-offset-2 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full
                                         bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500
                                         text-sm font-bold">
                            {moduleIndex + 1}
                          </span>
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                            {module.title}
                          </h3>
                        </div>
                        <p className="text-base text-neutral-600 ml-11">
                          {module.description}
                        </p>
                        {module.lessons && (
                          <p className="text-sm text-neutral-500 mt-2 ml-11">
                            {module.lessons.length} lecciones
                          </p>
                        )}
                      </div>
                      <ChevronDown className="w-6 h-6 text-neutral-400 dark:text-neutral-500
                                            group-open:rotate-180 transition-transform duration-300
                                            flex-shrink-0 ml-4" />
                    </summary>

                    {/* Lessons list */}
                    {module.lessons && module.lessons.length > 0 && (
                      <div className="px-6 pb-6 space-y-2 border-t border-neutral-100 dark:border-neutral-800 pt-4">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 py-3 px-4 rounded-lg
                                     hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                          >
                            <span className="text-sm font-medium text-neutral-500 w-8">
                              {lessonIndex + 1}.
                            </span>
                            <span className="text-base text-neutral-700">
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Instructor Card */}
            {course.instructor && (
              <div className="card card-body sticky top-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                  Profesor
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  {course.instructor.avatar ? (
                    <img
                      src={course.instructor.avatar}
                      alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                      className="w-20 h-20 rounded-full object-cover shadow-lg flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-700
                                  flex items-center justify-center text-white text-2xl font-bold
                                  shadow-lg flex-shrink-0">
                      {course.instructor.firstName[0]}{course.instructor.lastName[0]}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-lg text-neutral-900">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </div>
                    <div className="text-base text-neutral-600">
                      Director
                    </div>
                  </div>
                </div>
                {course.instructor.bio && (
                  <p className="text-base text-neutral-700 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

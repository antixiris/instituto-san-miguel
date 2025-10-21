import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../../services/courses.service';
import { Clock, Users, Award, CheckCircle } from 'lucide-react';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesService.getCourseBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return <div className="container-custom py-12">Cargando...</div>;
  }

  if (!course) {
    return <div className="container-custom py-12">Curso no encontrado</div>;
  }

  return (
    <div>
      <div className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.shortDescription}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {course.duration}h de contenido
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {course._count?.enrollments} estudiantes
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Certificado incluido
                </div>
              </div>
            </div>
            <div>
              <div className="card">
                <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500"></div>
                <div className="card-body">
                  <div className="text-3xl font-bold mb-4">
                    {course.price === 0 ? 'GRATIS' : `$${course.price}`}
                  </div>
                  {course.isEnrolled ? (
                    <Link to={`/campus/curso/${course.id}`} className="btn btn-primary w-full">
                      Continuar Curso
                    </Link>
                  ) : (
                    <Link to="/registro" className="btn btn-primary w-full">
                      Inscribirme Ahora
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="mb-4">Descripción</h2>
              <p className="text-gray-700">{course.description}</p>
            </section>

            {course.learningGoals && course.learningGoals.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-4">¿Qué aprenderás?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.learningGoals.map((goal, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="mb-4">Contenido del Curso</h2>
              <div className="space-y-4">
                {course.modules?.map((module) => (
                  <div key={module.id} className="card">
                    <div className="card-body">
                      <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                      <p className="text-gray-600 text-sm">{module.description}</p>
                      <div className="mt-4 space-y-2">
                        {module.lessons?.map((lesson) => (
                          <div key={lesson.id} className="flex items-center text-sm">
                            <span className="text-gray-600">{lesson.title}</span>
                            {lesson.isFree && (
                              <span className="ml-2 badge badge-success">Gratis</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            {course.instructor && (
              <div className="card card-body">
                <h3 className="font-semibold mb-4">Instructor</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-xl font-bold">
                    {course.instructor.firstName[0]}{course.instructor.lastName[0]}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </div>
                  </div>
                </div>
                {course.instructor.bio && (
                  <p className="text-sm text-gray-600">{course.instructor.bio}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

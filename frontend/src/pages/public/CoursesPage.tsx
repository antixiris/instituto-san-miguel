import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../../services/courses.service';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['courses', page, search],
    queryFn: () => coursesService.getCourses({ page, limit: 12, search }),
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <h1 className="mb-4">Explora Nuestros Cursos</h1>
          <p className="text-xl text-primary-100">Encuentra el curso perfecto para ti</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <button className="btn btn-outline">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </button>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card">
                <div className="h-48 skeleton"></div>
                <div className="card-body space-y-3">
                  <div className="h-4 skeleton w-1/4"></div>
                  <div className="h-6 skeleton w-3/4"></div>
                  <div className="h-4 skeleton w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.courses?.map((course) => (
              <Link
                key={course.id}
                to={`/cursos/${course.slug}`}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500"></div>
                <div className="card-body">
                  <span className="badge badge-primary">{course.level}</span>
                  <h3 className="text-xl mt-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{course.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

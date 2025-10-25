// Gestión de Cursos (Admin)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, BookOpen, Users, Clock, CheckCircle, Edit2, Trash2, MoreVertical, FolderOpen } from 'lucide-react';
import DataTable from '../../../components/campus/DataTable';
import StatusBadge from '../../../components/campus/StatusBadge';
import CourseFormModal from '../../../components/campus/CourseFormModal';
import ConfirmDialog from '../../../components/campus/ConfirmDialog';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  published: boolean;
  featured: boolean;
  price: number;
  duration?: number;
  categoryId?: string;
  instructor: {
    firstName: string;
    lastName: string;
  };
  category?: {
    id: string;
    name: string;
  };
  _count: {
    enrollments: number;
    modules: number;
  };
  createdAt: string;
}

export default function CoursesManagement() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [deletingCourse, setDeletingCourse] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setCourses(data.data.courses || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (formData: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        await fetchCourses();
      } else {
        alert(data.error || 'Error al crear el curso');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error al crear el curso');
    }
  };

  const handleUpdateCourse = async (formData: any) => {
    if (!selectedCourse) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/courses/${selectedCourse.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        await fetchCourses();
      } else {
        alert(data.error || 'Error al actualizar el curso');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Error al actualizar el curso');
    }
  };

  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;

    setDeletingCourse(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/courses/${selectedCourse.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        await fetchCourses();
        setIsDeleteDialogOpen(false);
        setSelectedCourse(null);
      } else {
        alert(data.error || 'Error al eliminar el curso');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error al eliminar el curso');
    } finally {
      setDeletingCourse(false);
    }
  };

  const openCreateModal = () => {
    setFormMode('create');
    setSelectedCourse(null);
    setIsFormOpen(true);
  };

  const openEditModal = (course: Course) => {
    setFormMode('edit');
    setSelectedCourse(course);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const levelLabels = {
    BEGINNER: 'Principiante',
    INTERMEDIATE: 'Intermedio',
    ADVANCED: 'Avanzado',
    EXPERT: 'Experto',
  };

  const columns = [
    {
      key: 'title',
      label: 'Curso',
      render: (course: Course) => (
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {course.title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {course.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'instructor',
      label: 'Instructor',
      render: (course: Course) => (
        <div className="text-sm">
          {course.instructor.firstName} {course.instructor.lastName}
        </div>
      ),
    },
    {
      key: 'level',
      label: 'Nivel',
      render: (course: Course) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {levelLabels[course.level]}
        </span>
      ),
    },
    {
      key: 'category',
      label: 'Categoría',
      render: (course: Course) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {course.category?.name || '-'}
        </span>
      ),
    },
    {
      key: 'enrollments',
      label: 'Estudiantes',
      render: (course: Course) => (
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <Users className="w-4 h-4" />
          {course._count.enrollments}
        </div>
      ),
    },
    {
      key: 'modules',
      label: 'Módulos',
      render: (course: Course) => (
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <BookOpen className="w-4 h-4" />
          {course._count.modules}
        </div>
      ),
    },
    {
      key: 'duration',
      label: 'Duración',
      render: (course: Course) => (
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <Clock className="w-4 h-4" />
          {course.duration ? `${course.duration}h` : '-'}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (course: Course) => (
        <div className="flex flex-col gap-1">
          {course.published ? (
            <StatusBadge variant="success" text="Publicado" />
          ) : (
            <StatusBadge variant="warning" text="Borrador" />
          )}
          {course.featured && (
            <StatusBadge variant="info" text="Destacado" size="sm" />
          )}
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Precio',
      render: (course: Course) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {course.price === 0 ? 'Gratis' : `€${course.price}`}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Acciones',
      className: 'text-right',
      render: (course: Course) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/campus/admin/cursos/${course.id}/contenidos`);
            }}
            className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
            title="Gestionar contenidos"
          >
            <FolderOpen className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(course);
            }}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Editar curso"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openDeleteDialog(course);
            }}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Eliminar curso"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.slug.toLowerCase().includes(search.toLowerCase()) ||
    `${course.instructor.firstName} ${course.instructor.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gestión de Cursos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Administra todos los cursos de la plataforma
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Curso
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Cursos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Publicados</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {courses.filter(c => c.published).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Borradores</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {courses.filter(c => !c.published).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Estudiantes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {courses.reduce((sum, c) => sum + c._count.enrollments, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={filteredCourses}
        columns={columns}
        loading={loading}
        emptyMessage="No se encontraron cursos"
      />

      {/* Course Form Modal */}
      <CourseFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCourse(null);
        }}
        onSubmit={formMode === 'create' ? handleCreateCourse : handleUpdateCourse}
        initialData={selectedCourse || undefined}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedCourse(null);
        }}
        onConfirm={handleDeleteCourse}
        title="Eliminar Curso"
        message={`¿Estás seguro de que deseas eliminar el curso "${selectedCourse?.title}"? Esta acción no se puede deshacer y eliminará todos los módulos, lecciones y progreso de estudiantes asociados.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        loading={deletingCourse}
      />
    </div>
  );
}

// Gestión de Contenidos del Curso
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  Video,
  FileText,
  CheckSquare,
  Code,
  FileDown,
  GripVertical,
} from 'lucide-react';
import Modal from '../../../components/campus/Modal';
import ConfirmDialog from '../../../components/campus/ConfirmDialog';
import StatusBadge from '../../../components/campus/StatusBadge';
import ModuleFormModal from '../../../components/campus/ModuleFormModal';
import LessonFormModal from '../../../components/campus/LessonFormModal';
import { useAuthStore } from '../../../store/authStore';

interface Lesson {
  id: string;
  title: string;
  type: 'VIDEO' | 'TEXT' | 'QUIZ' | 'EXERCISE' | 'RESOURCE';
  order: number;
  isPublished: boolean;
  isFree: boolean;
  videoDuration?: number;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  isPublished: boolean;
  lessons: Lesson[];
  _count: {
    lessons: number;
  };
}

interface Course {
  id: string;
  title: string;
  slug: string;
}

export default function CourseContentManagement() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // Modal states
  const [isModuleFormOpen, setIsModuleFormOpen] = useState(false);
  const [isLessonFormOpen, setIsLessonFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'module' | 'lesson'; id: string; title: string } | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
      fetchModules();
    }
  }, [courseId]);

  // Helper para manejar errores de autenticación
  const handleAuthError = (response: Response) => {
    if (response.status === 401) {
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      logout();
      navigate('/');
      return true;
    }
    return false;
  };

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (handleAuthError(response)) return;

      const data = await response.json();
      if (data.success) {
        setCourse(data.data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const fetchModules = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/courses/${courseId}/modules`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (handleAuthError(response)) {
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setModules(data.data || []);
      } else {
        console.error('Error loading modules:', data.error);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleDeleteModule = async () => {
    if (!deleteTarget || deleteTarget.type !== 'module') return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/modules/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (handleAuthError(response)) return;

      const data = await response.json();
      if (data.success) {
        await fetchModules();
        setIsDeleteDialogOpen(false);
        setDeleteTarget(null);
      } else {
        alert(data.error || 'Error al eliminar el módulo');
      }
    } catch (error) {
      console.error('Error deleting module:', error);
      alert('Error al eliminar el módulo');
    }
  };

  const handleDeleteLesson = async () => {
    if (!deleteTarget || deleteTarget.type !== 'lesson') return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/lessons/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (handleAuthError(response)) return;

      const data = await response.json();
      if (data.success) {
        await fetchModules();
        setIsDeleteDialogOpen(false);
        setDeleteTarget(null);
      } else {
        alert(data.error || 'Error al eliminar la lección');
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Error al eliminar la lección');
    }
  };

  const openDeleteDialog = (type: 'module' | 'lesson', id: string, title: string) => {
    setDeleteTarget({ type, id, title });
    setIsDeleteDialogOpen(true);
  };

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'VIDEO':
        return <Video className="w-4 h-4" />;
      case 'TEXT':
        return <FileText className="w-4 h-4" />;
      case 'QUIZ':
        return <CheckSquare className="w-4 h-4" />;
      case 'EXERCISE':
        return <Code className="w-4 h-4" />;
      case 'RESOURCE':
        return <FileDown className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getLessonTypeLabel = (type: Lesson['type']) => {
    const labels = {
      VIDEO: 'Video',
      TEXT: 'Texto',
      QUIZ: 'Cuestionario',
      EXERCISE: 'Ejercicio',
      RESOURCE: 'Recurso',
    };
    return labels[type];
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/campus/admin/cursos')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a Cursos
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gestión de Contenidos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {course?.title || 'Cargando...'}
        </p>
      </div>

      {/* Add Module Button */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Módulos del Curso
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {modules.length} {modules.length === 1 ? 'módulo' : 'módulos'}
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedModule(null);
            setIsModuleFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Módulo
        </button>
      </div>

      {/* Modules List */}
      {modules.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-12 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            No hay módulos creados. Comienza agregando el primer módulo del curso.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module) => {
            const isExpanded = expandedModules.has(module.id);
            return (
              <div
                key={module.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden"
              >
                {/* Module Header */}
                <div className="p-4 flex items-center gap-4">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Módulo {module.order}: {module.title}
                      </h3>
                      {module.isPublished ? (
                        <StatusBadge variant="success" text="Publicado" size="sm" />
                      ) : (
                        <StatusBadge variant="warning" text="Borrador" size="sm" />
                      )}
                    </div>
                    {module.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {module.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {module._count.lessons} {module._count.lessons === 1 ? 'lección' : 'lecciones'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedModule(module);
                        setIsModuleFormOpen(true);
                      }}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Editar módulo"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteDialog('module', module.id, module.title)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Eliminar módulo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lessons List */}
                {isExpanded && (
                  <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
                    <div className="mb-3 flex justify-between items-center">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Lecciones
                      </h4>
                      <button
                        onClick={() => {
                          setSelectedModule(module);
                          setSelectedLesson(null);
                          setIsLessonFormOpen(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Nueva Lección
                      </button>
                    </div>

                    {module.lessons.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-500 text-center py-4">
                        No hay lecciones en este módulo
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {module.lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800"
                          >
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              {getLessonIcon(lesson.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {index + 1}. {lesson.title}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  ({getLessonTypeLabel(lesson.type)})
                                </span>
                                {lesson.isFree && (
                                  <StatusBadge variant="info" text="Gratis" size="sm" />
                                )}
                                {lesson.isPublished ? (
                                  <StatusBadge variant="success" text="Publicado" size="sm" />
                                ) : (
                                  <StatusBadge variant="warning" text="Borrador" size="sm" />
                                )}
                              </div>
                              {lesson.videoDuration && (
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {Math.floor(lesson.videoDuration / 60)}:{String(lesson.videoDuration % 60).padStart(2, '0')} min
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedModule(module);
                                  setSelectedLesson(lesson);
                                  setIsLessonFormOpen(true);
                                }}
                                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                title="Editar lección"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => openDeleteDialog('lesson', lesson.id, lesson.title)}
                                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Eliminar lección"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={deleteTarget?.type === 'module' ? handleDeleteModule : handleDeleteLesson}
        title={`Eliminar ${deleteTarget?.type === 'module' ? 'Módulo' : 'Lección'}`}
        message={`¿Estás seguro de que deseas eliminar ${deleteTarget?.type === 'module' ? 'el módulo' : 'la lección'} "${deleteTarget?.title}"?${
          deleteTarget?.type === 'module'
            ? ' Todas las lecciones dentro de este módulo también serán eliminadas.'
            : ''
        }`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
      />

      {/* Module Form Modal */}
      {courseId && (
        <ModuleFormModal
          isOpen={isModuleFormOpen}
          onClose={() => {
            setIsModuleFormOpen(false);
            setSelectedModule(null);
          }}
          onSubmit={fetchModules}
          courseId={courseId}
          initialData={selectedModule || undefined}
          mode={selectedModule ? 'edit' : 'create'}
        />
      )}

      {/* Lesson Form Modal */}
      {selectedModule && (
        <LessonFormModal
          isOpen={isLessonFormOpen}
          onClose={() => {
            setIsLessonFormOpen(false);
            setSelectedLesson(null);
          }}
          onSubmit={fetchModules}
          moduleId={selectedModule.id}
          initialData={selectedLesson || undefined}
          mode={selectedLesson ? 'edit' : 'create'}
        />
      )}
    </div>
  );
}

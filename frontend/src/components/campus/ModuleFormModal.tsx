import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from './Modal';

interface ModuleFormData {
  title: string;
  description: string;
  order?: number;
  isPublished: boolean;
}

interface ModuleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ModuleFormData) => Promise<void>;
  courseId: string;
  initialData?: Partial<ModuleFormData> & { id?: string };
  mode: 'create' | 'edit';
}

export default function ModuleFormModal({
  isOpen,
  onClose,
  onSubmit,
  courseId,
  initialData,
  mode,
}: ModuleFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ModuleFormData>({
    title: '',
    description: '',
    isPublished: false,
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        order: initialData.order,
        isPublished: initialData.isPublished || false,
      });
    } else if (!initialData && isOpen) {
      setFormData({
        title: '',
        description: '',
        isPublished: false,
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'create') {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/courses/${courseId}/modules`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Error al crear el módulo');
        }
      } else if (initialData?.id) {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/modules/${initialData.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Error al actualizar el módulo');
        }
      }
      await onSubmit(formData);
      onClose();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(error.message || 'Error al guardar el módulo');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Crear Nuevo Módulo' : 'Editar Módulo'}
      size="lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="module-form"
            disabled={loading}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Guardando...' : mode === 'create' ? 'Crear Módulo' : 'Guardar Cambios'}
          </button>
        </>
      }
    >
      <form id="module-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Título del Módulo *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Ej: Introducción a React"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Breve descripción del módulo..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-4 h-4 text-orange-600 bg-neutral-100 border-neutral-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600"
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Publicar módulo (visible para estudiantes)
          </label>
        </div>
      </form>
    </Modal>
  );
}

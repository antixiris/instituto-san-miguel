import { useState, useEffect } from 'react';
import { Loader2, Eye, Edit3 } from 'lucide-react';
import Modal from './Modal';
import MarkdownContent from './MarkdownContent';

interface LessonFormData {
  title: string;
  description: string;
  type: 'VIDEO' | 'TEXT' | 'QUIZ' | 'EXERCISE' | 'RESOURCE';
  content?: string;
  videoUrl?: string;
  videoDuration?: number;
  isPublished: boolean;
  isFree: boolean;
}

interface LessonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  moduleId: string;
  initialData?: Partial<LessonFormData> & { id?: string };
  mode: 'create' | 'edit';
}

export default function LessonFormModal({
  isOpen,
  onClose,
  onSubmit,
  moduleId,
  initialData,
  mode,
}: LessonFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    description: '',
    type: 'VIDEO',
    content: '',
    videoUrl: '',
    videoDuration: 0,
    isPublished: false,
    isFree: false,
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        type: initialData.type || 'VIDEO',
        content: initialData.content || '',
        videoUrl: initialData.videoUrl || '',
        videoDuration: initialData.videoDuration || 0,
        isPublished: initialData.isPublished || false,
        isFree: initialData.isFree || false,
      });
    } else if (!initialData && isOpen) {
      setFormData({
        title: '',
        description: '',
        type: 'VIDEO',
        content: '',
        videoUrl: '',
        videoDuration: 0,
        isPublished: false,
        isFree: false,
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'create') {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/modules/${moduleId}/lessons`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Error al crear la lección');
        }
      } else if (initialData?.id) {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/lessons/${initialData.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Error al actualizar la lección');
        }
      }
      await onSubmit();
      onClose();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(error.message || 'Error al guardar la lección');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Crear Nueva Lección' : 'Editar Lección'}
      size="2xl"
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
            form="lesson-form"
            disabled={loading}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Guardando...' : mode === 'create' ? 'Crear Lección' : 'Guardar Cambios'}
          </button>
        </>
      }
    >
      <form id="lesson-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Título de la Lección *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Ej: Introducción a los componentes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Tipo de Lección *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="VIDEO">Video</option>
            <option value="TEXT">Texto/Artículo</option>
            <option value="QUIZ">Cuestionario</option>
            <option value="EXERCISE">Ejercicio Práctico</option>
            <option value="RESOURCE">Recurso Descargable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Breve descripción de la lección..."
          />
        </div>

        {/* Video specific fields */}
        {formData.type === 'VIDEO' && (
          <>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                URL del Video
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                YouTube, Vimeo u otra plataforma
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Duración (segundos)
              </label>
              <input
                type="number"
                name="videoDuration"
                value={formData.videoDuration}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ej: 600 (10 minutos)"
              />
            </div>
          </>
        )}

        {/* Content Editor with Markdown Preview */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Contenido de la Lección (Markdown)
          </label>

          {/* Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-3">
            <button
              type="button"
              onClick={() => setEditorTab('edit')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                editorTab === 'edit'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
            <button
              type="button"
              onClick={() => setEditorTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                editorTab === 'preview'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              Vista Previa
            </button>
          </div>

          {/* Editor Tab */}
          {editorTab === 'edit' ? (
            <div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                placeholder="# Título de la Lección

Escribe aquí el contenido de tu lección usando Markdown...

## Sección 1

Puedes incluir:
- **Texto en negrita** y *cursiva*
- [Enlaces](https://ejemplo.com)
- Imágenes: ![alt text](url-imagen.jpg)
- Videos de YouTube: https://youtube.com/watch?v=VIDEO_ID
- `Código inline` y bloques de código

```javascript
const codigo = 'ejemplo';
```

> Citas importantes

¡Y mucho más!"
              />
              <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-500 space-y-1">
                <p><strong>Tips:</strong></p>
                <p>• Pega URLs de YouTube directamente para embeber videos</p>
                <p>• Usa imágenes con ![descripción](url-imagen.jpg)</p>
                <p>• Formatea código con tres backticks: ```javascript</p>
              </div>
            </div>
          ) : (
            /* Preview Tab */
            <div className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4 bg-white dark:bg-neutral-800 min-h-[300px] max-h-[500px] overflow-y-auto">
              {formData.content ? (
                <MarkdownContent content={formData.content} />
              ) : (
                <p className="text-neutral-400 dark:text-neutral-600 italic text-center py-8">
                  Escribe contenido en la pestaña "Editar" para ver la vista previa aquí
                </p>
              )}
            </div>
          )}
        </div>

        {formData.type === 'RESOURCE' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              Para recursos descargables, usa el campo "Contenido" para proporcionar el enlace de descarga o las instrucciones.
            </p>
          </div>
        )}

        {formData.type === 'QUIZ' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              Los cuestionarios se configuran en una sección separada después de crear la lección.
            </p>
          </div>
        )}

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-4 h-4 text-orange-600 bg-neutral-100 border-neutral-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Publicar lección
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFree"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
              className="w-4 h-4 text-orange-600 bg-neutral-100 border-neutral-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="isFree" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Acceso gratuito (preview)
            </label>
          </div>
        </div>
      </form>
    </Modal>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface ModuleTestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
  testId?: string;
  onSuccess?: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation?: string;
  isMultipleAnswer: boolean;
}

interface TestFormData {
  title: string;
  instructions: string;
  timeLimit: number;
  passingScore: number;
  isActive: boolean;
  questions: Question[];
}

export default function ModuleTestFormModal({
  isOpen,
  onClose,
  moduleId,
  testId,
  onSuccess,
}: ModuleTestFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<TestFormData>({
    title: '',
    instructions: '',
    timeLimit: 600,
    passingScore: 5.0,
    isActive: true,
    questions: Array(10).fill(null).map(() => ({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      isMultipleAnswer: false,
    })),
  });

  useEffect(() => {
    if (testId && isOpen) {
      fetchTest();
    } else if (!testId) {
      resetForm();
    }
  }, [testId, isOpen]);

  const fetchTest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3001/api/modules/${moduleId}/test`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.data.title,
          instructions: data.data.instructions,
          timeLimit: data.data.timeLimit,
          passingScore: data.data.passingScore,
          isActive: data.data.isActive,
          questions: data.data.questions.map((q: any) => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            isMultipleAnswer: Array.isArray(q.correctAnswer),
          })),
        });
      }
    } catch (err) {
      console.error('Error fetching test:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      instructions: '',
      timeLimit: 600,
      passingScore: 5.0,
      isActive: true,
      questions: Array(10).fill(null).map(() => ({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        isMultipleAnswer: false,
      })),
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validar que todas las preguntas estén completas
    const incompleteQuestions = formData.questions.filter(
      (q) => !q.question || q.options.some((opt) => !opt)
    );

    if (incompleteQuestions.length > 0) {
      setError('Por favor completa todas las preguntas y opciones');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const url = testId
        ? `http://localhost:3001/api/module-tests/${testId}`
        : `http://localhost:3001/api/modules/${moduleId}/test`;

      const method = testId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess?.();
        onClose();
        resetForm();
      } else {
        setError(data.error || 'Error al guardar el test');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };

    // Si cambiamos a respuesta múltiple, convertir correctAnswer a array
    if (field === 'isMultipleAnswer' && value === true) {
      newQuestions[index].correctAnswer = [];
    } else if (field === 'isMultipleAnswer' && value === false) {
      newQuestions[index].correctAnswer = 0;
    }

    setFormData({ ...formData, questions: newQuestions });
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const toggleCorrectAnswer = (qIndex: number, oIndex: number) => {
    const newQuestions = [...formData.questions];
    const question = newQuestions[qIndex];

    if (question.isMultipleAnswer) {
      // Respuesta múltiple
      const currentAnswers = question.correctAnswer as number[];
      if (currentAnswers.includes(oIndex)) {
        question.correctAnswer = currentAnswers.filter((i) => i !== oIndex);
      } else {
        question.correctAnswer = [...currentAnswers, oIndex];
      }
    } else {
      // Respuesta única
      question.correctAnswer = oIndex;
    }

    setFormData({ ...formData, questions: newQuestions });
  };

  const isOptionSelected = (qIndex: number, oIndex: number): boolean => {
    const question = formData.questions[qIndex];
    if (question.isMultipleAnswer) {
      return (question.correctAnswer as number[]).includes(oIndex);
    }
    return question.correctAnswer === oIndex;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {testId ? 'Editar Test de Módulo' : 'Crear Test de Módulo'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título del Test
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Test de Módulo 1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instrucciones
              </label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Lee cuidadosamente cada pregunta y selecciona la respuesta correcta..."
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tiempo Límite (seg)
                </label>
                <input
                  type="number"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                  min="60"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nota Mínima (0-10)
                </label>
                <input
                  type="number"
                  value={formData.passingScore}
                  onChange={(e) => setFormData({ ...formData, passingScore: parseFloat(e.target.value) })}
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Test activo</span>
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Preguntas (10 obligatorias)
            </h3>

            <div className="space-y-6">
              {formData.questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="p-5 border border-gray-300 dark:border-gray-600 rounded-lg space-y-4 bg-gray-50 dark:bg-gray-900/30"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Pregunta {qIndex + 1}
                    </h4>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={question.isMultipleAnswer}
                        onChange={(e) => updateQuestion(qIndex, 'isMultipleAnswer', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-600 dark:text-gray-400">Respuesta múltiple</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pregunta
                    </label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={`Escribe la pregunta ${qIndex + 1}...`}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Opciones {question.isMultipleAnswer ? '(marca todas las correctas)' : '(marca la correcta)'}
                    </label>
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex gap-2 items-center">
                        <input
                          type={question.isMultipleAnswer ? 'checkbox' : 'radio'}
                          name={`correct-${qIndex}`}
                          checked={isOptionSelected(qIndex, oIndex)}
                          onChange={() => toggleCorrectAnswer(qIndex, oIndex)}
                          className="w-4 h-4"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder={`Opción ${oIndex + 1}`}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Explicación (opcional)
                    </label>
                    <textarea
                      value={question.explanation || ''}
                      onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Explica por qué esta es la respuesta correcta..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : testId ? 'Actualizar Test' : 'Crear Test'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, GripVertical } from 'lucide-react';

interface GameExerciseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: string;
  exerciseId?: string;
  onSuccess?: () => void;
}

type ExerciseType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANKS' | 'MATCHING_PAIRS' | 'SEQUENCE_ORDER' | 'CODE_CHALLENGE';

interface ExerciseFormData {
  type: ExerciseType;
  title: string;
  instructions: string;
  points: number;
  timeLimit?: number;
  isActive: boolean;
  config: any;
}

const EXERCISE_TYPES = [
  { value: 'MULTIPLE_CHOICE', label: 'Opción Múltiple' },
  { value: 'TRUE_FALSE', label: 'Verdadero/Falso' },
  { value: 'FILL_BLANKS', label: 'Completar Espacios' },
  { value: 'MATCHING_PAIRS', label: 'Emparejar' },
  { value: 'SEQUENCE_ORDER', label: 'Ordenar Secuencia' },
  { value: 'CODE_CHALLENGE', label: 'Desafío de Código' },
];

export default function GameExerciseFormModal({
  isOpen,
  onClose,
  lessonId,
  exerciseId,
  onSuccess,
}: GameExerciseFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<ExerciseFormData>({
    type: 'MULTIPLE_CHOICE',
    title: '',
    instructions: '',
    points: 10,
    timeLimit: 300,
    isActive: true,
    config: { questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }] },
  });

  useEffect(() => {
    if (exerciseId && isOpen) {
      fetchExercise();
    } else if (!exerciseId) {
      resetForm();
    }
  }, [exerciseId, isOpen]);

  const fetchExercise = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3001/api/lessons/${lessonId}/game-exercise`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData({
          type: data.data.type,
          title: data.data.title,
          instructions: data.data.instructions,
          points: data.data.points,
          timeLimit: data.data.timeLimit,
          isActive: data.data.isActive,
          config: data.data.config,
        });
      }
    } catch (err) {
      console.error('Error fetching exercise:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'MULTIPLE_CHOICE',
      title: '',
      instructions: '',
      points: 10,
      timeLimit: 300,
      isActive: true,
      config: { questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }] },
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const url = exerciseId
        ? `http://localhost:3001/api/game-exercises/${exerciseId}`
        : `http://localhost:3001/api/lessons/${lessonId}/game-exercise`;

      const method = exerciseId ? 'PUT' : 'POST';

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
        setError(data.error || 'Error al guardar el ejercicio');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (newType: ExerciseType) => {
    let newConfig: any = {};

    switch (newType) {
      case 'MULTIPLE_CHOICE':
        newConfig = { questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }] };
        break;
      case 'TRUE_FALSE':
        newConfig = { statements: [{ statement: '', correct: true, explanation: '' }] };
        break;
      case 'FILL_BLANKS':
        newConfig = { text: '', blanks: [{ position: 0, acceptedAnswers: [''] }] };
        break;
      case 'MATCHING_PAIRS':
        newConfig = { pairs: [{ item: '', match: '' }] };
        break;
      case 'SEQUENCE_ORDER':
        newConfig = { items: [''], correctSequence: [0] };
        break;
      case 'CODE_CHALLENGE':
        newConfig = { prompt: '', language: 'javascript', starterCode: '', testCases: [] };
        break;
    }

    setFormData({ ...formData, type: newType, config: newConfig });
  };

  // Render functions for each exercise type
  const renderMultipleChoiceConfig = () => {
    const questions = formData.config.questions || [];

    const addQuestion = () => {
      setFormData({
        ...formData,
        config: {
          questions: [...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }],
        },
      });
    };

    const removeQuestion = (index: number) => {
      setFormData({
        ...formData,
        config: {
          questions: questions.filter((_: any, i: number) => i !== index),
        },
      });
    };

    const updateQuestion = (index: number, field: string, value: any) => {
      const newQuestions = [...questions];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      setFormData({ ...formData, config: { questions: newQuestions } });
    };

    const updateOption = (qIndex: number, oIndex: number, value: string) => {
      const newQuestions = [...questions];
      newQuestions[qIndex].options[oIndex] = value;
      setFormData({ ...formData, config: { questions: newQuestions } });
    };

    return (
      <div className="space-y-4">
        {questions.map((q: any, qIndex: number) => (
          <div key={qIndex} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-900 dark:text-white">Pregunta {qIndex + 1}</h4>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <input
              type="text"
              placeholder="Pregunta"
              value={q.question}
              onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />

            <div className="space-y-2">
              {q.options.map((option: string, oIndex: number) => (
                <div key={oIndex} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctAnswer === oIndex}
                    onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                    className="w-4 h-4"
                  />
                  <input
                    type="text"
                    placeholder={`Opción ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              ))}
            </div>

            <input
              type="text"
              placeholder="Explicación (opcional)"
              value={q.explanation || ''}
              onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Agregar Pregunta
        </button>
      </div>
    );
  };

  const renderTrueFalseConfig = () => {
    const statements = formData.config.statements || [];

    const addStatement = () => {
      setFormData({
        ...formData,
        config: {
          statements: [...statements, { statement: '', correct: true, explanation: '' }],
        },
      });
    };

    const removeStatement = (index: number) => {
      setFormData({
        ...formData,
        config: {
          statements: statements.filter((_: any, i: number) => i !== index),
        },
      });
    };

    const updateStatement = (index: number, field: string, value: any) => {
      const newStatements = [...statements];
      newStatements[index] = { ...newStatements[index], [field]: value };
      setFormData({ ...formData, config: { statements: newStatements } });
    };

    return (
      <div className="space-y-4">
        {statements.map((s: any, index: number) => (
          <div key={index} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-900 dark:text-white">Afirmación {index + 1}</h4>
              {statements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStatement(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <input
              type="text"
              placeholder="Afirmación"
              value={s.statement}
              onChange={(e) => updateStatement(index, 'statement', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${index}`}
                  checked={s.correct === true}
                  onChange={() => updateStatement(index, 'correct', true)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700 dark:text-gray-300">Verdadero</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${index}`}
                  checked={s.correct === false}
                  onChange={() => updateStatement(index, 'correct', false)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700 dark:text-gray-300">Falso</span>
              </label>
            </div>

            <input
              type="text"
              placeholder="Explicación (opcional)"
              value={s.explanation || ''}
              onChange={(e) => updateStatement(index, 'explanation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addStatement}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Agregar Afirmación
        </button>
      </div>
    );
  };

  const renderFillBlanksConfig = () => {
    const text = formData.config.text || '';
    const blanks = formData.config.blanks || [];

    const addBlank = () => {
      setFormData({
        ...formData,
        config: {
          ...formData.config,
          blanks: [...blanks, { position: blanks.length, acceptedAnswers: [''] }],
        },
      });
    };

    const removeBlank = (index: number) => {
      setFormData({
        ...formData,
        config: {
          ...formData.config,
          blanks: blanks.filter((_: any, i: number) => i !== index),
        },
      });
    };

    const updateBlank = (index: number, answers: string[]) => {
      const newBlanks = [...blanks];
      newBlanks[index] = { ...newBlanks[index], acceptedAnswers: answers };
      setFormData({ ...formData, config: { ...formData.config, blanks: newBlanks } });
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Texto (usa ___ para espacios en blanco)
          </label>
          <textarea
            value={text}
            onChange={(e) => setFormData({ ...formData, config: { ...formData.config, text: e.target.value } })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Ejemplo: El lenguaje ___ es muy popular para desarrollo web."
            required
          />
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">Respuestas Aceptadas</h4>
          {blanks.map((blank: any, index: number) => (
            <div key={index} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Espacio {index + 1}</span>
                {blanks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBlank(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Respuestas separadas por coma (ej: JavaScript, JS)"
                value={blank.acceptedAnswers.join(', ')}
                onChange={(e) => updateBlank(index, e.target.value.split(',').map((s: string) => s.trim()))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addBlank}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Agregar Espacio en Blanco
          </button>
        </div>
      </div>
    );
  };

  const renderMatchingPairsConfig = () => {
    const pairs = formData.config.pairs || [];

    const addPair = () => {
      setFormData({
        ...formData,
        config: {
          pairs: [...pairs, { item: '', match: '' }],
        },
      });
    };

    const removePair = (index: number) => {
      setFormData({
        ...formData,
        config: {
          pairs: pairs.filter((_: any, i: number) => i !== index),
        },
      });
    };

    const updatePair = (index: number, field: string, value: string) => {
      const newPairs = [...pairs];
      newPairs[index] = { ...newPairs[index], [field]: value };
      setFormData({ ...formData, config: { pairs: newPairs } });
    };

    return (
      <div className="space-y-4">
        {pairs.map((pair: any, index: number) => (
          <div key={index} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Par {index + 1}</h4>
              {pairs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePair(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Elemento"
                value={pair.item}
                onChange={(e) => updatePair(index, 'item', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Coincidencia"
                value={pair.match}
                onChange={(e) => updatePair(index, 'match', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addPair}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Agregar Par
        </button>
      </div>
    );
  };

  const renderSequenceOrderConfig = () => {
    const items = formData.config.items || [];

    const addItem = () => {
      setFormData({
        ...formData,
        config: {
          items: [...items, ''],
          correctSequence: [...(formData.config.correctSequence || []), items.length],
        },
      });
    };

    const removeItem = (index: number) => {
      const newItems = items.filter((_: any, i: number) => i !== index);
      const newSequence = formData.config.correctSequence
        .filter((i: number) => i !== index)
        .map((i: number) => (i > index ? i - 1 : i));

      setFormData({
        ...formData,
        config: {
          items: newItems,
          correctSequence: newSequence,
        },
      });
    };

    const updateItem = (index: number, value: string) => {
      const newItems = [...items];
      newItems[index] = value;
      setFormData({ ...formData, config: { ...formData.config, items: newItems } });
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Los elementos se presentarán en orden aleatorio. El orden correcto es el orden en que los ingreses aquí.
        </p>

        {items.map((item: string, index: number) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="text-gray-600 dark:text-gray-400 font-mono">{index + 1}.</span>
            <input
              type="text"
              placeholder={`Elemento ${index + 1}`}
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Agregar Elemento
        </button>
      </div>
    );
  };

  const renderCodeChallengeConfig = () => {
    const config = formData.config;

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Descripción del Desafío
          </label>
          <textarea
            value={config.prompt || ''}
            onChange={(e) => setFormData({ ...formData, config: { ...config, prompt: e.target.value } })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Lenguaje
          </label>
          <select
            value={config.language || 'javascript'}
            onChange={(e) => setFormData({ ...formData, config: { ...config, language: e.target.value } })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Código Inicial (opcional)
          </label>
          <textarea
            value={config.starterCode || ''}
            onChange={(e) => setFormData({ ...formData, config: { ...config, starterCode: e.target.value } })}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
          />
        </div>
      </div>
    );
  };

  const renderConfigForm = () => {
    switch (formData.type) {
      case 'MULTIPLE_CHOICE':
        return renderMultipleChoiceConfig();
      case 'TRUE_FALSE':
        return renderTrueFalseConfig();
      case 'FILL_BLANKS':
        return renderFillBlanksConfig();
      case 'MATCHING_PAIRS':
        return renderMatchingPairsConfig();
      case 'SEQUENCE_ORDER':
        return renderSequenceOrderConfig();
      case 'CODE_CHALLENGE':
        return renderCodeChallengeConfig();
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {exerciseId ? 'Editar Ejercicio' : 'Crear Ejercicio Gamificado'}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo de Ejercicio
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value as ExerciseType)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={!!exerciseId}
              >
                {EXERCISE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Puntos
              </label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tiempo Límite (segundos) - Opcional
            </label>
            <input
              type="number"
              value={formData.timeLimit || ''}
              onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value ? parseInt(e.target.value) : undefined })}
              min="30"
              placeholder="Sin límite"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
              Ejercicio activo
            </label>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Configuración del Ejercicio
            </h3>
            {renderConfigForm()}
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
              {loading ? 'Guardando...' : exerciseId ? 'Actualizar' : 'Crear Ejercicio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

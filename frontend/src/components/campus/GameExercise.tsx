import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Trophy, AlertCircle } from 'lucide-react';

type GameExerciseType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANKS' | 'MATCHING_PAIRS' | 'SEQUENCE_ORDER' | 'CODE_CHALLENGE';

interface GameExerciseProps {
  exerciseId: string;
  lessonId: string;
  onComplete?: (score: number, passed: boolean) => void;
}

interface Exercise {
  id: string;
  type: GameExerciseType;
  title: string;
  instructions: string;
  config: any;
  points: number;
  timeLimit?: number;
}

export default function GameExercise({ exerciseId, lessonId, onComplete }: GameExerciseProps) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    fetchExercise();
  }, [lessonId]);

  useEffect(() => {
    if (exercise?.timeLimit && !result) {
      setTimeLeft(exercise.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [exercise, result]);

  const fetchExercise = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/lessons/${lessonId}/game-exercise`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setExercise(data.data);
        setStartTime(Date.now());
      }
    } catch (error) {
      console.error('Error fetching exercise:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoSubmit = () => {
    if (!result) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!exercise) return;

    setSubmitting(true);
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/game-exercises/${exercise.id}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers, timeSpent }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        onComplete?.(data.data.score, data.data.passed);
      }
    } catch (error) {
      console.error('Error submitting exercise:', error);
      alert('Error al enviar el ejercicio');
    } finally {
      setSubmitting(false);
    }
  };

  const renderExerciseContent = () => {
    if (!exercise) return null;

    switch (exercise.type) {
      case 'MULTIPLE_CHOICE':
        return renderMultipleChoice();
      case 'TRUE_FALSE':
        return renderTrueFalse();
      case 'FILL_BLANKS':
        return renderFillBlanks();
      case 'MATCHING_PAIRS':
        return renderMatchingPairs();
      case 'SEQUENCE_ORDER':
        return renderSequenceOrder();
      case 'CODE_CHALLENGE':
        return renderCodeChallenge();
      default:
        return null;
    }
  };

  const renderMultipleChoice = () => {
    const questions = exercise!.config.questions || [];
    return (
      <div className="space-y-6">
        {questions.map((question: any, index: number) => (
          <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <p className="font-medium text-gray-900 dark:text-white mb-3">
              {index + 1}. {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option: string, optIndex: number) => (
                <label
                  key={optIndex}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    result
                      ? result.feedback[index]?.correct && answers[index]?.includes(optIndex)
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : !result.feedback[index]?.correct && answers[index]?.includes(optIndex)
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : result.feedback[index]?.correctAnswer?.includes(optIndex)
                        ? 'border-green-300 bg-green-50/50 dark:bg-green-900/10'
                        : 'border-neutral-200 dark:border-neutral-700'
                      : answers[index]?.includes(optIndex)
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-orange-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={!!result}
                    checked={answers[index]?.includes(optIndex) || false}
                    onChange={(e) => {
                      const current = answers[index] || [];
                      setAnswers({
                        ...answers,
                        [index]: e.target.checked
                          ? [...current, optIndex]
                          : current.filter((i: number) => i !== optIndex),
                      });
                    }}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
            {result && result.feedback[index]?.explanation && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Explicación:</strong> {result.feedback[index].explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTrueFalse = () => {
    const statements = exercise!.config.statements || [];
    return (
      <div className="space-y-4">
        {statements.map((statement: any, index: number) => (
          <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <p className="font-medium text-gray-900 dark:text-white mb-3">
              {index + 1}. {statement.statement}
            </p>
            <div className="flex gap-3">
              {[
                { value: true, label: 'Verdadero', color: 'green' },
                { value: false, label: 'Falso', color: 'red' },
              ].map((option) => (
                <button
                  key={option.label}
                  disabled={!!result}
                  onClick={() => setAnswers({ ...answers, [index]: option.value })}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-colors ${
                    result
                      ? result.feedback[index]?.correct && answers[index] === option.value
                        ? `border-${option.color}-500 bg-${option.color}-50 dark:bg-${option.color}-900/20 text-${option.color}-700`
                        : !result.feedback[index]?.correct && answers[index] === option.value
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700'
                        : result.feedback[index]?.correctAnswer === option.value
                        ? `border-${option.color}-300 bg-${option.color}-50/50 text-${option.color}-600`
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600'
                      : answers[index] === option.value
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-orange-300 text-neutral-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {result && result.feedback[index]?.explanation && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">{result.feedback[index].explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderFillBlanks = () => {
    const text = exercise!.config.text || '';
    const blanks = exercise!.config.blanks || [];

    return (
      <div className="space-y-4">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{text}</p>
        </div>
        <div className="space-y-3">
          {blanks.map((blank: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[100px]">
                Espacio {index + 1}:
              </span>
              <input
                type="text"
                disabled={!!result}
                value={answers[index] || ''}
                onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                className={`flex-1 px-3 py-2 border-2 rounded-lg ${
                  result
                    ? result.feedback[index]?.correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
                }`}
                placeholder="Escribe tu respuesta..."
              />
              {result && !result.feedback[index]?.correct && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  Correcta: {result.feedback[index]?.acceptedAnswers?.[0]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMatchingPairs = () => {
    const pairs = exercise!.config.pairs || [];
    const options = pairs.map((p: any) => p.match);

    return (
      <div className="space-y-4">
        {pairs.map((pair: any, index: number) => (
          <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg flex items-center gap-4">
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{pair.item}</p>
            </div>
            <div className="w-px h-12 bg-neutral-300 dark:bg-neutral-600"></div>
            <div className="flex-1">
              <select
                disabled={!!result}
                value={answers[index] || ''}
                onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                className={`w-full px-3 py-2 border-2 rounded-lg ${
                  result
                    ? result.feedback[index]?.correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
                }`}
              >
                <option value="">Selecciona una opción...</option>
                {options.map((option: string, optIndex: number) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {result && !result.feedback[index]?.correct && (
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                  Correcta: {result.feedback[index]?.correctMatch}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSequenceOrder = () => {
    const items = exercise!.config.items || [];
    const [sequence, setSequence] = useState<string[]>(
      result ? result.answers.sequence : items.slice().sort(() => Math.random() - 0.5)
    );

    const moveItem = (index: number, direction: 'up' | 'down') => {
      if (result) return;
      const newSequence = [...sequence];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newSequence.length) return;

      [newSequence[index], newSequence[newIndex]] = [newSequence[newIndex], newSequence[index]];
      setSequence(newSequence);
      setAnswers({ sequence: newSequence });
    };

    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ordena los elementos en la secuencia correcta:
        </p>
        {sequence.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
              result
                ? result.feedback.sequence?.correct
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'
            }`}
          >
            <span className="font-bold text-gray-500 dark:text-gray-400">{index + 1}.</span>
            <span className="flex-1 text-gray-900 dark:text-white">{item}</span>
            {!result && (
              <div className="flex gap-1">
                <button
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === sequence.length - 1}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
            )}
          </div>
        ))}
        {result && !result.feedback.sequence?.correct && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Secuencia correcta:</p>
            <ol className="list-decimal list-inside text-sm text-blue-700 dark:text-blue-400">
              {result.feedback.sequence?.correctSequence.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  };

  const renderCodeChallenge = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {exercise!.config.instructions}
          </pre>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tu código:
          </label>
          <textarea
            disabled={!!result}
            value={answers.code || ''}
            onChange={(e) => setAnswers({ code: e.target.value })}
            rows={12}
            className="w-full px-3 py-2 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 font-mono text-sm"
            placeholder="// Escribe tu código aquí..."
          />
        </div>
        {result && result.feedback.requiresReview && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              Este ejercicio requiere revisión manual del instructor.
            </p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">No hay ejercicio disponible para esta lección</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{exercise.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{exercise.instructions}</p>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="w-4 h-4 text-orange-600" />
            <span className="text-gray-700 dark:text-gray-300">{exercise.points} puntos</span>
          </div>
          {timeLeft !== null && !result && (
            <div className={`flex items-center gap-2 text-sm ${timeLeft < 60 ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
              <Clock className="w-4 h-4" />
              <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Exercise Content */}
      <div className="mb-6">{renderExerciseContent()}</div>

      {/* Result */}
      {result && (
        <div className={`p-6 rounded-lg border-2 mb-6 ${
          result.passed
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            {result.passed ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {result.passed ? '¡Excelente!' : 'Sigue intentando'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Calificación: {result.score.toFixed(1)}/10 - {result.passed ? 'Aprobado' : 'No aprobado'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!result && (
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {submitting ? 'Enviando...' : 'Enviar Respuestas'}
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ModuleTestProps {
  moduleId: string;
  onComplete?: (score: number, passed: boolean) => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation?: string;
  isMultipleAnswer: boolean;
}

interface ModuleTestData {
  id: string;
  title: string;
  instructions: string;
  timeLimit: number;
  passingScore: number;
  questions: Question[];
}

export default function ModuleTest({ moduleId, onComplete }: ModuleTestProps) {
  const [test, setTest] = useState<ModuleTestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: number]: number | number[] }>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [hasAttempted, setHasAttempted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    fetchTest();
    checkPreviousAttempts();
  }, [moduleId]);

  useEffect(() => {
    if (test && timeLeft !== null && timeLeft > 0 && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [test, timeLeft, submitted]);

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
        setTest(data.data);
        setTimeLeft(data.data.timeLimit);
      } else {
        setError('No se pudo cargar el test');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const checkPreviousAttempts = async () => {
    try {
      const token = localStorage.getItem('token');
      // Primero obtener el test para saber su ID
      const testResponse = await fetch(
        `http://localhost:3001/api/modules/${moduleId}/test`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (testResponse.ok) {
        const testData = await testResponse.json();
        const testId = testData.data.id;

        // Ahora obtener las submissions
        const submissionsResponse = await fetch(
          `http://localhost:3001/api/module-tests/${testId}/my-submissions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (submissionsResponse.ok) {
          const submissionsData = await submissionsResponse.json();
          setAttemptCount(submissionsData.data.length);
          if (submissionsData.data.length > 0) {
            setHasAttempted(true);
            // Mostrar el resultado del primer intento
            const firstAttempt = submissionsData.data[submissionsData.data.length - 1];
            setResult(firstAttempt);
            setSubmitted(true);
          }
        }
      }
    } catch (err) {
      console.error('Error checking previous attempts:', err);
    }
  };

  const handleAutoSubmit = () => {
    if (!submitted) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!test) return;

    setLoading(true);
    setError('');

    const timeSpent = test.timeLimit - (timeLeft || 0);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3001/api/module-tests/${test.id}/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answers, timeSpent }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data.data);
        setSubmitted(true);
        setTimeLeft(0);
        onComplete?.(data.data.score, data.data.passed);
      } else {
        const data = await response.json();
        setError(data.error || 'Error al enviar el test');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;

    const question = test?.questions[questionIndex];
    if (!question) return;

    if (question.isMultipleAnswer) {
      const currentAnswers = (answers[questionIndex] as number[]) || [];
      if (currentAnswers.includes(answerIndex)) {
        setAnswers({
          ...answers,
          [questionIndex]: currentAnswers.filter((i) => i !== answerIndex),
        });
      } else {
        setAnswers({
          ...answers,
          [questionIndex]: [...currentAnswers, answerIndex],
        });
      }
    } else {
      setAnswers({
        ...answers,
        [questionIndex]: answerIndex,
      });
    }
  };

  const isOptionSelected = (questionIndex: number, optionIndex: number): boolean => {
    const answer = answers[questionIndex];
    if (Array.isArray(answer)) {
      return answer.includes(optionIndex);
    }
    return answer === optionIndex;
  };

  const getOptionClassName = (questionIndex: number, optionIndex: number): string => {
    const baseClass = 'p-4 border-2 rounded-lg cursor-pointer transition-all';

    if (!submitted) {
      const isSelected = isOptionSelected(questionIndex, optionIndex);
      return `${baseClass} ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
      }`;
    }

    // Después de enviar, mostrar correcto/incorrecto
    const question = test?.questions[questionIndex];
    if (!question) return baseClass;

    const isCorrect = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(optionIndex)
      : question.correctAnswer === optionIndex;

    const isSelected = isOptionSelected(questionIndex, optionIndex);

    if (isCorrect) {
      return `${baseClass} border-green-500 bg-green-50 dark:bg-green-900/20`;
    } else if (isSelected && !isCorrect) {
      return `${baseClass} border-red-500 bg-red-50 dark:bg-red-900/20`;
    }

    return `${baseClass} border-gray-300 dark:border-gray-600 opacity-50`;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const allQuestionsAnswered = (): boolean => {
    if (!test) return false;
    return test.questions.every((_, index) => {
      const answer = answers[index];
      if (Array.isArray(answer)) {
        return answer.length > 0;
      }
      return answer !== undefined;
    });
  };

  if (loading && !test) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !test) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
        {error}
      </div>
    );
  }

  if (!test) {
    return (
      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
        No hay test disponible para este módulo
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{test.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{test.instructions}</p>
          </div>

          {!submitted && timeLeft !== null && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeLeft < 60 ? 'bg-red-100 dark:bg-red-900/20 text-red-600' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
            }`}>
              <Clock className="w-5 h-5" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {hasAttempted && !submitted && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Atención: Ya has realizado este test</p>
              <p className="text-sm mt-1">
                Solo tu primer intento cuenta para la nota final. Ya tienes {attemptCount} intento(s) registrado(s).
                Puedes practicar, pero no mejorará tu calificación.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>10 Preguntas</span>
          <span>•</span>
          <span>Nota mínima: {test.passingScore}/10</span>
          <span>•</span>
          <span>{attemptCount > 0 ? `Intentos: ${attemptCount}` : 'Primer intento'}</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Result */}
      {submitted && result && (
        <div className={`p-6 rounded-lg ${
          result.passed
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            {result.passed ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {result.passed ? '¡Aprobado!' : 'No Aprobado'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Calificación: {result.score.toFixed(1)}/10
              </p>
            </div>
          </div>
          {result.attempt === 1 && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Esta calificación se ha registrado en tu expediente académico.
            </p>
          )}
          {result.attempt > 1 && (
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Este es tu intento #{result.attempt}. Solo tu primer intento cuenta para la nota final.
            </p>
          )}
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {test.questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {qIndex + 1}. {question.question}
              {question.isMultipleAnswer && (
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  (Selecciona todas las que correspondan)
                </span>
              )}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  onClick={() => !submitted && handleAnswerChange(qIndex, oIndex)}
                  className={getOptionClassName(qIndex, oIndex)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type={question.isMultipleAnswer ? 'checkbox' : 'radio'}
                      checked={isOptionSelected(qIndex, oIndex)}
                      onChange={() => {}}
                      disabled={submitted}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-900 dark:text-white">{option}</span>
                  </div>
                </div>
              ))}
            </div>

            {submitted && question.explanation && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  Explicación:
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {allQuestionsAnswered() ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Todas las preguntas respondidas
                </span>
              ) : (
                <span>
                  {Object.keys(answers).length} de 10 preguntas respondidas
                </span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !allQuestionsAnswered()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? 'Enviando...' : 'Enviar Test'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

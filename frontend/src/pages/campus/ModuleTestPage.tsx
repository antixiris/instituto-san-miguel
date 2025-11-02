import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, Clock, CheckCircle, XCircle, ArrowLeft, AlertCircle, Check, X } from 'lucide-react';

interface ModuleTest {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  timeLimit: number | null;
  module: {
    id: string;
    title: string;
    courseId: string;
    course: {
      slug: string;
    };
  };
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    order: number;
    points: number;
  }>;
}

interface TestResults {
  score: number;
  passed: boolean;
  feedback: {
    [questionId: string]: {
      correct: boolean;
      correctAnswer: number[];
      explanation: string;
      pointsEarned: number;
    };
  };
}

export default function ModuleTestPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<ModuleTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [questionId: string]: number[] }>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    fetchTest();
  }, [moduleId]);

  useEffect(() => {
    if (test) {
      checkForPreviousResult();
    }
  }, [test]);

  const checkForPreviousResult = async () => {
    if (!test) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/module-tests/${test.id}/last-result`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Si hay un resultado anterior, cargar y mostrar
        setResults({
          score: data.data.score,
          passed: data.data.passed,
          feedback: data.data.feedback
        });
        setAnswers(data.data.answers);
        setShowResults(true);
        setShowInstructions(false); // No mostrar instrucciones si ya hay resultados
      }
    } catch (err: any) {
      // Si no hay resultado anterior, simplemente continuar normalmente
      console.log('No previous result found');
    }
  };

  useEffect(() => {
    if (test?.timeLimit && timeLeft === null && testStarted) {
      setTimeLeft(test.timeLimit * 60); // Convertir minutos a segundos
    }
  }, [test, testStarted]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchTest = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/modules/${moduleId}/test`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar el test');
      }

      const data = await response.json();
      setTest(data.data);
    } catch (err: any) {
      console.error('Error fetching test:', err);
      setError(err.message || 'Error al cargar el test');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    const question = test?.questions.find(q => q.id === questionId);
    if (!question) return;

    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];

      // Para preguntas SINGLE: reemplazar la respuesta
      if (question.type === 'SINGLE') {
        return {
          ...prev,
          [questionId]: [optionIndex]
        };
      }

      // Para preguntas MULTIPLE: toggle la opción
      if (currentAnswers.includes(optionIndex)) {
        // Quitar la opción si ya está seleccionada
        return {
          ...prev,
          [questionId]: currentAnswers.filter(idx => idx !== optionIndex)
        };
      } else {
        // Añadir la opción
        return {
          ...prev,
          [questionId]: [...currentAnswers, optionIndex]
        };
      }
    });
  };

  const handleSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/module-tests/${test?.id}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el test');
      }

      const data = await response.json();
      // Guardar resultados y mostrar vista de resultados
      setResults({
        score: data.data.score,
        passed: data.data.passed,
        feedback: data.data.feedback
      });
      setShowResults(true);
    } catch (err: any) {
      console.error('Error submitting test:', err);
      alert('Error al enviar el test. Por favor, intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Test no disponible
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'No se pudo cargar el test'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === test.questions.length;

  // Vista de resultados
  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header con resultados */}
          <div className="mb-8">
            <button
              onClick={() => navigate(`/campus/cursos/${test.module.course.slug}`)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al curso</span>
            </button>

            <div className={`rounded-lg border p-8 ${
              results.passed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {results.passed ? (
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                  )}
                  <div>
                    <h1 className={`text-3xl font-bold ${
                      results.passed
                        ? 'text-green-900 dark:text-green-100'
                        : 'text-red-900 dark:text-red-100'
                    }`}>
                      {results.passed ? '¡Test Aprobado!' : 'Test No Aprobado'}
                    </h1>
                    <p className={`text-lg ${
                      results.passed
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {test.title}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-5xl font-bold ${
                    results.passed
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {results.score.toFixed(1)}/10
                  </div>
                  <p className={`text-sm font-medium ${
                    results.passed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    Puntuación final
                  </p>
                </div>
              </div>
              {!results.passed && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    Necesitas al menos <strong>{test.passingScore}/10</strong> para aprobar.
                    Revisa las respuestas incorrectas y vuelve a intentarlo.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Preguntas con resultados */}
          <div className="space-y-6">
            {test.questions.map((question, index) => {
              const questionFeedback = results.feedback[question.id];
              const userAnswer = answers[question.id] || [];

              return (
                <div
                  key={question.id}
                  className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
                >
                  {/* Pregunta con indicador */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm ${
                      questionFeedback.correct
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-lg text-gray-900 dark:text-gray-100 font-medium mb-2">
                        {question.question}
                      </p>
                      <div className="flex items-center gap-2">
                        {questionFeedback.correct ? (
                          <>
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                              Respuesta correcta (+{questionFeedback.pointsEarned} puntos)
                            </span>
                          </>
                        ) : (
                          <>
                            <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <span className="text-sm font-medium text-red-700 dark:text-red-300">
                              Respuesta incorrecta
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Opciones */}
                  <div className="space-y-3 pl-11">
                    {question.options.map((option, optionIndex) => {
                      const isUserAnswer = userAnswer.includes(optionIndex);
                      const isCorrectAnswer = questionFeedback.correctAnswer.includes(optionIndex);

                      let optionStyle = 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50';
                      let icon = null;

                      if (isCorrectAnswer) {
                        optionStyle = 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/20';
                        icon = <Check className="w-5 h-5 text-green-600 dark:text-green-400" />;
                      } else if (isUserAnswer && !isCorrectAnswer) {
                        optionStyle = 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/20';
                        icon = <X className="w-5 h-5 text-red-600 dark:text-red-400" />;
                      }

                      return (
                        <div
                          key={optionIndex}
                          className={`p-4 rounded-lg border-2 ${optionStyle}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {icon || <div className="w-5 h-5" />}
                            </div>
                            <span className={`flex-1 ${
                              isCorrectAnswer
                                ? 'text-green-900 dark:text-green-100 font-medium'
                                : isUserAnswer
                                ? 'text-red-900 dark:text-red-100'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {option}
                            </span>
                            {isCorrectAnswer && (
                              <span className="text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">
                                CORRECTA
                              </span>
                            )}
                            {isUserAnswer && !isCorrectAnswer && (
                              <span className="text-xs font-semibold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded">
                                TU RESPUESTA
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explicación */}
                  {questionFeedback.explanation && (
                    <div className="mt-4 pl-11">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                              Explicación
                            </p>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              {questionFeedback.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Botón para volver */}
          <div className="mt-8 sticky bottom-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
            <button
              onClick={() => navigate(`/campus/cursos/${test.module.course.slug}`)}
              className="w-full py-3 rounded-lg font-medium bg-orange-600 hover:bg-orange-700 text-white transition-colors"
            >
              Volver al Curso
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de instrucciones
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al curso</span>
          </button>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Award className="w-16 h-16" />
                <div>
                  <h1 className="text-3xl font-bold">{test.title}</h1>
                  <p className="text-orange-100 mt-1">{test.module.title}</p>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                Instrucciones del Test
              </h2>

              <div className="space-y-6 mb-8">
                {/* Descripción */}
                {test.description && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">{test.description}</p>
                  </div>
                )}

                {/* Información del test */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Preguntas</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{test.questions.length}</p>
                  </div>

                  {test.timeLimit && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-medium text-orange-900 dark:text-orange-100">Tiempo límite</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{test.timeLimit} min</p>
                    </div>
                  )}

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-900 dark:text-green-100">Nota mínima</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{test.passingScore}/10</p>
                  </div>
                </div>

                {/* Reglas */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Importante
                  </h3>
                  <ul className="space-y-3 text-yellow-800 dark:text-yellow-200">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>Al pulsar "Comenzar test", el temporizador se iniciará automáticamente.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span><strong>Solo el primer intento cuenta para la calificación final</strong> del módulo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>Puedes revisar y cambiar tus respuestas antes de enviar el test.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>Una vez enviado, podrás ver tus resultados y las respuestas correctas.</span>
                    </li>
                    {test.timeLimit && (
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span>El test se enviará automáticamente cuando se agote el tiempo.</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Consejo */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Consejo:</strong> Lee cuidadosamente cada pregunta antes de responder. Algunas preguntas pueden tener múltiples respuestas correctas.
                  </p>
                </div>
              </div>

              {/* Botón comenzar */}
              <button
                onClick={() => {
                  setShowInstructions(false);
                  setTestStarted(true);
                }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <Award className="w-6 h-6" />
                Comenzar Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (confirm('¿Estás seguro de que quieres salir? Perderás tu progreso.')) {
                navigate(-1);
              }
            }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al curso</span>
          </button>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-orange-600" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {test.title}
                </h1>
              </div>
              {timeLeft !== null && (
                <div className={`flex flex-col items-center gap-1 px-6 py-3 rounded-lg ${
                  timeLeft < 300 ? 'bg-red-100 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20'
                }`}>
                  <div className="flex items-center gap-2">
                    <Clock className={`w-5 h-5 ${
                      timeLeft < 300 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                    }`} />
                    <span className={`text-xs font-medium uppercase tracking-wider ${
                      timeLeft < 300 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      Tiempo restante
                    </span>
                  </div>
                  <span className={`font-mono font-bold text-2xl ${
                    timeLeft < 300 ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'
                  }`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>

            {test.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {test.description}
              </p>
            )}

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Nota mínima: {test.passingScore}/10</span>
              </div>
              {test.timeLimit && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{test.timeLimit} minutos</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>{test.questions.length} preguntas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progreso
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {answeredCount} / {test.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / test.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {test.questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-lg text-gray-900 dark:text-gray-100 font-medium mb-2">
                    {question.question}
                  </p>
                  {question.type === 'MULTIPLE' && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                      <Check className="w-3 h-3" />
                      Selección múltiple (puede haber más de una respuesta correcta)
                    </span>
                  )}
                  {question.type === 'SINGLE' && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded">
                      Respuesta única
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 pl-11">
                {question.options.map((option, optionIndex) => {
                  const isSelected = answers[question.id]?.includes(optionIndex);
                  const isMultiple = question.type === 'MULTIPLE';

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerChange(question.id, optionIndex)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {isMultiple ? (
                          // Checkbox para preguntas de selección múltiple
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                            isSelected
                              ? 'border-orange-600 bg-orange-600'
                              : 'border-gray-300 dark:border-gray-700'
                          }`}>
                            {isSelected && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        ) : (
                          // Radio button para preguntas de respuesta única
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                            isSelected
                              ? 'border-orange-600 bg-orange-600'
                              : 'border-gray-300 dark:border-gray-700'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                        )}
                        <span className="text-gray-900 dark:text-gray-100">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
          {!allAnswered && (
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-4">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">
                Por favor, responde todas las preguntas antes de enviar
              </span>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              allAnswered && !submitting
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {submitting ? 'Enviando...' : 'Enviar Test'}
          </button>
        </div>
      </div>
    </div>
  );
}

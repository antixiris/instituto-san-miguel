import { Router } from 'express';
import {
  getGameExerciseByLesson,
  createGameExercise,
  updateGameExercise,
  deleteGameExercise,
  submitGameExercise,
  getMySubmissions,
  getAllSubmissions,
} from '../controllers/gameExercises.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// Obtener ejercicio gamificado de una lección
router.get('/lessons/:lessonId/game-exercise', getGameExerciseByLesson);

// Crear ejercicio gamificado para una lección (ADMIN/PROFESOR)
router.post('/lessons/:lessonId/game-exercise', createGameExercise);

// Actualizar ejercicio gamificado (ADMIN/PROFESOR)
router.put('/game-exercises/:exerciseId', updateGameExercise);

// Eliminar ejercicio gamificado (ADMIN/PROFESOR)
router.delete('/game-exercises/:exerciseId', deleteGameExercise);

// Enviar respuestas a un ejercicio
router.post('/game-exercises/:exerciseId/submit', submitGameExercise);

// Obtener mis submissions de un ejercicio
router.get('/game-exercises/:exerciseId/my-submissions', getMySubmissions);

// Obtener todas las submissions de un ejercicio (ADMIN/PROFESOR)
router.get('/game-exercises/:exerciseId/submissions', getAllSubmissions);

export default router;

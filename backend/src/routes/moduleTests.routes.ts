import { Router } from 'express';
import {
  getModuleTest,
  getModuleTestForStudent,
  createModuleTest,
  updateModuleTest,
  deleteModuleTest,
  submitModuleTest,
  getMyTestSubmissions,
  getAllTestSubmissions,
} from '../controllers/moduleTests.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// Obtener test de un módulo (con respuestas - para admin/profesor)
router.get('/module-tests/:testId', getModuleTest);

// Obtener test para estudiante (sin respuestas correctas)
router.get('/modules/:moduleId/test', getModuleTestForStudent);

// Crear test para un módulo (ADMIN/PROFESOR)
router.post('/modules/:moduleId/test', createModuleTest);

// Actualizar test de módulo (ADMIN/PROFESOR)
router.put('/module-tests/:testId', updateModuleTest);

// Eliminar test de módulo (ADMIN/PROFESOR)
router.delete('/module-tests/:testId', deleteModuleTest);

// Enviar respuestas al test
router.post('/module-tests/:testId/submit', submitModuleTest);

// Obtener mis submissions de un test
router.get('/module-tests/:testId/my-submissions', getMyTestSubmissions);

// Obtener todas las submissions de un test (ADMIN/PROFESOR)
router.get('/module-tests/:testId/submissions', getAllTestSubmissions);

export default router;

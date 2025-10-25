// Rutas de categorías
import { Router } from 'express';
import { getAllCategories } from '../controllers/categories.controller';

const router = Router();

// Ruta pública para obtener todas las categorías
router.get('/', getAllCategories);

export default router;

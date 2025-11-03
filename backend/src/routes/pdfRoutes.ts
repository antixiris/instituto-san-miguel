/**
 * PDF Routes
 *
 * Rutas para generación y descarga de PDFs de módulos.
 */

import express from 'express';
import {
  downloadModulePDF,
  checkPDFEligibility,
  regenerateModulePDF,
  getPDFStatistics
} from '../controllers/pdfController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

/**
 * @route   GET /api/pdf/module/:moduleId/download
 * @desc    Descarga PDF del módulo (requiere test aprobado)
 * @access  Private (Student)
 */
router.get('/module/:moduleId/download', authenticate, downloadModulePDF);

/**
 * @route   GET /api/pdf/module/:moduleId/check
 * @desc    Verifica si el estudiante puede descargar el PDF
 * @access  Private (Student)
 */
router.get('/module/:moduleId/check', authenticate, checkPDFEligibility);

/**
 * @route   POST /api/pdf/module/:moduleId/regenerate
 * @desc    Regenera el PDF del módulo (limpia cache)
 * @access  Private (Admin/Profesor)
 */
router.post('/module/:moduleId/regenerate', authenticate, regenerateModulePDF);

/**
 * @route   GET /api/pdf/statistics
 * @desc    Obtiene estadísticas de descargas de PDFs
 * @access  Private (Admin/Profesor)
 */
router.get('/statistics', authenticate, getPDFStatistics);

export default router;

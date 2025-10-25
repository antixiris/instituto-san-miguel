// Rutas de Tickets/Consultas
import { Router } from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  respondToTicket,
  closeTicket,
  deleteTicket,
} from '../controllers/tickets.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// GET /api/tickets - Obtener todos los tickets (filtrados por rol)
router.get('/', getAllTickets);

// GET /api/tickets/:id - Obtener un ticket específico
router.get('/:id', getTicketById);

// POST /api/tickets - Crear un nuevo ticket
router.post('/', createTicket);

// POST /api/tickets/:id/respond - Responder a un ticket
router.post('/:id/respond', respondToTicket);

// PATCH /api/tickets/:id/close - Cerrar un ticket
router.patch('/:id/close', closeTicket);

// DELETE /api/tickets/:id - Eliminar un ticket
router.delete('/:id', deleteTicket);

export default router;

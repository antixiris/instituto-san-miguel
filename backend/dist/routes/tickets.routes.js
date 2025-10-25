"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas de Tickets/Consultas
const express_1 = require("express");
const tickets_controller_1 = require("../controllers/tickets.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Todas las rutas requieren autenticación
router.use(auth_1.authenticate);
// GET /api/tickets - Obtener todos los tickets (filtrados por rol)
router.get('/', tickets_controller_1.getAllTickets);
// GET /api/tickets/:id - Obtener un ticket específico
router.get('/:id', tickets_controller_1.getTicketById);
// POST /api/tickets - Crear un nuevo ticket
router.post('/', tickets_controller_1.createTicket);
// POST /api/tickets/:id/respond - Responder a un ticket
router.post('/:id/respond', tickets_controller_1.respondToTicket);
// PATCH /api/tickets/:id/close - Cerrar un ticket
router.patch('/:id/close', tickets_controller_1.closeTicket);
// DELETE /api/tickets/:id - Eliminar un ticket
router.delete('/:id', tickets_controller_1.deleteTicket);
exports.default = router;
//# sourceMappingURL=tickets.routes.js.map
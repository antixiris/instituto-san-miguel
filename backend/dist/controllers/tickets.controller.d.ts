import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
/**
 * Obtener todos los tickets según el rol del usuario
 * - ADMIN: Ve todos los tickets
 * - PROFESOR: Ve tickets PROFESOR de sus cursos, GENERAL y tickets que creó
 * - STUDENT: Ve solo tickets que creó o CLASE/GENERAL de sus cursos
 */
export declare function getAllTickets(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Obtener un ticket por ID (con control de permisos)
 */
export declare function getTicketById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Crear un nuevo ticket
 */
export declare function createTicket(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Responder a un ticket
 */
export declare function respondToTicket(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Cerrar un ticket
 */
export declare function closeTicket(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Eliminar un ticket (solo ADMIN o creador)
 */
export declare function deleteTicket(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=tickets.controller.d.ts.map
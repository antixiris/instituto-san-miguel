// Controlador de categorías
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { prisma } from '../utils/prisma';

/**
 * Obtener todas las categorías
 */
export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: {
            courses: true,
          },
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      data: categories,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * PDF Controller
 *
 * Maneja requests de generación y descarga de PDFs de módulos.
 */

import { Response } from 'express';
import { AuthRequest } from '../types';
import { pdfService } from '../services/pdfService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Genera y descarga PDF de un módulo
 * Solo permitido si el estudiante ha aprobado el test del módulo
 */
export async function downloadModulePDF(req: AuthRequest, res: Response) {
  try {
    const { moduleId } = req.params;
    const studentId = req.user!.id; // Asumiendo que auth middleware agrega user

    // Verificar que el módulo existe
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: {
          select: { title: true }
        }
      }
    });

    if (!module) {
      return res.status(404).json({
        error: 'Módulo no encontrado'
      });
    }

    // Verificar que el estudiante esté inscrito en el curso
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: studentId,
        courseId: module.courseId
      }
    });

    if (!enrollment) {
      return res.status(403).json({
        error: 'No estás inscrito en este curso'
      });
    }

    // Verificar que haya aprobado el test
    const hasPassed = await pdfService.hasStudentPassedModuleTest(
      studentId,
      moduleId
    );

    if (!hasPassed) {
      return res.status(403).json({
        error: 'Debes aprobar el test del módulo antes de descargar el PDF',
        requiresTest: true
      });
    }

    // Generar PDF (con cache)
    const pdfBuffer = await pdfService.getCachedOrGeneratePDF(moduleId, {
      title: module.title,
      subtitle: module.course.title,
      includeTableOfContents: true
    });

    // Registrar descarga
    await prisma.pDFDownload.create({
      data: {
        studentId,
        moduleId,
        downloadedAt: new Date()
      }
    }).catch(() => {
      // Si la tabla no existe aún, ignorar el error
      console.warn('PDFDownload table not found, skipping tracking');
    });

    // Enviar PDF
    const filename = `${module.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      error: 'Error al generar el PDF',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Verifica si el estudiante puede descargar el PDF del módulo
 */
export async function checkPDFEligibility(req: AuthRequest, res: Response) {
  try {
    const { moduleId } = req.params;
    const studentId = req.user!.id;

    // Verificar inscripción
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      select: { courseId: true, title: true }
    });

    if (!module) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }

    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: studentId,
        courseId: module.courseId
      }
    });

    if (!enrollment) {
      return res.json({
        eligible: false,
        reason: 'not_enrolled',
        message: 'No estás inscrito en este curso'
      });
    }

    // Verificar test aprobado
    const hasPassed = await pdfService.hasStudentPassedModuleTest(
      studentId,
      moduleId
    );

    if (!hasPassed) {
      // Obtener información del test
      const moduleTest = await prisma.moduleTest.findFirst({
        where: {
          moduleId,
          isActive: true
        },
        select: {
          passingScore: true,
          timeLimit: true
        }
      });

      // Obtener mejor intento
      const bestAttempt = await prisma.moduleTestSubmission.findFirst({
        where: {
          test: {
            moduleId
          },
          userId: studentId
        },
        orderBy: {
          score: 'desc'
        },
        select: {
          score: true,
          passed: true
        }
      });

      return res.json({
        eligible: false,
        reason: 'test_not_passed',
        message: 'Debes aprobar el test del módulo para descargar el PDF',
        testInfo: {
          passingScore: moduleTest?.passingScore,
          timeLimit: moduleTest?.timeLimit,
          bestScore: bestAttempt?.score || 0
        }
      });
    }

    // Verificar si ya descargó antes
    const previousDownload = await prisma.pDFDownload.findFirst({
      where: {
        studentId,
        moduleId
      },
      orderBy: {
        downloadedAt: 'desc'
      },
      select: {
        downloadedAt: true
      }
    }).catch(() => null);

    res.json({
      eligible: true,
      moduleTitle: module.title,
      previousDownload: previousDownload?.downloadedAt || null
    });

  } catch (error) {
    console.error('Error checking PDF eligibility:', error);
    res.status(500).json({
      error: 'Error al verificar elegibilidad'
    });
  }
}

/**
 * Admin: Regenera el PDF de un módulo (limpia cache)
 */
export async function regenerateModulePDF(req: AuthRequest, res: Response) {
  try {
    const { moduleId } = req.params;

    // Verificar permisos de admin
    if (req.user!.role !== 'ADMIN' && req.user!.role !== 'PROFESOR') {
      return res.status(403).json({
        error: 'No tienes permisos para esta acción'
      });
    }

    // Limpiar cache
    await pdfService.clearCache(moduleId);

    // Generar nuevo PDF
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: { select: { title: true } }
      }
    });

    if (!module) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }

    await pdfService.generateModulePDF(moduleId, {
      title: module.title,
      subtitle: module.course.title,
      includeTableOfContents: true
    });

    res.json({
      success: true,
      message: 'PDF regenerado exitosamente'
    });

  } catch (error) {
    console.error('Error regenerating PDF:', error);
    res.status(500).json({
      error: 'Error al regenerar PDF'
    });
  }
}

/**
 * Admin: Obtiene estadísticas de descargas
 */
export async function getPDFStatistics(req: AuthRequest, res: Response) {
  try {
    // Verificar permisos
    if (req.user!.role !== 'ADMIN' && req.user!.role !== 'PROFESOR') {
      return res.status(403).json({
        error: 'No tienes permisos para esta acción'
      });
    }

    const { courseId } = req.query;

    // Total de descargas
    const totalDownloads = await prisma.pDFDownload.count({
      where: courseId ? {
        module: { courseId: courseId as string }
      } : undefined
    }).catch(() => 0);

    // Descargas por módulo
    const downloadsByModule = await prisma.pDFDownload.groupBy({
      by: ['moduleId'],
      _count: true,
      where: courseId ? {
        module: { courseId: courseId as string }
      } : undefined
    }).catch(() => []);

    // Top estudiantes
    const topStudents = await prisma.pDFDownload.groupBy({
      by: ['studentId'],
      _count: true,
      orderBy: {
        _count: {
          studentId: 'desc'
        }
      },
      take: 10,
      where: courseId ? {
        module: { courseId: courseId as string }
      } : undefined
    }).catch(() => []);

    // Descargas por día (últimos 30 días)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const downloadsByDay = await prisma.$queryRaw`
      SELECT DATE(downloadedAt) as date, COUNT(*) as count
      FROM PDFDownload
      WHERE downloadedAt >= ${thirtyDaysAgo}
      ${courseId ? prisma.$queryRaw`AND moduleId IN (SELECT id FROM Module WHERE courseId = ${courseId})` : prisma.$queryRaw``}
      GROUP BY DATE(downloadedAt)
      ORDER BY date DESC
    `.catch(() => []);

    res.json({
      totalDownloads,
      downloadsByModule,
      topStudents,
      downloadsByDay
    });

  } catch (error) {
    console.error('Error getting PDF statistics:', error);
    res.status(500).json({
      error: 'Error al obtener estadísticas'
    });
  }
}

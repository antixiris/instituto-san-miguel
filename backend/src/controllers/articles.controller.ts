// Controlador de artículos de investigación (Notebook)
import { Response, NextFunction } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { prisma } from '../utils/prisma';
import { slugify } from '../utils/slugify';
import { NotFoundError, AuthorizationError, ValidationError } from '../utils/errors';
import { UserRole } from '@prisma/client';

/**
 * Obtener todos los artículos (público con filtros)
 */
export async function getAllArticles(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const {
      page = '1',
      limit = '12',
      search,
      category,
      tag,
      featured,
      author,
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Construir filtros
    const where: any = {};

    // Solo mostrar artículos publicados para usuarios no autenticados o sin permisos
    if (!req.user || (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.INSTRUCTOR)) {
      where.published = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { subtitle: { contains: search as string, mode: 'insensitive' } },
        { excerpt: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.categoryId = category as string;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (author) {
      where.authorId = author as string;
    }

    if (tag) {
      where.tags = {
        some: {
          tagId: tag as string,
        },
      };
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              bio: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              color: true,
            },
          },
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      prisma.article.count({ where }),
    ]);

    // Transformar para incluir solo los tags (sin la relación intermedia)
    const articlesWithTags = articles.map(article => ({
      ...article,
      tags: article.tags.map(t => t.tag),
    }));

    const response: ApiResponse = {
      success: true,
      data: {
        articles: articlesWithTags,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener un artículo por slug
 */
export async function getArticleBySlug(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;

    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            description: true,
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        footnotes: {
          orderBy: {
            order: 'asc',
          },
        },
        media: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!article) {
      throw new NotFoundError('Artículo no encontrado');
    }

    // Verificar si el artículo está publicado
    if (
      !article.published &&
      (!req.user ||
        (req.user.role !== UserRole.ADMIN &&
         req.user.role !== UserRole.INSTRUCTOR &&
         req.user.id !== article.authorId))
    ) {
      throw new NotFoundError('Artículo no encontrado');
    }

    // Incrementar contador de vistas (solo para artículos publicados y no para el autor)
    if (article.published && (!req.user || req.user.id !== article.authorId)) {
      await prisma.article.update({
        where: { id: article.id },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }

    // Transformar tags
    const articleWithTags = {
      ...article,
      tags: article.tags.map(t => t.tag),
    };

    const response: ApiResponse = {
      success: true,
      data: articleWithTags,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Crear un nuevo artículo (solo instructor y admin)
 */
export async function createArticle(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const {
      title,
      subtitle,
      excerpt,
      content,
      coverImage,
      categoryId,
      featured,
      published,
      tags,
      footnotes,
    } = req.body;

    // Generar slug único
    const baseSlug = slugify(title);
    const existingArticles = await prisma.article.findMany({
      where: {
        slug: {
          startsWith: baseSlug,
        },
      },
      select: { slug: true },
    });

    let slug = baseSlug;
    let counter = 1;
    while (existingArticles.some(a => a.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Calcular tiempo de lectura estimado (aprox. 200 palabras por minuto)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Crear artículo
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        subtitle,
        excerpt,
        content,
        coverImage,
        authorId: req.user.id,
        categoryId,
        featured: featured || false,
        published: published || false,
        readingTime,
        publishedAt: published ? new Date() : null,
        tags: tags ? {
          create: tags.map((tagId: string) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        } : undefined,
        footnotes: footnotes ? {
          create: footnotes.map((note: any, index: number) => ({
            number: note.number || index + 1,
            content: note.content,
            order: index,
          })),
        } : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        footnotes: true,
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Artículo creado exitosamente',
      data: {
        ...article,
        tags: article.tags.map(t => t.tag),
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Actualizar un artículo
 */
export async function updateArticle(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;
    const updateData = req.body;

    // Verificar que el artículo existe
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      throw new NotFoundError('Artículo no encontrado');
    }

    // Verificar permisos (solo el autor o admin)
    if (
      req.user.role !== UserRole.ADMIN &&
      existingArticle.authorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para editar este artículo');
    }

    // Recalcular tiempo de lectura si se actualiza el contenido
    if (updateData.content) {
      const wordCount = updateData.content.split(/\s+/).length;
      updateData.readingTime = Math.ceil(wordCount / 200);
    }

    // Establecer publishedAt si se publica por primera vez
    if (updateData.published && !existingArticle.publishedAt) {
      updateData.publishedAt = new Date();
    }

    // Actualizar tags si se proporcionan
    if (updateData.tags) {
      // Eliminar tags existentes
      await prisma.articleTag.deleteMany({
        where: { articleId: id },
      });
      // Crear nuevos tags
      updateData.tags = {
        create: updateData.tags.map((tagId: string) => ({
          tag: {
            connect: { id: tagId },
          },
        })),
      };
    }

    // Actualizar footnotes si se proporcionan
    if (updateData.footnotes) {
      // Eliminar footnotes existentes
      await prisma.articleFootnote.deleteMany({
        where: { articleId: id },
      });
      // Crear nuevos footnotes
      updateData.footnotes = {
        create: updateData.footnotes.map((note: any, index: number) => ({
          number: note.number || index + 1,
          content: note.content,
          order: index,
        })),
      };
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        footnotes: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Artículo actualizado exitosamente',
      data: {
        ...article,
        tags: article.tags.map(t => t.tag),
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Eliminar un artículo
 */
export async function deleteArticle(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const { id } = req.params;

    // Verificar que el artículo existe
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundError('Artículo no encontrado');
    }

    // Verificar permisos (solo el autor o admin)
    if (
      req.user.role !== UserRole.ADMIN &&
      article.authorId !== req.user.id
    ) {
      throw new AuthorizationError('No tienes permiso para eliminar este artículo');
    }

    // Eliminar artículo (Prisma eliminará automáticamente las relaciones)
    await prisma.article.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Artículo eliminado exitosamente',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener categorías de artículos
 */
export async function getArticleCategories(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const categories = await prisma.articleCategory.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        _count: {
          select: {
            articles: true,
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

/**
 * Obtener tags de artículos
 */
export async function getArticleTags(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const tags = await prisma.articleTagName.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });

    const response: ApiResponse = {
      success: true,
      data: tags,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtener artículos del autor actual
 */
export async function getMyArticles(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AuthorizationError('Usuario no autenticado');
    }

    const articles = await prisma.article.findMany({
      where: {
        authorId: req.user.id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        _count: {
          select: {
            footnotes: true,
            media: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const articlesWithTags = articles.map(article => ({
      ...article,
      tags: article.tags.map(t => t.tag),
    }));

    const response: ApiResponse = {
      success: true,
      data: articlesWithTags,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}

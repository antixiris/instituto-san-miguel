// Servicio para artículos de investigación (Notebook)
import api from './api';

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  order: number;
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleFootnote {
  id: string;
  number: number;
  content: string;
  order: number;
}

export interface ArticleMedia {
  id: string;
  type: string;
  url: string;
  caption?: string;
  alt?: string;
  width?: number;
  height?: number;
  order: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
  };
  category?: ArticleCategory;
  tags: ArticleTag[];
  footnotes?: ArticleFootnote[];
  media?: ArticleMedia[];
  published: boolean;
  featured: boolean;
  readingTime?: number;
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetArticlesParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  author?: string;
}

export interface GetArticlesResponse {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateArticleData {
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  categoryId?: string;
  featured?: boolean;
  published?: boolean;
  tags?: string[];
  footnotes?: Array<{
    number?: number;
    content: string;
  }>;
}

export interface UpdateArticleData {
  title?: string;
  subtitle?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  categoryId?: string;
  featured?: boolean;
  published?: boolean;
  tags?: string[];
  footnotes?: Array<{
    number?: number;
    content: string;
  }>;
}

class ArticlesService {
  /**
   * Obtener todos los artículos
   */
  async getArticles(params?: GetArticlesParams): Promise<GetArticlesResponse> {
    const response = await api.get('/articles', { params });
    return response.data.data;
  }

  /**
   * Obtener un artículo por slug
   */
  async getArticleBySlug(slug: string): Promise<Article> {
    const response = await api.get(`/articles/${slug}`);
    return response.data.data;
  }

  /**
   * Obtener categorías de artículos
   */
  async getCategories(): Promise<ArticleCategory[]> {
    const response = await api.get('/articles/categories');
    return response.data.data;
  }

  /**
   * Obtener tags de artículos
   */
  async getTags(): Promise<ArticleTag[]> {
    const response = await api.get('/articles/tags');
    return response.data.data;
  }

  /**
   * Obtener mis artículos (autor actual)
   */
  async getMyArticles(): Promise<Article[]> {
    const response = await api.get('/articles/my/articles');
    return response.data.data;
  }

  /**
   * Crear un nuevo artículo
   */
  async createArticle(data: CreateArticleData): Promise<Article> {
    const response = await api.post('/articles', data);
    return response.data.data;
  }

  /**
   * Actualizar un artículo
   */
  async updateArticle(id: string, data: UpdateArticleData): Promise<Article> {
    const response = await api.put(`/articles/${id}`, data);
    return response.data.data;
  }

  /**
   * Eliminar un artículo
   */
  async deleteArticle(id: string): Promise<void> {
    await api.delete(`/articles/${id}`);
  }
}

export const articlesService = new ArticlesService();

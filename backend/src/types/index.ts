// Types compartidos del backend
import { Request } from 'express';
import { UserRole } from '@prisma/client';

// Extensión del Request de Express para incluir usuario autenticado
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

// Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: any[];
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

// Course types
export interface CreateCourseData {
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  level: string;
  price?: number;
  duration?: number;
  prerequisites?: string[];
  learningGoals?: string[];
  categoryId?: string;
}

export interface UpdateCourseData extends Partial<CreateCourseData> {
  status?: string;
  published?: boolean;
}

// Module types
export interface CreateModuleData {
  title: string;
  description?: string;
  order: number;
  courseId: string;
}

// Lesson types
export interface CreateLessonData {
  title: string;
  description?: string;
  type: string;
  content?: string;
  videoUrl?: string;
  videoDuration?: number;
  resources?: any[];
  order: number;
  moduleId: string;
  isFree?: boolean;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Servicio de cursos
import api from './api';
import { Course, ApiResponse, PaginatedResponse, Enrollment } from '../types';

interface GetCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
  featured?: boolean;
  instructor?: string;
}

export const coursesService = {
  // Obtener todos los cursos
  async getCourses(params?: GetCoursesParams): Promise<PaginatedResponse<Course>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Course>>>('/courses', {
      params,
    });
    return response.data.data!;
  },

  // Obtener curso por slug
  async getCourseBySlug(slug: string): Promise<Course> {
    const response = await api.get<ApiResponse<Course>>(`/courses/${slug}`);
    return response.data.data!;
  },

  // Inscribirse en un curso
  async enrollInCourse(courseId: string): Promise<Enrollment> {
    const response = await api.post<ApiResponse<Enrollment>>(`/courses/${courseId}/enroll`);
    return response.data.data!;
  },

  // Obtener mis cursos
  async getMyCourses(): Promise<Enrollment[]> {
    const response = await api.get<ApiResponse<Enrollment[]>>('/courses/my/enrollments');
    return response.data.data!;
  },

  // Crear curso (instructor/admin)
  async createCourse(data: Partial<Course>): Promise<Course> {
    const response = await api.post<ApiResponse<Course>>('/courses', data);
    return response.data.data!;
  },

  // Actualizar curso (instructor/admin)
  async updateCourse(courseId: string, data: Partial<Course>): Promise<Course> {
    const response = await api.put<ApiResponse<Course>>(`/courses/${courseId}`, data);
    return response.data.data!;
  },

  // Eliminar curso (instructor/admin)
  async deleteCourse(courseId: string): Promise<void> {
    await api.delete(`/courses/${courseId}`);
  },
};

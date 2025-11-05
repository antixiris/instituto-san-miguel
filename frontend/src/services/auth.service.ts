// Servicio de autenticación
import api from './api';
import { AuthResponse, LoginCredentials, RegisterData, User, ApiResponse } from '../types';

export const authService = {
  // Registro
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data!;
  },

  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data!;
  },

  // Obtener perfil
  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/profile');
    return response.data.data!;
  },

  // Actualizar perfil
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<ApiResponse<User>>('/auth/profile', data);
    return response.data.data!;
  },

  // Cambiar contraseña
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  // Guardar tokens en localStorage
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  // Guardar usuario en localStorage
  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Obtener usuario de localStorage
  getUser(): User | null {
    console.log('📖 Reading user from localStorage...');
    const userStr = localStorage.getItem('user');
    console.log('📖 Raw user string:', userStr ? `${userStr.substring(0, 100)}...` : 'NULL');
    if (!userStr) {
      console.log('❌ No user in localStorage');
      return null;
    }
    try {
      const user = JSON.parse(userStr);
      console.log('✅ User parsed:', user.email);
      return user;
    } catch (e) {
      console.log('❌ Error parsing user:', e);
      return null;
    }
  },

  // Logout
  logout(): void {
    console.log('🗑️ CLEARING localStorage from:', new Error().stack);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log('🔑 Checking authentication, has token:', !!token);
    return !!token;
  },
};

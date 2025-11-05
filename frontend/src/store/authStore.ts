// Store de autenticación con Zustand
import { create } from 'zustand';
import { User, LoginCredentials, RegisterData } from '../types';
import { authService } from '../services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loadUser: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authService.getUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.login(credentials);
      authService.saveTokens(response.accessToken, response.refreshToken);
      authService.saveUser(response.user);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al iniciar sesión',
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.register(data);
      authService.saveTokens(response.accessToken, response.refreshToken);
      authService.saveUser(response.user);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al registrarse',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    console.log('🚪 LOGOUT called from:', new Error().stack);
    authService.logout();
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  loadUser: async () => {
    console.log('🔄 loadUser called');
    const user = authService.getUser();
    const isAuthenticated = authService.isAuthenticated();
    console.log('📊 Current state:', { hasUser: !!user, isAuthenticated });

    // Si tiene token pero no tiene user data, cargar desde el servidor
    if (isAuthenticated && !user) {
      console.log('⚠️ Has token but no user, fetching profile...');
      try {
        set({ isLoading: true });
        const profile = await authService.getProfile();
        console.log('✅ Profile loaded:', profile.email);
        authService.saveUser(profile);
        set({ user: profile, isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error('❌ Error loading user profile:', error);
        // Si falla, hacer logout
        authService.logout();
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      console.log('✅ Setting user from localStorage');
      set({ user, isAuthenticated });
    }
  },

  updateUser: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await authService.updateProfile(data);
      authService.saveUser(updatedUser);
      set({
        user: updatedUser,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al actualizar perfil',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

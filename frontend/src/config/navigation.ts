// Configuración de navegación adaptativa por rol
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  User,
  ClipboardCheck,
  TrendingUp,
  FileEdit,
  Award,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number; // Para mostrar contadores (ej: tickets pendientes)
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// Navegación para ADMIN
export const adminNavigation: NavGroup[] = [
  {
    label: 'Principal',
    items: [
      { to: '/campus', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Gestión',
    items: [
      { to: '/campus/admin/cursos', icon: BookOpen, label: 'Cursos' },
      { to: '/campus/admin/usuarios', icon: Users, label: 'Usuarios' },
      { to: '/campus/admin/articulos', icon: FileText, label: 'Artículos' },
    ],
  },
  {
    label: 'Comunicación',
    items: [
      { to: '/campus/admin/tickets', icon: MessageSquare, label: 'Tickets' },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { to: '/campus/admin/estadisticas', icon: BarChart3, label: 'Estadísticas' },
    ],
  },
  {
    label: 'Cuenta',
    items: [
      { to: '/campus/perfil', icon: User, label: 'Mi Perfil' },
      { to: '/campus/configuracion', icon: Settings, label: 'Configuración' },
    ],
  },
];

// Navegación para PROFESOR
export const profesorNavigation: NavGroup[] = [
  {
    label: 'Principal',
    items: [
      { to: '/campus', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Académico',
    items: [
      { to: '/campus/profesor/cursos', icon: BookOpen, label: 'Mis Cursos' },
      { to: '/campus/profesor/alumnos', icon: Users, label: 'Mis Alumnos' },
      { to: '/campus/profesor/ejercicios', icon: ClipboardCheck, label: 'Ejercicios Pendientes' },
    ],
  },
  {
    label: 'Comunicación',
    items: [
      { to: '/campus/profesor/tickets', icon: MessageSquare, label: 'Tickets' },
    ],
  },
  {
    label: 'Análisis',
    items: [
      { to: '/campus/profesor/estadisticas', icon: BarChart3, label: 'Estadísticas' },
    ],
  },
  {
    label: 'Cuenta',
    items: [
      { to: '/campus/perfil', icon: User, label: 'Mi Perfil' },
    ],
  },
];

// Navegación para ALUMNO (STUDENT)
export const alumnoNavigation: NavGroup[] = [
  {
    label: 'Principal',
    items: [
      { to: '/campus', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Aprendizaje',
    items: [
      { to: '/campus/mis-cursos', icon: BookOpen, label: 'Mis Cursos' },
      { to: '/campus/mi-progreso', icon: TrendingUp, label: 'Mi Progreso' },
      { to: '/campus/ejercicios', icon: FileEdit, label: 'Ejercicios' },
    ],
  },
  {
    label: 'Comunicación',
    items: [
      { to: '/campus/mensajes', icon: MessageSquare, label: 'Mensajes' },
    ],
  },
  {
    label: 'Logros',
    items: [
      { to: '/campus/certificados', icon: Award, label: 'Certificados' },
    ],
  },
  {
    label: 'Cuenta',
    items: [
      { to: '/campus/perfil', icon: User, label: 'Mi Perfil' },
    ],
  },
];

// Función helper para obtener navegación según rol
export function getNavigationByRole(role: 'ADMIN' | 'INSTRUCTOR' | 'PROFESOR' | 'STUDENT'): NavGroup[] {
  // Normalizamos INSTRUCTOR a PROFESOR
  const normalizedRole = role === 'INSTRUCTOR' ? 'PROFESOR' : role;

  switch (normalizedRole) {
    case 'ADMIN':
      return adminNavigation;
    case 'PROFESOR':
      return profesorNavigation;
    case 'STUDENT':
      return alumnoNavigation;
    default:
      return alumnoNavigation; // Fallback
  }
}

// Configuración de colores por rol
export const roleColors = {
  ADMIN: {
    primary: 'red-600',
    primaryDark: 'red-500',
    bg: 'red-50',
    border: 'red-200',
    text: 'red-700',
  },
  PROFESOR: {
    primary: 'blue-600',
    primaryDark: 'blue-500',
    bg: 'blue-50',
    border: 'blue-200',
    text: 'blue-700',
  },
  STUDENT: {
    primary: 'green-600',
    primaryDark: 'green-500',
    bg: 'green-50',
    border: 'green-200',
    text: 'green-700',
  },
};

// Helper para obtener color según rol
export function getRoleColor(role: 'ADMIN' | 'INSTRUCTOR' | 'PROFESOR' | 'STUDENT', variant: 'primary' | 'bg' | 'border' | 'text' = 'primary'): string {
  const normalizedRole = role === 'INSTRUCTOR' ? 'PROFESOR' : role;
  return roleColors[normalizedRole]?.[variant] || roleColors.STUDENT[variant];
}

// Helper para obtener clases completas de Tailwind (evita problemas con clases dinámicas)
export function getRoleClasses(role: 'ADMIN' | 'INSTRUCTOR' | 'PROFESOR' | 'STUDENT' | undefined) {
  const normalizedRole = role === 'INSTRUCTOR' ? 'PROFESOR' : (role || 'STUDENT');

  const classes = {
    ADMIN: {
      iconColor: 'text-red-600',
      bgPrimary: 'bg-red-600',
      bgPrimaryDark: 'bg-red-500',
      bgLight: 'bg-red-50',
      textPrimary: 'text-red-600',
      textDark: 'text-red-700',
      borderColor: 'border-red-200',
      // Para items activos del sidebar
      activeBg: 'bg-red-50 dark:bg-red-600 dark:bg-opacity-10',
      activeText: 'text-red-600',
      badgeBg: 'bg-red-600',
    },
    PROFESOR: {
      iconColor: 'text-blue-600',
      bgPrimary: 'bg-blue-600',
      bgPrimaryDark: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textPrimary: 'text-blue-600',
      textDark: 'text-blue-700',
      borderColor: 'border-blue-200',
      activeBg: 'bg-blue-50 dark:bg-blue-600 dark:bg-opacity-10',
      activeText: 'text-blue-600',
      badgeBg: 'bg-blue-600',
    },
    STUDENT: {
      iconColor: 'text-green-600',
      bgPrimary: 'bg-green-600',
      bgPrimaryDark: 'bg-green-500',
      bgLight: 'bg-green-50',
      textPrimary: 'text-green-600',
      textDark: 'text-green-700',
      borderColor: 'border-green-200',
      activeBg: 'bg-green-50 dark:bg-green-600 dark:bg-opacity-10',
      activeText: 'text-green-600',
      badgeBg: 'bg-green-600',
    },
  };

  return classes[normalizedRole];
}

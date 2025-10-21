import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

/**
 * ThemeProvider - Componente que sincroniza el tema con el DOM
 * Se asegura de que los cambios en el store se reflejen en document.documentElement
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    // Aplicar tema al montar y cada vez que cambie
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return <>{children}</>;
}

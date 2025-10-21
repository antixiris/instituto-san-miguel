import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

// Function to apply theme to DOM
const applyThemeToDom = (isDark: boolean) => {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true, // Dark mode por defecto
      toggleTheme: () => {
        set((state) => {
          const newIsDark = !state.isDark;
          applyThemeToDom(newIsDark);
          return { isDark: newIsDark };
        });
      },
      setTheme: (isDark: boolean) => {
        set({ isDark });
        applyThemeToDom(isDark);
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            applyThemeToDom(state.isDark);
          }
        };
      },
    }
  )
);

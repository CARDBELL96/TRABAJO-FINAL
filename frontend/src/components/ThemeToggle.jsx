import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Inicializar el tema desde localStorage o detectar preferencia del sistema
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Tema por defecto si no hay window (SSR)
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="theme-toggle-wrapper">
      <div className="theme-toggle" data-theme={theme} onClick={toggleTheme}>
        <button type="button" className="theme-icon-button" aria-label="Light">
          <Sun size={20} />
        </button>
        <button type="button" className="theme-icon-button" aria-label="Dark">
          <Moon size={20} />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
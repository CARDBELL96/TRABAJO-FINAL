import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import '../styles/ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="theme-switcher-container">
      <button
        className={`theme-switcher ${theme}`}
        onClick={toggleTheme}
        aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      >
        <div className="icon-wrapper">
          <Sun size={16} className="sun-icon" />
        </div>
        <div className="icon-wrapper">
          <Moon size={16} className="moon-icon" />
        </div>
        <div className="switcher-circle"></div>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
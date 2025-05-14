import { createContext, useEffect, useState } from 'react';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import { Outlet } from 'react-router';

export const ThemeContext = createContext(null);

function AppLayout() {
  const getInitialTheme = () => {
    try {
      const storedTheme = localStorage.getItem('themeMode');
      return storedTheme ? JSON.parse(storedTheme) : 'light';
    } catch {
      return 'light';
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('themeMode', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default AppLayout;

import * as React from 'react';

import ThemeContext from '../context/theme-context';

const useTheme = () => {
  const [theme, setTheme] = React.useContext(ThemeContext);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      if (localStorage?.theme === 'light') {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
        setTheme('dark');
      } else {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
        setTheme('light');
      }
    }
  };

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;

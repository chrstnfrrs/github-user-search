import * as React from 'react';
import ThemeContext from '../context/theme-context';

const selectTheme = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return localStorage?.theme || 'light';
};

const ThemeProvider = ({ children }) => {
  const theme = React.useState('light');

  // This is used due to hydration errors with nextjs expecting lightmode on server side.
  React.useEffect(() => {
    theme[1](selectTheme());
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

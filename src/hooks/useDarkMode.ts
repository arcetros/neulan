import React, { useEffect, useState } from 'react';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  const element = document.querySelector<HTMLElement>('html');

  useEffect(() => {
    if (element) {
      if (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        setDarkMode(true);
        element.classList.add('dark');
      } else {
        setDarkMode(false);
        element.classList.remove('dark');
      }
    }
  }, []);

  function toggleDarkMode() {
    if (element) {
      if (localStorage.getItem('theme') === 'dark') {
        element.classList.remove('dark');
        setDarkMode(false);
        localStorage.setItem('theme', 'light');
      } else {
        element.classList.add('dark');
        setDarkMode(true);
        localStorage.setItem('theme', 'dark');
      }
    }
  }

  return { toggleDarkMode, darkMode };
}

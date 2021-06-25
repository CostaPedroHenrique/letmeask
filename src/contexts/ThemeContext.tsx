import { useEffect } from 'react';
import { ReactNode, createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode
}

type ThemeContextType = {
  theme: Theme;
  toogleTheme: (themeSelected: boolean) => void;
}
const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({children}: ThemeContextProviderProps){
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('theme');

    return (storagedTheme ?? 'dark') as Theme;
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  },[currentTheme]);

  function toogleTheme(themeSelected: boolean) {
    
    setCurrentTheme(themeSelected ? 'light' : 'dark')
  }
  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toogleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
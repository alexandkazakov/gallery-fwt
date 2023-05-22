import { createContext, useState, useEffect, useCallback } from "react";

export const ThemeContext = createContext({ isDarkTheme: false });

export const ThemeProvider = ({ children }) => {
  const isDarkThemeRestored = JSON.parse(localStorage.getItem("theme"));

  const [isDarkTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    if (isDarkThemeRestored !== null) {
      setChangeTheme(isDarkThemeRestored);
    }
  }, [isDarkThemeRestored]);

  const changeTheme = useCallback(() => {
    localStorage.setItem("theme", JSON.stringify(!isDarkTheme));
    setChangeTheme(!isDarkTheme);
  }, [isDarkTheme]);

  const value = { isDarkTheme, changeTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

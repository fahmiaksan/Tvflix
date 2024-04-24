import { useEffect, useState } from "react";
const [theme, setTheme] = useState(localStorage.theme);
const isDarkMode = theme === "dark" ? 'light' : 'dark';
useEffect(() => {
  const root = window.document.documentElement;

});
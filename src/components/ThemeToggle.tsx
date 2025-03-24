
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-full w-10 h-10 transition-all duration-300 ease-in-out bg-gradient-to-br from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 dark:from-teal-500 dark:to-teal-600 dark:hover:from-teal-400 dark:hover:to-teal-500 hover:scale-105"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-200 animate-pulse-scale" />
      ) : (
        <Moon className="h-5 w-5 text-white animate-pulse-scale" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;

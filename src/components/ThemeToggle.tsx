
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
      className="rounded-full w-9 h-9 bg-white/20 hover:bg-white/30 transition-all duration-300 ease-in-out"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-200 animate-scale-in" />
      ) : (
        <Moon className="h-5 w-5 text-white animate-scale-in" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;

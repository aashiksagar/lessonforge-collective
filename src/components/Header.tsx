
import React from 'react';
import { Book } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useLessons } from '@/context/LessonContext';
import ProgressBar from './ProgressBar';

const Header = () => {
  const { progressPercentage } = useLessons();

  return (
    <header className="w-full bg-background/80 backdrop-blur-md py-4 px-4 sm:px-6 sticky top-0 z-50 border-b border-border animate-slide-down">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Book className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-heading tracking-tight">
              Learn Easy Hub
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="mt-4">
          <ProgressBar percentage={progressPercentage} />
        </div>
      </div>
    </header>
  );
};

export default Header;

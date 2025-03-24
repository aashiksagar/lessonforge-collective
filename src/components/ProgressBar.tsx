
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full bg-white/10 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-primary">Your Progress</span>
        <span className="text-sm font-medium">{percentage}% Complete</span>
      </div>
      <Progress 
        value={percentage} 
        className="h-3 bg-secondary/50 rounded-full"
      />
      <p className="text-xs text-muted-foreground mt-2">
        {percentage < 25 ? "Just getting started! Keep going!" :
         percentage < 50 ? "Making good progress!" :
         percentage < 75 ? "Well done! You're over halfway there!" :
         percentage < 100 ? "Almost there! Just a few more lessons!" :
         "Congratulations! You've completed all lessons!"}
      </p>
    </div>
  );
};

export default ProgressBar;

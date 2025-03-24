
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">Your Progress</span>
        <span className="text-sm font-medium">{percentage}% Complete</span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 bg-secondary/50"
      />
    </div>
  );
};

export default ProgressBar;

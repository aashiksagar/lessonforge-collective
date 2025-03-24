
import React from 'react';
import { useLessons } from '@/context/LessonContext';
import { Check, Clock } from 'lucide-react';

const Timeline = () => {
  const { timeline } = useLessons();

  if (timeline.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground animate-fade-in">
        <Clock className="h-10 w-10 mx-auto mb-4 opacity-50" />
        <p>Your learning journey will appear here once you complete lessons</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <span className="mr-2">Your Learning Journey</span>
      </h2>
      
      <div className="space-y-4">
        {timeline.map((entry, index) => (
          <div 
            key={`${entry.lessonId}-${index}`}
            className="flex group"
          >
            <div className="mr-4 flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-primary" />
              </div>
              {index < timeline.length - 1 && (
                <div className="w-0.5 h-full bg-border mt-1" />
              )}
            </div>
            
            <div 
              className="glass-card rounded-lg p-4 flex-1 mb-4 group-hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="font-medium text-sm mb-1 sm:mb-0">
                  {entry.lessonTitle}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {entry.dateCompleted}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

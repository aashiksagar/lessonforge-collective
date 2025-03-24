
import React from 'react';
import { useLessons } from '@/context/LessonContext';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const RecommendedLessons = () => {
  const { recommendedLessons } = useLessons();

  if (recommendedLessons.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Recommended for You</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedLessons.map((lesson) => (
          <div 
            key={lesson.id}
            className="glass-card rounded-xl p-4 transition-all duration-300 hover:shadow-lg animate-fade-in"
          >
            <span className={`difficulty-badge ${
              lesson.difficulty === 'Beginner' 
                ? 'difficulty-badge-beginner' 
                : lesson.difficulty === 'Intermediate'
                  ? 'difficulty-badge-intermediate'
                  : 'difficulty-badge-advanced'
            } mb-2`}>
              {lesson.difficulty}
            </span>
            
            <h3 className="text-base font-medium mb-2">{lesson.title}</h3>
            <p className="text-muted-foreground text-xs mb-4 line-clamp-2">{lesson.description}</p>
            
            <Button variant="ghost" size="sm" className="text-primary mt-auto">
              View Lesson
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedLessons;

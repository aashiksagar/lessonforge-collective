
import React from 'react';
import { Check, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useLessons } from '@/context/LessonContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Lesson } from '@/context/LessonContext';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const { toggleLessonCompletion, handleLike } = useLessons();

  const handleCompletionToggle = () => {
    toggleLessonCompletion(lesson.id);
    
    if (!lesson.completed) {
      toast({
        title: "Great job!",
        description: "Keep learning and growing. You're making excellent progress!",
        duration: 3000,
      });
    }
  };

  const getDifficultyClass = () => {
    switch (lesson.difficulty) {
      case 'Beginner':
        return 'difficulty-badge-beginner';
      case 'Intermediate':
        return 'difficulty-badge-intermediate';
      case 'Advanced':
        return 'difficulty-badge-advanced';
      default:
        return '';
    }
  };

  return (
    <div className="glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-lg animate-scale-in">
      <div className="flex justify-between items-start mb-2">
        <span className={`difficulty-badge ${getDifficultyClass()}`}>
          {lesson.difficulty}
        </span>
        
        <div className="flex items-center">
          <Checkbox 
            id={`lesson-${lesson.id}`}
            checked={lesson.completed}
            onCheckedChange={handleCompletionToggle}
            className="mr-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <label 
            htmlFor={`lesson-${lesson.id}`}
            className="text-sm cursor-pointer"
          >
            {lesson.completed ? 'Completed' : 'Mark Complete'}
          </label>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{lesson.description}</p>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleLike(lesson.id, true)}
            data-active={lesson.userLiked === true}
            className="data-[active=true]:text-primary data-[active=true]:bg-primary/10 hover:bg-primary/5"
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleLike(lesson.id, false)}
            data-active={lesson.userLiked === false}
            className="data-[active=true]:text-destructive data-[active=true]:bg-destructive/10 hover:bg-destructive/5"
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {lesson.likes} {Math.abs(lesson.likes) === 1 ? 'like' : 'likes'}
          </span>
        </div>
        
        <Button variant="ghost" size="sm" className="text-primary">
          View Lesson
        </Button>
      </div>
    </div>
  );
};

export default LessonCard;

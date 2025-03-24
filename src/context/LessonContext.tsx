
import React, { createContext, useContext, useEffect, useState } from 'react';

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  completed: boolean;
  likes: number;
  userLiked: boolean | null; // null = not voted, true = liked, false = disliked
  dateCompleted?: string;
}

interface TimelineEntry {
  lessonId: string;
  lessonTitle: string;
  dateCompleted: string;
}

interface LessonContextType {
  lessons: Lesson[];
  completedLessons: Lesson[];
  timeline: TimelineEntry[];
  recommendedLessons: Lesson[];
  searchTerm: string;
  difficultyFilter: 'All' | Difficulty;
  progressPercentage: number;
  addLesson: (title: string, description: string, difficulty: Difficulty) => void;
  toggleLessonCompletion: (id: string) => void;
  handleLike: (id: string, liked: boolean) => void;
  setSearchTerm: (term: string) => void;
  setDifficultyFilter: (filter: 'All' | Difficulty) => void;
  filteredLessons: Lesson[];
}

const defaultLessons: Lesson[] = [
  {
    id: '1',
    title: 'Math Basics - Addition and Subtraction',
    description: 'Learn the fundamental operations of addition and subtraction with interactive examples.',
    difficulty: 'Beginner',
    completed: false,
    likes: 24,
    userLiked: null
  },
  {
    id: '2',
    title: 'English Grammar - Nouns and Pronouns',
    description: 'Understand the building blocks of sentences with this introduction to nouns and pronouns.',
    difficulty: 'Beginner',
    completed: false,
    likes: 18,
    userLiked: null
  },
  {
    id: '3',
    title: 'Science - Introduction to Photosynthesis',
    description: 'Explore how plants convert sunlight into energy through the process of photosynthesis.',
    difficulty: 'Intermediate',
    completed: false,
    likes: 32,
    userLiked: null
  },
  {
    id: '4',
    title: 'History - Ancient Civilizations',
    description: 'Journey through time to discover the wonders of ancient Egypt, Greece, and Rome.',
    difficulty: 'Intermediate',
    completed: false,
    likes: 27,
    userLiked: null
  },
  {
    id: '5',
    title: 'Computer Science - Algorithms Basics',
    description: 'Learn the fundamentals of algorithmic thinking and problem-solving techniques.',
    difficulty: 'Advanced',
    completed: false,
    likes: 41,
    userLiked: null
  }
];

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load lessons from localStorage or use defaults
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const savedLessons = localStorage.getItem('lessons');
    return savedLessons ? JSON.parse(savedLessons) : defaultLessons;
  });
  
  // Timeline for completed lessons
  const [timeline, setTimeline] = useState<TimelineEntry[]>(() => {
    const savedTimeline = localStorage.getItem('timeline');
    return savedTimeline ? JSON.parse(savedTimeline) : [];
  });
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
  
  // Save to localStorage whenever lessons or timeline change
  useEffect(() => {
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }, [lessons]);
  
  useEffect(() => {
    localStorage.setItem('timeline', JSON.stringify(timeline));
  }, [timeline]);
  
  // Filtered lessons based on search and difficulty
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || lesson.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });
  
  // Completed lessons
  const completedLessons = lessons.filter(lesson => lesson.completed);
  
  // Calculate progress percentage
  const progressPercentage = lessons.length > 0 
    ? Math.round((completedLessons.length / lessons.length) * 100) 
    : 0;
  
  // Generate recommended lessons based on completed lessons
  const recommendedLessons = React.useMemo(() => {
    if (completedLessons.length === 0) {
      // If no completed lessons, recommend popular lessons (most likes)
      return [...lessons]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3);
    }
    
    // Extract keywords from completed lesson titles
    const keywords = completedLessons
      .map(lesson => lesson.title.split(' '))
      .flat()
      .map(word => word.toLowerCase())
      .filter(word => word.length > 3); // Only consider meaningful words
    
    // Score each uncompleted lesson based on keyword matches
    const scoredLessons = lessons
      .filter(lesson => !lesson.completed)
      .map(lesson => {
        const lessonWords = lesson.title.toLowerCase().split(' ');
        const matchScore = keywords.reduce((score, keyword) => {
          return lessonWords.some(word => word.includes(keyword)) ? score + 1 : score;
        }, 0);
        return { lesson, matchScore };
      });
    
    // Return the top 3 lessons with highest match scores, or most likes if tied
    return scoredLessons
      .sort((a, b) => b.matchScore - a.matchScore || b.lesson.likes - a.lesson.likes)
      .map(item => item.lesson)
      .slice(0, 3);
  }, [lessons, completedLessons]);
  
  // Add a new lesson
  const addLesson = (title: string, description: string, difficulty: Difficulty) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title,
      description,
      difficulty,
      completed: false,
      likes: 0,
      userLiked: null
    };
    setLessons(prevLessons => [...prevLessons, newLesson]);
  };
  
  // Toggle completion status of a lesson
  const toggleLessonCompletion = (id: string) => {
    setLessons(prevLessons => 
      prevLessons.map(lesson => {
        if (lesson.id === id) {
          const completed = !lesson.completed;
          
          // If marking as completed, add to timeline
          if (completed) {
            const now = new Date();
            const dateString = now.toLocaleString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            
            // Add to timeline
            setTimeline(prevTimeline => [
              ...prevTimeline,
              {
                lessonId: id,
                lessonTitle: lesson.title,
                dateCompleted: dateString
              }
            ]);
            
            return { ...lesson, completed, dateCompleted: dateString };
          }
          
          // If marking as uncompleted, remove from timeline
          else {
            setTimeline(prevTimeline => 
              prevTimeline.filter(entry => entry.lessonId !== id)
            );
            return { ...lesson, completed, dateCompleted: undefined };
          }
        }
        return lesson;
      })
    );
  };
  
  // Handle like/dislike
  const handleLike = (id: string, liked: boolean) => {
    setLessons(prevLessons => 
      prevLessons.map(lesson => {
        if (lesson.id === id) {
          // Calculate new likes count
          let newLikes = lesson.likes;
          
          if (lesson.userLiked === null) {
            // First vote
            newLikes = liked ? lesson.likes + 1 : lesson.likes - 1;
          } else if (lesson.userLiked === true && !liked) {
            // Changing from like to dislike
            newLikes = lesson.likes - 2;
          } else if (lesson.userLiked === false && liked) {
            // Changing from dislike to like
            newLikes = lesson.likes + 2;
          }
          
          return { ...lesson, likes: newLikes, userLiked: liked };
        }
        return lesson;
      })
    );
  };
  
  return (
    <LessonContext.Provider value={{
      lessons,
      completedLessons,
      timeline,
      recommendedLessons,
      searchTerm,
      difficultyFilter,
      progressPercentage,
      addLesson,
      toggleLessonCompletion,
      handleLike,
      setSearchTerm,
      setDifficultyFilter,
      filteredLessons
    }}>
      {children}
    </LessonContext.Provider>
  );
};

export const useLessons = (): LessonContextType => {
  const context = useContext(LessonContext);
  if (context === undefined) {
    throw new Error('useLessons must be used within a LessonProvider');
  }
  return context;
};

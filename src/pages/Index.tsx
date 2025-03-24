
import React from 'react';
import Header from '@/components/Header';
import SearchFilter from '@/components/SearchFilter';
import LessonCard from '@/components/LessonCard';
import Timeline from '@/components/Timeline';
import LessonForm from '@/components/LessonForm';
import RecommendedLessons from '@/components/RecommendedLessons';
import { ThemeProvider } from '@/context/ThemeContext';
import { LessonProvider, useLessons } from '@/context/LessonContext';

const LessonGallery = () => {
  const { filteredLessons } = useLessons();

  return (
    <div className="space-y-6">
      <SearchFilter />
      
      {filteredLessons.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground animate-fade-in">
          <p>No lessons found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <LessonProvider>
        <div className="min-h-screen bg-background">
          <Header />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <RecommendedLessons />
            <LessonGallery />
            <LessonForm />
            
            <div className="mt-12">
              <Timeline />
            </div>
          </main>
          
          <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
            <p>Learn Easy Hub &copy; {new Date().getFullYear()} - Created with ❤️ for education</p>
          </footer>
        </div>
      </LessonProvider>
    </ThemeProvider>
  );
};

export default Index;

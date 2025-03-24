
import React from 'react';
import { Search } from 'lucide-react';
import { useLessons } from '@/context/LessonContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchFilter = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    difficultyFilter, 
    setDifficultyFilter 
  } = useLessons();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search lessons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      
      <Select
        value={difficultyFilter}
        onValueChange={(value) => setDifficultyFilter(value as any)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Levels</SelectItem>
          <SelectItem value="Beginner">Beginner</SelectItem>
          <SelectItem value="Intermediate">Intermediate</SelectItem>
          <SelectItem value="Advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilter;

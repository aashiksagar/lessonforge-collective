
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLessons } from '@/context/LessonContext';
import ProgressBar from '@/components/ProgressBar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LearnPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lessonIdParam = searchParams.get('lessonId');
  
  const { 
    filteredLessons, 
    searchTerm, 
    setSearchTerm, 
    difficultyFilter, 
    setDifficultyFilter, 
    progressPercentage,
    toggleLessonCompletion,
    handleLike
  } = useLessons();
  
  const [selectedLesson, setSelectedLesson] = useState<string | null>(lessonIdParam);
  const [detailsVisible, setDetailsVisible] = useState(!!lessonIdParam);
  
  // Find the selected lesson object
  const selectedLessonObject = filteredLessons.find(lesson => lesson.id === selectedLesson);
  
  // Set selected lesson when URL parameter changes
  useEffect(() => {
    if (lessonIdParam) {
      setSelectedLesson(lessonIdParam);
      setDetailsVisible(true);
    }
  }, [lessonIdParam]);
  
  const handleCompletionToggle = (id: string, completed: boolean) => {
    toggleLessonCompletion(id);
    if (!completed) {
      toast({
        title: "Great job!",
        description: "Keep learning and growing your skills!",
        variant: "default",
      });
    }
  };
  
  const handleLessonClick = (id: string) => {
    setSelectedLesson(id);
    setDetailsVisible(true);
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}?lessonId=${id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
  
  const handleCloseDetails = () => {
    setDetailsVisible(false);
    setSelectedLesson(null);
    
    // Remove query parameter
    const newUrl = window.location.pathname;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Learn</h1>
        
        {/* Progress Bar */}
        <ProgressBar percentage={progressPercentage} />
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="w-full p-2 rounded-md border bg-background"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        
        {/* Lesson Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredLessons.length > 0 ? (
            filteredLessons.map(lesson => (
              <Card 
                key={lesson.id}
                className={`hover:shadow-lg transition-all ${
                  selectedLesson === lesson.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`lesson-${lesson.id}`}
                        checked={lesson.completed}
                        onCheckedChange={() => handleCompletionToggle(lesson.id, lesson.completed)}
                      />
                      <Label 
                        htmlFor={`lesson-${lesson.id}`}
                        className={`${lesson.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {lesson.title}
                      </Label>
                    </div>
                    <span className={`difficulty-badge difficulty-badge-${lesson.difficulty.toLowerCase()}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <button 
                      className={`flex items-center mr-4 ${lesson.userLiked === true ? 'text-green-500 font-medium' : ''}`}
                      onClick={() => handleLike(lesson.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" /> 
                      <span>{lesson.likes} Likes</span>
                    </button>
                    <button 
                      className={`flex items-center ${lesson.userLiked === false ? 'text-red-500 font-medium' : ''}`}
                      onClick={() => handleLike(lesson.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" /> 
                      <span>{Math.max(0, 5 - lesson.likes)} Dislikes</span>
                    </button>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    onClick={() => handleLessonClick(lesson.id)}
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center p-8 border rounded-lg">
              <p className="text-muted-foreground">No lessons match your search criteria.</p>
            </div>
          )}
        </div>
        
        {/* Lesson Details */}
        {detailsVisible && selectedLessonObject && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-start p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold">{selectedLessonObject.title}</h2>
                  <span className={`mt-1 inline-block difficulty-badge difficulty-badge-${selectedLessonObject.difficulty.toLowerCase()}`}>
                    {selectedLessonObject.difficulty}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCloseDetails}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedLessonObject.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Resource</h3>
                  <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">
                        {selectedLessonObject.title.replace(/\s+/g, '')}.pdf
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">(PDF File)</span>
                    </div>
                    <Button variant="outline" size="sm">Open File</Button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Likes</p>
                      <p className="text-2xl font-bold">{selectedLessonObject.likes}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Completion Status</p>
                      <p className="text-lg font-bold">
                        {selectedLessonObject.completed ? (
                          <span className="text-green-500">Completed</span>
                        ) : (
                          <span className="text-amber-500">Not Completed</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={handleCloseDetails}>Close</Button>
                  <Button 
                    onClick={() => handleCompletionToggle(selectedLessonObject.id, selectedLessonObject.completed)}
                  >
                    {selectedLessonObject.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LearnPage;

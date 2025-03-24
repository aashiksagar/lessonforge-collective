
import React, { useState } from 'react';
import { useLessons } from '@/context/LessonContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const LessonForm = () => {
  const { addLesson } = useLessons();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description for your lesson.",
        variant: "destructive",
      });
      return;
    }
    
    addLesson(title, description, difficulty);
    toast({
      title: "Lesson added successfully",
      description: "Your contribution has been added to the lesson gallery.",
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDifficulty('Beginner');
    setIsOpen(false);
  };

  return (
    <div className="mt-8 mb-8 animate-fade-in">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-full"
        >
          Add a Lesson
        </Button>
      ) : (
        <div className="glass-card rounded-xl p-6 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4">Share Your Knowledge</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Lesson Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Textarea
                placeholder="Lesson Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                rows={3}
              />
            </div>
            
            <div>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Lesson</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LessonForm;

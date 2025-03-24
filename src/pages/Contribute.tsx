
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useLessons } from '@/context/LessonContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Trophy, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ContributePage = () => {
  const { addLesson } = useLessons();
  
  const [lessonName, setLessonName] = useState('');
  const [lessonType, setLessonType] = useState('PDF');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!lessonName.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Add the lesson
    addLesson(lessonName, description, difficulty);
    
    // Success message
    toast({
      title: "Lesson Added",
      description: "Thank you for contributing to Easy Learn!",
    });
    
    // Reset form
    setLessonName('');
    setLessonType('PDF');
    setDifficulty('Beginner');
    setDescription('');
    setFileName('');
  };
  
  // Mock contributors data for the leaderboard
  const contributors = [
    { name: 'Sarah Johnson', lessons: 12 },
    { name: 'David Zhang', lessons: 8 },
    { name: 'Maria Garcia', lessons: 7 },
    { name: 'Jamal Williams', lessons: 5 },
    { name: 'Aisha Patel', lessons: 4 }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-2">Contribute to Easy Learn</h1>
          <p className="text-muted-foreground">
            Share your knowledge with the community by contributing educational resources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Add a New Lesson
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lesson-name">Lesson Name *</Label>
                    <Input
                      id="lesson-name"
                      placeholder="Enter lesson name"
                      value={lessonName}
                      onChange={(e) => setLessonName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lesson-type">Resource Type *</Label>
                      <select
                        id="lesson-type"
                        className="w-full p-2 rounded-md border bg-background"
                        value={lessonType}
                        onChange={(e) => setLessonType(e.target.value)}
                        required
                      >
                        <option value="PDF">PDF</option>
                        <option value="Video">Video</option>
                        <option value="PPT">PPT</option>
                        <option value="MP3">MP3</option>
                        <option value="Word">Word</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level *</Label>
                      <select
                        id="difficulty"
                        className="w-full p-2 rounded-md border bg-background"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <textarea
                      id="description"
                      placeholder="Provide a brief description of your lesson"
                      className="w-full p-2 rounded-md border bg-background min-h-[100px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload Resource *</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="border rounded-md p-2 flex-1">
                        <span className="text-muted-foreground">
                          {fileName || 'No file selected'}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Browse
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Accepted file types: PDF, MP4, PPT, MP3, DOCX (max 100MB)
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      Submit Lesson
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributors.map((contributor, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index === 0 ? 'bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`font-bold mr-2 ${
                          index === 0 ? 'text-amber-600 dark:text-amber-400' : ''
                        }`}>
                          #{index + 1}
                        </span>
                        <span>{contributor.name}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {contributor.lessons} lessons
                      </span>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 flex items-center justify-center gap-2"
                    onClick={() => {
                      toast({
                        title: "Thank you!",
                        description: "Your support helps our community grow.",
                      });
                    }}
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                    Thank Contributors
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>How to Contribute</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Fill out the form with your lesson details</li>
                  <li>Upload your educational resource</li>
                  <li>Submit your contribution</li>
                  <li>Our team will review and publish your content</li>
                </ol>
                <p className="mt-4 text-sm text-muted-foreground">
                  By contributing, you're helping learners around the world access quality educational content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContributePage;


import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLessons } from '@/context/LessonContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Calendar, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const { recommendedLessons, timeline, progressPercentage } = useLessons();

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
            Welcome to Easy Learn
          </h1>
          <p className="text-lg text-muted-foreground">
            Access quality education resources, track your progress, and contribute to our growing community of learners.
          </p>
        </section>

        {/* Progress Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-teal-500" />
              Your Progress
            </h2>
            <Link to="/learn" className="text-primary hover:underline text-sm flex items-center">
              View all lessons <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-card rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm font-bold">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">
              {progressPercentage < 30 ? "Just getting started? Keep exploring our lessons!" : 
               progressPercentage < 70 ? "You're making great progress! Keep it up!" :
               "Almost there! Just a few more lessons to complete."}
            </p>
          </div>
        </section>

        {/* Recommended Lessons Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-teal-500" />
              Recommended For You
            </h2>
            <Link to="/learn" className="text-primary hover:underline text-sm flex items-center">
              Browse all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedLessons.length > 0 ? (
              recommendedLessons.map(lesson => (
                <Card key={lesson.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <span className={`difficulty-badge difficulty-badge-${lesson.difficulty.toLowerCase()}`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Link to={`/learn?lessonId=${lesson.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Lesson
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-6 bg-muted rounded-lg">
                <p className="text-muted-foreground">No recommended lessons yet. Start completing lessons to get personalized recommendations!</p>
                <Link to="/learn" className="mt-2 inline-block">
                  <Button variant="default" size="sm">Browse Lessons</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-500" />
              Your Learning Journey
            </h2>
          </div>

          {timeline.length > 0 ? (
            <div className="space-y-4">
              {timeline.map((entry, index) => (
                <Link 
                  key={`${entry.lessonId}-${index}`} 
                  to={`/learn?lessonId=${entry.lessonId}`}
                  className="block"
                >
                  <div className="relative pl-6 pb-4 border-l-2 border-primary hover:bg-card/50 p-2 rounded-r-lg transition-colors">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <p className="text-sm text-muted-foreground">{entry.dateCompleted}</p>
                    <p className="font-medium">{entry.lessonTitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-muted rounded-lg">
              <p className="text-muted-foreground">Your learning journey will be displayed here as you complete lessons.</p>
              <Link to="/learn" className="mt-2 inline-block">
                <Button variant="default" size="sm">Start Learning</Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

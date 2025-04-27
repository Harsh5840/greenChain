'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { Task } from '@/lib/types';
import { completeTask } from '@/lib/api';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

export function TaskCard({ task, onComplete }: TaskCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const difficultyColor = {
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const result = await completeTask(task.id);
      
      if (result.success) {
        toast.success(result.message || 'Task completed successfully!');
        onComplete(task.id);
      } else {
        toast.error(result.message || 'Failed to complete task');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                       error.message || 
                       'An error occurred while completing the task';
      toast.error(errorMessage);
      console.error('Error completing task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden border-green-100 dark:border-green-900/50 hover:border-green-300 dark:hover:border-green-700 transition-colors">
        <div className="h-48 overflow-hidden relative">
          <Image
            src={task.image || "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
            alt={task.title}
            height={400}
            width={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className={cn("text-xs px-2 py-1 rounded-full font-medium", difficultyColor[task.difficulty])}>
              {task.difficulty}
            </span>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-green-800 dark:text-green-300">{task.title}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {task.estimatedTime}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center gap-1">
              <Leaf className="h-3.5 w-3.5" /> {task.category}
            </span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
            <Award className="h-4 w-4" />
            <span>{task.reward} GreenTokens</span>
          </div>
          <Button 
            onClick={handleComplete} 
            disabled={isLoading}
            
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? 'Completing...' : 'Complete Task'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
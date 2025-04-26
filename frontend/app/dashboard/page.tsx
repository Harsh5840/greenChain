'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Leaf, User, BarChart2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskCard } from '@/components/TaskCard';
import { Task } from '@/lib/types';
import { getTasks } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import AnimatedComponent from '@/components/AnimatedComponent';

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Plant a Tree",
    description: "Plant a tree in your community and share a photo of your work.",
    reward: 100,
    difficulty: "medium",
    estimatedTime: "2 hours",
    category: "Nature",
    image: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "2",
    title: "Clean Beach Day",
    description: "Participate in a beach cleanup event or organize one yourself.",
    reward: 150,
    difficulty: "medium",
    estimatedTime: "3 hours",
    category: "Water",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "3",
    title: "Zero Waste Week",
    description: "Go a full week without producing any landfill waste.",
    reward: 200,
    difficulty: "hard",
    estimatedTime: "1 week",
    category: "Lifestyle",
    image: "https://images.pexels.com/photos/6964581/pexels-photo-6964581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "4",
    title: "Bike to Work",
    description: "Use a bicycle for your commute instead of a car for one week.",
    reward: 120,
    difficulty: "medium",
    estimatedTime: "1 week",
    category: "Transport",
    image: "https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "5",
    title: "Home Energy Audit",
    description: "Conduct an energy audit of your home and implement at least 3 energy-saving measures.",
    reward: 80,
    difficulty: "easy",
    estimatedTime: "4 hours",
    category: "Energy",
    image: "https://images.pexels.com/photos/3815490/pexels-photo-3815490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "6",
    title: "Start a Compost Bin",
    description: "Set up a composting system at your home and use it for 2 weeks.",
    reward: 90,
    difficulty: "easy",
    estimatedTime: "2 weeks",
    category: "Waste",
    image: "https://images.pexels.com/photos/8955503/pexels-photo-8955503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        if (fetchedTasks && fetchedTasks.length > 0) {
          setTasks(fetchedTasks);
          setFilteredTasks(fetchedTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    
    fetchTasks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = tasks.filter(
        task => 
          task.title.toLowerCase().includes(lowercaseQuery) || 
          task.description.toLowerCase().includes(lowercaseQuery) ||
          task.category.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredTasks(filtered);
    }
  }, [searchQuery, tasks]);

  const handleTaskComplete = useCallback((taskId: string) => {
    if (user) {
      // Update local state to reflect completed task
      // In a real app, this would sync with the backend
    }
  }, [user]);

  const getTasksByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    return filteredTasks.filter(task => task.difficulty === difficulty);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Please log in to access your dashboard</h2>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedComponent animation="fadeIn">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-300">Your Eco Dashboard</h1>
          <p className="text-muted-foreground">Complete tasks, earn rewards, and track your environmental impact</p>
        </div>
      </AnimatedComponent>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnimatedComponent animation="slideUp" delay={0.1}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Your Balance</CardTitle>
              <CardDescription>Available GreenTokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                <span className="text-3xl font-bold">{user?.balance || 0}</span>
              </div>
            </CardContent>
          </Card>
        </AnimatedComponent>
        
        <AnimatedComponent animation="slideUp" delay={0.2}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Tasks Completed</CardTitle>
              <CardDescription>Your eco-contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart2 className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                <span className="text-3xl font-bold">12</span>
              </div>
            </CardContent>
          </Card>
        </AnimatedComponent>
        
        <AnimatedComponent animation="slideUp" delay={0.3}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Your Rank</CardTitle>
              <CardDescription>Community standing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <User className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                <span className="text-3xl font-bold">Eco Guardian</span>
              </div>
            </CardContent>
          </Card>
        </AnimatedComponent>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300">Available Eco-Tasks</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 focus:border-green-300 dark:focus:border-green-700"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task, index) => (
                <AnimatedComponent
                  key={task.id}
                  animation="fadeIn"
                  delay={0.05 * index}
                >
                  <TaskCard task={task} onComplete={handleTaskComplete} />
                </AnimatedComponent>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="easy">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTasksByDifficulty('easy').map((task, index) => (
                <AnimatedComponent
                  key={task.id}
                  animation="fadeIn"
                  delay={0.05 * index}
                >
                  <TaskCard task={task} onComplete={handleTaskComplete} />
                </AnimatedComponent>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTasksByDifficulty('medium').map((task, index) => (
                <AnimatedComponent
                  key={task.id}
                  animation="fadeIn"
                  delay={0.05 * index}
                >
                  <TaskCard task={task} onComplete={handleTaskComplete} />
                </AnimatedComponent>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTasksByDifficulty('hard').map((task, index) => (
                <AnimatedComponent
                  key={task.id}
                  animation="fadeIn"
                  delay={0.05 * index}
                >
                  <TaskCard task={task} onComplete={handleTaskComplete} />
                </AnimatedComponent>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import Link from 'next/link';
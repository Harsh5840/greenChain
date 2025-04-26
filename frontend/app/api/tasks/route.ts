import { NextResponse } from 'next/server';

const mockTasks = [
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

export async function GET() {
  return NextResponse.json(mockTasks);
}
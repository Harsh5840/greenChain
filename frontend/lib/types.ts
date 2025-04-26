export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface User {
  email: string;
  walletAddress: string;
  balance: number;
}
import axios from 'axios';
import { Task, Product, User } from './types';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const completeTask = async (taskId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await api.post('/tasks/complete', { 
      taskId: taskId 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    console.error('Error completing task:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to complete task'
    };
  }
};

export const getMarketplaceProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/marketplace');
    return response.data;
  } catch (error) {
    console.error('Error fetching marketplace products:', error);
    return [];
  }
};

export const purchaseProduct = async (productId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/marketplace/purchase', { productId });
    return response.data;
  } catch (error) {
    console.error('Error purchasing product:', error);
    return { success: false, message: 'Failed to purchase product' };
  }
};

export const getUserProfile = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Failed to login' };
  }
};

export const registerUser = async (email: string, password: string, walletAddress: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/auth/register', { 
      email,
      password, 
      walletAddress 
    });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    return { success: false, message: 'Failed to register' };
  }
};
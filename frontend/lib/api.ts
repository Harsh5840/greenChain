import axios from 'axios';
import { Task, Product, User } from './types';

const baseURL = '/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTasks = async (): Promise<Task[]> => {
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
    const response = await api.post('/tasks/complete', { taskId });
    return response.data;
  } catch (error) {
    console.error('Error completing task:', error);
    return { success: false, message: 'Failed to complete task' };
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
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Failed to login' };
  }
};

export const registerUser = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    return { success: false, message: 'Failed to register' };
  }
};
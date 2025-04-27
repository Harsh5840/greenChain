import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Get database connection
    const client = await db;
    const tasksCollection = client.db().collection('tasks');
    
    // Fetch all tasks from database
    const tasks = await tasksCollection.find({}).toArray();
    
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
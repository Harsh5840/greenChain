import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import db from '@/lib/db';
import { ObjectId } from 'mongodb';
import type { NextRequest } from 'next/server';

// (Optional) Define token type if you want strict types
interface CustomToken {
  userId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { taskId } = await request.json();

    // 1. Verify user is authenticated
    const token = await getToken({ req: request }) as CustomToken;
    if (!token?.userId) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized" 
      }, { status: 401 });
    }

    const userObjectId = new ObjectId(token.userId);

    // 2. Get database connection
    const client = await db;
    const tasksCollection = client.db().collection('tasks');
    const usersCollection = client.db().collection('users');
    const completionsCollection = client.db().collection('taskCompletions');

    // 3. Check if task exists
    const task = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
    if (!task) {
      return NextResponse.json({ 
        success: false, 
        message: "Task not found" 
      }, { status: 404 });
    }

    // 4. Verify task hasn't already been completed by this user
    const existingCompletion = await completionsCollection.findOne({
      userId: userObjectId,
      taskId: new ObjectId(taskId)
    });

    if (existingCompletion) {
      return NextResponse.json({ 
        success: false, 
        message: "Task already completed" 
      }, { status: 400 });
    }

    // 5. Add tokens to user's balance and record completion
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        // Add reward to user balance
        await usersCollection.updateOne(
          { _id: userObjectId },
          { $inc: { balance: task.reward } },
          { session }
        );

        // Record task completion
        await completionsCollection.insertOne({
          userId: userObjectId,
          taskId: new ObjectId(taskId),
          completedAt: new Date(),
          reward: task.reward
        }, { session });
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json({
      success: true,
      message: "Task completed successfully! GreenTokens added to your wallet.",
      reward: task.reward
    });
  } catch (error) {
    console.error('Error completing task:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to complete task" 
    }, { status: 500 });
  }
}

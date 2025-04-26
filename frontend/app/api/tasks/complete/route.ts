import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { taskId } = await request.json();
    
    // In a real implementation, this would:
    // 1. Verify the user is authenticated
    // 2. Check if the task exists
    // 3. Verify the task hasn't already been completed by this user
    // 4. Add tokens to the user's balance
    // 5. Record the completion in the database
    
    // For mock purposes, we'll just return a success response
    return NextResponse.json({
      success: true,
      message: "Task completed successfully! GreenTokens added to your wallet.",
      reward: 100 // Example reward amount
    });
  } catch (error) {
    console.error('Error completing task:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to complete task" 
    }, { status: 500 });
  }
}
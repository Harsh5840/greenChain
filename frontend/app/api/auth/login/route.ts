import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // In a real implementation, this would:
    // 1. Check if the user exists
    // 2. Verify the password
    // 3. Create a session or token
    
    // For mock purposes, we'll just return a success response
    // (For demo, we'll accept any email/password)
    return NextResponse.json({
      success: true,
      message: "Login successful"
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to login" 
    }, { status: 401 });
  }
}
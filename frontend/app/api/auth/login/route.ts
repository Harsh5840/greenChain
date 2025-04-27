import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';  // Add this import

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // 1. Get database connection
    const client = await db;
    const usersCollection = client.db().collection('users');
    
    // 2. Check if user exists
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid credentials" 
      }, { status: 401 });
    }

    // 3. Verify password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid credentials" 
      }, { status: 401 });
    }

    // 3. Create a session or token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to login" 
    }, { status: 500 });
  }
}
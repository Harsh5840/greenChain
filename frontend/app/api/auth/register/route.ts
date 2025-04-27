import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // 1. Get database connection
    const client = await db;
    const usersCollection = client.db().collection('users');
    
    // 2. Check if email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        message: "Email already in use" 
      }, { status: 400 });
    }

    // 3. Hash the password
    const hashedPassword = await hash(password, 10);
    
    // 4. Create new user in database
    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      balance: 0,
      walletAddress: ''
    };
    
    await usersCollection.insertOne(newUser);

    return NextResponse.json({
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    console.error('Error registering:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to register" 
    }, { status: 500 });
  }
}
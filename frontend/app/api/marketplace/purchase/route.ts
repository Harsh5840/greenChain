import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import db from '@/lib/db';
import type { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

// Define a type for the token
interface CustomToken {
  userId: string;
}

export async function POST(request: NextRequest) {  
  try {
    const { productId } = await request.json();
    
    // 1. Verify user is authenticated
    const token = await getToken({ req: request }) as unknown as CustomToken;  // Double cast to safely convert JWT to CustomToken
    if (!token || !token.userId) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized" 
      }, { status: 401 });
    }

    // Get database connection
    const client = await db;
    const usersCollection = client.db().collection('users');
    const productsCollection = client.db().collection('products');
    const transactionsCollection = client.db().collection('transactions');

    // 2. Check if product exists
    const product = await productsCollection.findOne({ id: productId });
    if (!product) {
      return NextResponse.json({ 
        success: false, 
        message: "Product not found" 
      }, { status: 404 });
    }

    // 3. Verify user has enough tokens
    const user = await usersCollection.findOne({ _id: new ObjectId(token.userId) });
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "User not found" 
      }, { status: 404 });
    }

    if (user.balance < product.price) {
      return NextResponse.json({ 
        success: false, 
        message: "Insufficient balance" 
      }, { status: 400 });
    }

    // 4. Deduct tokens and record transaction
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        // Deduct from user balance
        await usersCollection.updateOne(
          { _id: user._id },
          { $inc: { balance: -product.price } },
          { session }
        );

        // Record transaction
        await transactionsCollection.insertOne({
          userId: user._id,
          productId: product.id,
          amount: product.price,
          date: new Date(),
          type: 'purchase'
        }, { session });
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json({
      success: true,
      message: "Product purchased successfully!",
      newBalance: user.balance - product.price
    });
  } catch (error) {
    console.error('Error purchasing product:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to purchase product" 
    }, { status: 500 });
  }
}

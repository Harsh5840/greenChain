import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import db from '@/lib/db';
import { NextRequest } from 'next/server'; // Import NextRequest for better type compatibility
import { ObjectId } from 'mongodb'; // Import ObjectId to handle MongoDB _id properly

export async function GET(request: NextRequest) {  // Use NextRequest here
  try {
    // 1. Verify the user is authenticated via session/token
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch the user's profile from the database
    const client = await db;
    const user = await client.db().collection('users').findOne(
      { _id: new ObjectId(token.userId as string) },  // Convert token.userId to ObjectId after type assertion
      { projection: { email: 1, walletAddress: 1, balance: 1 } }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 3. Return the user data
    return NextResponse.json({
      email: user.email,
      walletAddress: user.walletAddress,
      balance: user.balance
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch profile' 
    }, { status: 500 });
  }
}

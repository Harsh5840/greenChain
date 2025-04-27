import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Get database connection
    const client = await db;
    const productsCollection = client.db().collection('products');
    
    // Fetch all products from database
    const products = await productsCollection.find({}).toArray();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
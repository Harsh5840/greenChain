import { NextResponse } from 'next/server';

const mockProducts = [
  {
    id: "1",
    name: "Bamboo Water Bottle",
    description: "Eco-friendly water bottle made from sustainable bamboo material. Keeps drinks cold for 24 hours and hot for 12 hours.",
    price: 150,
    category: "Lifestyle",
    image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "2",
    name: "Recycled Backpack",
    description: "Stylish backpack made from recycled plastic bottles. Durable, waterproof, and perfect for everyday use.",
    price: 300,
    category: "Fashion",
    image: "https://images.pexels.com/photos/6173888/pexels-photo-6173888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "3",
    name: "Solar Power Bank",
    description: "Charge your devices using clean solar energy. This power bank includes dual USB ports and fast charging technology.",
    price: 220,
    category: "Electronics",
    image: "https://images.pexels.com/photos/6667360/pexels-photo-6667360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "4",
    name: "Biodegradable Phone Case",
    description: "Protect your phone with this stylish case made from biodegradable materials that won't harm the environment.",
    price: 80,
    category: "Electronics",
    image: "https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "5",
    name: "Reusable Produce Bags",
    description: "Set of 5 mesh bags perfect for shopping fruits and vegetables without single-use plastic.",
    price: 60,
    category: "Home",
    image: "https://images.pexels.com/photos/5504522/pexels-photo-5504522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "6",
    name: "Bamboo Toothbrush Set",
    description: "Pack of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles for superior cleaning.",
    price: 40,
    category: "Health",
    image: "https://images.pexels.com/photos/3737594/pexels-photo-3737594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
];

export async function GET() {
  return NextResponse.json(mockProducts);
}
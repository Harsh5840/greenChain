"use client";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: { 
  name: string;
  description: string;
  price: number;
  image: string;
} }) {
  const handleBuy = async () => {
    // TODO: Call backend to transfer tokens
    toast.success("Product purchased!");
  };
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <Image src={product.image} alt={product.name} className="h-32 object-contain mb-2" />
      <div className="font-bold text-lg">{product.name}</div>
      <div className="text-gray-600">{product.description}</div>
      <div className="text-green-700 font-semibold">Price: {product.price} GreenTokens</div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={handleBuy}
      >
        Buy Now
      </button>
    </div>
  );
}
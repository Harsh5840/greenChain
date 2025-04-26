"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-green-100 shadow">
      <div className="font-bold text-green-800 text-2xl">GreenChain</div>
      <div className="flex gap-6">
        <Link href="/dashboard" className="hover:text-green-600">Dashboard</Link>
        <Link href="/marketplace" className="hover:text-green-600">Marketplace</Link>
        <Link href="/profile" className="hover:text-green-600">Profile</Link>
      </div>
    </nav>
  );
}
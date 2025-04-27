'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { getMarketplaceProducts } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import AnimatedComponent from '@/components/AnimatedComponent';

const mockProducts: Product[] = [
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

export default function MarketplacePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getMarketplaceProducts();
        if (fetchedProducts && fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    // First filter by search query
    let filtered = products;
    
    if (searchQuery.trim() !== "") {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(lowercaseQuery) || 
          product.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Then filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    // Finally sort
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'recommended' - no sorting needed
        break;
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, sortBy, products]);

  const handleProductPurchase = useCallback((productId: string) => {
    if (user) {
      // Update local state to reflect purchase
      // In a real app, this would sync with the backend
    }
  }, [user]);

  const categories = ["all", ...Array.from(new Set(products.map(product => product.category)))];

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Please log in to access the marketplace</h2>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedComponent animation="fadeIn">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-300">Eco Marketplace</h1>
          <p className="text-muted-foreground">Spend your GreenTokens on sustainable products</p>
        </div>
      </AnimatedComponent>
      
      <AnimatedComponent animation="slideUp" delay={0.1}>
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Your GreenTokens</CardTitle>
            <CardDescription>Available balance to spend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
              <span className="text-3xl font-bold">{user?.balance || 0}</span>
            </div>
          </CardContent>
        </Card>
      </AnimatedComponent>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              height={40}
              width={400}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 focus:border-green-300 dark:focus:border-green-700"
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-36 bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <AnimatedComponent
                key={product.id}
                animation="fadeIn"
                delay={0.05 * index}
              >
                <ProductCard 
                  product={product} 
                  userBalance={user?.balance || 0} 
                  onPurchase={handleProductPurchase} 
                />
              </AnimatedComponent>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No products match your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { Product } from '@/lib/types';
import { purchaseProduct } from '@/lib/api';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ProductCardProps {
  product: Product;
  userBalance: number;
  onPurchase: (productId: string) => void;
}

export function ProductCard({ product, userBalance, onPurchase }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const canPurchase = userBalance >= product.price;

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const result = await purchaseProduct(product.id);
      
      if (result.success) {
        toast.success('Product purchased successfully!');
        onPurchase(product.id);
        setShowDialog(false);
      } else {
        toast.error(result.message || 'Failed to purchase product');
      }
    } catch (error) {
      toast.error('An error occurred while purchasing the product');
      console.error('Error purchasing product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden border-green-100 dark:border-green-900/50 hover:border-green-300 dark:hover:border-green-700 transition-colors">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={product.image || "https://images.pexels.com/photos/1470168/pexels-photo-1470168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium">
              {product.category}
            </span>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-green-800 dark:text-green-300">{product.name}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-sm">
            <Tag className="h-3.5 w-3.5" /> Eco-friendly product
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
            <ShoppingBag className="h-4 w-4" />
            <span>{product.price} GreenTokens</span>
          </div>
          
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button 
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Buy Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Purchase</DialogTitle>
                <DialogDescription>
                  Are you sure you want to purchase {product.name} for {product.price} GreenTokens?
                  {!canPurchase && (
                    <p className="mt-2 text-red-500">
                      You don't have enough GreenTokens. Current balance: {userBalance} GreenTokens
                    </p>
                  )}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                <Button 
                  onClick={handlePurchase} 
                  disabled={isLoading || !canPurchase}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? 'Processing...' : 'Confirm Purchase'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
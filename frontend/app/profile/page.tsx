'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Wallet, Award, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useAuth } from '@/hooks/useAuth';
import AnimatedComponent from '@/components/AnimatedComponent';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

  const handleConnectWallet = () => {
    connect({ connector: injected() });
  };

  const handleDisconnectWallet = () => {
    disconnect();
    setShowDisconnectDialog(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Please log in to access your profile</h2>
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
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-300">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account and wallet</p>
        </div>
      </AnimatedComponent>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <AnimatedComponent animation="slideUp" delay={0.1}>
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg" alt="Avatar" />
                    <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                      {user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user.email}</CardTitle>
                <CardDescription>GreenChain Member</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium">Eco Guardian</span>
                </div>
                <p className="text-muted-foreground text-sm">Member since April 2025</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={logout} 
                  variant="outline" 
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </AnimatedComponent>
        </div>
        
        <div className="md:col-span-2">
          <AnimatedComponent animation="slideUp" delay={0.2}>
            <Tabs defaultValue="account">
              <TabsList className="mb-6 bg-green-50 dark:bg-green-900/30">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Email Address</label>
                        <Button size="sm" variant="ghost" className="h-8 px-2">
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">Edit</span>
                        </Button>
                      </div>
                      <div className="flex items-center p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                        <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Password</label>
                        <Button size="sm" variant="ghost" className="h-8 px-2">
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">Change</span>
                        </Button>
                      </div>
                      <div className="flex items-center p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                        <span className="text-muted-foreground">••••••••••••</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notification Preferences</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="email-notifications" className="mr-2" defaultChecked />
                          <label htmlFor="email-notifications">Email notifications</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="marketing-emails" className="mr-2" defaultChecked />
                          <label htmlFor="marketing-emails">Marketing emails</label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="wallet">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Information</CardTitle>
                    <CardDescription>Manage your crypto wallet and GreenTokens</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">GreenToken Balance</label>
                      <div className="flex items-center p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                        <Award className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                        <span className="text-xl font-semibold">{user.balance} GreenTokens</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Connected Wallet</label>
                      {isConnected ? (
                        <div className="space-y-3">
                          <div className="flex items-center p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                            <Wallet className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                            <div className="flex-1 overflow-hidden">
                              <p className="truncate font-mono text-sm">{address}</p>
                              <p className="text-xs text-muted-foreground mt-1">Connected to Ethereum Network</p>
                            </div>
                          </div>
                          
                          <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                Disconnect Wallet
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Disconnect Wallet</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to disconnect your wallet? You will need to reconnect it to access certain features.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setShowDisconnectDialog(false)}>Cancel</Button>
                                <Button 
                                  onClick={handleDisconnectWallet}
                                  variant="destructive"
                                >
                                  Disconnect
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 border-dashed">
                            <Wallet className="h-5 w-5 text-muted-foreground mr-3" />
                            <p className="text-muted-foreground">No wallet connected</p>
                          </div>
                          
                          <Button 
                            onClick={handleConnectWallet} 
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                          >
                            Connect Wallet
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent transactions and task completions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: 'task', title: 'Completed "Plant a Tree" task', date: '2 days ago', amount: '+100' },
                        { type: 'purchase', title: 'Purchased "Bamboo Water Bottle"', date: '1 week ago', amount: '-150' },
                        { type: 'task', title: 'Completed "Zero Waste Week" task', date: '2 weeks ago', amount: '+200' },
                        { type: 'purchase', title: 'Purchased "Recycled Backpack"', date: '3 weeks ago', amount: '-300' },
                        { type: 'task', title: 'Completed "Bike to Work" task', date: '1 month ago', amount: '+120' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-md bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${activity.type === 'task' ? 'bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-800/40 dark:text-amber-300'}`}>
                              {activity.type === 'task' ? (
                                <Award className="h-4 w-4" />
                              ) : (
                                <ShoppingBag className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{activity.title}</p>
                              <p className="text-xs text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                          <span className={`font-medium ${activity.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                            {activity.amount} GreenTokens
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </AnimatedComponent>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
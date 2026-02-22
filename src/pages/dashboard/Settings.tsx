import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/components/ui/theme-provider';
import { PageTransition } from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { User, Palette } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <PageTransition>
      <div className="space-y-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account and preferences</p>
        </motion.div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 border border-slate-800/50">
            <TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-400">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-400">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100">Profile</CardTitle>
                  <CardDescription className="text-slate-300">Manage your public profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-cyan-500/30">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-100">{user?.email}</p>
                      <p className="text-sm text-slate-300">Free Account</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">Email</Label>
                    <Input id="email" value={user?.email || ''} disabled className="bg-slate-900/50 border-slate-700 text-slate-200" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled className="bg-slate-800 text-slate-300">Save Changes</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100">Appearance</CardTitle>
                  <CardDescription className="text-slate-300">Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-200">Theme</Label>
                      <p className="text-sm text-slate-300">Select your preferred theme.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant={theme === 'light' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setTheme('light')}
                        className={theme === 'light' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'border-slate-700 text-slate-400 hover:text-slate-200'}
                      >
                        Light
                      </Button>
                      <Button 
                        variant={theme === 'dark' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className={theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'border-slate-700 text-slate-400 hover:text-slate-200'}
                      >
                        Dark
                      </Button>
                      <Button 
                        variant={theme === 'system' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setTheme('system')}
                        className={theme === 'system' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'border-slate-700 text-slate-400 hover:text-slate-200'}
                      >
                        System
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}

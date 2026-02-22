import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { PitchForgeLogo } from '@/components/ui/pitchforge-logo';

export default function PublicLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Features', path: '/features' },
    { label: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60"
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <PitchForgeLogo className="h-8 w-8" />
            </motion.div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg text-slate-100">PitchForge</span>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="relative text-sm font-medium transition-colors"
            >
              <span className={location.pathname === '/' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'}>
                Home
              </span>
              {location.pathname === '/' && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative text-sm font-medium transition-colors"
              >
                <span className={location.pathname === item.path ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'}>
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300">
                Log In
              </Button>
            </Link>
            <Link to="/auth/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-950 border-slate-800">
                <div className="flex flex-col gap-6 pt-10">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    Home
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 mt-4">
                    <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">Log In</Button>
                    </Link>
                    <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="container py-8 md:py-12 px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <PitchForgeLogo className="h-6 w-6" />
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-base text-slate-100">PitchForge</span>
                  <span className="font-bold text-base bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">AI</span>
                </div>
              </Link>
              <p className="text-sm text-slate-400">
                Helping freelancers win more jobs with AI-powered proposals.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-slate-300">Product</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-slate-300">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="#" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-slate-300">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} PitchForge AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PenTool, FileText, BarChart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { PitchForgeLogo } from '@/components/ui/pitchforge-logo';

const sidebarItems = [
  { icon: PenTool, label: 'Generate', path: '/dashboard/generate' },
  { icon: FileText, label: 'My Proposals', path: '/dashboard/proposals' },
  { icon: BarChart, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-800/50 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="flex h-14 items-center border-b border-slate-800/50 px-6">
        <Link to="/dashboard" className="flex items-center gap-3 group">
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
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-3 text-sm font-medium gap-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-slate-800/50 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}

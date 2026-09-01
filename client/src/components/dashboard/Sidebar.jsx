import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Rocket, 
  Trophy, 
  User, 
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Showcase', href: '/showcase', icon: Rocket },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 transform bg-white border-r border-cream/30 shadow-xl transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center gap-2 border-b border-cream/30 px-6">
            <Sparkles className="h-7 w-7 text-moss" />
            <span className="text-xl font-bold text-forest">NexLab</span>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-moss/10 text-moss border border-moss/20'
                      : 'text-deepForest/70 hover:text-forest hover:bg-cream/20'
                  )}
                >
                  <item.icon className={cn(
                    'h-5 w-5',
                    isActive ? 'text-moss' : 'text-deepForest/40'
                  )} />
                  {item.name}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-moss" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-cream/30 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-moss to-forest text-white font-semibold text-sm">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-forest truncate">{user?.name}</p>
                <p className="text-xs text-deepForest/60 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Target, Users, User } from 'lucide-react';

export function Layout() {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/goals', icon: Target, label: 'Goals' },
    { to: '/family', icon: Users, label: 'Family' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pl-64">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-primary-600">FamilyHealth</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center py-3 px-2 min-w-touch ${
                  isActive ? 'text-primary-600' : 'text-gray-500'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm mt-1">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

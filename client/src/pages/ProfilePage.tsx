import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Bell, Download, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [coachStyle, setCoachStyle] = useState<string>('encouraging');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const coachStyles = [
    { value: 'encouraging', label: 'Encouraging', description: 'Gentle, supportive, empathetic' },
    { value: 'motivating', label: 'Motivating', description: 'Energetic, enthusiastic, challenging' },
    { value: 'informative', label: 'Informative', description: 'Fact-based, educational, neutral' },
    { value: 'friendly', label: 'Friendly', description: 'Casual, buddy-like, conversational' },
  ];

  const menuItems = [
    { icon: Shield, label: 'Privacy Settings', href: '/profile/privacy' },
    { icon: Bell, label: 'Reminders', href: '/profile/reminders' },
    { icon: Download, label: 'Export Data', href: '/profile/export' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

      {/* User Info */}
      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
            <p className="text-gray-500">{user?.email || 'email@example.com'}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="label">Age</label>
            <p className="text-lg text-gray-900">{user?.age || '-'} years</p>
          </div>
          <div>
            <label className="label">Height</label>
            <p className="text-lg text-gray-900">{user?.height || '-'} cm</p>
          </div>
          <div>
            <label className="label">Weight</label>
            <p className="text-lg text-gray-900">{user?.currentWeight || '-'} kg</p>
          </div>
        </div>

        <button className="btn-outline mt-6">Edit Profile</button>
      </div>

      {/* AI Coach Style */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Coach Style</h2>
        <p className="text-gray-600 mb-4">Choose how your AI health coach communicates with you</p>
        <div className="grid gap-3 md:grid-cols-2">
          {coachStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => setCoachStyle(style.value)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                coachStyle === style.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">{style.label}</div>
              <div className="text-sm text-gray-500">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Menu */}
      <div className="card p-0">
        {menuItems.map(({ icon: Icon, label, href }, index) => (
          <button
            key={label}
            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
              index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-900">{label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Sign Out</span>
      </button>

      {/* App Info */}
      <div className="text-center text-sm text-gray-400">
        <p>FamilyHealth v1.0.0</p>
        <p className="mt-1">
          This app does not replace professional medical advice.
        </p>
      </div>
    </div>
  );
}

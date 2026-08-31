import React, { useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { Save, User, Mail, Bell, Moon, Sun } from 'lucide-react';

const Settings = () => {
  const { user } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    school: '',
    grade: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save settings
    console.log('Settings saved:', formData);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  School
                </label>
                <Input
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Your school name"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Grade
                  </label>
                  <Input
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    placeholder="8-12"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
              </div>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Email Notifications</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors">
                  <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Course Updates</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
                  <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Achievement Alerts</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors">
                  <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-gray-500" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex h-8 w-14 items-center rounded-full transition-colors ${
                  isDarkMode ? 'bg-gray-800' : 'bg-primary-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-gray-800 p-0.5" />
                  ) : (
                    <Sun className="h-5 w-5 text-primary-600 p-0.5" />
                  )}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
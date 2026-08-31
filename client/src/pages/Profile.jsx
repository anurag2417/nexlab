import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Trophy, Zap, Flame, Award } from 'lucide-react';

const Profile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <p className="text-gray-500">Please log in to view your profile</p>
        </div>
      </DashboardLayout>
    );
  }

  const gamification = user.gamification || { xp: 0, level: 1, streak: 0 };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar name={user.name} size="lg" />
              <div>
                <p className="text-xl font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <Badge variant="secondary" className="mt-1">
                  {user.role || 'Student'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-4 text-center">
                <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{gamification.xp || 0}</p>
                <p className="text-sm text-gray-500">Total XP</p>
              </div>
              <div className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-4 text-center">
                <Award className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{gamification.level || 1}</p>
                <p className="text-sm text-gray-500">Level</p>
              </div>
              <div className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-4 text-center">
                <Flame className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{gamification.streak || 0}</p>
                <p className="text-sm text-gray-500">Day Streak</p>
              </div>
              <div className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-4 text-center">
                <Zap className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-500">Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
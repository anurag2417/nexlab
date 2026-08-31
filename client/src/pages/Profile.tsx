import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';

const Profile: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <p>Please log in to view your profile</p>
        </div>
      </DashboardLayout>
    );
  }

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
              <Avatar size="lg" />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">XP</p>
                <p className="text-lg font-semibold">{user.gamification?.xp || 0}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Level</p>
                <p className="text-lg font-semibold">{user.gamification?.level || 1}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Streak</p>
                <p className="text-lg font-semibold">{user.gamification?.streak || 0} days</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-lg font-semibold capitalize">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
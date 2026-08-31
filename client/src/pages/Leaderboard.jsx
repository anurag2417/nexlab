import React, { useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Trophy, Medal, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Leaderboard = () => {
  const [filter, setFilter] = useState('global');

  const leaderboardData = [
    { rank: 1, name: 'Priya Sharma', xp: 2450, level: 25, streak: 30 },
    { rank: 2, name: 'Arjun Kumar', xp: 2100, level: 21, streak: 25 },
    { rank: 3, name: 'Ananya Reddy', xp: 1850, level: 19, streak: 28 },
    { rank: 4, name: 'Rahul Singh', xp: 1600, level: 16, streak: 20 },
    { rank: 5, name: 'Sneha Patel', xp: 1400, level: 14, streak: 22 },
    { rank: 6, name: 'Amit Kumar', xp: 1200, level: 12, streak: 18 },
    { rank: 7, name: 'Neha Gupta', xp: 1000, level: 10, streak: 15 },
    { rank: 8, name: 'Vikram Singh', xp: 800, level: 8, streak: 12 },
  ];

  const filters = ['global', 'weekly', 'monthly'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
            <p className="text-gray-500">Top students ranked by XP</p>
          </div>
        </div>

        <div className="flex gap-2">
          {filters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? 'bg-primary-600 hover:bg-primary-700'
                  : 'border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600'
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              Top Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((student) => (
                <div
                  key={student.rank}
                  className={`flex items-center gap-4 rounded-lg p-4 transition-colors ${
                    student.rank <= 3
                      ? 'bg-gradient-to-r from-yellow-50/80 to-yellow-100/30 border border-yellow-200/50'
                      : 'hover:bg-gray-50 border border-gray-100'
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full font-bold">
                    {student.rank === 1 && <Trophy className="h-6 w-6 text-yellow-500" />}
                    {student.rank === 2 && <Medal className="h-6 w-6 text-gray-400" />}
                    {student.rank === 3 && <Medal className="h-6 w-6 text-amber-600" />}
                    {student.rank > 3 && (
                      <span className="text-gray-500 font-medium">#{student.rank}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">
                      Level {student.level} • {student.streak} day streak
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">{student.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
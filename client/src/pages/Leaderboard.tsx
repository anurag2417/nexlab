import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Trophy, Medal } from 'lucide-react';

// Mock data for now
const leaderboardData = [
  { rank: 1, name: 'Priya Sharma', xp: 2450, level: 25, streak: 30 },
  { rank: 2, name: 'Arjun Kumar', xp: 2100, level: 21, streak: 25 },
  { rank: 3, name: 'Ananya Reddy', xp: 1850, level: 19, streak: 28 },
  { rank: 4, name: 'Rahul Singh', xp: 1600, level: 16, streak: 20 },
  { rank: 5, name: 'Sneha Patel', xp: 1400, level: 14, streak: 22 },
];

const Leaderboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((student) => (
                <div
                  key={student.rank}
                  className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-600">
                    {student.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                    {student.rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
                    {student.rank === 3 && <Medal className="h-5 w-5 text-amber-600" />}
                    {student.rank > 3 && `#${student.rank}`}
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
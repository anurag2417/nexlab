import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const Leaderboard = ({ users, title = 'Top Students' }) => {
  if (!users || users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.slice(0, 10).map((user, index) => (
            <div
              key={user.id || index}
              className={`flex items-center gap-4 rounded-lg p-3 transition-colors ${
                index < 3
                  ? 'bg-gradient-to-r from-yellow-50/80 to-yellow-100/30 border border-yellow-200/50'
                  : 'hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center font-bold">
                {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                {index === 1 && <Medal className="h-5 w-5 text-gray-400" />}
                {index === 2 && <Medal className="h-5 w-5 text-amber-600" />}
                {index > 2 && <span className="text-sm text-gray-500">#{index + 1}</span>}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">
                  Level {user.level || 1} • {user.streak || 0} day streak
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary-600">{user.xp || 0} XP</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
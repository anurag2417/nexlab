import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const Leaderboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Contributors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-primary-600">#{i}</span>
                <span>User Name</span>
              </div>
              <span className="font-semibold">1,200 XP</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
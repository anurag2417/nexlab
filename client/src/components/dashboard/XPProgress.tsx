import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const XPProgress = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience Points</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Level 1</span>
            <span>1,200 / 5,000 XP</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
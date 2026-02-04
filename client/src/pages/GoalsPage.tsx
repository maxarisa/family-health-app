import { Plus, Target, TrendingUp } from 'lucide-react';

export function GoalsPage() {
  // Mock data - to be replaced with actual API data
  const goals = [
    {
      id: '1',
      type: 'weight_loss',
      title: 'Lose 5 kg',
      target: 70,
      current: 72.5,
      startValue: 75,
      targetDate: '2026-04-01',
      progress: 50,
    },
    {
      id: '2',
      type: 'exercise_minutes',
      title: 'Exercise 150 min/week',
      target: 150,
      current: 90,
      targetDate: '2026-02-28',
      progress: 60,
    },
    {
      id: '3',
      type: 'water_intake',
      title: 'Drink 8 glasses daily',
      target: 8,
      current: 6,
      progress: 75,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
          <p className="text-gray-600 mt-1">Track your health objectives</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          New Goal
        </button>
      </div>

      {/* Active Goals */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
        {goals.map((goal) => (
          <div key={goal.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  {goal.targetDate && (
                    <p className="text-sm text-gray-500">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-lg font-bold text-primary-600">{goal.progress}%</span>
            </div>
            <div className="progress-bar mb-2">
              <div
                className="progress-fill"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Current: {goal.current}</span>
              <span>Target: {goal.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Goals */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Completed Goals</h2>
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Walk 10,000 steps daily for a week</h3>
              <p className="text-sm text-green-600">Completed on Jan 20, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

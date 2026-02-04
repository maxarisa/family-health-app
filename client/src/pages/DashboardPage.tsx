import { Droplets, Footprints, Scale, Moon, Heart, Thermometer, Activity } from 'lucide-react';

export function DashboardPage() {
  // TODO: Fetch actual data from API
  const dashboardData = {
    water: { current: 5, goal: 8 },
    exercise: { minutes: 25, goal: 30 },
    weight: { current: 72.5, trend: 'down' as const },
    sleep: { hours: 7.5, goal: 8 },
    vitalSigns: {
      bloodPressure: { systolic: 120, diastolic: 80 },
      heartRate: 72,
      temperature: 36.6,
    },
  };

  const quickActions = [
    { label: 'Log Water', icon: Droplets, color: 'bg-blue-500' },
    { label: 'Log Exercise', icon: Footprints, color: 'bg-green-500' },
    { label: 'Log Weight', icon: Scale, color: 'bg-purple-500' },
    { label: 'Log Sleep', icon: Moon, color: 'bg-indigo-500' },
    { label: 'Log BP', icon: Heart, color: 'bg-red-500' },
    { label: 'Log Temp', icon: Thermometer, color: 'bg-orange-500' },
  ];

  const waterPercentage = (dashboardData.water.current / dashboardData.water.goal) * 100;
  const exercisePercentage = (dashboardData.exercise.minutes / dashboardData.exercise.goal) * 100;
  const sleepPercentage = (dashboardData.sleep.hours / dashboardData.sleep.goal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good morning!</h1>
        <p className="text-gray-600 mt-1">Here's your health summary for today.</p>
      </div>

      {/* Coach Message */}
      <div className="card bg-primary-50 border-primary-200">
        <p className="text-primary-800">
          "You're doing great! Just 3 more glasses of water to reach your daily goal."
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {quickActions.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mb-2`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-700 text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Water */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Water</h3>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {dashboardData.water.current}/{dashboardData.water.goal} glasses
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill bg-blue-500"
              style={{ width: `${Math.min(waterPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Exercise */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Footprints className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Exercise</h3>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {dashboardData.exercise.minutes}/{dashboardData.exercise.goal} min
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill bg-green-500"
              style={{ width: `${Math.min(exercisePercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Weight */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Scale className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Weight</h3>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {dashboardData.weight.current} kg
            </span>
          </div>
          <p className="text-sm text-green-600">↓ Trending down</p>
        </div>

        {/* Sleep */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Moon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Sleep</h3>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {dashboardData.sleep.hours}/{dashboardData.sleep.goal} hrs
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill bg-indigo-500"
              style={{ width: `${Math.min(sleepPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Blood Pressure</h3>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {dashboardData.vitalSigns.bloodPressure.systolic}/{dashboardData.vitalSigns.bloodPressure.diastolic}
          </p>
          <p className="text-sm text-green-600">Normal</p>
        </div>

        {/* Heart Rate */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Heart Rate</h3>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {dashboardData.vitalSigns.heartRate} <span className="text-lg font-normal">bpm</span>
          </p>
          <p className="text-sm text-green-600">Normal</p>
        </div>
      </div>
    </div>
  );
}

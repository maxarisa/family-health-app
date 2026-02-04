import { Plus, Users, Crown, MoreVertical } from 'lucide-react';

export function FamilyPage() {
  // Mock data - to be replaced with actual API data
  const family = {
    name: 'The Smith Family',
    members: [
      { id: '1', name: 'Sarah Smith', isAdmin: true, streak: 14, waterProgress: 100 },
      { id: '2', name: 'Robert Smith', isAdmin: false, streak: 7, waterProgress: 75 },
      { id: '3', name: 'Emma Smith', isAdmin: false, streak: 21, waterProgress: 87 },
      { id: '4', name: 'John Smith', isAdmin: false, streak: 5, waterProgress: 50 },
    ],
  };

  const leaderboard = [
    { name: 'Emma', category: 'Longest Streak', value: '21 days' },
    { name: 'Sarah', category: 'Most Active', value: '180 min this week' },
    { name: 'Robert', category: 'Best Sleep', value: '8.2 hrs avg' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{family.name}</h1>
          <p className="text-gray-600 mt-1">{family.members.length} members</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Invite
        </button>
      </div>

      {/* Family Members */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Members</h2>
        <div className="space-y-3">
          {family.members.map((member) => (
            <div key={member.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    {member.isAdmin && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{member.streak} day streak</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Water Today</div>
                  <div className={`font-semibold ${
                    member.waterProgress >= 100 ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {member.waterProgress}%
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Family Leaderboard */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Weekly Highlights</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {leaderboard.map((item, index) => (
            <div key={index} className="card text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">{index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-lg font-bold text-primary-600 mt-2">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Family (if no family) */}
      <div className="card bg-gray-50 border-dashed border-2 border-gray-300 text-center py-8 hidden">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Family Group Yet</h3>
        <p className="text-gray-600 mb-4">Create a family group to track health together</p>
        <button className="btn-primary mx-auto">
          Create Family Group
        </button>
      </div>
    </div>
  );
}

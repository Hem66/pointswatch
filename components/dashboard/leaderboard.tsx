'use client'

import { Card } from '@/components/ui/card'

interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  points: number
  level: string
  earnedThisWeek: number
  badge?: string
}

export default function Leaderboard() {
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      username: 'RewardHunter',
      avatar: '🏆',
      points: 45230,
      level: 'Platinum',
      earnedThisWeek: 2450,
      badge: '👑',
    },
    {
      rank: 2,
      username: 'TaskMaster',
      avatar: '⚡',
      points: 38900,
      level: 'Gold',
      earnedThisWeek: 1890,
    },
    {
      rank: 3,
      username: 'EarnSmarter',
      avatar: '💡',
      points: 36700,
      level: 'Gold',
      earnedThisWeek: 1650,
    },
    {
      rank: 4,
      username: 'BusyBee',
      avatar: '🐝',
      points: 32450,
      level: 'Silver',
      earnedThisWeek: 1420,
    },
    {
      rank: 5,
      username: 'MoneyMaker',
      avatar: '💰',
      points: 29800,
      level: 'Silver',
      earnedThisWeek: 1280,
    },
    {
      rank: 6,
      username: 'TrendSetter',
      avatar: '✨',
      points: 27500,
      level: 'Silver',
      earnedThisWeek: 980,
    },
    {
      rank: 7,
      username: 'GrowerMind',
      avatar: '🌱',
      points: 24300,
      level: 'Bronze',
      earnedThisWeek: 850,
    },
    {
      rank: 8,
      username: 'YourName',
      avatar: '👤',
      points: 12450,
      level: 'Bronze',
      earnedThisWeek: 350,
    },
    {
      rank: 9,
      username: 'Newcomer99',
      avatar: '🎯',
      points: 8950,
      level: 'Bronze',
      earnedThisWeek: 200,
    },
    {
      rank: 10,
      username: 'PersistedDreamer',
      avatar: '🚀',
      points: 6200,
      level: 'Bronze',
      earnedThisWeek: 120,
    },
  ]

  const getTierColor = (level: string) => {
    switch (level) {
      case 'Platinum':
        return 'from-blue-400 to-cyan-400'
      case 'Gold':
        return 'from-yellow-400 to-amber-500'
      case 'Silver':
        return 'from-gray-300 to-slate-400'
      default:
        return 'from-yellow-600 to-orange-500'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Global Leaderboard</h2>
        <p className="text-muted-foreground">Top earners this season</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 3 */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboardData.slice(0, 3).map((entry, index) => (
              <Card
                key={entry.rank}
                className={`bg-gradient-to-br ${getTierColor(entry.level)} bg-opacity-10 border-2 border-border/50 p-6 text-center`}
              >
                <div className="space-y-4">
                  {index === 0 && <div className="text-5xl">👑</div>}
                  {index === 1 && <div className="text-4xl">🥈</div>}
                  {index === 2 && <div className="text-4xl">🥉</div>}

                  <div className="text-4xl">{entry.avatar}</div>

                  <div>
                    <h3 className="font-bold text-foreground text-lg">{entry.username}</h3>
                    <p className="text-sm text-muted-foreground">{entry.level} Tier</p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-muted-foreground text-xs">Total Points</p>
                      <p className="text-2xl font-bold text-foreground">{entry.points.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">This Week</p>
                      <p className="text-lg font-semibold text-accent">+{entry.earnedThisWeek}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Rest of Leaderboard */}
        <div className="lg:col-span-3">
          <Card className="bg-card/50 border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-secondary/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Level</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Points</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">This Week</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {leaderboardData.slice(3).map((entry) => (
                    <tr
                      key={entry.rank}
                      className={`hover:bg-secondary/50 transition-all ${
                        entry.rank === 8 ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {entry.rank <= 3 && <span className="text-lg">{entry.badge}</span>}
                          <span className="font-bold text-foreground">#{entry.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{entry.avatar}</div>
                          <span className="font-semibold text-foreground">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTierColor(entry.level)} bg-opacity-20`}>
                          {entry.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-foreground">{entry.points.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-accent">+{entry.earnedThisWeek}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-muted-foreground text-sm mb-2">Your Rank</p>
          <p className="text-4xl font-bold text-foreground">#8</p>
          <p className="text-xs text-muted-foreground mt-2">Out of 10,234 users</p>
        </Card>
        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-muted-foreground text-sm mb-2">Points to Top 5</p>
          <p className="text-4xl font-bold text-accent">17,350</p>
          <p className="text-xs text-muted-foreground mt-2">Keep grinding!</p>
        </Card>
        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-muted-foreground text-sm mb-2">Weekly Growth</p>
          <p className="text-4xl font-bold text-green-500">+350</p>
          <p className="text-xs text-muted-foreground mt-2">3% rank improvement</p>
        </Card>
      </div>
    </div>
  )
}

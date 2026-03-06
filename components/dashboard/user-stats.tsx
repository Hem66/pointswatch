'use client'

import { Card } from '@/components/ui/card'

interface StatCard {
  label: string
  value: string | number
  icon: string
  trend?: string
  color: string
}

export default function UserStats() {
  const stats: StatCard[] = [
    {
      label: 'Total Points',
      value: '12,450',
      icon: '⭐',
      trend: '+350 this week',
      color: 'from-primary to-accent',
    },
    {
      label: 'Available Rewards',
      value: '$245.50',
      icon: '💰',
      trend: 'Claimable',
      color: 'from-accent to-primary',
    },
    {
      label: 'Level',
      value: '8',
      icon: '🎯',
      trend: 'Diamond Tier',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Referrals',
      value: '23',
      icon: '👥',
      trend: '+5 this month',
      color: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, Champion! 👋</h1>
        <p className="text-muted-foreground">Complete tasks to earn rewards and climb the leaderboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-card to-card/50 border-border/50 p-6 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl group-hover:scale-110 transition-transform">{stat.icon}</div>
              <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Progress Bar */}
      <Card className="bg-card/50 border-border/50 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Tier Progress</h3>
            <span className="text-sm text-muted-foreground">Diamond Tier</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Level: 8 / 10</span>
              <span className="text-primary font-semibold">80%</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: '80%' }}
              />
            </div>
            <p className="text-xs text-muted-foreground">2,550 points needed to reach Platinum Tier</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

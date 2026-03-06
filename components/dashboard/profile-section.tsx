'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AchievementBadge from './achievement-badge'

interface PointsHistory {
  id: number
  description: string
  points: number
  type: 'earn' | 'spend' | 'bonus'
  date: string
  task?: string
}

export default function ProfileSection() {
  const [showPointsHistory, setShowPointsHistory] = useState(false)

  const pointsHistory: PointsHistory[] = [
    {
      id: 1,
      description: 'Completed task: Subscribe to YouTube',
      points: 500,
      type: 'earn',
      date: 'Today at 2:30 PM',
      task: 'Subscribe to YouTube',
    },
    {
      id: 2,
      description: 'Bonus: Daily login streak',
      points: 100,
      type: 'bonus',
      date: 'Today at 8:00 AM',
    },
    {
      id: 3,
      description: 'Completed task: Watch video',
      points: 250,
      type: 'earn',
      date: 'Yesterday at 4:15 PM',
      task: 'Watch product demo',
    },
    {
      id: 4,
      description: 'Referral bonus: Friend signed up',
      points: 300,
      type: 'bonus',
      date: 'Yesterday at 11:20 AM',
    },
    {
      id: 5,
      description: 'Completed task: Share on WhatsApp',
      points: 400,
      type: 'earn',
      date: '2 days ago',
      task: 'Share referral link',
    },
    {
      id: 6,
      description: 'Bonus: Weekly achievement',
      points: 200,
      type: 'bonus',
      date: '3 days ago',
    },
  ]

  const achievements = [
    {
      name: 'First Task',
      description: 'Complete your first task',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500',
      unlockedAt: '2 weeks ago',
    },
    {
      name: 'Task Master',
      description: 'Complete 50 tasks',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500',
      unlockedAt: '1 week ago',
    },
    {
      name: 'Referral King',
      description: 'Refer 10 users',
      icon: '👑',
      color: 'from-purple-500 to-pink-500',
      unlockedAt: '3 days ago',
    },
    {
      name: 'Platinum Elite',
      description: 'Reach Platinum tier',
      icon: '💎',
      color: 'from-blue-400 to-cyan-400',
      locked: true,
    },
    {
      name: 'Millionaire',
      description: 'Earn $1,000,000',
      icon: '💰',
      color: 'from-green-500 to-emerald-500',
      locked: true,
    },
    {
      name: 'Legend',
      description: 'Reach rank #1',
      icon: '🏆',
      color: 'from-orange-500 to-red-500',
      locked: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="bg-card/50 border-border/50 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-5xl">
              👤
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-card"></div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">YourName</h2>
              <p className="text-muted-foreground">@yourname • Member since Jan 2024</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Level</p>
                <p className="text-2xl font-bold text-primary">8</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Tier</p>
                <p className="text-2xl font-bold text-accent">Diamond</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Joined</p>
                <p className="text-2xl font-bold text-green-500">23</p>
              </div>
            </div>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Points System Section */}
      <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-border/50 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Current Points</p>
            <p className="text-5xl font-bold text-primary">12,450</p>
            <p className="text-xs text-muted-foreground">⭐ 350 points this week</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Points to Next Tier</p>
            <p className="text-5xl font-bold text-accent">5,550</p>
            <div className="w-full bg-secondary/50 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '69%' }} />
            </div>
            <p className="text-xs text-muted-foreground">69% to Platinum Tier</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Lifetime Bonus Points</p>
            <p className="text-5xl font-bold text-green-500">3,200</p>
            <p className="text-xs text-muted-foreground">From referrals and achievements</p>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50 p-4">
          <p className="text-muted-foreground text-xs mb-1">Total Tasks</p>
          <p className="text-3xl font-bold text-foreground">128</p>
          <p className="text-xs text-muted-foreground mt-2">This month: +42</p>
        </Card>
        <Card className="bg-card/50 border-border/50 p-4">
          <p className="text-muted-foreground text-xs mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-accent">₦245,280</p>
          <p className="text-xs text-muted-foreground mt-2">Lifetime</p>
        </Card>
        <Card className="bg-card/50 border-border/50 p-4">
          <p className="text-muted-foreground text-xs mb-1">Referral Bonus</p>
          <p className="text-3xl font-bold text-primary">₦124,000</p>
          <p className="text-xs text-muted-foreground mt-2">From 23 referrals</p>
        </Card>
        <Card className="bg-card/50 border-border/50 p-4">
          <p className="text-muted-foreground text-xs mb-1">Pending Payout</p>
          <p className="text-3xl font-bold text-green-500">₦24,500</p>
          <p className="text-xs text-muted-foreground mt-2">Available now</p>
        </Card>
      </div>

      {/* Account Settings */}
      <Card className="bg-card/50 border-border/50 p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <p className="font-semibold text-foreground">Email Address</p>
              <p className="text-muted-foreground text-sm">you@example.com</p>
            </div>
            <Button variant="outline" className="border-border/50 bg-transparent">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <p className="font-semibold text-foreground">Password</p>
              <p className="text-muted-foreground text-sm">Last changed 2 months ago</p>
            </div>
            <Button variant="outline" className="border-border/50 bg-transparent">
              Update
            </Button>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <p className="font-semibold text-foreground">Wallet Address</p>
              <p className="text-muted-foreground text-sm">0x742d...a4c2</p>
            </div>
            <Button variant="outline" className="border-border/50 bg-transparent">
              Update
            </Button>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <p className="font-semibold text-foreground">Two-Factor Auth</p>
              <p className="text-muted-foreground text-sm">Disabled</p>
            </div>
            <Button variant="outline" className="border-border/50 bg-transparent">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Notifications</p>
              <p className="text-muted-foreground text-sm">All enabled</p>
            </div>
            <Button variant="outline" className="border-border/50 bg-transparent">
              Manage
            </Button>
          </div>
        </div>
      </Card>

      {/* Points History */}
      <Card className="bg-card/50 border-border/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Points History</h3>
          <Button
            onClick={() => setShowPointsHistory(!showPointsHistory)}
            variant="outline"
            className="border-border/50 bg-transparent"
          >
            {showPointsHistory ? 'Hide' : 'Show All'}
          </Button>
        </div>

        <div className="space-y-3">
          {pointsHistory.slice(0, showPointsHistory ? pointsHistory.length : 3).map((entry) => (
            <div key={entry.id} className="flex items-center justify-between pb-3 border-b border-border/50 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {entry.type === 'earn' && '📈'}
                    {entry.type === 'spend' && '📉'}
                    {entry.type === 'bonus' && '🎁'}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{entry.description}</p>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                    {entry.task && (
                      <p className="text-xs text-primary font-semibold mt-1">{entry.task}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${
                  entry.type === 'earn' || entry.type === 'bonus' ? 'text-primary' : 'text-destructive'
                }`}>
                  {entry.type === 'spend' ? '-' : '+'}
                  {entry.points}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-foreground">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementBadge
              key={index}
              name={achievement.name}
              description={achievement.description}
              icon={achievement.icon}
              color={achievement.color}
              unlockedAt={achievement.unlockedAt}
              locked={achievement.locked}
            />
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <Card className="bg-destructive/10 border border-destructive/50 p-8">
        <h3 className="text-xl font-bold text-destructive mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-destructive/20">
            <div>
              <p className="font-semibold text-foreground">Suspend Account</p>
              <p className="text-muted-foreground text-sm">Temporarily disable your account</p>
            </div>
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent">
              Suspend
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Delete Account</p>
              <p className="text-muted-foreground text-sm">Permanently delete all your data</p>
            </div>
            <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

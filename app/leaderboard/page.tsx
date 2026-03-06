'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useTheme } from '@/lib/theme-provider'

interface LeaderboardUser {
  rank: number
  name: string
  avatar: string
  tasksCompleted: number
  points: number
  amount: number
  trend: 'up' | 'down' | 'stable'
}

export default function LeaderboardPage() {
  const { theme, toggleTheme } = useTheme()
  const [sortBy, setSortBy] = useState<'points' | 'tasks' | 'amount'>('points')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const leaderboardData: LeaderboardUser[] = [
    {
      rank: 1,
      name: 'Alex Chen',
      avatar: '👨',
      tasksCompleted: 247,
      points: 12500,
      amount: 245000,
      trend: 'up',
    },
    {
      rank: 2,
      name: 'Sarah Johnson',
      avatar: '👩',
      tasksCompleted: 198,
      points: 11200,
      amount: 215000,
      trend: 'up',
    },
    {
      rank: 3,
      name: 'Marcus Williams',
      avatar: '👨‍💼',
      tasksCompleted: 189,
      points: 10800,
      amount: 205000,
      trend: 'stable',
    },
    {
      rank: 4,
      name: 'Emma Davis',
      avatar: '👩‍🦰',
      tasksCompleted: 176,
      points: 9900,
      amount: 189000,
      trend: 'down',
    },
    {
      rank: 5,
      name: 'James Miller',
      avatar: '👨‍🦱',
      tasksCompleted: 165,
      points: 9200,
      amount: 175000,
      trend: 'up',
    },
    {
      rank: 6,
      name: 'Lisa Anderson',
      avatar: '👱‍♀️',
      tasksCompleted: 152,
      points: 8600,
      amount: 164000,
      trend: 'stable',
    },
    {
      rank: 7,
      name: 'Michael Brown',
      avatar: '🧑‍🦲',
      tasksCompleted: 148,
      points: 8300,
      amount: 158000,
      trend: 'up',
    },
    {
      rank: 8,
      name: 'Jessica Taylor',
      avatar: '👩‍🦱',
      tasksCompleted: 136,
      points: 7600,
      amount: 145000,
      trend: 'down',
    },
    {
      rank: 9,
      name: 'David Martinez',
      avatar: '👨‍🦱',
      tasksCompleted: 128,
      points: 7100,
      amount: 135000,
      trend: 'up',
    },
    {
      rank: 10,
      name: 'Sophie Wilson',
      avatar: '👩‍🦲',
      tasksCompleted: 115,
      points: 6400,
      amount: 122000,
      trend: 'stable',
    },
    {
      rank: 11,
      name: 'Thomas Garcia',
      avatar: '👨',
      tasksCompleted: 108,
      points: 6000,
      amount: 114000,
      trend: 'down',
    },
    {
      rank: 12,
      name: 'Rachel Lee',
      avatar: '👩',
      tasksCompleted: 98,
      points: 5500,
      amount: 105000,
      trend: 'up',
    },
  ]

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (sortBy === 'points') return b.points - a.points
    if (sortBy === 'tasks') return b.tasksCompleted - a.tasksCompleted
    return b.amount - a.amount
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-background border border-border/50 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center text-white text-xs font-bold">
                P
              </div>
            </div>
            <span className="font-bold text-lg text-foreground">PlugCircle</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary/50 rounded-lg transition"
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            <Link href="/">
              <Button size="sm" variant="outline" className="border-border/50 text-foreground hover:bg-secondary/50 bg-transparent">
                Tasks
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary/50 rounded-lg transition"
              aria-label="Toggle theme"
            >
              <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-secondary/50 rounded-lg transition"
              aria-label="Toggle menu"
            >
              <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border/50 py-4 px-4 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-secondary/50 hover:bg-secondary text-foreground justify-start">
                📋 Tasks
              </Button>
            </Link>
            <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Footer Menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 z-40">
        <div className="flex items-center justify-around h-16 px-2">
          <Link href="/" className="flex flex-col items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground transition">
            <span className="text-2xl">📋</span>
            <span className="text-xs mt-1">Tasks</span>
          </Link>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg text-primary font-semibold">
            <span className="text-2xl">🏆</span>
            <span className="text-xs mt-1">Ranks</span>
          </div>
          <Link href="/" className="flex flex-col items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground transition">
            <span className="text-2xl">💬</span>
            <span className="text-xs mt-1">Chat</span>
          </Link>
          <Link href="/auth" className="flex flex-col items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground transition">
            <span className="text-2xl">👤</span>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>

      {/* Mobile Footer Spacer */}
      <div className="md:hidden h-20"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Global Leaderboard</h1>
            <p className="text-muted-foreground">Compete with thousands of users and climb the ranks</p>
          </div>

          {/* Sort Buttons */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('points')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'points'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-foreground hover:bg-secondary'
                }`}
              >
                Points
              </button>
              <button
                onClick={() => setSortBy('tasks')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'tasks'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-foreground hover:bg-secondary'
                }`}
              >
                Tasks Completed
              </button>
              <button
                onClick={() => setSortBy('amount')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'amount'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-foreground hover:bg-secondary'
                }`}
              >
                Amount Earned
              </button>
            </div>
          </div>
        </div>

        {/* Top 3 Featured */}
        {sortedData.slice(0, 3).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {sortedData.slice(0, 3).map((user, index) => {
              const medals = ['🥇', '🥈', '🥉']
              return (
                <Card
                  key={user.rank}
                  className={`bg-card/30 border-border/50 p-4 text-center`}
                >
                  <div className="space-y-2">
                    <div className="text-4xl">{medals[index]}</div>
                    <div className="text-4xl">{user.avatar}</div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{user.name}</h3>
                      <p className="text-xs text-muted-foreground">Rank #{user.rank}</p>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-border/50">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Points</span>
                        <span className="font-bold text-primary">{user.points.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Tasks</span>
                        <span className="font-semibold text-foreground">{user.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Earned</span>
                        <span className="font-bold text-accent">₦{(user.amount / 1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Full Leaderboard Table */}
        <Card className="bg-card/30 border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Tasks</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Points</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Amount</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((user, index) => (
                  <tr
                    key={user.rank}
                    className="border-b border-border/50 hover:bg-secondary/20 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">#{user.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{user.avatar}</span>
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-foreground">{user.tasksCompleted}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-primary">{user.points.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-accent">₦{user.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg">
                        {user.trend === 'up' && '📈'}
                        {user.trend === 'down' && '📉'}
                        {user.trend === 'stable' && '➡️'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Your Rank Section */}
        <Card className="bg-primary/10 border-primary/50 p-8 mt-12 text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Your Current Rank</h3>
            <p className="text-muted-foreground">Sign in to see your position on the leaderboard</p>
            <Link href="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 px-8 inline-block">
                Sign In to View Your Rank
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

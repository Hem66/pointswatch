'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Transaction {
  id: string
  userId: string
  userName: string
  action: string
  amount: number
  timestamp: Date
  status: 'completed' | 'pending'
}

interface UserMetric {
  id: string
  name: string
  totalEarnings: number
  taskCount: number
  lastActive: Date
  status: 'active' | 'inactive'
}

export default function MonitorDashboard() {
  const [dateRange, setDateRange] = useState('month')

  // Mock data
  const stats = {
    totalPayouts: 125000,
    pendingPayouts: 45000,
    totalTransactions: 2341,
    activeUsers: 856,
  }

  const topEarners: UserMetric[] = [
    {
      id: '1',
      name: 'Chidiebere O.',
      totalEarnings: 45000,
      taskCount: 142,
      lastActive: new Date(),
      status: 'active',
    },
    {
      id: '2',
      name: 'Tunde A.',
      totalEarnings: 38500,
      taskCount: 128,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      id: '3',
      name: 'Amara N.',
      totalEarnings: 32000,
      taskCount: 98,
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'inactive',
    },
    {
      id: '4',
      name: 'Chioma E.',
      totalEarnings: 28500,
      taskCount: 85,
      lastActive: new Date(Date.now() - 5 * 60 * 1000),
      status: 'active',
    },
    {
      id: '5',
      name: 'Nonso D.',
      totalEarnings: 25000,
      taskCount: 71,
      lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'active',
    },
  ]

  const recentTransactions: Transaction[] = [
    {
      id: 'tx-1',
      userId: 'user-123',
      userName: 'Chidiebere O.',
      action: 'Watch Video + Comments',
      amount: 1300,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'completed',
    },
    {
      id: 'tx-2',
      userId: 'user-456',
      userName: 'Tunde A.',
      action: 'Subscribe',
      amount: 1000,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'completed',
    },
    {
      id: 'tx-3',
      userId: 'user-789',
      userName: 'Amara N.',
      action: 'Survey',
      amount: 1000,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'pending',
    },
    {
      id: 'tx-4',
      userId: 'user-321',
      userName: 'Chioma E.',
      action: 'Watch Video + Bonus',
      amount: 1700,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'completed',
    },
  ]

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Monitor Dashboard</h2>
        <p className="text-muted-foreground text-sm">Track earnings, payouts, and user activity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-xs text-muted-foreground mb-1">Total Payouts (Month)</p>
          <p className="text-3xl font-bold text-green-500">₦{stats.totalPayouts.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">↑ 12% from last month</p>
        </Card>

        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-xs text-muted-foreground mb-1">Pending Payouts</p>
          <p className="text-3xl font-bold text-yellow-500">₦{stats.pendingPayouts.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{stats.activeUsers} users</p>
        </Card>

        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
          <p className="text-3xl font-bold text-blue-500">{stats.totalTransactions.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">This month</p>
        </Card>

        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-xs text-muted-foreground mb-1">Active Users</p>
          <p className="text-3xl font-bold text-primary">{stats.activeUsers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">↑ 8% growth</p>
        </Card>
      </div>

      {/* Top Earners */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Top Earners</h3>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {topEarners.map((user, idx) => (
            <Card key={user.id} className="bg-card/50 border-border/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.taskCount} tasks completed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    className={`text-xs ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-gray-500/20 text-gray-600'
                    }`}
                  >
                    {user.status === 'active' ? '🟢 Active' : '🔘 Inactive'}
                  </Badge>
                  <div className="text-right">
                    <p className="font-bold text-foreground">₦{user.totalEarnings.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(user.lastActive)}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Recent Transactions</h3>

        <div className="space-y-2">
          {recentTransactions.map(tx => (
            <Card key={tx.id} className="bg-card/50 border-border/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{tx.userName}</p>
                  <p className="text-sm text-muted-foreground">{tx.action}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    className={`text-xs ${
                      tx.status === 'completed'
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-yellow-500/20 text-yellow-600'
                    }`}
                  >
                    {tx.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                  </Badge>
                  <div className="text-right">
                    <p className="font-bold text-green-500">+₦{tx.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(tx.timestamp)}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="flex gap-3">
        <Button variant="outline">📊 Export Report</Button>
        <Button variant="outline">📥 Download CSV</Button>
      </div>
    </div>
  )
}

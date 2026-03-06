'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

interface QuickStats {
  totalUsers: number
  pendingPayouts: number
  activeTasks: number
}

interface AdminNavProps {
  stats?: QuickStats
}

export default function AdminNav({ stats = { totalUsers: 1250, pendingPayouts: 15, activeTasks: 24 } }: AdminNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/tasks', label: 'Task Management', icon: '✓' },
    { href: '/admin/monitor', label: 'Monitor', icon: '👁️' },
    { href: '/admin/payouts', label: 'Payouts', icon: '💰' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-full md:w-64 bg-card/50 border-b md:border-b-0 md:border-r border-border/50 p-4">
      <div className="md:sticky md:top-0 md:max-h-screen md:overflow-y-auto">
        {/* Admin Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground">Admin</h2>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
          </div>
          <p className="text-xs text-muted-foreground">Task Management System</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-3 mb-6 md:space-y-2">
          <div className="bg-primary/10 rounded-lg p-3 text-center md:text-left">
            <p className="text-xs text-muted-foreground">Users</p>
            <p className="text-lg md:text-xl font-bold text-primary">{stats.totalUsers}</p>
          </div>
          <div className="bg-accent/10 rounded-lg p-3 text-center md:text-left">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-lg md:text-xl font-bold text-accent">{stats.pendingPayouts}</p>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 text-center md:text-left">
            <p className="text-xs text-muted-foreground">Tasks</p>
            <p className="text-lg md:text-xl font-bold text-green-500">{stats.activeTasks}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Back to User Dashboard */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DashboardNavProps {
  activeTab: string
  onTabChange: (tab: any) => void
  onNotificationsClick: () => void
}

export default function DashboardNav({ activeTab, onTabChange, onNotificationsClick }: DashboardNavProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'referrals', label: 'Refer & Earn', icon: '🤝' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-xl">⌚</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">RewardWatch</span>
          </div>

          {/* Nav Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onNotificationsClick}
              className="relative p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-all"
            >
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>

          {/* Right Section */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={onNotificationsClick}
              className="relative p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-all"
            >
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <button className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-foreground hover:bg-secondary/80 transition-all">
              👤
            </button>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-border/50 text-foreground hover:bg-secondary/50 bg-transparent text-xs">
                Logout
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Tab Scroll */}
        <div className="md:hidden -mx-4 px-4 pb-2 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 min-w-min">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

'use client'

import { useState } from 'react'
import DashboardNav from '@/components/dashboard/dashboard-nav'
import UserStats from '@/components/dashboard/user-stats'
import TaskTiers from '@/components/dashboard/task-tiers'
import Leaderboard from '@/components/dashboard/leaderboard'
import ReferralSection from '@/components/dashboard/referral-section'
import NotificationCenter from '@/components/dashboard/notification-center'
import ProfileSection from '@/components/dashboard/profile-section'
import PointsWidget from '@/components/dashboard/points-widget'

type DashboardTab = 'dashboard' | 'tasks' | 'leaderboard' | 'referrals' | 'profile'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard')
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <DashboardNav 
        onTabChange={setActiveTab} 
        activeTab={activeTab}
        onNotificationsClick={() => setShowNotifications(!showNotifications)}
      />

      {showNotifications && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setShowNotifications(false)}>
          <div onClick={(e) => e.stopPropagation()} className="absolute top-20 right-4 max-w-sm">
            <NotificationCenter />
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <UserStats />
              </div>
              <div>
                <PointsWidget />
              </div>
            </div>
            <TaskTiers />
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="animate-in fade-in duration-500">
            <TaskTiers />
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="animate-in fade-in duration-500">
            <Leaderboard />
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="animate-in fade-in duration-500">
            <ReferralSection />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-in fade-in duration-500">
            <ProfileSection />
          </div>
        )}
      </main>
    </div>
  )
}

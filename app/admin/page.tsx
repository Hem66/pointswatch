'use client'

import { useState } from 'react'
import AdminNav from '@/components/admin/admin-nav'
import TaskManagement from '@/components/admin/task-management'
import MonitorDashboard from '@/components/admin/monitor-dashboard'
import PayoutManager from '@/components/admin/payout-manager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Navigation */}
      <AdminNav
        stats={{
          totalUsers: 1250,
          pendingPayouts: 15,
          activeTasks: 24,
        }}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="monitor">Monitor</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <MonitorDashboard />
            </TabsContent>

            <TabsContent value="tasks">
              <TaskManagement />
            </TabsContent>

            <TabsContent value="monitor">
              <MonitorDashboard />
            </TabsContent>

            <TabsContent value="payouts">
              <PayoutManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

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
import TaskFormModal from './task-form-modal'

interface BonusTask {
  id: string
  name: string
  type: 'comment' | 'share'
  reward: number
}

interface AdminTask {
  id: string
  name: string
  description: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  type: 'watch' | 'subscribe' | 'survey' | 'signup'
  nairaReward: number
  pointsReward: number
  minDuration?: number
  taskUrl?: string
  status: 'active' | 'paused'
  bonusTasks: BonusTask[]
  completions: number
  createdAt: Date
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState<AdminTask[]>([
    {
      id: 'task-1',
      name: 'Watch YouTube Video',
      description: 'Watch a featured video for 60+ seconds',
      tier: 'bronze',
      type: 'watch',
      nairaReward: 1000,
      pointsReward: 100,
      minDuration: 60,
      status: 'active',
      bonusTasks: [
        { id: 'bonus-1', name: 'Comment on Video', type: 'comment', reward: 300 },
        { id: 'bonus-2', name: 'Share on WhatsApp', type: 'share', reward: 400 },
      ],
      completions: 234,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 'task-2',
      name: 'Subscribe to Channel',
      description: 'Subscribe to our YouTube channel',
      tier: 'bronze',
      type: 'subscribe',
      nairaReward: 1000,
      pointsReward: 100,
      status: 'active',
      bonusTasks: [{ id: 'bonus-3', name: 'Enable Notifications', type: 'comment', reward: 250 }],
      completions: 512,
      createdAt: new Date('2024-01-10'),
    },
  ])

  const [filterTier, setFilterTier] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<AdminTask | null>(null)

  const filteredTasks = tasks.filter(task => {
    if (filterTier !== 'all' && task.tier !== filterTier) return false
    if (filterType !== 'all' && task.type !== filterType) return false
    if (filterStatus !== 'all' && task.status !== filterStatus) return false
    return true
  })

  const handleAddTask = (data: any) => {
    const newTask: AdminTask = {
      ...data,
      id: `task-${Date.now()}`,
      completions: 0,
      createdAt: new Date(),
    }
    setTasks([...tasks, newTask])
    setFormModalOpen(false)
  }

  const handleEditTask = (task: AdminTask) => {
    setEditingTask(task)
    setFormModalOpen(true)
  }

  const handleUpdateTask = (data: any) => {
    setTasks(tasks.map(t => (t.id === editingTask?.id ? { ...t, ...data } : t)))
    setEditingTask(null)
    setFormModalOpen(false)
  }

  const handleTogglePause = (taskId: string) => {
    setTasks(
      tasks.map(t =>
        t.id === taskId ? { ...t, status: t.status === 'active' ? 'paused' : 'active' } : t
      )
    )
  }

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== taskId))
    }
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      watch: '📺',
      subscribe: '📢',
      survey: '📋',
      signup: '📧',
    }
    return icons[type] || '✓'
  }

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      bronze: 'bg-yellow-600/20 text-yellow-600',
      silver: 'bg-gray-400/20 text-gray-400',
      gold: 'bg-yellow-400/20 text-yellow-600',
      platinum: 'bg-blue-400/20 text-blue-400',
    }
    return colors[tier] || ''
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Task Management</h2>
          <p className="text-muted-foreground text-sm">Create, edit, and manage all tasks across tiers</p>
        </div>
        <Button
          onClick={() => {
            setEditingTask(null)
            setFormModalOpen(true)
          }}
          className="bg-primary"
        >
          + New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Tier</label>
          <Select value={filterTier} onValueChange={setFilterTier}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="bronze">Bronze</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Type</label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="watch">Watch Video</SelectItem>
              <SelectItem value="subscribe">Subscribe</SelectItem>
              <SelectItem value="survey">Survey</SelectItem>
              <SelectItem value="signup">Sign Up</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Status</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Results</label>
          <div className="px-3 py-2 rounded-md border border-border/50 bg-background">
            <p className="text-sm font-semibold">{filteredTasks.length} tasks</p>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <Card key={task.id} className="bg-card/50 border-border/50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getTypeIcon(task.type)}</span>
                    <div>
                      <h3 className="font-bold text-foreground">{task.name}</h3>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge className={`${getTierColor(task.tier)}`}>{task.tier}</Badge>
                    <Badge variant="outline" className="text-xs">
                      ₦{task.nairaReward.toLocaleString()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ⭐ {task.pointsReward}
                    </Badge>
                    <Badge
                      className={`text-xs ${
                        task.status === 'active'
                          ? 'bg-green-500/20 text-green-600'
                          : 'bg-yellow-500/20 text-yellow-600'
                      }`}
                    >
                      {task.status === 'active' ? '✓ Active' : '⏸ Paused'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {task.completions} completions
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTogglePause(task.id)}
                  >
                    {task.status === 'active' ? '⏸ Pause' : '▶ Resume'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditTask(task)}
                  >
                    ✏ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    🗑 Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-card/50 border-border/50 p-8 text-center">
            <p className="text-muted-foreground">No tasks found matching your filters</p>
          </Card>
        )}
      </div>

      <TaskFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        initialData={editingTask || undefined}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
      />
    </div>
  )
}

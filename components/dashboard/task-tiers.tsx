'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface BonusTask {
  id: string
  name: string
  type: 'comment' | 'share'
  reward: number
  completed: boolean
}

interface Task {
  id: string
  name: string
  description: string
  type: 'watch' | 'subscribe' | 'survey' | 'signup'
  nairaReward: number
  pointsReward: number
  action: string
  completed: boolean
  icon: string
  minDuration?: number
  watchProgress?: number
  bonusTasks?: BonusTask[]
  cooldownUntil?: number
}

interface Tier {
  id: string
  name: string
  level: string
  color: string
  minPoints: number
  tasks: Task[]
  unlocked: boolean
}

export default function TaskTiers() {
  const [expandedTier, setExpandedTier] = useState<string>('bronze')
  const [tasks, setTasks] = useState<Task[]>([])
  const [expandedTask, setExpandedTask] = useState<string | null>(null)

  const COOLOFF_PERIOD = 3 * 60 * 60 * 1000 // 3 hours in milliseconds
  const BASE_NAIRA_REWARD = 1000 // Naira currency
  const BASE_POINTS_REWARD = 100 // Gamification points

  const initialTiers: Tier[] = [
    {
      id: 'bronze',
      name: 'Bronze Tier',
      level: 'Beginner',
      color: 'from-yellow-600 to-orange-500',
      minPoints: 0,
      unlocked: true,
      tasks: [
        {
          id: 'task-1',
          name: 'Watch YouTube Video',
          description: 'Watch a featured video for 60+ seconds',
          type: 'watch',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Watch Video',
          completed: false,
          icon: '📺',
          minDuration: 60,
          watchProgress: 0,
          bonusTasks: [
            { id: 'bonus-1-1', name: 'Comment on Video', type: 'comment', reward: 300, completed: false },
            { id: 'bonus-1-2', name: 'Share on WhatsApp', type: 'share', reward: 400, completed: false },
          ],
        },
        {
          id: 'task-2',
          name: 'Subscribe to Channel',
          description: 'Subscribe to our YouTube channel',
          type: 'subscribe',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Subscribe',
          completed: false,
          icon: '📢',
          bonusTasks: [
            { id: 'bonus-2-1', name: 'Enable Notifications', type: 'comment', reward: 250, completed: false },
          ],
        },
        {
          id: 'task-3',
          name: 'Complete Survey',
          description: 'Fill out a quick product feedback survey',
          type: 'survey',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Start Survey',
          completed: false,
          icon: '📋',
          bonusTasks: [
            { id: 'bonus-3-1', name: 'Share Feedback', type: 'share', reward: 350, completed: false },
          ],
        },
        {
          id: 'task-4',
          name: 'Sign Up for Newsletter',
          description: 'Subscribe to our weekly newsletter',
          type: 'signup',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Sign Up',
          completed: false,
          icon: '📧',
        },
      ],
    },
    {
      id: 'silver',
      name: 'Silver Tier',
      level: 'Intermediate',
      color: 'from-gray-300 to-slate-400',
      minPoints: 5000,
      unlocked: true,
      tasks: [
        {
          id: 'task-5',
          name: 'Watch Extended Video',
          description: 'Watch a featured video for 120+ seconds',
          type: 'watch',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Watch Video',
          completed: false,
          icon: '🎬',
          minDuration: 120,
          watchProgress: 0,
          bonusTasks: [
            { id: 'bonus-5-1', name: 'Comment & Like', type: 'comment', reward: 300, completed: false },
            { id: 'bonus-5-2', name: 'Share on Social Media', type: 'share', reward: 400, completed: false },
          ],
        },
        {
          id: 'task-6',
          name: 'Follow on Social Media',
          description: 'Follow us on Twitter/X and Instagram',
          type: 'subscribe',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Follow Now',
          completed: false,
          icon: '𝕏',
          bonusTasks: [
            { id: 'bonus-6-1', name: 'Share Our Content', type: 'share', reward: 350, completed: false },
          ],
        },
        {
          id: 'task-7',
          name: 'Detailed Survey',
          description: 'Complete an in-depth product survey',
          type: 'survey',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Start Survey',
          completed: false,
          icon: '📊',
          bonusTasks: [
            { id: 'bonus-7-1', name: 'Additional Feedback', type: 'comment', reward: 300, completed: false },
          ],
        },
      ],
    },
    {
      id: 'gold',
      name: 'Gold Tier',
      level: 'Advanced',
      color: 'from-yellow-400 to-amber-500',
      minPoints: 15000,
      unlocked: true,
      tasks: [
        {
          id: 'task-8',
          name: 'Watch Live Stream',
          description: 'Join live stream and watch for 180+ seconds',
          type: 'watch',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Watch Stream',
          completed: false,
          icon: '🎥',
          minDuration: 180,
          watchProgress: 0,
          bonusTasks: [
            { id: 'bonus-8-1', name: 'Chat in Stream', type: 'comment', reward: 400, completed: false },
            { id: 'bonus-8-2', name: 'Share Stream Link', type: 'share', reward: 500, completed: false },
          ],
        },
        {
          id: 'task-9',
          name: 'Premium Membership',
          description: 'Subscribe to our premium membership',
          type: 'subscribe',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Subscribe',
          completed: false,
          icon: '👑',
          bonusTasks: [
            { id: 'bonus-9-1', name: 'Refer a Friend', type: 'share', reward: 600, completed: false },
          ],
        },
      ],
    },
    {
      id: 'platinum',
      name: 'Platinum Tier',
      level: 'Elite',
      color: 'from-blue-400 to-cyan-400',
      minPoints: 30000,
      unlocked: false,
      tasks: [
        {
          id: 'task-10',
          name: 'VIP Stream Experience',
          description: 'Exclusive VIP stream session (300+ seconds)',
          type: 'watch',
          pointsReward: BASE_POINTS_REWARD,
          nairaReward: BASE_NAIRA_REWARD,
          action: 'Join VIP',
          completed: false,
          icon: '⭐',
          minDuration: 300,
          watchProgress: 0,
          bonusTasks: [
            { id: 'bonus-10-1', name: 'VIP Exclusive Share', type: 'share', reward: 700, completed: false },
          ],
        },
      ],
    },
  ]

  useEffect(() => {
    const allTasks: Task[] = []
    initialTiers.forEach(tier => {
      allTasks.push(...tier.tasks)
    })
    setTasks(allTasks)
  }, [])

  const handleWatchProgress = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId && task.type === 'watch' && task.minDuration) {
          const newProgress = Math.min((task.watchProgress || 0) + 10, task.minDuration)
          const isComplete = newProgress >= task.minDuration

          return {
            ...task,
            watchProgress: newProgress,
            completed: isComplete,
            cooldownUntil: isComplete ? Date.now() + COOLOFF_PERIOD : undefined,
          }
        }
        return task
      })
    )
  }

  const handleBonusTaskToggle = (taskId: string, bonusId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId && task.bonusTasks) {
          return {
            ...task,
            bonusTasks: task.bonusTasks.map(bonus =>
              bonus.id === bonusId ? { ...bonus, completed: !bonus.completed } : bonus
            ),
          }
        }
        return task
      })
    )
  }

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: true,
            cooldownUntil: Date.now() + COOLOFF_PERIOD,
          }
        }
        return task
      })
    )
  }

  const getCooldownStatus = (task: Task) => {
    if (!task.cooldownUntil) return null
    const remaining = task.cooldownUntil - Date.now()
    if (remaining <= 0) return null

    const hours = Math.floor(remaining / (60 * 60 * 1000))
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
    return `${hours}h ${minutes}m`
  }

  const tiers = initialTiers

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Task Tiers</h2>
        <p className="text-muted-foreground">Complete tasks to earn rewards. Main task: ₦1,000 (Naira) + bonus rewards. Earn points for tier progression. 3-hour cooldown between completions.</p>
      </div>

      <div className="space-y-4">
        {tiers.map(tier => (
          <div key={tier.id}>
            <button
              onClick={() => setExpandedTier(expandedTier === tier.id ? '' : tier.id)}
              className={`w-full p-6 rounded-xl border transition-all ${
                tier.unlocked
                  ? `border-border/50 hover:border-primary/50 cursor-pointer`
                  : `border-border/30 opacity-50 cursor-not-allowed`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-lg flex items-center justify-center text-lg font-bold text-white`}>
                    {tier.name[0]}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.level} • {tier.tasks.length} tasks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!tier.unlocked && <span className="text-sm text-muted-foreground">🔒 Locked</span>}
                  <span className={`transform transition-transform ${expandedTier === tier.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>
            </button>

            {expandedTier === tier.id && tier.unlocked && (
              <div className="mt-4 space-y-3">
                {tiers
                  .find(t => t.id === tier.id)
                  ?.tasks.map(task => {
                    const taskData = tasks.find(t => t.id === task.id) || task
                    const cooldownRemaining = getCooldownStatus(taskData)

                    return (
                      <div key={task.id}>
                        <Card className="bg-card/50 border-border/50 p-4 hover:border-primary/50 transition-all cursor-pointer" onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 flex items-start gap-4">
                              <div className="text-2xl mt-1">{task.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground">{task.name}</h4>
                                <p className="text-sm text-muted-foreground">{task.description}</p>

                                {/* Watch Progress Bar */}
                                {task.type === 'watch' && task.watchProgress !== undefined && (
                                  <div className="mt-3 space-y-1">
                                    <div className="flex justify-between items-center text-xs">
                                      <span className="text-muted-foreground">Watch Progress</span>
                                      <span className="text-primary font-semibold">
                                        {Math.round((taskData.watchProgress || 0) / (taskData.minDuration || 1) * 100)}%
                                      </span>
                                    </div>
                                    <Progress value={Math.round((taskData.watchProgress || 0) / (taskData.minDuration || 1) * 100)} className="h-2" />
                                  </div>
                                )}

                                <div className="flex items-center gap-4 mt-3 flex-wrap">
                                  <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded font-semibold">
                                    💰 ₦{taskData.nairaReward.toLocaleString()}
                                  </span>
                                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                    ⭐ {taskData.pointsReward} points
                                  </span>
                                  {task.bonusTasks && task.bonusTasks.length > 0 && (
                                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                                      🎁 +₦{task.bonusTasks.reduce((sum, b) => sum + b.reward, 0)} bonus
                                    </span>
                                  )}
                                  {cooldownRemaining && (
                                    <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded">
                                      ⏳ Available in {cooldownRemaining}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                if (task.type === 'watch') {
                                  handleWatchProgress(task.id)
                                } else {
                                  handleTaskComplete(task.id)
                                }
                              }}
                              disabled={!!cooldownRemaining}
                              className={`whitespace-nowrap ${
                                taskData.completed
                                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 disabled:opacity-50'
                                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                              }`}
                            >
                              {cooldownRemaining ? '⏳ On Cooloff' : task.type === 'watch' ? (taskData.watchProgress === taskData.minDuration ? '✓ Complete' : 'Watch') : '✓ Complete'}
                            </Button>
                          </div>

                          {/* Bonus Tasks */}
                          {expandedTask === task.id && task.bonusTasks && task.bonusTasks.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border/30">
                              <p className="text-xs font-semibold text-muted-foreground mb-3">BONUS TASKS - Complete for extra rewards:</p>
                              <div className="space-y-2">
                                {task.bonusTasks.map(bonus => (
                                  <button
                                    key={bonus.id}
                                    onClick={() => handleBonusTaskToggle(task.id, bonus.id)}
                                    className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all ${
                                      (taskData.bonusTasks?.find(b => b.id === bonus.id)?.completed)
                                        ? 'border-green-500/50 bg-green-500/10'
                                        : 'border-border/30 hover:border-primary/50 bg-secondary/30'
                                    }`}
                                  >
                                    <span className="text-sm text-foreground">
                                      {(taskData.bonusTasks?.find(b => b.id === bonus.id)?.completed) ? '✓' : '○'} {bonus.name}
                                    </span>
                                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">+₦{bonus.reward}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </Card>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

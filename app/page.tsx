'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useTheme } from '@/lib/theme-provider'
import { useToast } from '@/lib/toast-context'

interface Task {
  id: number
  title: string
  icon: string
  banner: string
  startDate: string
  endDate: string
  progress: number
  team: string[]
  lastUpdated: string
  rewards?: number
  category?: string
  description?: string
  subTasks?: { id: string; title: string; done: boolean }[]
}

interface Feature {
  icon: string
  title: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  avatar: string
  text: string
  earnings: string
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('tasks')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAttemptedOnly, setShowAttemptedOnly] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { addToast } = useToast()

  const initialTasks: Task[] = [
    {
      id: 1,
      title: 'Update user flows with UX feedback from Session #245',
      icon: 'A',
      banner: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=250&fit=crop',
      startDate: 'Nov 12',
      endDate: 'Dec 12',
      progress: 60,
      team: ['👨', '👩', '👨‍💼'],
      lastUpdated: '10 Dec, 2022',
      rewards: 25000,
      category: 'Design',
      description: 'Update user flows with UX feedback from Session #245. Improve user experience and test new flows with users.',
      subTasks: [
        { id: 'sub-1', title: 'Review interview notes', done: true },
        { id: 'sub-2', title: 'Update wireframes', done: true },
        { id: 'sub-3', title: 'Validate with team', done: false },
      ],
    },
    {
      id: 2,
      title: 'Wireframe splash page for new sales funnel',
      icon: 'Af',
      banner: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=250&fit=crop',
      startDate: 'Nov 12',
      endDate: 'Dec 12',
      progress: 45,
      team: ['👩', '👨'],
      lastUpdated: '10 Dec, 2022',
      rewards: 15000,
      category: 'Marketing',
      description: 'Create wireframes for the new sales funnel splash page.',
    },
    {
      id: 3,
      title: 'Contact bank regarding suspicious activity on credit card',
      icon: 'Pg',
      banner: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=250&fit=crop',
      startDate: 'Nov 15',
      endDate: 'Dec 20',
      progress: 80,
      team: ['👨‍💼', '👩', '👨'],
      lastUpdated: '10 Dec, 2022',
      rewards: 10000,
      category: 'Finance',
      description: 'Contact your bank to report and resolve suspicious credit card activity.',
    },
    {
      id: 4,
      title: 'Subscribe to YouTube channel and share on social media',
      icon: 'Yt',
      banner: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=250&fit=crop',
      startDate: 'Nov 12',
      endDate: 'Dec 12',
      progress: 30,
      team: ['👨'],
      lastUpdated: '10 Dec, 2022',
      rewards: 5000,
      category: 'Social',
      description: 'Subscribe to our YouTube channel and share the content on your social media platforms.',
      subTasks: [
        { id: 'sub-4-1', title: 'Subscribe', done: true },
        { id: 'sub-4-2', title: 'Share link', done: false },
      ],
    },
    {
      id: 5,
      title: 'Watch product demo and complete survey',
      icon: 'Su',
      banner: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=250&fit=crop',
      startDate: 'Nov 20',
      endDate: 'Dec 25',
      progress: 65,
      team: ['👩', '👨‍💼'],
      lastUpdated: '10 Dec, 2022',
      rewards: 7500,
      category: 'Survey',
      description: 'Watch our product demo video and complete a feedback survey.',
      subTasks: [
        { id: 'sub-5-1', title: 'Watch demo', done: true },
        { id: 'sub-5-2', title: 'Complete survey', done: false },
      ],
    },
    {
      id: 6,
      title: 'Share referral link on WhatsApp to 5 friends',
      icon: 'Wa',
      banner: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&h=250&fit=crop',
      startDate: 'Nov 12',
      endDate: 'Dec 12',
      progress: 40,
      team: ['👨', '👩'],
      lastUpdated: '10 Dec, 2022',
      rewards: 12000,
      category: 'Referral',
      description: 'Share your unique referral link on WhatsApp with at least 5 friends.',
      subTasks: [
        { id: 'sub-6-1', title: 'Generate link', done: true },
        { id: 'sub-6-2', title: 'Send to 5 friends', done: false },
      ],
    },
  ]

  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const toggleSubtask = (taskId: number, subId: string) => {
    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.id !== taskId || !task.subTasks) return task

        const newSubs = task.subTasks.map(sub =>
          sub.id === subId ? { ...sub, done: !sub.done } : sub
        )
        const completedCount = newSubs.filter(sub => sub.done).length
        const newProgress = Math.round((completedCount / newSubs.length) * 100)

        return {
          ...task,
          subTasks: newSubs,
          progress: newProgress,
        }
      })

      const updatedTask = updated.find(t => t.id === taskId)
      if (updatedTask && selectedTask?.id === taskId) {
        setSelectedTask(updatedTask)
      }

      return updated
    })

    const task = tasks.find(t => t.id === taskId)
    const isDone = task?.subTasks?.find(s => s.id === subId)?.done

    addToast(
      isDone ? 'Subtask marked as incomplete' : 'Subtask completed',
      'success',
      2000
    )
  }

  const features: Feature[] = [
    { icon: '1', title: 'Feature 1', description: 'Description for feature 1' },
    { icon: '2', title: 'Feature 2', description: 'Description for feature 2' },
    { icon: '3', title: 'Feature 3', description: 'Description for feature 3' },
  ]

  const testimonials: Testimonial[] = [
    { name: 'John Doe', role: 'User', avatar: 'JD', text: 'Great platform!', earnings: '$500' },
    { name: 'Jane Smith', role: 'User', avatar: 'JS', text: 'Easy to use!', earnings: '$300' },
    { name: 'Mike Johnson', role: 'User', avatar: 'MJ', text: 'High rewards!', earnings: '$700' },
  ]

  const notifications = [
    { id: 1, title: 'New task available', time: '2 mins ago' },
    { id: 2, title: 'You earned 250 points', time: '1 hour ago' },
    { id: 3, title: 'Friend joined via referral', time: '3 hours ago' },
    { id: 4, title: 'Weekly challenge completed', time: '1 day ago' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-background border border-border/50 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center text-white text-xs font-bold">P</div>
            </div>
            <span className="font-bold text-lg text-foreground">PlugCircle</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <div className="hidden lg:flex items-center gap-2 bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
              <span className="text-muted-foreground">🔍</span>
              <input
                type="text"
                placeholder="Search tasks"
                className="bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm w-32"
              />
            </div>
            <Link href="/leaderboard">
              <Button size="sm" variant="outline" className="border-border/50 text-foreground hover:bg-secondary/50 bg-transparent hidden lg:inline-flex">
                Leaderboard
              </Button>
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary/50 rounded-lg transition"
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications)
                if (!showNotifications) {
                  addToast('Notifications opened', 'info', 2000)
                }
              }}
              className="relative p-2 hover:bg-secondary/50 rounded-lg transition"
              aria-label="Notifications"
              title="Notifications"
            >
              <span className="text-xl">🔔</span>
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
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

        {/* Notification Dropdown - Desktop */}
        {showNotifications && (
          <div className="hidden md:block absolute right-4 top-16 bg-card border border-border/50 rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto z-50">
            <div className="p-4 border-b border-border/50">
              <h3 className="font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="divide-y divide-border/50">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-4 hover:bg-secondary/30 cursor-pointer transition">
                    <p className="text-foreground text-sm font-medium">{notif.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{notif.time}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground text-sm">No notifications</div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border/50 py-4 px-4 space-y-3">
            <div className="flex items-center gap-2 bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
              <span className="text-muted-foreground">🔍</span>
              <input
                type="text"
                placeholder="Search tasks"
                className="bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm w-full"
              />
            </div>
            <Link href="/leaderboard" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-secondary/50 hover:bg-secondary text-foreground justify-start">
                📊 Leaderboard
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex items-center gap-8 mb-12 border-b border-border/50 pb-4">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 font-semibold text-lg transition ${
              activeTab === 'tasks'
                ? 'text-foreground border-b-2 border-primary pb-4 -mb-4'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Tasks
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 font-semibold text-lg transition ${
              activeTab === 'notifications'
                ? 'text-foreground border-b-2 border-primary pb-4 -mb-4'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Notifications
            <span className="text-muted-foreground text-xs">
              {notifications.length}
            </span>
          </button>
        </div>

        {/* Tasks Grid */}
        {activeTab === 'tasks' && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  {tasks.filter(t => t.progress > 0).length} of {tasks.length} tasks started • average progress {Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length)}%
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAttemptedOnly(false)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                      !showAttemptedOnly
                        ? 'bg-primary text-white'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/40'
                    }`}
                  >
                    All Tasks
                  </button>
                  <button
                    onClick={() => setShowAttemptedOnly(true)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                      showAttemptedOnly
                        ? 'bg-primary text-white'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/40'
                    }`}
                  >
                    Attempted
                  </button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Tip: click a task card to view details (Coming soon)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAttemptedOnly ? tasks.filter(t => t.progress > 0) : tasks).map((task) => (
                <Card
                  key={task.id}
                  className="bg-card/50 border-border/50 overflow-hidden hover:border-primary/50 transition-all group cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                {/* Banner Image */}
                <div className="relative w-full h-28 overflow-hidden bg-secondary/30">
                  <img
                    src={task.banner || "/placeholder.svg"}
                    alt={task.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded text-xs font-semibold">
                    {task.category}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-xs font-bold mb-2">
                        {task.icon}
                      </div>
                      <h3 className="font-semibold text-foreground text-base leading-snug line-clamp-2">
                        {task.title}
                      </h3>
                    </div>
                    <span className="text-[11px] bg-primary/20 text-primary px-2 py-1 rounded font-semibold">
                      {task.progress}%
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>📅</span>
                    <span>{task.startDate}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-primary">⚡ {task.endDate}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Subtasks */}
                  {task.subTasks && task.subTasks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {task.subTasks.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSubtask(task.id, sub.id)
                          }}
                          className={`text-[11px] px-2 py-1 rounded-full font-semibold transition ${
                            sub.done
                              ? 'bg-emerald-500/20 text-emerald-700'
                              : 'bg-muted/30 text-muted-foreground hover:bg-muted/40'
                          }`}
                          aria-pressed={sub.done}
                        >
                          {sub.done ? '✓' : '○'} {sub.title}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Reward Badge */}
                  {task.rewards && (
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">Reward:</span>
                      <span className="text-sm font-semibold text-primary">
                        ₦{task.rewards.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="pt-3">
                    <Button
                      onClick={() => setSelectedTask(task)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-3 max-w-2xl">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className="bg-card/30 border-border/50 p-4 hover:bg-card/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">{notif.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Footer Menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 z-40">
        <div className="flex items-center justify-around h-16 px-2">
          <button
            onClick={() => {
              setActiveTab('tasks')
              setMobileMenuOpen(false)
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition ${
              activeTab === 'tasks'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Tasks"
          >
            <span className="text-2xl">📋</span>
            <span className="text-xs mt-1">Tasks</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('notifications')
              setMobileMenuOpen(false)
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition relative ${
              activeTab === 'notifications'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Notifications"
          >
            <span className="text-2xl">🔔</span>
            <span className="absolute top-1 right-2 w-2 h-2 bg-primary rounded-full"></span>
            <span className="text-xs mt-1">Alerts</span>
          </button>
          <Link href="/leaderboard" className="flex flex-col items-center justify-center p-2 rounded-lg hover:text-foreground text-muted-foreground transition">
            <span className="text-2xl">🏆</span>
            <span className="text-xs mt-1">Leader</span>
          </Link>
          <Link href="/auth" className="flex flex-col items-center justify-center p-2 rounded-lg text-primary font-semibold transition">
            <span className="text-2xl">👤</span>
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </div>

      {/* Mobile Footer Spacer */}
      <div className="md:hidden h-20"></div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-card border-border/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Banner */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={selectedTask.banner || "/placeholder.svg"}
                alt={selectedTask.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedTask(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-lg font-bold">
                    {selectedTask.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {selectedTask.category}
                    </p>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedTask.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                  <p className="font-semibold text-foreground">{selectedTask.startDate}</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">End Date</p>
                  <p className="font-semibold text-foreground">{selectedTask.endDate}</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Progress</p>
                  <p className="font-semibold text-foreground">{selectedTask.progress}%</p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Reward</p>
                  <p className="font-semibold text-primary text-lg">
                    ₦{selectedTask.rewards?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">Completion</p>
                  <p className="text-sm text-muted-foreground">{selectedTask.progress}%</p>
                </div>
                <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all"
                    style={{ width: `${selectedTask.progress}%` }}
                  />
                </div>
              </div>

              {selectedTask.subTasks && selectedTask.subTasks.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Subtasks</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.subTasks.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => toggleSubtask(selectedTask.id, sub.id)}
                        className={`text-[11px] px-2 py-1 rounded-full font-semibold transition ${
                          sub.done
                            ? 'bg-emerald-500/20 text-emerald-700'
                            : 'bg-muted/30 text-muted-foreground hover:bg-muted/40'
                        }`}
                        aria-pressed={sub.done}
                      >
                        {sub.done ? '✓' : '○'} {sub.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Team */}
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Team Members ({selectedTask.team.length})</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.team.map((member, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center text-lg border border-border/50"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => {
                    addToast(`Task "${selectedTask.title}" completed! You earned ₦${selectedTask.rewards?.toLocaleString()}`, 'success', 3000)
                    setSelectedTask(null)
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                >
                  Complete Task
                </Button>
                <Button
                  onClick={() => setSelectedTask(null)}
                  variant="outline"
                  className="flex-1 border-border/50 text-foreground hover:bg-secondary/50 bg-transparent font-semibold py-6"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

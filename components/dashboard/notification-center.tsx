'use client'

import { Card } from '@/components/ui/card'

interface Notification {
  id: string
  type: 'reward' | 'referral' | 'achievement' | 'task' | 'system'
  title: string
  message: string
  icon: string
  timestamp: string
  read: boolean
}

export default function NotificationCenter() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'reward',
      title: 'Reward Claimed!',
      message: 'You earned $10.00 from task completion',
      icon: '🎉',
      timestamp: '2 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'referral',
      title: 'New Referral Joined',
      message: 'Alex Turner joined using your code! +15% commission',
      icon: '👥',
      timestamp: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You reached Silver Tier! 🎊 Unlock new tasks',
      icon: '🏆',
      timestamp: '3 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'task',
      title: 'New Task Available',
      message: 'Check out the new "Stream Engagement" task worth 750 points',
      icon: '📋',
      timestamp: 'Yesterday',
      read: true,
    },
    {
      id: '5',
      type: 'system',
      title: 'System Update',
      message: 'Platform maintenance scheduled for tomorrow at 2 AM UTC',
      icon: '⚙️',
      timestamp: '2 days ago',
      read: true,
    },
  ]

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'reward':
        return 'border-primary/50 bg-primary/5'
      case 'referral':
        return 'border-accent/50 bg-accent/5'
      case 'achievement':
        return 'border-green-500/50 bg-green-500/5'
      case 'task':
        return 'border-blue-500/50 bg-blue-500/5'
      default:
        return 'border-border/50'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Card className="bg-card border-border/50 shadow-xl max-h-96 overflow-y-auto">
      <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            🔔 Notifications
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h3>
        </div>
      </div>

      <div className="space-y-0 divide-y divide-border/50">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-secondary/50 transition-all cursor-pointer border-l-4 ${getNotificationColor(
                notification.type,
              )} ${!notification.read ? 'bg-secondary/30' : ''}`}
            >
              <div className="flex gap-3">
                <div className="text-2xl flex-shrink-0">{notification.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-foreground text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs mt-1">{notification.message}</p>
                  <p className="text-muted-foreground text-xs mt-2">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="border-t border-border/50 p-4 text-center">
          <button className="text-sm text-accent hover:text-primary font-semibold">
            View All Notifications
          </button>
        </div>
      )}
    </Card>
  )
}

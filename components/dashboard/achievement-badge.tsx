'use client'

import { Card } from '@/components/ui/card'

interface AchievementBadgeProps {
  name: string
  description: string
  icon: string
  color: string
  unlockedAt?: string
  locked?: boolean
}

export default function AchievementBadge({
  name,
  description,
  icon,
  color,
  unlockedAt,
  locked = false,
}: AchievementBadgeProps) {
  return (
    <Card
      className={`relative p-4 text-center transition-all ${
        locked
          ? 'bg-muted/50 border-border/30 opacity-50'
          : `bg-gradient-to-br ${color} bg-opacity-10 border-border/50 hover:border-primary/50 cursor-pointer hover:scale-105`
      }`}
    >
      <div className="space-y-3">
        {/* Icon */}
        <div className="text-4xl flex justify-center">{icon}</div>

        {/* Content */}
        <div>
          <h4 className="font-semibold text-foreground text-sm">{name}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>

        {/* Unlocked Date */}
        {unlockedAt && !locked && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-accent font-semibold">Unlocked {unlockedAt}</p>
          </div>
        )}

        {locked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🔒</span>
          </div>
        )}
      </div>
    </Card>
  )
}

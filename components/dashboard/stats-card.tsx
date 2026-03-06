'use client'

import { Card } from '@/components/ui/card'

interface StatsCardProps {
  label: string
  value: string | number
  icon: string
  trend?: string
  trendUp?: boolean
  color?: 'primary' | 'accent' | 'green' | 'blue'
  onClick?: () => void
}

const colorClasses = {
  primary: 'from-primary to-accent',
  accent: 'from-accent to-primary',
  green: 'from-green-500 to-emerald-500',
  blue: 'from-blue-500 to-cyan-500',
}

export default function StatsCard({
  label,
  value,
  icon,
  trend,
  trendUp = true,
  color = 'primary',
  onClick,
}: StatsCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`bg-gradient-to-br ${colorClasses[color]} bg-opacity-5 border-border/50 p-6 hover:border-primary/50 transition-all ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm mb-1">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
          <div className="text-4xl">{icon}</div>
        </div>

        {trend && (
          <div className="flex items-center gap-2 text-xs pt-2 border-t border-border/50">
            <span className={trendUp ? 'text-green-500' : 'text-destructive'}>
              {trendUp ? '📈' : '📉'} {trend}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}

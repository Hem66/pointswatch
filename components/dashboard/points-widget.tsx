'use client'

import { Card } from '@/components/ui/card'
import { usePoints } from '@/lib/points-context'

export default function PointsWidget() {
  const { totalPoints, getTierInfo } = usePoints()
  const tierInfo = getTierInfo()

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Total Points</p>
            <p className="text-4xl font-bold text-primary">{totalPoints.toLocaleString()}</p>
          </div>
          <div className="text-5xl">⭐</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Current Tier: {tierInfo.current}</p>
            <p className="text-xs text-muted-foreground">{tierInfo.progress.toFixed(0)}%</p>
          </div>
          <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all"
              style={{ width: `${tierInfo.progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {tierInfo.pointsToNext} points to {tierInfo.nextTier}
          </p>
        </div>
      </div>
    </Card>
  )
}

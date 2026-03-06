'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TaskModalProps {
  taskName: string
  taskDescription: string
  pointsReward: number
  nairaReward: number
  bonusRewards?: number
  icon: string
  onClose: () => void
  onComplete: () => void
  taskUrl?: string
}

export default function TaskModal({
  taskName,
  taskDescription,
  pointsReward,
  nairaReward,
  bonusRewards = 0,
  icon,
  onClose,
  onComplete,
  taskUrl,
}: TaskModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="bg-card border-border/50 max-w-md w-full p-8 animate-in zoom-in duration-300">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="text-5xl">{icon}</div>
            <button
              onClick={onClose}
              className="text-2xl text-muted-foreground hover:text-foreground transition-colors"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{taskName}</h2>
              <p className="text-muted-foreground">{taskDescription}</p>
            </div>

            {/* Rewards */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Naira Reward</p>
                  <p className="text-2xl font-bold text-green-500">💰 ₦{nairaReward.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Points</p>
                  <p className="text-2xl font-bold text-primary">⭐ {pointsReward}</p>
                </div>
              </div>
              {bonusRewards > 0 && (
                <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Bonus Rewards Available</p>
                  <p className="text-lg font-bold text-accent">🎁 +₦{bonusRewards.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-2">Complete bonus tasks for extra earnings</p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground font-semibold mb-2">Instructions:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Click "Start Task" to begin</li>
                <li>• Complete all required steps</li>
                <li>• Verify completion to claim rewards</li>
                <li>• 3-hour cooldown after completion</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={onComplete}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              Start Task
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-border/50 text-foreground hover:bg-secondary/50 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

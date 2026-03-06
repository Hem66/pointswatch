'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TaskVerificationProps {
  taskName: string
  taskType: string
  icon: string
  onVerify: () => void
  onCancel: () => void
}

export default function TaskVerification({
  taskName,
  taskType,
  icon,
  onVerify,
  onCancel,
}: TaskVerificationProps) {
  const [step, setStep] = useState<'action' | 'verify' | 'success'>('action')
  const [loading, setLoading] = useState(false)

  const getTaskInstructions = (type: string) => {
    const instructions: Record<string, string[]> = {
      youtube: [
        'Click the link to open YouTube video',
        'Watch at least 5 minutes of the video',
        'Return here and click "Verify Completion"',
      ],
      subscribe: [
        'Click the subscribe button',
        'Confirm subscription (must be logged in)',
        'Click "Verify" when done',
      ],
      share: [
        'Click "Share on WhatsApp"',
        'Send message to at least 3 contacts',
        'Click "Verify" to confirm',
      ],
      survey: [
        'Fill out the complete survey',
        'Submit your responses',
        'Click "Verify" when finished',
      ],
      stream: [
        'Join the live stream',
        'Watch for at least 15 minutes',
        'Interact with chat',
        'Click "Verify" when done',
      ],
      wallet: [
        'Connect your Web3 wallet',
        'Approve transaction',
        'Click "Verify" to confirm',
      ],
    }
    return instructions[type] || instructions['youtube']
  }

  const handleVerify = async () => {
    setLoading(true)
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStep('verify')
    setLoading(false)
  }

  const handleConfirmVerify = async () => {
    setLoading(true)
    // Simulate final verification
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStep('success')
    setLoading(false)
  }

  if (step === 'action') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <Card className="bg-card border-border/50 max-w-md w-full p-8 animate-in zoom-in duration-300">
          <div className="space-y-6">
            {/* Close Button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-foreground"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center">
              <div className="text-6xl mb-4">{icon}</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{taskName}</h2>
              <p className="text-muted-foreground">Follow the steps below to complete this task</p>
            </div>

            {/* Instructions */}
            <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
              {getTaskInstructions(taskType).map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground pt-0.5">{instruction}</p>
                </div>
              ))}
            </div>

            {/* Warning */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-xs text-yellow-600 font-semibold mb-1">⚠️ Important</p>
              <p className="text-xs text-yellow-600">
                Make sure you complete ALL steps before verifying. Incomplete verifications may be flagged.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
              >
                {loading ? '⏳ Verifying...' : '✓ I Completed the Task'}
              </Button>
              <Button
                onClick={onCancel}
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

  if (step === 'verify') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <Card className="bg-card border-border/50 max-w-md w-full p-8 animate-in zoom-in duration-300">
          <div className="space-y-6">
            {/* Verification Status */}
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🔍</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Verifying Completion</h2>
              <p className="text-muted-foreground text-sm">We're checking if you've completed this task</p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <p className="text-sm text-foreground">Task action detected</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <p className="text-sm text-foreground">Minimum time met</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <p className="text-sm text-foreground">User engagement verified</p>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-sm text-green-600 font-semibold">
                ✓ All checks passed! You've successfully completed this task.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleConfirmVerify}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6"
              >
                {loading ? '⏳ Processing...' : 'Claim Reward'}
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="w-full border-border/50 text-foreground hover:bg-secondary/50 bg-transparent"
              >
                Back
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="bg-card border-border/50 max-w-md w-full p-8 animate-in zoom-in duration-300">
        <div className="space-y-6 text-center">
          {/* Success Animation */}
          <div className="space-y-4">
            <div className="text-7xl animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Congratulations!
            </h2>
            <p className="text-foreground font-semibold">You earned rewards!</p>
          </div>

          {/* Rewards Summary */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-6">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Naira Earned</p>
                <p className="text-3xl font-bold text-green-500">💰 ₦1,000</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Points</p>
                <p className="text-3xl font-bold text-primary">⭐ 100</p>
              </div>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-center">
              <p className="text-sm font-semibold text-accent">Bonus Tasks Completed</p>
              <p className="text-2xl font-bold text-accent mt-1">+₦700</p>
            </div>
          </div>

          {/* Achievement */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">New Achievement Unlocked!</p>
            <p className="text-lg font-bold text-yellow-500">🏆 Task Complete</p>
            <p className="text-xs text-muted-foreground">Complete 50 tasks total</p>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6">
              📊 View Dashboard
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full border-border/50 text-foreground hover:bg-secondary/50 bg-transparent"
            >
              Continue
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Reward credited to your account. This task will be available again in 3 hours.
          </p>
        </div>
      </Card>
    </div>
  )
}

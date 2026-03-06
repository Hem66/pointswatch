'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function FeatureSpotlight() {
  const features = [
    {
      title: 'Diamond Tier Unlocked',
      description: 'You reached Diamond tier! Access exclusive premium tasks and 2x rewards.',
      icon: '💎',
      badge: '🎉 NEW',
      action: 'View Premium Tasks',
    },
    {
      title: 'Weekly Bonus Available',
      description: 'Complete 5 tasks this week to get a 50% bonus on all rewards.',
      icon: '🎁',
      badge: '⏰ LIMITED TIME',
      progress: 3,
      total: 5,
    },
    {
      title: 'Referral Milestone',
      description: 'You\'re 2 referrals away from the 25-referral badge!',
      icon: '👥',
      badge: '🏆 ALMOST THERE',
      progress: 23,
      total: 25,
    },
  ]

  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="bg-gradient-to-r from-primary/10 to-accent/10 border-border/50 p-6 hover:border-primary/50 transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="text-4xl flex-shrink-0">{feature.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground">{feature.title}</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{feature.description}</p>

                {feature.progress !== undefined && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-primary">
                        {feature.progress} / {feature.total}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                        style={{ width: `${(feature.progress / feature.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {feature.action && (
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 h-auto px-3">
                    {feature.action}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

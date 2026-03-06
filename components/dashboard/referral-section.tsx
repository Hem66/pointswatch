'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Referral {
  id: string
  username: string
  avatar: string
  joinDate: string
  earnings: number
  status: 'active' | 'inactive'
}

export default function ReferralSection() {
  const [referralCode] = useState('REWARD2024ABC')
  const [referrals] = useState<Referral[]>([
    {
      id: '1',
      username: 'Alex Turner',
      avatar: '👨',
      joinDate: '2 weeks ago',
      earnings: 125.50,
      status: 'active',
    },
    {
      id: '2',
      username: 'Sarah Chen',
      avatar: '👩',
      joinDate: '1 month ago',
      earnings: 89.75,
      status: 'active',
    },
    {
      id: '3',
      username: 'Jordan Smith',
      avatar: '👤',
      joinDate: '3 weeks ago',
      earnings: 56.00,
      status: 'inactive',
    },
    {
      id: '4',
      username: 'Emma Wilson',
      avatar: '👱‍♀️',
      joinDate: '1 week ago',
      earnings: 34.25,
      status: 'active',
    },
  ])

  const totalReferralEarnings = referrals.reduce((sum, ref) => sum + ref.earnings, 0)
  const activeReferrals = referrals.filter(r => r.status === 'active').length

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    alert('Referral code copied!')
  }

  const handleShareWhatsApp = () => {
    const text = `Join RewardWatch and start earning! Use my referral code: ${referralCode} 🎉`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
  }

  const handleShareTwitter = () => {
    const text = `Just started earning with RewardWatch! 💰 Complete tasks, earn rewards. Join with my code: ${referralCode} #RewardWatch`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Refer & Earn</h2>
        <p className="text-muted-foreground">Invite friends and earn commission on their rewards</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Referrals</p>
          <p className="text-4xl font-bold text-foreground">23</p>
          <p className="text-xs text-muted-foreground mt-2">+5 this month</p>
        </Card>
        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-muted-foreground text-sm mb-2">Active Referrals</p>
          <p className="text-4xl font-bold text-primary">{activeReferrals}</p>
          <p className="text-xs text-muted-foreground mt-2">Earning today</p>
        </Card>
        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-muted-foreground text-sm mb-2">Referral Earnings</p>
          <p className="text-4xl font-bold text-accent">${totalReferralEarnings.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">Commission earned</p>
        </Card>
      </div>

      {/* Referral Code */}
      <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-border/50 p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Your Referral Code</h3>
            <p className="text-muted-foreground">Share this code with friends to earn 15% commission on their rewards</p>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-card/80 border border-border/50 rounded-lg p-4 flex items-center">
              <code className="text-lg font-bold text-foreground">{referralCode}</code>
            </div>
            <Button
              onClick={handleCopyCode}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              📋 Copy
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              onClick={handleShareWhatsApp}
              className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50"
            >
              💬 Share on WhatsApp
            </Button>
            <Button
              onClick={handleShareTwitter}
              className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/50"
            >
              𝕏 Share on Twitter
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              📧 Share via Email
            </Button>
          </div>
        </div>
      </Card>

      {/* Commission Structure */}
      <Card className="bg-card/50 border-border/50 p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Commission Structure</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥚</span>
              <div>
                <p className="font-semibold text-foreground">Level 1</p>
                <p className="text-sm text-muted-foreground">Direct referrals</p>
              </div>
            </div>
            <span className="font-bold text-primary text-lg">15%</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="font-semibold text-foreground">Level 2</p>
                <p className="text-sm text-muted-foreground">Their referrals</p>
              </div>
            </div>
            <span className="font-bold text-accent text-lg">8%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌳</span>
              <div>
                <p className="font-semibold text-foreground">Level 3</p>
                <p className="text-sm text-muted-foreground">Second generation</p>
              </div>
            </div>
            <span className="font-bold text-green-500 text-lg">3%</span>
          </div>
        </div>
      </Card>

      {/* Referrals List */}
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <div className="p-6 border-b border-border/50">
          <h3 className="text-xl font-bold text-foreground">Your Referrals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Your Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {referrals.map(referral => (
                <tr key={referral.id} className="hover:bg-secondary/50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{referral.avatar}</div>
                      <span className="font-semibold text-foreground">{referral.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{referral.joinDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        referral.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {referral.status === 'active' ? '🟢 Active' : '⚫ Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-accent">
                    ${referral.earnings.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function LandingPage() {
  const features = [
    {
      title: 'Multiple Task Tiers',
      description: 'From Bronze to Platinum - unlock new challenges and higher rewards as you progress',
      icon: '🎯',
    },
    {
      title: 'Real Rewards',
      description: 'Earn actual money and cryptocurrency rewards for completing simple tasks',
      icon: '💰',
    },
    {
      title: 'Global Leaderboard',
      description: 'Compete with thousands of users worldwide and rank up weekly challenges',
      icon: '🏆',
    },
    {
      title: 'Referral Program',
      description: 'Earn 15% commission on referrals plus multi-level passive income',
      icon: '👥',
    },
    {
      title: 'Smart Contracts',
      description: 'Connect your wallet for blockchain-verified rewards and transparency',
      icon: '⛓️',
    },
    {
      title: 'Real-time Notifications',
      description: 'Stay updated on rewards, achievements, and new opportunities instantly',
      icon: '🔔',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Platinum Member',
      text: 'I earned $500 in my first month just by completing tasks on the platform!',
      avatar: '👩',
      earnings: '$2,450',
    },
    {
      name: 'Alex T.',
      role: 'Gold Member',
      text: 'The referral system is amazing. My friends help me earn passive income.',
      avatar: '👨',
      earnings: '$1,890',
    },
    {
      name: 'Emma W.',
      role: 'Silver Member',
      text: 'Easy tasks, quick payouts, and a supportive community. Highly recommended!',
      avatar: '👱‍♀️',
      earnings: '$750',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-card/50 backdrop-blur border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-xl">⌚</span>
            </div>
            <span className="font-bold text-lg text-foreground">RewardWatch</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" className="border-border/50 text-foreground hover:bg-secondary/50 bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Complete Tasks, Earn Real Money
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                RewardWatch is the ultimate task completion platform where you can earn cryptocurrency and cash rewards by completing simple tasks. Join thousands of users earning passive income today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg px-8">
                  🚀 Start Earning Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-border/50 text-foreground hover:bg-secondary/50 font-semibold py-6 text-lg px-8 bg-transparent"
              >
                ▶️ Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-muted-foreground text-sm">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">$2.5M+</p>
                <p className="text-muted-foreground text-sm">Paid Out</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">4.8★</p>
                <p className="text-muted-foreground text-sm">Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border/50 overflow-hidden flex items-center justify-center">
              <div className="text-9xl animate-bounce">⌚</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border/50">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Why Choose RewardWatch?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to start earning rewards today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card/50 border-border/50 p-6 hover:border-primary/50 hover:bg-card/70 transition-all group"
            >
              <div className="space-y-4">
                <div className="text-4xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border/50">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl font-bold text-foreground">What Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real testimonials from real earners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 border-border/50 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <span className="text-3xl">{testimonial.avatar}</span>
                </div>
                <p className="text-foreground italic">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">Earned</p>
                  <p className="text-2xl font-bold text-accent">{testimonial.earnings}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border/50">
        <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-border/50 p-12 text-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Start Earning?</h2>
              <p className="text-xl text-muted-foreground">
                Join 50,000+ users earning money by completing simple tasks
              </p>
            </div>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg px-8 inline-block">
                🚀 Create Your Account Now
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">RewardWatch</h3>
              <p className="text-sm text-muted-foreground">Earn rewards by completing tasks</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>How it Works</li>
                <li>Pricing</li>
                <li>Features</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 RewardWatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

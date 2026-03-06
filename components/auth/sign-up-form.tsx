'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface SignUpFormProps {
  onSuccess: () => void
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    walletAddress: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.username) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    if (!formData.walletAddress) {
      newErrors.walletAddress = 'Wallet address is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = () => {
    if (validateStep2()) {
      // Handle signup logic here
      console.log('Form submitted:', formData)
      onSuccess()
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50 p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
          <p className="text-muted-foreground">Step {step} of 2 - {step === 1 ? 'Account Details' : 'Profile & Wallet'}</p>
        </div>

        <div className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-1 bg-input border-border/50"
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-1 bg-input border-border/50"
                />
                {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-1 bg-input border-border/50"
                />
                {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-foreground">Username</label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="@yourname"
                  className="mt-1 bg-input border-border/50"
                />
                {errors.username && <p className="text-destructive text-xs mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Wallet Address (Web3)</label>
                <Input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  placeholder="0x..."
                  className="mt-1 bg-input border-border/50"
                />
                {errors.walletAddress && <p className="text-destructive text-xs mt-1">{errors.walletAddress}</p>}
                <p className="text-xs text-muted-foreground mt-2">Add or connect your web3 wallet for smart contract rewards</p>
              </div>
            </>
          )}
        </div>

        <div className="space-y-3">
          {step === 1 ? (
            <>
              <Button
                onClick={handleNext}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
              >
                Continue
              </Button>
              <Button
                onClick={onSuccess}
                variant="outline"
                className="w-full border-border/50 text-foreground hover:bg-secondary/50 bg-transparent"
              >
                Back to Login
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
              >
                Create Account
              </Button>
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="w-full border-border/50 text-foreground hover:bg-secondary/50"
              >
                Back
              </Button>
            </>
          )}
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </Card>
  )
}

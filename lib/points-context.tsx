'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PointsEntry {
  id: number
  description: string
  points: number
  type: 'earn' | 'spend' | 'bonus'
  date: string
  task?: string
}

interface PointsContextType {
  totalPoints: number
  history: PointsEntry[]
  addPoints: (points: number, description: string, type: 'earn' | 'spend' | 'bonus', task?: string) => void
  spendPoints: (points: number, description: string) => boolean
  getTierInfo: () => { current: string; nextTier: string; pointsToNext: number; progress: number }
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

export function PointsProvider({ children }: { children: ReactNode }) {
  const [totalPoints, setTotalPoints] = useState(12450)
  const [history, setHistory] = useState<PointsEntry[]>([
    {
      id: 1,
      description: 'Completed task: Subscribe to YouTube',
      points: 500,
      type: 'earn',
      date: 'Today at 2:30 PM',
      task: 'Subscribe to YouTube',
    },
    {
      id: 2,
      description: 'Bonus: Daily login streak',
      points: 100,
      type: 'bonus',
      date: 'Today at 8:00 AM',
    },
  ])

  const addPoints = (points: number, description: string, type: 'earn' | 'spend' | 'bonus', task?: string) => {
    setTotalPoints((prev) => prev + points)
    const newEntry: PointsEntry = {
      id: history.length + 1,
      description,
      points,
      type,
      date: 'Just now',
      task,
    }
    setHistory((prev) => [newEntry, ...prev])
  }

  const spendPoints = (points: number, description: string): boolean => {
    if (totalPoints >= points) {
      setTotalPoints((prev) => prev - points)
      const newEntry: PointsEntry = {
        id: history.length + 1,
        description,
        points,
        type: 'spend',
        date: 'Just now',
      }
      setHistory((prev) => [newEntry, ...prev])
      return true
    }
    return false
  }

  const getTierInfo = () => {
    const tiers = [
      { name: 'Bronze', min: 0, max: 5000 },
      { name: 'Silver', min: 5000, max: 10000 },
      { name: 'Gold', min: 10000, max: 15000 },
      { name: 'Platinum', min: 15000, max: 25000 },
      { name: 'Diamond', min: 25000, max: Infinity },
    ]

    const currentTier = tiers.find((t) => totalPoints >= t.min && totalPoints < t.max) || tiers[tiers.length - 1]
    const nextTier = tiers.find((t) => t.min > currentTier.min)
    const pointsToNext = nextTier ? nextTier.min - totalPoints : 0
    const progress = nextTier
      ? ((totalPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100
      : 100

    return {
      current: currentTier.name,
      nextTier: nextTier?.name || 'Max',
      pointsToNext,
      progress: Math.min(progress, 100),
    }
  }

  return (
    <PointsContext.Provider value={{ totalPoints, history, addPoints, spendPoints, getTierInfo }}>
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  const context = useContext(PointsContext)
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider')
  }
  return context
}

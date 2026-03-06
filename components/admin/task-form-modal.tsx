'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'

interface BonusTaskInput {
  id: string
  name: string
  type: 'comment' | 'share'
  reward: number
}

interface TaskFormData {
  id?: string
  name: string
  description: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  type: 'watch' | 'subscribe' | 'survey' | 'signup'
  nairaReward: number
  pointsReward: number
  minDuration?: number
  taskUrl?: string
  status: 'active' | 'paused'
  bonusTasks: BonusTaskInput[]
}

interface TaskFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: TaskFormData) => void
  initialData?: TaskFormData
  isLoading?: boolean
}

export default function TaskFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
}: TaskFormModalProps) {
  const [formData, setFormData] = useState<TaskFormData>(
    initialData || {
      name: '',
      description: '',
      tier: 'bronze',
      type: 'watch',
      nairaReward: 1000,
      pointsReward: 100,
      minDuration: 60,
      taskUrl: '',
      status: 'active',
      bonusTasks: [
        { id: '1', name: '', type: 'comment', reward: 0 },
        { id: '2', name: '', type: 'share', reward: 0 },
      ],
    }
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Task name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (formData.nairaReward < 100) newErrors.nairaReward = 'Minimum reward is ₦100'
    if (formData.type === 'watch' && (!formData.minDuration || formData.minDuration < 10)) {
      newErrors.minDuration = 'Minimum duration must be at least 10 seconds'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
      setFormData({
        name: '',
        description: '',
        tier: 'bronze',
        type: 'watch',
        nairaReward: 1000,
        pointsReward: 100,
        minDuration: 60,
        taskUrl: '',
        status: 'active',
        bonusTasks: [
          { id: '1', name: '', type: 'comment', reward: 0 },
          { id: '2', name: '', type: 'share', reward: 0 },
        ],
      })
    }
  }

  const handleBonusChange = (id: string, field: keyof BonusTaskInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      bonusTasks: prev.bonusTasks.map(bonus =>
        bonus.id === id ? { ...bonus, [field]: value } : bonus
      ),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData?.id ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <div>
            <Label htmlFor="name" className="text-sm font-semibold">
              Task Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Watch YouTube Video"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what users need to do..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className={`${errors.description ? 'border-red-500' : ''}`}
              rows={2}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Tier & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tier" className="text-sm font-semibold">
                Tier
              </Label>
              <Select value={formData.tier} onValueChange={value => setFormData({ ...formData, tier: value as any })}>
                <SelectTrigger id="tier">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type" className="text-sm font-semibold">
                Type
              </Label>
              <Select value={formData.type} onValueChange={value => setFormData({ ...formData, type: value as any })}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="watch">Watch Video</SelectItem>
                  <SelectItem value="subscribe">Subscribe</SelectItem>
                  <SelectItem value="survey">Survey</SelectItem>
                  <SelectItem value="signup">Sign Up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rewards */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="naira" className="text-sm font-semibold">
                Naira Reward
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">₦</span>
                <Input
                  id="naira"
                  type="number"
                  value={formData.nairaReward}
                  onChange={e => setFormData({ ...formData, nairaReward: parseInt(e.target.value) || 0 })}
                  className={errors.nairaReward ? 'border-red-500' : ''}
                />
              </div>
              {errors.nairaReward && <p className="text-xs text-red-500 mt-1">{errors.nairaReward}</p>}
            </div>

            <div>
              <Label htmlFor="points" className="text-sm font-semibold">
                Points
              </Label>
              <Input
                id="points"
                type="number"
                value={formData.pointsReward}
                onChange={e => setFormData({ ...formData, pointsReward: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Min Duration for Watch Tasks */}
          {formData.type === 'watch' && (
            <div>
              <Label htmlFor="duration" className="text-sm font-semibold">
                Minimum Duration (seconds)
              </Label>
              <Input
                id="duration"
                type="number"
                value={formData.minDuration || 60}
                onChange={e => setFormData({ ...formData, minDuration: parseInt(e.target.value) || 60 })}
                className={errors.minDuration ? 'border-red-500' : ''}
              />
              {errors.minDuration && <p className="text-xs text-red-500 mt-1">{errors.minDuration}</p>}
            </div>
          )}

          {/* Task URL */}
          <div>
            <Label htmlFor="url" className="text-sm font-semibold">
              Task URL
            </Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={formData.taskUrl || ''}
              onChange={e => setFormData({ ...formData, taskUrl: e.target.value })}
            />
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="text-sm font-semibold">
              Status
            </Label>
            <Select value={formData.status} onValueChange={value => setFormData({ ...formData, status: value as any })}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bonus Tasks */}
          <div className="border-t border-border/50 pt-4">
            <Label className="text-sm font-semibold mb-3 block">Bonus Tasks (Optional)</Label>
            <div className="space-y-3">
              {formData.bonusTasks.map((bonus, idx) => (
                <Card key={bonus.id} className="bg-secondary/30 p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder={`Bonus ${idx + 1} name`}
                      value={bonus.name}
                      onChange={e => handleBonusChange(bonus.id, 'name', e.target.value)}
                      size: 'sm',
                    />
                    <Input
                      type="number"
                      placeholder="Reward (₦)"
                      value={bonus.reward}
                      onChange={e => handleBonusChange(bonus.id, 'reward', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData?.id ? 'Update Task' : 'Create Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

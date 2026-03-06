'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

interface PayoutRecord {
  id: string
  userId: string
  userName: string
  email: string
  totalEarnings: number
  pendingAmount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  requestDate: Date
  completedDate?: Date
  bankName?: string
  accountNumber?: string
}

export default function PayoutManager() {
  const [payouts, setPayouts] = useState<PayoutRecord[]>([
    {
      id: 'payout-1',
      userId: 'user-123',
      userName: 'Chidiebere O.',
      email: 'chidi@example.com',
      totalEarnings: 45000,
      pendingAmount: 45000,
      status: 'pending',
      requestDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      bankName: 'GTBank',
      accountNumber: '***3456',
    },
    {
      id: 'payout-2',
      userId: 'user-456',
      userName: 'Tunde A.',
      email: 'tunde@example.com',
      totalEarnings: 38500,
      pendingAmount: 0,
      status: 'completed',
      requestDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      completedDate: new Date(Date.now() - 22 * 60 * 60 * 1000),
      bankName: 'Access Bank',
      accountNumber: '***7890',
    },
    {
      id: 'payout-3',
      userId: 'user-789',
      userName: 'Amara N.',
      email: 'amara@example.com',
      totalEarnings: 32000,
      pendingAmount: 32000,
      status: 'processing',
      requestDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
      bankName: 'First Bank',
      accountNumber: '***1234',
    },
    {
      id: 'payout-4',
      userId: 'user-321',
      userName: 'Chioma E.',
      email: 'chioma@example.com',
      totalEarnings: 28500,
      pendingAmount: 0,
      status: 'completed',
      requestDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
      completedDate: new Date(Date.now() - 47 * 60 * 60 * 1000),
      bankName: 'UBA',
      accountNumber: '***5678',
    },
    {
      id: 'payout-5',
      userId: 'user-654',
      userName: 'Nonso D.',
      email: 'nonso@example.com',
      totalEarnings: 25000,
      pendingAmount: 15000,
      status: 'failed',
      requestDate: new Date(Date.now() - 72 * 60 * 60 * 1000),
      bankName: 'Zenith Bank',
      accountNumber: '***9012',
    },
  ])

  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedPayout, setSelectedPayout] = useState<PayoutRecord | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  const filteredPayouts = payouts.filter(payout => {
    if (filterStatus !== 'all' && payout.status !== filterStatus) return false
    return true
  })

  const stats = {
    pending: payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.pendingAmount, 0),
    processing: payouts
      .filter(p => p.status === 'processing')
      .reduce((sum, p) => sum + p.pendingAmount, 0),
    completed: payouts.filter(p => p.status === 'completed').length,
    totalProcessed: payouts
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.totalEarnings, 0),
  }

  const handleStatusChange = (payoutId: string, newStatus: PayoutRecord['status']) => {
    setPayouts(
      payouts.map(p =>
        p.id === payoutId
          ? {
              ...p,
              status: newStatus,
              completedDate: newStatus === 'completed' ? new Date() : undefined,
            }
          : p
      )
    )
  }

  const handleBulkMarkPaid = () => {
    const pendingPayouts = payouts.filter(p => p.status === 'pending')
    if (pendingPayouts.length === 0) return

    setPayouts(
      payouts.map(p =>
        p.status === 'pending' ? { ...p, status: 'completed', completedDate: new Date() } : p
      )
    )
  }

  const getStatusColor = (status: PayoutRecord['status']) => {
    const colors: Record<PayoutRecord['status'], string> = {
      pending: 'bg-yellow-500/20 text-yellow-600',
      processing: 'bg-blue-500/20 text-blue-600',
      completed: 'bg-green-500/20 text-green-600',
      failed: 'bg-red-500/20 text-red-600',
    }
    return colors[status]
  }

  const getStatusLabel = (status: PayoutRecord['status']) => {
    const labels: Record<PayoutRecord['status'], string> = {
      pending: '⏳ Pending',
      processing: '⚙️ Processing',
      completed: '✓ Completed',
      failed: '✗ Failed',
    }
    return labels[status]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Payout Manager</h2>
          <p className="text-muted-foreground text-sm">Process user withdrawals and track payment status</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-xs text-muted-foreground mb-1">Pending Payouts</p>
          <p className="text-3xl font-bold text-yellow-500">₦{stats.pending.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{payouts.filter(p => p.status === 'pending').length} users</p>
        </Card>

        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-xs text-muted-foreground mb-1">Processing</p>
          <p className="text-3xl font-bold text-blue-500">₦{stats.processing.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{payouts.filter(p => p.status === 'processing').length} users</p>
        </Card>

        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-xs text-muted-foreground mb-1">Completed Today</p>
          <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
          <p className="text-xs text-muted-foreground mt-2">₦{stats.totalProcessed.toLocaleString()}</p>
        </Card>

        <Card className="bg-card/50 border-border/50 p-6">
          <p className="text-xs text-muted-foreground mb-1">Failed</p>
          <p className="text-3xl font-bold text-red-500">{payouts.filter(p => p.status === 'failed').length}</p>
          <p className="text-xs text-muted-foreground mt-2">Needs retry</p>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleBulkMarkPaid} className="bg-green-600 hover:bg-green-700">
          ✓ Mark All Pending as Paid
        </Button>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payouts List */}
      <div className="space-y-3">
        {filteredPayouts.length > 0 ? (
          filteredPayouts.map(payout => (
            <Card key={payout.id} className="bg-card/50 border-border/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      {payout.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{payout.userName}</p>
                      <p className="text-xs text-muted-foreground">{payout.email}</p>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mt-2">
                    <p>
                      {payout.bankName} • {payout.accountNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-foreground">₦{payout.pendingAmount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">of ₦{payout.totalEarnings.toLocaleString()}</p>
                  </div>

                  <Badge className={`${getStatusColor(payout.status)} text-xs`}>
                    {getStatusLabel(payout.status)}
                  </Badge>

                  <div className="flex gap-2">
                    {payout.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(payout.id, 'processing')}
                          className="text-xs"
                        >
                          Process
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => {
                            setSelectedPayout(payout)
                            setDetailsModalOpen(true)
                          }}
                        >
                          View
                        </Button>
                      </>
                    )}

                    {payout.status === 'processing' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(payout.id, 'completed')}
                        className="bg-green-600 hover:bg-green-700 text-xs"
                      >
                        Confirm Paid
                      </Button>
                    )}

                    {payout.status === 'failed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(payout.id, 'pending')}
                        className="text-xs"
                      >
                        Retry
                      </Button>
                    )}

                    {(payout.status === 'completed' || payout.status === 'failed') && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => {
                          setSelectedPayout(payout)
                          setDetailsModalOpen(true)
                        }}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-card/50 border-border/50 p-8 text-center">
            <p className="text-muted-foreground">No payouts found</p>
          </Card>
        )}
      </div>

      {/* Details Modal */}
      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payout Details</DialogTitle>
          </DialogHeader>

          {selectedPayout && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">User</p>
                <p className="font-semibold">{selectedPayout.userName}</p>
                <p className="text-sm text-muted-foreground">{selectedPayout.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Bank</p>
                  <p className="font-semibold">{selectedPayout.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account</p>
                  <p className="font-semibold">{selectedPayout.accountNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-bold text-lg">₦{selectedPayout.pendingAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={`${getStatusColor(selectedPayout.status)}`}>
                    {getStatusLabel(selectedPayout.status)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Request Date</p>
                  <p>{selectedPayout.requestDate.toLocaleDateString()}</p>
                </div>
                {selectedPayout.completedDate && (
                  <div>
                    <p className="text-muted-foreground">Completed Date</p>
                    <p>{selectedPayout.completedDate.toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

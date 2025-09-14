
'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  Mail,
  Calendar,
  User,
  MessageSquare,
  CheckCircle,
  Clock,
  Reply
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from '@/hooks/use-toast'

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'CLOSED'
  assignedTo: string | null
  response: string | null
  respondedAt: string | null
  createdAt: string
  updatedAt: string
}

export default function AdminSupportPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [response, setResponse] = useState('')
  const [responseDialogOpen, setResponseDialogOpen] = useState(false)

  const statusOptions = [
    { id: 'all', name: 'All Messages' },
    { id: 'UNREAD', name: 'Unread' },
    { id: 'READ', name: 'Read' },
    { id: 'REPLIED', name: 'Replied' },
    { id: 'CLOSED', name: 'Closed' }
  ]

  useEffect(() => {
    fetchSubmissions()
  }, [searchQuery, selectedStatus])

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      })
      
      const response = await fetch(`/api/admin/support?${params}`)
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions || [])
      }
    } catch (error) {
      console.error('Error fetching support submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (submissionId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/support/${submissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setSubmissions(submissions.map(submission => 
          submission.id === submissionId ? { ...submission, status: newStatus as any } : submission
        ))
        toast({
          title: "Success",
          description: `Submission marked as ${newStatus.toLowerCase()}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update submission status",
        variant: "destructive",
      })
    }
  }

  const handleReply = (submission: ContactSubmission) => {
    setSelectedSubmission(submission)
    setResponse('')
    setResponseDialogOpen(true)
  }

  const submitReply = async () => {
    if (!selectedSubmission || !response.trim()) return

    try {
      const responseData = await fetch(`/api/admin/support/${selectedSubmission.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response }),
      })

      if (responseData.ok) {
        setSubmissions(submissions.map(submission => 
          submission.id === selectedSubmission.id 
            ? { ...submission, status: 'REPLIED', response, respondedAt: new Date().toISOString() }
            : submission
        ))
        setResponseDialogOpen(false)
        setSelectedSubmission(null)
        setResponse('')
        toast({
          title: "Success",
          description: "Reply sent successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UNREAD': return 'bg-red-100 text-red-800'
      case 'READ': return 'bg-yellow-100 text-yellow-800'
      case 'REPLIED': return 'bg-green-100 text-green-800'
      case 'CLOSED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'UNREAD': return Mail
      case 'READ': return MessageSquare
      case 'REPLIED': return CheckCircle
      case 'CLOSED': return Clock
      default: return MessageSquare
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Support Inbox
            </h1>
            <p className="text-brand-primary-light">
              Manage contact form submissions and customer support
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statusOptions.slice(1).map((status) => {
            const count = submissions.filter(s => s.status === status.id).length
            const Icon = getStatusIcon(status.id)
            
            return (
              <Card key={status.id} className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-brand-primary-light mb-1">
                        {status.name}
                      </p>
                      <p className="text-3xl font-bold text-brand-primary">
                        {count}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-brand-accent/10">
                      <Icon className="h-6 w-6 text-brand-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary-light" />
                  <Input
                    placeholder="Search by name, email, or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status.id}
                    variant={selectedStatus === status.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status.id)}
                  >
                    {status.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-32 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-dark rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {submission.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-brand-primary">
                            {submission.name}
                          </h3>
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-brand-primary-light mb-1">
                          {submission.email}
                        </p>
                        <h4 className="font-semibold text-brand-primary mb-2">
                          {submission.subject}
                        </h4>
                        <p className="text-sm text-brand-primary-light mb-3 line-clamp-2">
                          {submission.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-brand-primary-light">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(submission.createdAt)}
                          </span>
                          {submission.respondedAt && (
                            <span className="flex items-center gap-1">
                              <Reply className="h-3 w-3" />
                              Replied {formatDate(submission.respondedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {submission.status === 'UNREAD' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(submission.id, 'READ')}
                        >
                          Mark as Read
                        </Button>
                      )}
                      
                      {(submission.status === 'READ' || submission.status === 'UNREAD') && (
                        <Button
                          size="sm"
                          className="bg-brand-accent hover:bg-brand-accent-dark"
                          onClick={() => handleReply(submission)}
                        >
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      )}

                      {submission.status === 'REPLIED' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(submission.id, 'CLOSED')}
                        >
                          Close Ticket
                        </Button>
                      )}
                    </div>
                  </div>

                  {submission.response && (
                    <div className="mt-4 p-4 bg-brand-accent/5 rounded-lg border-l-4 border-brand-accent">
                      <h5 className="font-semibold text-brand-primary mb-2">Your Response:</h5>
                      <p className="text-sm text-brand-primary-light">
                        {submission.response}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {submissions.length === 0 && !loading && (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No messages found</h3>
            <p className="text-brand-primary-light">
              {searchQuery || selectedStatus !== 'all' 
                ? 'No messages match your current filters.' 
                : 'No support messages have been received yet.'
              }
            </p>
          </div>
        )}

        {/* Reply Dialog */}
        <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Reply to {selectedSubmission?.name}</DialogTitle>
              <DialogDescription>
                Compose a response to this support inquiry. An email will be sent to {selectedSubmission?.email}.
              </DialogDescription>
            </DialogHeader>
            
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="p-4 bg-brand-neutral-light rounded-lg">
                  <h4 className="font-semibold text-brand-primary mb-2">Original Message:</h4>
                  <p className="text-sm text-brand-primary-light mb-2">
                    <strong>Subject:</strong> {selectedSubmission.subject}
                  </p>
                  <p className="text-sm text-brand-primary-light">
                    {selectedSubmission.message}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-primary">
                    Your Response
                  </label>
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response here..."
                    rows={6}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={submitReply}
                disabled={!response.trim()}
                className="bg-brand-accent hover:bg-brand-accent-dark"
              >
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

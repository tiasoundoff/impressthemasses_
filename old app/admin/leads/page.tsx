
'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  Download,
  Mail,
  Calendar,
  UserCheck,
  TrendingUp,
  FileDown,
  Filter
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Lead {
  id: string
  email: string
  source: string
  isCustomer: boolean
  metadata: any
  createdAt: string
}

interface LeadStats {
  totalLeads: number
  convertedCustomers: number
  conversionRate: number
  sourcesBreakdown: {
    [key: string]: number
  }
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSource, setSelectedSource] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const sourceOptions = [
    { id: 'all', name: 'All Sources' },
    { id: 'lead_magnet', name: 'Lead Magnet' },
    { id: 'checkout', name: 'Checkout' },
    { id: 'newsletter', name: 'Newsletter' }
  ]

  const statusOptions = [
    { id: 'all', name: 'All Leads' },
    { id: 'converted', name: 'Converted' },
    { id: 'not_converted', name: 'Not Converted' }
  ]

  useEffect(() => {
    fetchLeads()
    fetchStats()
  }, [searchQuery, selectedSource, selectedStatus])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...(selectedSource !== 'all' && { source: selectedSource }),
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      })
      
      const response = await fetch(`/api/admin/leads?${params}`)
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/leads/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching lead stats:', error)
    }
  }

  const handleExportCSV = async () => {
    try {
      const params = new URLSearchParams({
        format: 'csv',
        ...(searchQuery && { search: searchQuery }),
        ...(selectedSource !== 'all' && { source: selectedSource }),
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      })
      
      const response = await fetch(`/api/admin/leads/export?${params}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        toast({
          title: "Success",
          description: "Leads exported successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export leads",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatSource = (source: string) => {
    return source.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'lead_magnet': return 'bg-brand-accent/10 text-brand-accent'
      case 'checkout': return 'bg-green-100 text-green-800'
      case 'newsletter': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Lead Management
            </h1>
            <p className="text-brand-primary-light">
              Manage your email captures and lead conversion
            </p>
          </div>
          <Button
            onClick={handleExportCSV}
            className="bg-brand-accent hover:bg-brand-accent-dark"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-primary-light mb-1">
                      Total Leads
                    </p>
                    <p className="text-3xl font-bold text-brand-primary">
                      {stats.totalLeads}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-brand-accent/10">
                    <Mail className="h-6 w-6 text-brand-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-primary-light mb-1">
                      Converted
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.convertedCustomers}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-50">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-primary-light mb-1">
                      Conversion Rate
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.conversionRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-50">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-3">
                    Top Source
                  </p>
                  {Object.entries(stats.sourcesBreakdown).map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between mb-2">
                      <span className="text-sm text-brand-primary">
                        {formatSource(source)}
                      </span>
                      <span className="font-semibold text-brand-primary">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary-light" />
                  <Input
                    placeholder="Search leads by email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {sourceOptions.map((source) => (
                  <Button
                    key={source.id}
                    variant={selectedSource === source.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSource(source.id)}
                  >
                    {source.name}
                  </Button>
                ))}
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

        {/* Leads List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-20 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-brand-primary">
                Email Captures ({leads.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 rounded-lg bg-brand-neutral-light">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-brand-accent to-brand-accent-dark rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {lead.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-brand-primary">
                            {lead.email}
                          </p>
                          {lead.isCustomer && (
                            <Badge className="bg-green-100 text-green-800">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Customer
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-brand-primary-light">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(lead.createdAt)}
                          </span>
                          <Badge className={getSourceColor(lead.source)}>
                            {formatSource(lead.source)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {leads.length === 0 && (
                <div className="text-center py-12">
                  <Mail className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-brand-primary mb-2">No leads found</h3>
                  <p className="text-brand-primary-light">
                    {searchQuery || selectedSource !== 'all' || selectedStatus !== 'all'
                      ? 'No leads match your current filters.'
                      : 'No email captures yet.'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

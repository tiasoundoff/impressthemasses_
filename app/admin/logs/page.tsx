
'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  Activity,
  Calendar,
  User,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings
} from 'lucide-react'

interface AdminLogEntry {
  id: string
  action: string
  entity: string
  entityId: string | null
  details: string | null
  ipAddress: string | null
  userAgent: string | null
  createdAt: string
  user: {
    id: string
    name: string | null
    email: string
  }
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAction, setSelectedAction] = useState('all')
  const [selectedEntity, setSelectedEntity] = useState('all')

  const actionOptions = [
    { id: 'all', name: 'All Actions' },
    { id: 'CREATE', name: 'Create' },
    { id: 'UPDATE', name: 'Update' },
    { id: 'DELETE', name: 'Delete' },
    { id: 'VIEW', name: 'View' },
    { id: 'EXPORT', name: 'Export' },
    { id: 'LOGIN', name: 'Login' },
    { id: 'LOGOUT', name: 'Logout' }
  ]

  const entityOptions = [
    { id: 'all', name: 'All Entities' },
    { id: 'product', name: 'Products' },
    { id: 'user', name: 'Users' },
    { id: 'order', name: 'Orders' },
    { id: 'leads', name: 'Leads' },
    { id: 'settings', name: 'Settings' },
    { id: 'support', name: 'Support' }
  ]

  useEffect(() => {
    fetchLogs()
  }, [searchQuery, selectedAction, selectedEntity])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...(selectedAction !== 'all' && { action: selectedAction }),
        ...(selectedEntity !== 'all' && { entity: selectedEntity })
      })
      
      const response = await fetch(`/api/admin/logs?${params}`)
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      }
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-green-100 text-green-800'
      case 'UPDATE': return 'bg-blue-100 text-blue-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
      case 'VIEW': return 'bg-gray-100 text-gray-800'
      case 'EXPORT': return 'bg-purple-100 text-purple-800'
      case 'LOGIN': return 'bg-emerald-100 text-emerald-800'
      case 'LOGOUT': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE': return Plus
      case 'UPDATE': return Edit
      case 'DELETE': return Trash2
      case 'VIEW': return Eye
      case 'EXPORT': return Download
      case 'LOGIN': return User
      case 'LOGOUT': return User
      default: return Activity
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getUserDisplayName = (user: AdminLogEntry['user']) => {
    return user.name || user.email.split('@')[0]
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Admin Activity Logs
            </h1>
            <p className="text-brand-primary-light">
              View all admin actions and system activities
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary-light" />
                  <Input
                    placeholder="Search by user, entity, or details..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {actionOptions.slice(0, 4).map((action) => (
                  <Button
                    key={action.id}
                    variant={selectedAction === action.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAction(action.id)}
                  >
                    {action.name}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {entityOptions.slice(0, 4).map((entity) => (
                  <Button
                    key={entity.id}
                    variant={selectedEntity === entity.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedEntity(entity.id)}
                  >
                    {entity.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-20 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-brand-primary flex items-center">
                <Activity className="h-5 w-5 mr-2 text-brand-accent" />
                Activity Log ({logs.length} entries)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.map((log) => {
                  const ActionIcon = getActionIcon(log.action)
                  
                  return (
                    <div key={log.id} className="flex items-start space-x-4 p-4 rounded-lg bg-brand-neutral-light">
                      <div className="p-2 rounded-full bg-white">
                        <ActionIcon className="h-4 w-4 text-brand-accent" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getActionColor(log.action)}>
                            {log.action}
                          </Badge>
                          <span className="text-sm text-brand-primary-light">
                            on {log.entity}
                          </span>
                          {log.entityId && (
                            <span className="text-sm text-brand-primary-light">
                              #{log.entityId.slice(-8)}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm font-medium text-brand-primary mb-1">
                          {log.details || `${log.action} ${log.entity}`}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-brand-primary-light">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {getUserDisplayName(log.user)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(log.createdAt)}
                          </span>
                          {log.ipAddress && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              IP: {log.ipAddress}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {logs.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-brand-primary mb-2">No activity logs found</h3>
                  <p className="text-brand-primary-light">
                    {searchQuery || selectedAction !== 'all' || selectedEntity !== 'all'
                      ? 'No logs match your current filters.'
                      : 'No admin activity recorded yet.'
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

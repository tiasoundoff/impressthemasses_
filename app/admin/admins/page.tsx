
'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  UserPlus,
  Shield,
  Calendar,
  User,
  Mail,
  MoreVertical,
  UserCheck,
  UserX,
  Crown
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from '@/hooks/use-toast'

interface AdminUser {
  id: string
  name: string | null
  email: string
  firstName: string | null
  lastName: string | null
  role: 'ADMIN' | 'SUPER_ADMIN'
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  _count: {
    adminLogs: number
  }
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchAdmins()
  }, [searchQuery])

  const fetchAdmins = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery })
      })
      
      const response = await fetch(`/api/admin/admins?${params}`)
      if (response.ok) {
        const data = await response.json()
        setAdmins(data.admins || [])
      }
    } catch (error) {
      console.error('Error fetching admins:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleUpdate = async (adminId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/admins/${adminId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })

      if (response.ok) {
        setAdmins(admins.map(admin => 
          admin.id === adminId ? { ...admin, role: newRole as any } : admin
        ))
        toast({
          title: "Success",
          description: `Admin role updated to ${newRole}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin role",
        variant: "destructive",
      })
    }
  }

  const handleStatusToggle = async (adminId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/admins/${adminId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        setAdmins(admins.map(admin => 
          admin.id === adminId ? { ...admin, isActive: !isActive } : admin
        ))
        toast({
          title: "Success",
          description: `Admin ${!isActive ? 'activated' : 'deactivated'} successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      })
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-brand-accent text-white'
      case 'ADMIN': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleIcon = (role: string) => {
    return role === 'SUPER_ADMIN' ? Crown : Shield
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getAdminDisplayName = (admin: AdminUser) => {
    if (admin.firstName && admin.lastName) {
      return `${admin.firstName} ${admin.lastName}`
    }
    return admin.name || admin.email.split('@')[0]
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Admin Management
            </h1>
            <p className="text-brand-primary-light">
              Manage admin users and permissions
            </p>
          </div>
          <Button className="bg-brand-accent hover:bg-brand-accent-dark">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Admin
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary-light" />
              <Input
                placeholder="Search admins by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-1">
                    Total Admins
                  </p>
                  <p className="text-3xl font-bold text-brand-primary">
                    {admins.length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-brand-accent/10">
                  <Shield className="h-6 w-6 text-brand-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-1">
                    Super Admins
                  </p>
                  <p className="text-3xl font-bold text-brand-primary">
                    {admins.filter(a => a.role === 'SUPER_ADMIN').length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-50">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-1">
                    Active Admins
                  </p>
                  <p className="text-3xl font-bold text-brand-primary">
                    {admins.filter(a => a.isActive).length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admins List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-24 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {admins.map((admin) => {
              const RoleIcon = getRoleIcon(admin.role)
              
              return (
                <Card key={admin.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-dark rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {getAdminDisplayName(admin).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-brand-primary">
                              {getAdminDisplayName(admin)}
                            </h3>
                            <Badge className={getRoleColor(admin.role)}>
                              <RoleIcon className="h-3 w-3 mr-1" />
                              {admin.role.replace('_', ' ')}
                            </Badge>
                            <Badge variant={admin.isActive ? "default" : "secondary"}>
                              {admin.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-brand-primary-light mb-1">
                            {admin.email}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-brand-primary-light">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Joined {formatDate(admin.createdAt)}
                            </span>
                            {admin.lastLoginAt && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Last login {formatDate(admin.lastLoginAt)}
                              </span>
                            )}
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {admin._count.adminLogs} actions
                            </span>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          
                          {admin.role === 'ADMIN' && (
                            <DropdownMenuItem 
                              onClick={() => handleRoleUpdate(admin.id, 'SUPER_ADMIN')}
                            >
                              <Crown className="h-4 w-4 mr-2" />
                              Promote to Super Admin
                            </DropdownMenuItem>
                          )}
                          
                          {admin.role === 'SUPER_ADMIN' && (
                            <DropdownMenuItem 
                              onClick={() => handleRoleUpdate(admin.id, 'ADMIN')}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Demote to Admin
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleStatusToggle(admin.id, admin.isActive)}
                          >
                            {admin.isActive ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {admins.length === 0 && !loading && (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No admins found</h3>
            <p className="text-brand-primary-light mb-6">
              {searchQuery
                ? 'No admins match your search criteria.'
                : 'No admin users have been created yet.'
              }
            </p>
            <Button className="bg-brand-accent hover:bg-brand-accent-dark">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite First Admin
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

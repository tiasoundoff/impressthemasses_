
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  Filter,
  Download,
  RefreshCcw,
  DollarSign,
  Calendar,
  User,
  Package,
  MoreVertical,
  ShoppingCart
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from '@/hooks/use-toast'

interface Order {
  id: string
  customerEmail: string
  amount: number
  status: string
  downloadToken: string | null
  downloadCount: number
  maxDownloads: number
  createdAt: string
  updatedAt: string
  stripeSessionId: string | null
  stripePaymentId: string | null
  product: {
    id: string
    title: string
    category: string
    images: string[]
  }
  user: {
    id: string
    name: string | null
    email: string
  } | null
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const router = useRouter()

  const statusOptions = [
    { id: 'all', name: 'All Orders' },
    { id: 'completed', name: 'Completed' },
    { id: 'pending', name: 'Pending' },
    { id: 'failed', name: 'Failed' },
    { id: 'refunded', name: 'Refunded' }
  ]

  useEffect(() => {
    fetchOrders()
  }, [searchQuery, selectedStatus])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      })
      
      const response = await fetch(`/api/admin/orders?${params}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ))
        toast({
          title: "Success",
          description: `Order status updated to ${newStatus}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    }
  }

  const handleRefund = async (orderId: string) => {
    if (!confirm('Are you sure you want to issue a refund for this order?')) return

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/refund`, {
        method: 'POST',
      })

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: 'refunded' } : order
        ))
        toast({
          title: "Success",
          description: "Refund issued successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to issue refund",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const formatPrice = (price: number) => {
    return price === 0 ? 'FREE' : `$${(price / 100).toFixed(2)}`
  }

  const formatCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Orders Management
            </h1>
            <p className="text-brand-primary-light">
              View and manage customer orders
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
                    placeholder="Search orders by customer email or product..."
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

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-32 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-brand-neutral rounded-lg overflow-hidden">
                        {order.product.images?.[0] ? (
                          <img
                            src={order.product.images[0]}
                            alt={order.product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-brand-primary-light" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-brand-primary">
                            {order.product.title}
                          </h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-brand-primary-light mb-1">
                          Order #{order.id.slice(-8)}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-brand-primary-light">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {order.customerEmail}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(order.createdAt)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {formatCategory(order.product.category)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      {/* Price */}
                      <div className="text-center">
                        <p className="text-2xl font-bold text-brand-accent">
                          {formatPrice(order.amount)}
                        </p>
                        <p className="text-xs text-brand-primary-light">Amount</p>
                      </div>

                      {/* Downloads */}
                      <div className="text-center">
                        <p className="text-lg font-bold text-brand-primary">
                          {order.downloadCount}/{order.maxDownloads}
                        </p>
                        <p className="text-xs text-brand-primary-light">Downloads</p>
                      </div>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => router.push(`/admin/orders/${order.id}`)}
                          >
                            <Package className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          
                          {order.status === 'completed' && order.downloadToken && (
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Resend Download Link
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuSeparator />
                          
                          {order.status === 'pending' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'completed')}>
                              <Package className="h-4 w-4 mr-2" />
                              Mark as Completed
                            </DropdownMenuItem>
                          )}
                          
                          {order.status === 'completed' && order.stripePaymentId && (
                            <DropdownMenuItem 
                              onClick={() => handleRefund(order.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <RefreshCcw className="h-4 w-4 mr-2" />
                              Issue Refund
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {orders.length === 0 && !loading && (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No orders found</h3>
            <p className="text-brand-primary-light mb-6">
              {searchQuery || selectedStatus !== 'all' 
                ? 'No orders match your current filters.' 
                : 'No orders have been placed yet.'
              }
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

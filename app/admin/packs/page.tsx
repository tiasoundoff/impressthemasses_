
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus,
  Search, 
  Filter,
  Edit,
  Trash2,
  Star,
  Eye,
  Package,
  DollarSign,
  MoreVertical
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from '@/hooks/use-toast'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  images: string[]
  featured: boolean
  active: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    orders: number
  }
}

export default function AdminPacksPage() {
  const [packs, setPacks] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPacks, setSelectedPacks] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'social_media', name: 'Social Media' },
    { id: 'presentations', name: 'Presentations' },
    { id: 'brand_kits', name: 'Brand Kits' }
  ]

  useEffect(() => {
    fetchPacks()
  }, [searchQuery, selectedCategory])

  const fetchPacks = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory !== 'all' && { category: selectedCategory })
      })
      
      const response = await fetch(`/api/admin/packs?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPacks(data.packs || [])
      }
    } catch (error) {
      console.error('Error fetching packs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeatureToggle = async (packId: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/packs/${packId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured }),
      })

      if (response.ok) {
        setPacks(packs.map(pack => 
          pack.id === packId ? { ...pack, featured: !featured } : pack
        ))
        toast({
          title: "Success",
          description: `Pack ${!featured ? 'featured' : 'unfeatured'} successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update pack",
        variant: "destructive",
      })
    }
  }

  const handlePublishToggle = async (packId: string, active: boolean) => {
    try {
      const response = await fetch(`/api/admin/packs/${packId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      })

      if (response.ok) {
        setPacks(packs.map(pack => 
          pack.id === packId ? { ...pack, active: !active } : pack
        ))
        toast({
          title: "Success",
          description: `Pack ${!active ? 'published' : 'unpublished'} successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update pack",
        variant: "destructive",
      })
    }
  }

  const handleDeletePack = async (packId: string) => {
    if (!confirm('Are you sure you want to delete this pack?')) return

    try {
      const response = await fetch(`/api/admin/packs/${packId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPacks(packs.filter(pack => pack.id !== packId))
        toast({
          title: "Success",
          description: "Pack deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete pack",
        variant: "destructive",
      })
    }
  }

  const formatPrice = (price: number) => {
    return price === 0 ? 'FREE' : `$${(price / 100).toFixed(0)}`
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
              Packs Management
            </h1>
            <p className="text-brand-primary-light">
              Manage your digital design packs
            </p>
          </div>
          <Button
            onClick={() => router.push('/admin/packs/new')}
            className="bg-brand-accent hover:bg-brand-accent-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Pack
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary-light" />
                  <Input
                    placeholder="Search packs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packs.map((pack) => (
              <Card key={pack.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-video bg-brand-neutral rounded-t-xl overflow-hidden">
                  {pack.images?.[0] ? (
                    <img
                      src={pack.images[0]}
                      alt={pack.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-brand-primary-light" />
                    </div>
                  )}
                  
                  {/* Status badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {pack.featured && (
                      <Badge className="bg-yellow-500 text-yellow-900">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge variant={pack.active ? "default" : "secondary"}>
                      {pack.active ? 'Published' : 'Draft'}
                    </Badge>
                  </div>

                  {/* Price */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-brand-primary">
                      {formatPrice(pack.price)}
                    </Badge>
                  </div>

                  {/* Actions dropdown */}
                  <div className="absolute bottom-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/admin/packs/${pack.id}/edit`)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/product/${pack.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Live
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleFeatureToggle(pack.id, pack.featured)}>
                          <Star className="h-4 w-4 mr-2" />
                          {pack.featured ? 'Unfeature' : 'Feature'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePublishToggle(pack.id, pack.active)}>
                          <Package className="h-4 w-4 mr-2" />
                          {pack.active ? 'Unpublish' : 'Publish'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeletePack(pack.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {formatCategory(pack.category)}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-brand-primary mb-2 line-clamp-1">
                    {pack.title}
                  </h3>
                  
                  <p className="text-sm text-brand-primary-light mb-3 line-clamp-2">
                    {pack.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-brand-primary-light">
                    <span>
                      {pack._count?.orders || 0} orders
                    </span>
                    <span>
                      {new Date(pack.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {packs.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No packs found</h3>
            <p className="text-brand-primary-light mb-6">
              {searchQuery || selectedCategory !== 'all' 
                ? 'No packs match your current filters.' 
                : 'Get started by creating your first design pack.'
              }
            </p>
            <Button
              onClick={() => router.push('/admin/packs/new')}
              className="bg-brand-accent hover:bg-brand-accent-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Pack
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

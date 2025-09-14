
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  Edit,
  Trash2,
  Star,
  Eye,
  Package,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProducts } from '@/lib/local/db';
import { Product } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminPacksPage() {
  const router = useRouter();
  const packs = getProducts();

  const formatPrice = (price: number) => {
    return price === 0 ? 'FREE' : `$${price.toFixed(2)}`;
  };

  return (
    <AdminLayout>
      <div className="p-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((pack: Product) => (
            <Card key={pack.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video bg-brand-neutral rounded-t-xl overflow-hidden">
                {pack.imageUrl ? (
                  <Image
                    src={pack.imageUrl}
                    alt={pack.name}
                    layout='fill'
                    objectFit='cover'
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-12 w-12 text-brand-primary-light" />
                  </div>
                )}
                
                <div className="absolute top-3 left-3 flex gap-2">
                  {pack.featured && (
                    <Badge className="bg-yellow-500 text-yellow-900">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-brand-primary">
                    {formatPrice(pack.price)}
                  </Badge>
                </div>

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
                      <DropdownMenuItem onClick={() => alert('Feature toggling not available in local data mode')}>
                        <Star className="h-4 w-4 mr-2" />
                        Feature
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => alert('Deleting not available in local data mode')}
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
                <h3 className="font-bold text-brand-primary mb-2 line-clamp-1">
                  {pack.name}
                </h3>
                
                <p className="text-sm text-brand-primary-light mb-3 line-clamp-2">
                  {pack.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {packs.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No packs found</h3>
            <p className="text-brand-primary-light mb-6">
              Get started by creating your first design pack.
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

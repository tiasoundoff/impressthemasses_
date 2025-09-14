
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Mail, 
  Folder, 
  Shield,
  Settings,
  HeadphonesIcon,
  Activity,
  LogOut,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Packs', href: '/admin/packs', icon: Package },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Leads', href: '/admin/leads', icon: Mail },
  { name: 'Files', href: '/admin/files', icon: Folder },
  { name: 'Admins', href: '/admin/admins', icon: Shield },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Support', href: '/admin/support', icon: HeadphonesIcon },
  { name: 'Logs', href: '/admin/logs', icon: Activity },
]

export default function AdminNav() {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="bg-brand-primary text-white w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-r from-brand-accent to-brand-accent-dark p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <p className="text-white/60 text-sm">ImpressTheMasses</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-brand-accent text-white shadow-lg" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 w-full"
        >
          <Home className="h-5 w-5" />
          <span>View Site</span>
        </Link>
        
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 w-full justify-start"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  )
}

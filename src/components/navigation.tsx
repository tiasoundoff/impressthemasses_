
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, X, Palette, ShoppingBag, User, LogIn, LogOut, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navigation = () => {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: 'Shop Packs', href: '/shop', icon: ShoppingBag },
    { name: 'Dashboard', href: '/dashboard', icon: User },
  ]

  // @ts-expect-error - session.user.role is not defined in the default session type
  const isAdmin = session?.user?.role === 'admin'

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-pink-500 to-fuchsia-500 p-2.5 rounded-xl shadow-lg shadow-pink-500/30 group-hover:scale-105 transition-transform duration-300">
              <Palette className="h-7 w-7 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900">
              ImpressTheMasses
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors duration-300 font-semibold text-sm"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors duration-300 font-semibold text-sm"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}

            {session ? (
              <Button
                variant="ghost"
                onClick={() => signOut()}
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors duration-300 font-semibold text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => signIn()}
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors duration-300 font-semibold text-sm"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
            
            <Button 
              size="lg"
              asChild
              className="rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition-all shadow-lg shadow-pink-500/30 hover:shadow-xl"
            >
              <Link href="/shop">
                Shop Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
        )}>
          <div className="pt-6 pb-2 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 text-gray-700 hover:text-pink-500 transition-colors duration-300 font-semibold py-2 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-3 text-gray-700 hover:text-pink-500 transition-colors duration-300 font-semibold py-2 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            )}

            {session ? (
              <button
                onClick={() => { signOut(); setIsMenuOpen(false); }}
                className="w-full flex items-center space-x-3 text-gray-700 hover:text-pink-500 transition-colors duration-300 font-semibold py-2 text-lg"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => { signIn(); setIsMenuOpen(false); }}
                className="w-full flex items-center space-x-3 text-gray-700 hover:text-pink-500 transition-colors duration-300 font-semibold py-2 text-lg"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
            
            <div className="pt-4">
              <Button 
                size="lg"
                className="w-full rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition-all shadow-lg shadow-pink-500/30 hover:shadow-xl"
                asChild
              >
                <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
                  Shop Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

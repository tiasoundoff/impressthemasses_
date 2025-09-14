
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Palette, ShoppingBag, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: 'Shop Packs', href: '/shop', icon: ShoppingBag },
    { name: 'Dashboard', href: '/dashboard', icon: User }
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-brand-accent to-brand-accent-dark p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-brand-primary">
              ImpressTheMasses
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems?.map?.((item) => (
              <Link
                key={item?.name}
                href={item?.href || '/'}
                className="flex items-center space-x-2 text-brand-primary-dark hover:text-brand-accent transition-colors duration-300 font-medium"
              >
                <item.icon className="h-4 w-4" />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            <Button 
              variant="default" 
              size="lg"
              asChild
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
              className="text-brand-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
        )}>
          <div className="pt-6 pb-2 space-y-4">
            {navItems?.map?.((item) => (
              <Link
                key={item?.name}
                href={item?.href || '/'}
                className="flex items-center space-x-3 text-brand-primary-dark hover:text-brand-accent transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            <div className="pt-4">
              <Button 
                variant="default" 
                size="lg"
                className="w-full"
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

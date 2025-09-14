
'use client'

import React from 'react'
import Link from 'next/link'
import { Palette, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Shop All Packs', href: '/shop' },
      { name: 'Social Media Templates', href: '/shop?category=social_media' },
      { name: 'Presentation Templates', href: '/shop?category=presentations' },
      { name: 'Brand Kits', href: '/shop?category=brand_kits' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Downloads', href: '/downloads' }
    ]
  }

  return (
    <footer className="bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="bg-gradient-to-r from-brand-accent to-brand-accent-dark p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <span className="font-bold text-2xl">ImpressTheMasses</span>
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed max-w-md">
              Professional digital design templates for solo creators, coaches, and small businesses. 
              Build stunning brands that truly impress the masses.
            </p>
            <div className="flex items-center space-x-2 text-white/60">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Serving creators worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Products</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map?.((link) => (
                <li key={link?.name}>
                  <Link
                    href={link?.href || '/'}
                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-accent" />
                <span className="text-white/80 text-sm">hello@impressthemasses.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {currentYear} ImpressTheMasses. All rights reserved.
            </p>
            <p className="text-white/60 text-sm">
              Made with ❤️ for creators who want to stand out
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

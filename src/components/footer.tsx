
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
  }

  return (
    <footer className="bg-[#0b101a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-4 mb-6 group">
              <div className="bg-pink-500 p-3 rounded-2xl shadow-lg shadow-pink-500/20">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">ImpressTheMasses</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Professional digital design templates for solo creators, coaches, and small businesses. 
              Build stunning brands that truly impress the masses.
            </p>
            <div className="flex items-center space-x-2 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Serving creators worldwide</span>
            </div>
          </div>

          <div className="lg:col-start-4">
            <h3 className="font-bold text-lg mb-6 text-white">Products</h3>
            <ul className="space-y-4">
              {footerLinks?.product?.map?.((link) => (
                <li key={link?.name}>
                  <Link
                    href={link?.href || '/'}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Get In Touch</h3>
            <div className="space-y-4">
              <a href="mailto:hello@impressthemasses.com" className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-pink-400 flex-shrink-0" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">hello@impressthemasses.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} ImpressTheMasses. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with <span className='text-pink-500'>❤️</span> for creators who want to stand out
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

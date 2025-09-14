
'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminNav from './admin-nav'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    
    if (!session) {
      router.push('/api/auth/signin?callbackUrl=/admin')
      return
    }

    // Check if user has admin role (this would be validated on server-side)
    // For now, we'll assume the session validation handles admin role checking
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-brand-neutral-light flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-brand-neutral rounded-full mx-auto mb-4"></div>
          <p className="text-brand-primary-light">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className="flex min-h-screen bg-brand-neutral-light">
      <AdminNav />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

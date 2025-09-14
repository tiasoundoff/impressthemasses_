

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // In a local environment, we'll return a mock order.
    const mockOrder = {
        id: 'mock-order-id',
        amount: 2500, // $25.00
        status: 'PAID',
        downloadToken: 'mock-download-token',
        product: {
            id: '1',
            title: 'Impress the Masses T-Shirt',
            category: 'Apparel',
        },
        customerEmail: 'test@example.com',
    }

    return NextResponse.json(mockOrder)

  } catch (error) {
    console.error('Error fetching order details:', error)
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: 500 })
  }
}

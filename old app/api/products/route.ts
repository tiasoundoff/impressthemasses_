
import { NextRequest, NextResponse } from 'next/server'
import { getProducts } from '../../../lib/local/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const products = getProducts();
    return NextResponse.json({
      products,
      totalCount: products.length,
      success: true
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', success: false },
      { status: 500 }
    )
  }
}

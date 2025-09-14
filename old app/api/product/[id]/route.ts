
import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '../../../../lib/local/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = getProductById(params.id);
    if (product) {
      return NextResponse.json({ product, success: true });
    } else {
      return NextResponse.json({ error: 'Product not found', success: false }, { status: 404 });
    }
  } catch (error) {
    console.error('Product API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product', success: false },
      { status: 500 }
    )
  }
}

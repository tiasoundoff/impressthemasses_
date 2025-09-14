
import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '../../../../../lib/local/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = getProductById(params.id);
    if (product) {
      return NextResponse.json({ pack: product, success: true });
    } else {
      return NextResponse.json({ error: 'Pack not found', success: false }, { status: 404 });
    }
  } catch (error) {
    console.error('Pack API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pack', success: false },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updatedProduct = updateProduct(params.id, body);
    if (updatedProduct) {
      return NextResponse.json({ pack: updatedProduct, success: true });
    } else {
      return NextResponse.json({ error: 'Pack not found', success: false }, { status: 404 });
    }
  } catch (error) {
    console.error('Pack API error:', error)
    return NextResponse.json(
      { error: 'Failed to update pack', success: false },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = deleteProduct(params.id);
    if (deleted) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Pack not found', success: false }, { status: 404 });
    }
  } catch (error) {
    console.error('Pack API error:', error)
    return NextResponse.json(
      { error: 'Failed to delete pack', success: false },
      { status: 500 }
    )
  }
}

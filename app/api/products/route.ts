
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const where: any = {
      active: true
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const orderBy: any = {}
    if (sortBy === 'price') {
      orderBy.price = sortOrder === 'desc' ? 'desc' : 'asc'
    } else {
      orderBy[sortBy] = sortOrder === 'desc' ? 'desc' : 'asc'
    }

    const queryOptions: any = {
      where,
      orderBy,
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        category: true,
        images: true,
        featured: true,
        createdAt: true
      }
    }

    if (limit) {
      queryOptions.take = parseInt(limit)
    }

    const products = await prisma.product.findMany(queryOptions)

    const totalCount = await prisma.product.count({ where })

    return NextResponse.json({
      products,
      totalCount,
      success: true
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', success: false },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

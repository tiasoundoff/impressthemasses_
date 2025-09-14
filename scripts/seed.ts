import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  await prisma.product.deleteMany({})
  console.log('Cleared existing products')

  // Create a few simple products
  await prisma.product.create({
    data: {
      title: 'Instagram Story Pack Pro',
      description: 'Professional Instagram story templates for creators and businesses.',
      price: 1900,
      category: 'social_media',
      images: [],
      downloadUrl: 'https://example.com/instagram-pack.zip',
      featured: true
    }
  })

  await prisma.product.create({
    data: {
      title: 'Pitch Deck Mastery',
      description: 'Professional presentation templates for startups and investors.',
      price: 4900,
      category: 'presentations',
      images: [],
      downloadUrl: 'https://example.com/pitch-deck.zip',
      featured: true
    }
  })

  await prisma.product.create({
    data: {
      title: 'Mini Brand Kit',
      description: 'Free starter pack with logo and templates.',
      price: 0,
      category: 'brand_kits',
      images: [],
      downloadUrl: 'https://example.com/mini-kit.zip',
      featured: false
    }
  })

  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

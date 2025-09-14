
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product-detail-client';
import { db } from '@/lib/db'; // Assuming db access

async function getProduct(id: string) {
  // In a real app, you would fetch this from your database.
  // This is a mock implementation.
  const product = await db.product.findUnique({ where: { id } });
  if (!product) {
    // A mock product for demonstration if not found in db
    if (id === 'mock-product') {
      return {
        id: 'mock-product',
        name: 'Ultimate Icon Pack',
        description: 'A massive collection of beautifully crafted icons for all your design needs. Perfect for web, mobile, and desktop applications.',
        price: 49.99,
        imageUrl: '/placeholder-image.svg', // Replace with a real image path or placeholder
        tags: ['icons', 'ui', 'design'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return null;
  }
  return product;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

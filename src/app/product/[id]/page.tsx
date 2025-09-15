
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product-detail-client';
import { getProductById } from '@/lib/local/db';

function getProduct(id: string) {
  const product = getProductById(id);

  if (!product) {
    if (id === 'mock-product') {
      return {
        id: 'mock-product',
        name: 'Ultimate Icon Pack',
        description: 'A massive collection of beautifully crafted icons for all your design needs. Perfect for web, mobile, and desktop applications.',
        price: 49.99,
        imageUrl: '/placeholder-image.svg',
      };
    }
    return null;
  }
  return product;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

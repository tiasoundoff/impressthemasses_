
import DashboardClient from '@/components/dashboard-client';
import { getProducts } from '@/lib/local/db';

// Mock data fetching functions
async function getUserData(userId: string) {
  // In a real app, you would fetch this from your database
  return {
    id: userId,
    name: 'John Doe',
    email: 'john@doe.com',
    joinedDate: '2024-01-15',
    totalOrders: 2,
    totalSpent: 7500,
  };
}

async function getUserOrders() {
  const products = getProducts();
  // In a real app, you would fetch this from your database
  return [
    {
      id: '1',
      productId: products[0].id,
      amount: products[0].price * 100,
      status: 'completed',
      createdAt: '2024-09-10T10:00:00Z',
      product: {
        title: products[0].name,
        images: [products[0].imageUrl],
      },
    },
    {
      id: '2',
      productId: products[1].id,
      amount: products[1].price * 100,
      status: 'completed',
      createdAt: '2024-09-08T14:30:00Z',
      product: {
        title: products[1].name,
        images: [products[1].imageUrl],
      },
    },
  ];
}

export default async function DashboardPage() {
  // Mock session for development
  const session = {
      user: {
          id: 'mock-user-id',
          name: 'John Doe',
          email: 'john@doe.com',
      }
  }

  const userData = await getUserData(session.user.id as string);
  const ordersData = await getUserOrders();

  return <DashboardClient user={userData} orders={ordersData} />;
}


import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardClient from '@/components/dashboard-client';

// Mock data fetching functions
async function getUserData(userId: string) {
  // In a real app, you would fetch this from your database
  return {
    id: userId,
    name: 'John Doe',
    email: 'john@doe.com',
    joinedDate: '2024-01-15',
    totalOrders: 5,
    totalSpent: 19900,
  };
}

async function getUserOrders() {
  // In a real app, you would fetch this from your database
  return [
    {
      id: '1',
      productId: 'prod1',
      amount: 1900,
      status: 'completed',
      createdAt: '2024-09-10T10:00:00Z',
      product: {
        title: 'Instagram Story Pack Pro',
        images: [],
      },
    },
    {
      id: '2',
      productId: 'prod2',
      amount: 4900,
      status: 'completed',
      createdAt: '2024-09-08T14:30:00Z',
      product: {
        title: 'Pitch Deck Mastery',
        images: [],
      },
    },
  ];
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  const userData = await getUserData(session.user.id as string);
  const ordersData = await getUserOrders();

  return <DashboardClient user={userData} orders={ordersData} />;
}

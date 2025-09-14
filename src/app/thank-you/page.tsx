
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ThankYouClient from '@/components/thank-you-client';
import Loading from './loading';

// Mock function to get order details. In a real app, this would fetch from your database.
async function getOrderDetails(sessionId: string) {
  if (!sessionId) {
    return null;
  }
  // Mock data, in a real scenario you would look up the order by the session ID.
  return {
    id: `order_${sessionId.slice(-8)`,
    amount: 4999,
    product: {
      title: 'Pitch Deck Mastery',
    },
    downloadToken: `token_${sessionId}`,
  };
}

export default async function ThankYouPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const sessionId = searchParams?.session_id as string;
  
  // Even though we use Suspense, we can pre-fetch here. 
  // The client component will receive the initial data as props.
  const orderDetails = await getOrderDetails(sessionId);

  if (!sessionId) {
    // Or redirect to an error page or the homepage
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <ThankYouClient orderDetails={orderDetails} />
    </Suspense>
  );
}

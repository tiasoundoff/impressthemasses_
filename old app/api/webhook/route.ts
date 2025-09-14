

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Webhook received:', body);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

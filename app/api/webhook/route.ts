

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'


export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session

        
        // Update order status
        const order = await prisma.order.update({

          where: { stripeSessionId: session.id },
          data: {
            status: 'completed',
            stripePaymentId: session.payment_intent as string,
          },
        })

        // Capture email
        if (session.customer_email) {
          await prisma.emailCapture.create({
            data: {
              email: session.customer_email,
              source: 'checkout',
              metadata: { 
                productId: session.metadata?.productId,
                orderId: order.id,
                stripeSessionId: session.id 
              },
            },
          })
        }

        console.log('Payment completed for order:', order.id)
        break

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        
        // Update order status to failed
        if (paymentIntent.metadata?.orderId) {
          await prisma.order.update({
            where: { id: paymentIntent.metadata.orderId },
            data: { status: 'failed' },
          })
        }

        console.log('Payment failed for payment intent:', paymentIntent.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

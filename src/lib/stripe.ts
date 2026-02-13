import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export const getStripeSession = async ({
  priceId,
  customerId,
  userId,
}: {
  priceId: string
  customerId?: string
  userId: string
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    metadata: {
      userId,
    },
  })

  return session
}

export const getStripePrices = async () => {
  const prices = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  })

  return prices.data
}

export const createStripeCustomer = async (email: string, userId: string) => {
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  })

  return customer
}

export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.cancel(subscriptionId)
  return subscription
}

export const updateSubscription = async (
  subscriptionId: string,
  priceId: string
) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: priceId,
      },
    ],
  })

  return updatedSubscription
}

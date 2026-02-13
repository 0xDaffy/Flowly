import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env')
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data

    const email = email_addresses[0]?.email_address

    if (!email) {
      return new Response('No email found', { status: 400 })
    }

    await db.user.create({
      data: {
        clerkId: id,
        email,
        name: first_name && last_name ? `${first_name} ${last_name}` : first_name || 'User',
        imageUrl: image_url,
      },
    })
  }

  if (eventType === 'user.updated') {
    const { id, image_url, first_name, last_name } = evt.data

    await db.user.update({
      where: { clerkId: id },
      data: {
        name: first_name && last_name ? `${first_name} ${last_name}` : first_name,
        imageUrl: image_url,
      },
    })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    if (id) {
      await db.user.delete({
        where: { clerkId: id },
      })
    }
  }

  return new Response('', { status: 200 })
}

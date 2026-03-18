import Stripe from "stripe"

export default async function handler(req, res) {

  try {

    const stripe = new Stripe(process.env.STRIPE_SECRET)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.PRICE_1,
          quantity: 1
        }
      ],
      success_url: "https://example.com",
      cancel_url: "https://example.com"
    })

    return res.status(200).json({ url: session.url })

  } catch (err) {

    return res.status(500).json({ error: err.message })
  }
}

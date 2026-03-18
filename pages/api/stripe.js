import Stripe from "stripe"

export default async function handler(req, res) {

  const stripe = new Stripe(process.env.STRIPE_SECRET)

  try {

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Cours de natation FNCP"
            },
            unit_amount: 2000
          },
          quantity: 1
        }
      ],
      success_url: "https://fncp-app.vercel.app",
      cancel_url: "https://fncp-app.vercel.app"
    })

    res.status(200).json({ url: session.url })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

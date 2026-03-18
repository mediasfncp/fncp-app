import Stripe from "stripe"

export default async function handler(req, res) {

  const stripe = new Stripe(process.env.STRIPE_SECRET)

  try {

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.PRICE_1,
          quantity: 1
        }
      ],
      success_url: "https://fncp-app.vercel.app",
      cancel_url: "https://fncp-app.vercel.app"
    })

    res.status(200).json({ url: session.url })

  } catch (error) {

    console.log(error)

    res.status(500).json({ error: "Erreur Stripe" })
  }
}

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async function handler(req,res){

 const {pack, heure, nom, enfant, email, tel} = req.body

 const prices = {
  "1": process.env.PRICE_1,
  "5": process.env.PRICE_5,
  "6": process.env.PRICE_6,
  "10": process.env.PRICE_10
 }

 const session = await stripe.checkout.sessions.create({
  mode:"payment",
  line_items:[{price:prices[pack],quantity:1}],
  success_url:process.env.URL,
  cancel_url:process.env.URL,
  metadata:{heure, nom, enfant, email, tel}
 })

 res.json({url:session.url})
}

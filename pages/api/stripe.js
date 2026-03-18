import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async function handler(req,res){

 const session = await stripe.checkout.sessions.create({
   payment_method_types:["card"],
   line_items:[
     {
       price: process.env.PRICE_1,
       quantity:1
     }
   ],
   mode:"payment",
   success_url:"https://fncp-app.vercel.app",
   cancel_url:"https://fncp-app.vercel.app"
 })

 res.json({url:session.url})
}

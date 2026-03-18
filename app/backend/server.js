const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let reservations = []

let seances = []

for (let h = 9; h < 19; h++) {

 seances.push({heure: `${h}:00`, places:2})
 seances.push({heure: `${h}:30`, places:2})

}

app.get("/seances",(req,res)=>{
 res.json(seances)
})

app.post("/reservation",(req,res)=>{

 const {nom,email,telephone,enfant,heure} = req.body

 const seance = seances.find(s=>s.heure===heure)

 if(seance.places <=0){

   return res.json({status:"complet"})
 }

 seance.places--

 reservations.push({
   nom,
   email,
   telephone,
   enfant,
   heure
 })

 res.json({status:"ok"})

})

app.get("/export",(req,res)=>{

 res.json(reservations)

})

app.listen(3000,()=>{
 console.log("server running")
})

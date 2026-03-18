"use client"
import { useState } from "react"

export default function Home(){

 const [loading,setLoading] = useState(false)

 async function handleClick(){

  setLoading(true)

  const res = await fetch("/api/stripe",{
    method:"POST"
  })

  const data = await res.json()

  window.location = data.url

 }

 return(
  <div style={{
    padding:40,
    textAlign:"center",
    fontFamily:"Arial"
  }}>

    <h1 style={{color:"#00CCCC"}}>
      🏖️ FNCP – Club de Plage
    </h1>

    <p>Réservation des cours de natation</p>

    <button onClick={handleClick} style={{
      background:"#FF9900",
      color:"white",
      padding:"15px 25px",
      border:"none",
      borderRadius:"10px",
      fontSize:"18px",
      cursor:"pointer"
    }}>
      {loading ? "Chargement..." : "Réserver une séance"}
    </button>

  </div>
 )
}

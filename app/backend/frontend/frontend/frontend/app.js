let selected

fetch("http://localhost:3000/seances")
.then(r=>r.json())
.then(data=>{

 let planning=document.getElementById("planning")

 data.forEach(s=>{

   let div=document.createElement("div")

   div.className="slot"

   div.innerHTML=
   `
   ${s.heure}
   <button onclick="select('${s.heure}')">Réserver</button>
   `

   planning.appendChild(div)

 })

})

function select(h){

 selected=h

}

function reserver(){

 fetch("http://localhost:3000/reservation",{

   method:"POST",

   headers:{
     "Content-Type":"application/json"
   },

   body:JSON.stringify({

    nom:document.getElementById("nom").value,
    email:document.getElementById("email").value,
    telephone:document.getElementById("tel").value,
    enfant:document.getElementById("enfant").value,
    heure:selected

   })

 })

}

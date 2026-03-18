export default function Home() {
  return (
    <div style={{
      padding:40,
      textAlign:"center",
      fontFamily:"Arial"
    }}>
      
      <h1 style={{color:"#00CCCC"}}>
        🏖️ FNCP – Club de Plage
      </h1>

      <p>Réservation des cours de natation</p>

      <button style={{
        background:"#FF9900",
        color:"white",
        padding:"15px 25px",
        border:"none",
        borderRadius:"10px",
        fontSize:"18px",
        cursor:"pointer"
      }}>
        Réserver une séance
      </button>

    </div>
  );
}

export default function Home() {

  const handleReservation = async () => {
    try {
      const res = await fetch("/api/stripe")
      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Erreur paiement")
      }

    } catch (error) {
      console.error(error)
      alert("Erreur serveur")
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f0fdfd"
    }}>

      <h1 style={{ color: "#00CCCC", fontSize: "32px" }}>
        FNCP - Réservation Natation
      </h1>

      <button
        onClick={handleReservation}
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          fontSize: "18px",
          background: "#FF9900",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Réserver une séance
      </button>

    </div>
  )
}

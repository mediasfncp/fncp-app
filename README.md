import { useState } from “react”;

/* ═══════════════════════════════════════════════════════
🌊 FNCP – Club de Plage  |  Univers Joyeux Plage & Enfants
═══════════════════════════════════════════════════════ */

const C = {
sun:    “#FFD93D”,
sunset: “#FF6B6B”,
coral:  “#FF8E53”,
sea:    “#4ECDC4”,
ocean:  “#1A8FE3”,
deep:   “#0066CC”,
sky:    “#87CEEB”,
sand:   “#FFEAA7”,
shell:  “#FFF9F0”,
green:  “#6BCB77”,
white:  “#FFFFFF”,
dark:   “#2C3E50”,
};

// ── TARIFS CLUB ────────────────────────────────────────
const TARIFS_MATIN = {
label: “Matin”, emoji: “🌅”, color: C.coral, horaires: “9h30 – 12h30”,
rows: [
{ label: “1 demi-journée”, e1: 15,  e2: 28,  e3: 39,  sup: 11 },
{ label: “1 semaine”,      e1: 78,  e2: 144, e3: 198, sup: 54 },
{ label: “2 semaines”,     e1: 144, e2: 264, e3: 360, sup: 96 },
{ label: “3 semaines”,     e1: 189, e2: 342, e3: 459, sup: 126 },
{ label: “4 semaines”,     e1: 216, e2: 384, e3: 504, sup: 144 },
],
};
const TARIFS_APMIDI = {
label: “Après-midi”, emoji: “🌊”, color: C.ocean, horaires: “14h30 – 18h00”,
rows: [
{ label: “1 demi-journée”, e1: 17,  e2: 32,  e3: 45,  sup: 13 },
{ label: “1 semaine”,      e1: 90,  e2: 168, e3: 234, sup: 66 },
{ label: “2 semaines”,     e1: 168, e2: 312, e3: 432, sup: 120 },
{ label: “3 semaines”,     e1: 225, e2: 414, e3: 567, sup: 162 },
{ label: “4 semaines”,     e1: 264, e2: 480, e3: 648, sup: 192 },
],
};
const TARIFS_JOURNEE = {
label: “Journée”, emoji: “☀️”, color: C.green, horaires: “9h30 – 12h30 · 14h30 – 18h00”,
rows: [
{ label: “1 journée”,  e1: 25,  e2: 48,  e3: 69,   sup: 21 },
{ label: “1 semaine”,  e1: 138, e2: 264, e3: 378,  sup: 114 },
{ label: “2 semaines”, e1: 264, e2: 504, e3: 720,  sup: 216 },
{ label: “3 semaines”, e1: 369, e2: 702, e3: 999,  sup: 306 },
{ label: “4 semaines”, e1: 456, e2: 864, e3: 1224, sup: 384 },
],
};
const TARIFS_LIBERTE = [
{ label: “6 demi-journées”,  price: 96  },
{ label: “12 demi-journées”, price: 180 },
{ label: “18 demi-journées”, price: 252 },
{ label: “24 demi-journées”, price: 288 },
{ label: “30 demi-journées”, price: 330 },
];

const FORMULES_NAT = [
{ id: “f1”, label: “1 leçon”,   qty: 1,  price: 20,  emoji: “🐠”, color: C.sea,   badge: “Découverte” },
{ id: “f2”, label: “5 leçons”,  qty: 5,  price: 95,  emoji: “🐬”, color: C.ocean, badge: “Populaire ⭐”, saving: “5€ offerts” },
{ id: “f3”, label: “6 leçons”,  qty: 6,  price: 113, emoji: “🦈”, color: C.coral, badge: “Été complet 🌞”, saving: “7€ offerts” },
{ id: “f4”, label: “10 leçons”, qty: 10, price: 170, emoji: “🌊”, color: C.green, badge: “Best value 🏆”, saving: “20€ offerts” },
];

const DAYS = [
{ id: “lun7”,  label: “Lun”, num: “7”  },
{ id: “mar8”,  label: “Mar”, num: “8”  },
{ id: “mer9”,  label: “Mer”, num: “9”  },
{ id: “jeu10”, label: “Jeu”, num: “10” },
{ id: “ven11”, label: “Ven”, num: “11” },
{ id: “sam12”, label: “Sam”, num: “12” },
];

function generateSlots() {
const slots = [];
let id = 1;
const addSlots = (startH, startM, endH, endM) => {
let h = startH, m = startM;
while (h < endH || (h === endH && m <= endM)) {
const time = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
DAYS.forEach(d => { slots.push({ id: `s${id++}`, day: d.id, time, spots: 2 }); });
m += 30; if (m >= 60) { h++; m -= 60; }
}
};
addSlots(9, 0, 12, 30);
addSlots(13, 30, 19, 0);
return slots;
}
const INIT_SESSIONS = generateSlots();

// ── SAISON COMPLÈTE : tous les jours du 6 juillet au 22 août ──
function buildSeasonDays() {
const days = [];
const start = new Date(2026, 6, 6);
const end   = new Date(2026, 7, 22);
const cur   = new Date(start);
const dowLabels = [“Dim”,“Lun”,“Mar”,“Mer”,“Jeu”,“Ven”,“Sam”];
const months    = [“jan”,“fév”,“mar”,“avr”,“mai”,“jun”,“juil”,“août”];
while (cur <= end) {
const dow = cur.getDay();
if (dow !== 0) {
const d = cur.getDate(), m = cur.getMonth();
const id = `d${d}-${m}`;
days.push({ id, label: dowLabels[dow], num: String(d), month: months[m], date: new Date(cur) });
}
cur.setDate(cur.getDate() + 1);
}
return days;
}
const ALL_SEASON_DAYS = buildSeasonDays();

function generateAllSeasonSlots() {
const slots = [];
let id = 10000;
const addSlots = (dayId, startH, startM, endH, endM) => {
let h = startH, m = startM;
while (h < endH || (h === endH && m <= endM)) {
const time = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
slots.push({ id: `ss${id++}`, day: dayId, time, spots: 2 });
m += 30; if (m >= 60) { h++; m -= 60; }
}
};
ALL_SEASON_DAYS.forEach(d => {
addSlots(d.id, 9, 0, 12, 30);
addSlots(d.id, 13, 30, 19, 0);
});
return slots;
}
const ALL_SEASON_SLOTS_INIT = generateAllSeasonSlots();

const ACTIVITY_BY_DOW = {
1: { label: “Koh Lanta”,       emoji: “🏝️”, color: C.coral  },
2: { label: “Béret 🎓”,            emoji: “🎓”, color: C.ocean  },
3: { label: “Chasse au trésor 🗺️”, emoji: “🗺️”, color: C.green  },
4: { label: “Gamelle 🥣”,          emoji: “🥣”, color: C.sun    },
5: { label: “Olympiades 🏅”,       emoji: “🏅”, color: C.sea    },
6: { label: “Thèque 🥊”,           emoji: “🥊”, color: “#9B59B6” },
};

// ── PLANNING SAISON 2026 (6 juillet – 22 août) ────────────
// Structure : [date_iso, m1030, m1130, am1500, am1700]
// m1030 = activité 10h00-10h30, m1130 = 11h30-12h00
// am1500 = activité 15h00-16h00, am1700 = 17h00-17h30
const DAILY_ACTIVITIES = {
// Semaine 1 : 06-11 juillet
“2026-07-06”: { m1030:“Cerceaux musicaux”,      m1130:“Queue du diable”,         am1500:“Koh Lanta”,                          am1700:“Koh Lanta” },
“2026-07-07”: { m1030:“Initiation Beach Tennis”, m1130:“Tomate”,                  am1500:“Dodgeball”,                          am1700:“Concours de figures au trampoline” },
“2026-07-08”: { m1030:“Horloge”,                 m1130:“1, 2, 3 soleil”,          am1500:“Chasse au trésor”,                   am1700:“Relais Morpion” },
“2026-07-09”: { m1030:“Le facteur”,              m1130:“Initiation Beach Tennis”, am1500:“Tournoi Ballon capitaine”,           am1700:“Mastermind” },
“2026-07-10”: { m1030:“Olympiades Pitch”,        m1130:“Olympiades Pitch”,        am1500:“Olympiades Pitch”,                   am1700:“Olympiades Pitch” },
“2026-07-11”: { m1030:“Chef d’orchestre”,        m1130:“Tomate Ketchup”,          am1500:“Béret”,                              am1700:“Balle assise” },
// Semaine 2 : 13-18 juillet
“2026-07-13”: { m1030:“Land art”,                m1130:“Chasse aux couleurs”,     am1500:“Fort Boyard”,                        am1700:“Fort Boyard” },
“2026-07-14”: { m1030:“Initiation Beach Tennis”, m1130:“Minuit dans la bergerie”, am1500:“Balles brulantes”,                   am1700:“Poules, renards, vipères” },
“2026-07-15”: { m1030:“Chat perché”,             m1130:“Qui suis-je ? Jeux de mimes”, am1500:“Chasse au trésor”,              am1700:“Le drapeau” },
“2026-07-16”: { m1030:“Déménageurs”,             m1130:“Initiation Beach Tennis”, am1500:“Boule qui roule”,                    am1700:“Concours de figures au trampoline” },
“2026-07-17”: { m1030:“Olympiades Pitch”,        m1130:“Olympiades Pitch”,        am1500:“Olympiades Pitch”,                   am1700:“Olympiades Pitch” },
“2026-07-18”: { m1030:“Chameau Chamois”,         m1130:“Poissons Pêcheurs”,       am1500:“Balle aux prisonniers”,              am1700:“Thèque” },
// Semaine 3 : 20-25 juillet
“2026-07-20”: { m1030:“Les sorciers”,            m1130:“Remplir la maison”,       am1500:“Cluedo Géant : Qui a volé la bouée du club ?”, am1700:“Cluedo Géant : Qui a volé la bouée du club ?” },
“2026-07-21”: { m1030:“Initiation Beach Tennis”, m1130:“Chamboule-tout”,          am1500:“Dodgeball”,                          am1700:“Ballon couloir” },
“2026-07-22”: { m1030:“Journée Anniversaire 90 ans”, m1130:“Journée Anniversaire 90 ans”, am1500:“Journée Anniversaire 90 ans”, am1700:“Journée Anniversaire 90 ans” },
“2026-07-23”: { m1030:“Dessinez, c’est gagné !”,  m1130:“Initiation Beach Tennis”, am1500:“Douaniers et contrebandiers”,      am1700:“Concours de figures au trampoline” },
“2026-07-24”: { m1030:“Olympiades Pitch”,        m1130:“Olympiades Pitch”,        am1500:“Olympiades Pitch”,                   am1700:“Olympiades Pitch” },
“2026-07-25”: { m1030:“Le slalomeur”,            m1130:“Le passage de la rivière”,am1500:“Boule qui roule”,                    am1700:“Déménageurs” },
// Semaine 4 : 27 juillet – 01 août
“2026-07-27”: { m1030:“Les jongleurs”,           m1130:“Les lapins dans leur terrier”, am1500:“Fort Boyard”,                   am1700:“Fort Boyard” },
“2026-07-28”: { m1030:“Initiation Beach Tennis”, m1130:“Mon ombre me suit”,       am1500:“Thèque”,                             am1700:“Le drapeau” },
“2026-07-29”: { m1030:“Passer sous le pont”,     m1130:“La chaine des pompiers”,  am1500:“Chasse au trésor”,                   am1700:“Mastermind” },
“2026-07-30”: { m1030:“Les quatre roues de la voiture”, m1130:“Initiation Beach Tennis”, am1500:“Biathlon”,                   am1700:“Tic Tac Toe” },
“2026-07-31”: { m1030:“Olympiades Pitch”,        m1130:“Olympiades Pitch”,        am1500:“Olympiades Pitch”,                   am1700:“Olympiades Pitch” },
“2026-08-01”: { m1030:“Le ballon aux prénoms”,   m1130:“Nettoyer la maison”,      am1500:“Boule qui roule”,                    am1700:“Balle aux prisonniers” },
// Semaine 5 : 03-08 août
“2026-08-03”: { m1030:“Cerceaux musicaux”,       m1130:“Queue du diable”,         am1500:“Koh Lanta”,                          am1700:“Koh Lanta” },
“2026-08-04”: { m1030:“Initiation Beach Tennis”, m1130:“Tomate”,                  am1500:“Ballon couloir”,                     am1700:“Thèque” },
“2026-08-05”: { m1030:“Horloge”,                 m1130:“1, 2, 3 soleil”,          am1500:“Chasse au trésor”,                   am1700:“Relais Morpion” },
“2026-08-06”: { m1030:“Relais SNCF”,             m1130:“Initiation Beach Tennis”, am1500:“Tournoi Ballon capitaine”,           am1700:“Accroche décroche” },
“2026-08-07”: { m1030:“Olympiades Pitch”,        m1130:“Olympiades Pitch”,        am1500:“Olympiades Pitch”,                   am1700:“Olympiades Pitch” },
“2026-08-08”: { m1030:“Chef d’orchestre”,        m1130:“Tomate Ketchup”,          am1500:“Béret”,                              am1700:“Balle assise” },
// Semaine 6 : 10-15 août
“2026-08-10”: { m1030:“Passe à cinq”,            m1130:“Loup couleur”,            am1500:“Fort Boyard”,                        am1700:“Fort Boyard” },
“2026-08-11”: { m1030:“Initiation Beach Tennis”, m1130:“Minuit dans la bergerie”, am1500:“Thèque”,                             am1700:“Les trois tapes” },
“2026-08-12”: { m1030:“Journée Anniversaire 90 ans”, m1130:“Journée Anniversaire 90 ans”, am1500:“Chasse au trésor”,          am1700:“Chasse au trésor” },
“2026-08-13”: { m1030:“Déménageurs”,             m1130:“Initiation Beach Tennis”, am1500:“Mastermind”,                         am1700:“Concours de figures au trampoline” },
“2026-08-14”: { m1030:“Olympiades Pitch”,        m1130:“Olympiades Pitch”,        am1500:“Olympiades Pitch”,                   am1700:“Olympiades Pitch” },
“2026-08-15”: { m1030:“Chameau Chamois”,         m1130:“Poissons Pêcheurs”,       am1500:“Dodgeball”,                          am1700:“Roule qui boule” },
// Semaine 7 : 17-22 août
“2026-08-17”: { m1030:“Parcours de motricité”,   m1130:“Relais en pagaille”,      am1500:“Koh Lanta”,                          am1700:“Koh Lanta” },
“2026-08-18”: { m1030:“Initiation Beach Tennis”, m1130:“Queue du diable”,         am1500:“Ballon capitaine”,                   am1700:“Course en étoile” },
“2026-08-19”: { m1030:“Initiation Yoga”,         m1130:“Tomate”,                  am1500:“Chasse au trésor”,                   am1700:“Béret” },
“2026-08-20”: { m1030:“Epervier”,                m1130:“Initiation Beach Tennis”, am1500:“Balle au prisonnier”,                am1700:“Thèque” },
“2026-08-21”: { m1030:“Olympiades Pitch”,        m1130:“Olympiades Pitch”,        am1500:“Olympiades Pitch”,                   am1700:“Olympiades Pitch” },
“2026-08-22”: { m1030:“Kermesse”,                m1130:“Kermesse”,                am1500:“Kermesse”,                           am1700:“Kermesse” },
};

function buildProgramme() {
const days = [];
const start = new Date(2026, 6, 6);
const end   = new Date(2026, 7, 22);
const cur = new Date(start);
const months = [“janvier”,“février”,“mars”,“avril”,“mai”,“juin”,“juillet”,“août”,“septembre”,“octobre”,“novembre”,“décembre”];
const dowNames = [“Dimanche”,“Lundi”,“Mardi”,“Mercredi”,“Jeudi”,“Vendredi”,“Samedi”];
const colors = [C.coral, C.sea, “#9B59B6”, C.sun, C.ocean, C.green];

while (cur <= end) {
const dow = cur.getDay();
if (dow !== 0) {
const iso = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,"0")}-${String(cur.getDate()).padStart(2,"0")}`;
const act = DAILY_ACTIVITIES[iso] || { m1030:”—”, m1130:”—”, am1500:”—”, am1700:”—” };
const color = colors[(cur.getDate() + cur.getMonth()) % colors.length];
days.push({
date: new Date(cur),
dateStr: `${dowNames[dow]} ${cur.getDate()} ${months[cur.getMonth()]}`,
emoji: “🏖️”, color,
activities: [
{ time: “9h30 – 10h00”,  label: “Accueil & Jeux divers” },
{ time: “10h00 – 10h30”, label: act.m1030 },
{ time: “10h30 – 11h30”, label: “Jeux au bord de l’eau” },
{ time: “11h30 – 12h00”, label: act.m1130 },
{ time: “12h00 – 12h30”, label: “Jeux libres & Remise des cadeaux” },
{ time: “14h30 – 15h00”, label: “Accueil & Jeux divers” },
{ time: “15h00 – 16h00”, label: act.am1500 },
{ time: “16h00 – 16h30”, label: “Baignade du club” },
{ time: “16h30 – 17h00”, label: “Gouter & Jeux libres” },
{ time: “17h00 – 17h30”, label: act.am1700 },
{ time: “17h30 – 18h00”, label: “Jeux libres & Remise des cadeaux” },
],
});
}
cur.setDate(cur.getDate() + 1);
}
return days;
}
const PROGRAMME = buildProgramme();

// ── Micro components ─────────────────────────────────────
const Pill = ({ children, color }) => (
<span style={{ background: color + “25”, color, border: `2px solid ${color}55`, borderRadius: 30, padding: “2px 12px”, fontSize: 11, fontWeight: 900, display: “inline-block” }}>{children}</span>
);
const SunBtn = ({ children, onClick, color = C.ocean, disabled, small, full, style: s }) => (
<button onClick={disabled ? undefined : onClick} style={{
background: disabled ? “#e0e0e0” : `linear-gradient(135deg, ${color}, ${color}cc)`,
color: disabled ? “#aaa” : “#fff”, border: “none”, borderRadius: 50,
cursor: disabled ? “not-allowed” : “pointer”,
padding: small ? “9px 22px” : “14px 32px”,
fontSize: small ? 13 : 15, fontWeight: 900,
boxShadow: disabled ? “none” : `0 6px 18px ${color}55`,
fontFamily: “inherit”, transition: “all .18s”, width: full ? “100%” : “auto”, letterSpacing: 0.2, …s,
}}>{children}</button>
);
const Card = ({ children, style: s, onClick }) => (

  <div onClick={onClick} style={{ background: "#fff", borderRadius: 24, boxShadow: "0 6px 28px rgba(0,102,204,0.10)", padding: 20, cursor: onClick ? "pointer" : "default", ...s }}>{children}</div>
);
const FInput = ({ label, type = "text", value, onChange, placeholder, required }) => (
  <div style={{ marginBottom: 13 }}>
    {label && <label style={{ fontSize: 12, fontWeight: 900, color: C.deep, display: "block", marginBottom: 5, letterSpacing: 0.5, textTransform: "uppercase" }}>
      {label}{required && <span style={{ color: C.sunset }}> ✦</span>}
    </label>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", border: `2.5px solid ${C.sky}`, borderRadius: 14, padding: "11px 15px", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: C.dark, background: "#fafcff" }}
      onFocus={e => e.target.style.borderColor = C.ocean} onBlur={e => e.target.style.borderColor = C.sky} />
  </div>
);
const Wave = ({ fill = C.shell }) => (
  <div style={{ lineHeight: 0, overflow: "hidden" }}>
    <svg viewBox="0 0 1440 56" style={{ width: "100%", display: "block" }}>
      <path d="M0,28 C360,60 720,0 1080,30 C1260,45 1380,15 1440,28 L1440,56 L0,56 Z" fill={fill} />
    </svg>
  </div>
);
const BackBtn = ({ onNav, to }) => (
  <button onClick={() => typeof onNav === "function" && (to ? onNav(to) : onNav("home"))}
    style={{ background: "rgba(255,255,255,0.28)", border: "none", color: "#fff", borderRadius: 50, width: 38, height: 38, fontSize: 18, cursor: "pointer", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
);

// ── PAYPAL MODAL ──────────────────────────────────────────
function PayPalModal({ amount, label, onSuccess, onCancel }) {
const [step, setStep] = useState(“form”); // form | processing | success
const [email, setEmail] = useState(””);
const [password, setPassword] = useState(””);
const [error, setError] = useState(””);

const handlePay = () => {
if (!email || !password) { setError(“Merci de remplir tous les champs.”); return; }
if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) { setError(“Adresse email invalide.”); return; }
setError(””);
setStep(“processing”);
setTimeout(() => { setStep(“success”); }, 2200);
};

return (
<div style={{ position: “fixed”, inset: 0, zIndex: 1000, display: “flex”, flexDirection: “column”, alignItems: “center”, justifyContent: “flex-end” }}>
{/* Backdrop */}
<div onClick={step === “processing” ? undefined : onCancel} style={{ position: “absolute”, inset: 0, background: “rgba(0,20,60,0.6)”, backdropFilter: “blur(5px)” }} />

```
  {/* Sheet */}
  <div style={{ position: "relative", width: "100%", maxWidth: 430, background: "#fff", borderRadius: "28px 28px 0 0", boxShadow: "0 -12px 48px rgba(0,0,0,0.25)", overflow: "hidden" }}>

    {step === "processing" && (
      <div style={{ padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>⏳</div>
        <div style={{ fontWeight: 900, color: "#003087", fontSize: 18, marginBottom: 8 }}>Paiement en cours...</div>
        <div style={{ fontSize: 14, color: "#888" }}>Connexion sécurisée PayPal</div>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "#009CDE", animation: `pulse 1s ${i * 0.3}s infinite` }} />
          ))}
        </div>
      </div>
    )}

    {step === "success" && (
      <div style={{ padding: "40px 24px", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #00B09B, #6BCB77)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, margin: "0 auto 16px" }}>✓</div>
        <div style={{ fontWeight: 900, color: "#003087", fontSize: 20, marginBottom: 6 }}>Paiement confirmé !</div>
        <div style={{ fontSize: 14, color: "#888", marginBottom: 4 }}>PayPal · {amount} €</div>
        <div style={{ fontSize: 13, color: "#aaa", marginBottom: 28 }}>{label}</div>
        <button onClick={onSuccess} style={{ background: "linear-gradient(135deg, #009CDE, #003087)", color: "#fff", border: "none", borderRadius: 50, padding: "14px 40px", fontWeight: 900, fontSize: 16, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 20px #009CDE55" }}>
          Accéder à ma réservation →
        </button>
      </div>
    )}

    {step === "form" && (
      <>
        {/* PayPal header */}
        <div style={{ background: "linear-gradient(135deg, #003087, #009CDE)", padding: "20px 24px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 22, letterSpacing: -0.5 }}>Pay<span style={{ color: "#009CDE", background: "#fff", borderRadius: 4, padding: "0 3px", fontSize: 20 }}>Pal</span></div>
            <button onClick={onCancel} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontWeight: 900, fontSize: 16, fontFamily: "inherit" }}>✕</button>
          </div>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginBottom: 2 }}>Montant à payer</div>
              <div style={{ color: "#fff", fontWeight: 900, fontSize: 26 }}>{amount} €</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>FNCP · Club de Plage</div>
              <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, marginTop: 2 }}>{label}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 24px 28px" }}>
          <div style={{ fontSize: 14, color: "#555", fontWeight: 700, marginBottom: 16 }}>Connecte-toi à ton compte PayPal</div>

          {/* Email */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 900, color: "#003087", display: "block", marginBottom: 5, letterSpacing: 0.3, textTransform: "uppercase" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="prenom@exemple.fr"
              style={{ width: "100%", border: "2px solid #e0e8f0", borderRadius: 12, padding: "12px 14px", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#009CDE"}
              onBlur={e => e.target.style.borderColor = "#e0e8f0"} />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 900, color: "#003087", display: "block", marginBottom: 5, letterSpacing: 0.3, textTransform: "uppercase" }}>Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: "100%", border: "2px solid #e0e8f0", borderRadius: 12, padding: "12px 14px", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = "#009CDE"}
              onBlur={e => e.target.style.borderColor = "#e0e8f0"} />
          </div>

          {error && (
            <div style={{ background: "#fff0f0", border: "1.5px solid #ffaaaa", borderRadius: 10, padding: "9px 14px", fontSize: 13, color: "#cc0000", fontWeight: 700, marginBottom: 14 }}>⚠️ {error}</div>
          )}

          {/* Pay button */}
          <button onClick={handlePay} style={{ width: "100%", background: "linear-gradient(135deg, #003087, #009CDE)", color: "#fff", border: "none", borderRadius: 50, padding: "16px", fontWeight: 900, fontSize: 16, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 20px #009CDE44", marginBottom: 12 }}>
            🔒 Payer {amount} € avec PayPal
          </button>

          <div style={{ textAlign: "center", fontSize: 12, color: "#aaa" }}>
            🔒 Paiement 100% sécurisé · Données chiffrées SSL
          </div>
        </div>
      </>
    )}
  </div>

  <style>{`
    @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
  `}</style>
</div>
```

);
}

// ── PROGRAMME MODAL ───────────────────────────────────────
function ProgrammeModal({ onClose }) {
const today = new Date(); today.setHours(0,0,0,0);
const futureDays = PROGRAMME.filter(p => { const d = new Date(p.date); d.setHours(0,0,0,0); return d >= today; });
function getWeekKey(date) {
const d = new Date(date), day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6 : 1), mon = new Date(d);
mon.setDate(diff); return `${mon.getFullYear()}-${String(mon.getMonth()+1).padStart(2,"0")}-${String(mon.getDate()).padStart(2,"0")}`;
}
const weeksMap = {};
futureDays.forEach(p => { const k = getWeekKey(p.date); if (!weeksMap[k]) weeksMap[k] = []; weeksMap[k].push(p); });
const weeks = Object.keys(weeksMap).sort().map(k => weeksMap[k]);
const [weekIdx, setWeekIdx] = useState(0);
const [dayIdx, setDayIdx] = useState(0);
if (futureDays.length === 0) return (
<div style={{ position: “fixed”, inset: 0, zIndex: 999, display: “flex”, flexDirection: “column” }}>
<div onClick={onClose} style={{ position: “absolute”, inset: 0, background: “rgba(0,40,80,0.55)”, backdropFilter: “blur(4px)” }} />
<div style={{ position: “relative”, marginTop: “auto”, background: C.shell, borderRadius: “28px 28px 0 0”, padding: 32, textAlign: “center” }}>
<p style={{ color: “#888” }}>La saison est terminée. À l’été prochain !</p>
<button onClick={onClose} style={{ background: C.coral, color: “#fff”, border: “none”, borderRadius: 50, padding: “12px 28px”, fontWeight: 900, cursor: “pointer”, fontFamily: “inherit” }}>Fermer</button>
</div>
</div>
);
const currentWeek = weeks[Math.min(weekIdx, weeks.length-1)] || [];
const safeDay = Math.min(dayIdx, currentWeek.length-1);
const prog = currentWeek[safeDay];
const months = [“jan”,“fév”,“mar”,“avr”,“mai”,“jun”,“juil”,“août”];
const weekLabel = currentWeek.length > 0
? `${currentWeek[0].date.getDate()} ${months[currentWeek[0].date.getMonth()]} – ${currentWeek[currentWeek.length-1].date.getDate()} ${months[currentWeek[currentWeek.length-1].date.getMonth()]} 2026`
: “”;
return (
<div style={{ position: “fixed”, inset: 0, zIndex: 999, display: “flex”, flexDirection: “column” }}>
<div onClick={onClose} style={{ position: “absolute”, inset: 0, background: “rgba(0,40,80,0.55)”, backdropFilter: “blur(4px)” }} />
<div style={{ position: “relative”, marginTop: “auto”, background: C.shell, borderRadius: “28px 28px 0 0”, maxHeight: “88vh”, display: “flex”, flexDirection: “column”, boxShadow: “0 -12px 48px rgba(0,0,0,0.25)” }}>
<div style={{ display: “flex”, justifyContent: “center”, padding: “12px 0 4px” }}><div style={{ width: 40, height: 5, borderRadius: 10, background: “#ddd” }} /></div>
<div style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.sun})`, margin: “0 16px”, borderRadius: 20, padding: “14px 16px”, marginBottom: 12, position: “relative” }}>
<button onClick={onClose} style={{ position: “absolute”, top: 10, right: 10, background: “rgba(255,255,255,0.3)”, border: “none”, color: “#fff”, borderRadius: “50%”, width: 30, height: 30, cursor: “pointer”, fontWeight: 900, fontSize: 16 }}>✕</button>
<div style={{ fontSize: 28, marginBottom: 2 }}>🏖️</div>
<div style={{ fontWeight: 900, color: “#fff”, fontSize: 17 }}>Programme Club de Plage</div>
<div style={{ display: “flex”, alignItems: “center”, gap: 8, marginTop: 8 }}>
<button onClick={() => { setWeekIdx(Math.max(0,weekIdx-1)); setDayIdx(0); }} disabled={weekIdx===0}
style={{ background:“rgba(255,255,255,0.25)”,border:“none”,color:”#fff”,borderRadius:“50%”,width:28,height:28,fontWeight:900,cursor:weekIdx===0?“not-allowed”:“pointer”,opacity:weekIdx===0?0.4:1,fontFamily:“inherit” }}>‹</button>
<div style={{ flex:1, textAlign:“center”, color:“rgba(255,255,255,0.9)”, fontSize:12, fontWeight:700 }}>Semaine du {weekLabel}</div>
<button onClick={() => { setWeekIdx(Math.min(weeks.length-1,weekIdx+1)); setDayIdx(0); }} disabled={weekIdx>=weeks.length-1}
style={{ background:“rgba(255,255,255,0.25)”,border:“none”,color:”#fff”,borderRadius:“50%”,width:28,height:28,fontWeight:900,cursor:weekIdx>=weeks.length-1?“not-allowed”:“pointer”,opacity:weekIdx>=weeks.length-1?0.4:1,fontFamily:“inherit” }}>›</button>
</div>
</div>
<div style={{ display:“flex”,gap:6,overflowX:“auto”,padding:“0 16px 10px” }}>
{currentWeek.map((p,i) => (
<button key={i} onClick={() => setDayIdx(i)} style={{ background:safeDay===i?p.color:”#f0f0f0”, color:safeDay===i?”#fff”:”#888”, border:`2px solid ${p.date.toDateString()===new Date().toDateString()?p.color:"transparent"}`, borderRadius:14, padding:“7px 12px”, cursor:“pointer”, fontWeight:900, fontFamily:“inherit”, fontSize:11, whiteSpace:“nowrap”, transition:“all .15s” }}>
{p.emoji} {p.dateStr.split(” “).slice(0,2).join(” “)}
</button>
))}
</div>
{prog && (
<div style={{ overflowY:“auto”,padding:“0 16px 24px” }}>
<div style={{ background:prog.color+“15”,border:`2px solid ${prog.color}40`,borderRadius:20,padding:16 }}>
<div style={{ fontWeight:900,color:prog.color,fontSize:15,marginBottom:14 }}>{prog.emoji} {prog.dateStr}</div>
{(() => {
const morning = prog.activities.filter(a => {
const h = parseInt(a.time.split(“h”)[0]);
return h < 13;
});
const afternoon = prog.activities.filter(a => {
const h = parseInt(a.time.split(“h”)[0]);
return h >= 13;
});
return (
<>
{morning.length > 0 && (
<div style={{ marginBottom: 16 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 8, marginBottom: 10 }}>
<div style={{ height: 1.5, flex: 1, background: `${prog.color}40` }} />
<span style={{ fontSize: 11, fontWeight: 900, color: prog.color, letterSpacing: 1, textTransform: “uppercase”, whiteSpace: “nowrap” }}>☀️ Matin</span>
<div style={{ height: 1.5, flex: 1, background: `${prog.color}40` }} />
</div>
<div style={{ display:“flex”,flexDirection:“column”,gap:10 }}>
{morning.map((a,i) => (
<div key={i} style={{ display:“flex”,gap:12,alignItems:“flex-start” }}>
<div style={{ background:prog.color,color:”#fff”,borderRadius:10,padding:“4px 10px”,fontSize:11,fontWeight:900,whiteSpace:“nowrap”,flexShrink:0,marginTop:2 }}>{a.time}</div>
<div style={{ fontWeight:800,color:C.dark,fontSize:14 }}>{a.label}</div>
</div>
))}
</div>
</div>
)}
{afternoon.length > 0 && (
<div>
<div style={{ display: “flex”, alignItems: “center”, gap: 8, marginBottom: 10 }}>
<div style={{ height: 1.5, flex: 1, background: `${prog.color}40` }} />
<span style={{ fontSize: 11, fontWeight: 900, color: prog.color, letterSpacing: 1, textTransform: “uppercase”, whiteSpace: “nowrap” }}>🌊 Après-midi</span>
<div style={{ height: 1.5, flex: 1, background: `${prog.color}40` }} />
</div>
<div style={{ display:“flex”,flexDirection:“column”,gap:10 }}>
{afternoon.map((a,i) => (
<div key={i} style={{ display:“flex”,gap:12,alignItems:“flex-start” }}>
<div style={{ background:prog.color,color:”#fff”,borderRadius:10,padding:“4px 10px”,fontSize:11,fontWeight:900,whiteSpace:“nowrap”,flexShrink:0,marginTop:2 }}>{a.time}</div>
<div style={{ fontWeight:800,color:C.dark,fontSize:14 }}>{a.label}</div>
</div>
))}
</div>
</div>
)}
</>
);
})()}
</div>
<div style={{ marginTop:12,background:`${C.sky}25`,borderRadius:16,padding:“10px 14px”,fontSize:12,color:”#666” }}>
⚠️ Programme indicatif, susceptible d’être modifié selon météo · Encadrement par moniteurs diplômés
</div>
</div>
)}
</div>
</div>
);
}

// ── HOME ─────────────────────────────────────────────────
function HomeScreen({ onNav, user }) {
const [showProg, setShowProg] = useState(false);
return (
<div style={{ background: C.shell, minHeight: “100%” }}>
{showProg && <ProgrammeModal onClose={() => setShowProg(false)} />}
<div style={{ background: “linear-gradient(160deg, #0099FF 0%, #00C9FF 55%, #4ECDC4 100%)”, padding: “36px 22px 0”, textAlign: “center”, position: “relative”, overflow: “hidden” }}>
<div style={{ position: “relative”, zIndex: 2 }}>
<div style={{ display: “inline-block”, background: “rgba(255,255,255,0.22)”, backdropFilter: “blur(8px)”, borderRadius: 50, padding: “4px 20px”, marginBottom: 10, border: “2px solid rgba(255,255,255,0.4)” }}>
<span style={{ color: “#fff”, fontSize: 18, fontWeight: 900, letterSpacing: 4, textTransform: “uppercase” }}>FNCP</span>
</div>
<h1 style={{ color: “#fff”, fontSize: 29, margin: “6px 0 2px”, fontWeight: 900, textShadow: “0 3px 14px rgba(0,0,0,0.22)”, letterSpacing: -0.5 }}>Clubs de Plage</h1>
<p style={{ color: “rgba(255,255,255,0.9)”, fontSize: 14, margin: “0 0 6px”, fontWeight: 700 }}>
{user ? `Bonjour ${user.prenom} 👋 Prêt pour passer un été incroyable ? ☀️` : “Club de plage · Natation · Soleil pour tous !”}
</p>
</div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “6px 18px 24px” }}>
{!user && (
<Card style={{ marginBottom: 16, marginTop: 16, padding: “16px 16px”, background: “linear-gradient(135deg, #FFF3CD, #FFE8B0)”, border: `3px dashed ${C.sun}`, textAlign: “center” }}>
<h3 style={{ color: C.dark, margin: “0 0 6px”, fontSize: 18 }}>Nouveau au club ?</h3>
<p style={{ color: “#777”, fontSize: 13, margin: “0 0 14px” }}>Inscris-toi et plonge dans l’aventure !</p>
<SunBtn color={C.coral} onClick={() => onNav(“inscription”)}>📋 S’inscrire maintenant</SunBtn>
</Card>
)}
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 13, marginBottom: 13 }}>
{[
{ screen: “formules”,         emoji: “🎫”, label: “Formules”,              sub: “Club · Natation”,           bg: `linear-gradient(135deg, #00C9FF, ${C.ocean})`,    sh: C.ocean },
{ screen: “reservation”,      emoji: “🏊”, label: “Réserver”,              sub: “Créneaux 30 min”,            bg: `linear-gradient(135deg, ${C.sea}, #00B09B)`,      sh: C.sea   },
{ screen: “prestations”,      emoji: “🏖️”, label: “Club de Plage”,        sub: “Demi-journée matin / après-midi”, bg: `linear-gradient(135deg, ${C.coral}, ${C.sunset})`, sh: C.coral },
{ screen: “mes-reservations”, emoji: “📅”, label: “Mes séances”,           sub: “Historique & suivi”,         bg: `linear-gradient(135deg, ${C.green}, #27AE60)`,    sh: C.green },
].map(item => (
<div key={item.screen} onClick={() => onNav(item.screen)}
style={{ background: item.bg, borderRadius: 22, padding: “20px 14px”, cursor: “pointer”, boxShadow: `0 8px 22px ${item.sh}44`, transition: “transform .18s”, textAlign: “center” }}
onMouseEnter={e => e.currentTarget.style.transform = “translateY(-4px)”}
onMouseLeave={e => e.currentTarget.style.transform = “”}
>
<div style={{ fontSize: 38, marginBottom: 8 }}>{item.emoji}</div>
<div style={{ color: “#fff”, fontWeight: 900, fontSize: 13 }}>{item.label}</div>
<div style={{ color: “rgba(255,255,255,0.8)”, fontSize: 11, marginTop: 3 }}>{item.sub}</div>
</div>
))}
</div>
<Card onClick={() => onNav(“infos”)} style={{ textAlign: “center”, padding: 16, marginBottom: 13 }}>
<div style={{ fontSize: 32 }}>ℹ️</div>
<div style={{ fontWeight: 900, color: C.deep, fontSize: 13, marginTop: 6 }}>Infos Club</div>
<div style={{ fontSize: 11, color: “#aaa” }}>Horaires · Règlement · Contact</div>
</Card>
<div onClick={() => setShowProg(true)} style={{ background: `linear-gradient(135deg, ${C.sun}, ${C.coral})`, borderRadius: 20, padding: “13px 20px”, textAlign: “center”, boxShadow: `0 6px 20px ${C.sun}66`, cursor: “pointer” }}>
<span style={{ color: “#fff”, fontWeight: 900, fontSize: 14 }}>☀️ Été 2026 · Voir le programme d’activités</span>
</div>
</div>
</div>
);
}

// ── FORMULES CHOIX ────────────────────────────────────────
function FormulesChoixScreen({ onNav }) {
return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, #00C9FF, ${C.sea})`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 8 }}>
<BackBtn onNav={onNav} />
<div>
<h2 style={{ color: “#fff”, margin: 0, fontWeight: 900, fontSize: 22 }}>🎫 Formules</h2>
<p style={{ color: “rgba(255,255,255,0.8)”, fontSize: 12, margin: 0 }}>Choisir une activité</p>
</div>
</div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “20px 18px 24px”, display: “flex”, flexDirection: “column”, gap: 16 }}>
<div onClick={() => onNav(“formules-natation”)} style={{
background: `linear-gradient(135deg, ${C.ocean}, ${C.sea})`,
borderRadius: 24, padding: “28px 24px”, cursor: “pointer”,
boxShadow: `0 8px 28px ${C.ocean}44`, textAlign: “center”,
transition: “transform .18s”,
}}
onMouseEnter={e => e.currentTarget.style.transform = “translateY(-4px)”}
onMouseLeave={e => e.currentTarget.style.transform = “”}
>
<div style={{ fontSize: 52, marginBottom: 10 }}>🏊</div>
<div style={{ color: “#fff”, fontWeight: 900, fontSize: 20, marginBottom: 4 }}>Formules Natation</div>
<div style={{ color: “rgba(255,255,255,0.8)”, fontSize: 14 }}>1, 5, 6 ou 10 leçons</div>
<div style={{ display: “flex”, gap: 8, justifyContent: “center”, marginTop: 12 }}>
{[“20 €”, “95 €”, “113 €”, “170 €”].map(p => (
<div key={p} style={{ background: “rgba(255,255,255,0.2)”, borderRadius: 50, padding: “4px 12px”, color: “#fff”, fontSize: 12, fontWeight: 800 }}>{p}</div>
))}
</div>
</div>

```
    <div onClick={() => onNav("prestations")} style={{
      background: `linear-gradient(135deg, ${C.coral}, ${C.sun})`,
      borderRadius: 24, padding: "28px 24px", cursor: "pointer",
      boxShadow: `0 8px 28px ${C.coral}44`, textAlign: "center",
      transition: "transform .18s",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = ""}
    >
      <div style={{ fontSize: 52, marginBottom: 10 }}>🏖️</div>
      <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginBottom: 4 }}>Formules Club de Plage</div>
      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>Matin · Après-midi · Journée</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
        {["Formule Club", "Formule Liberté"].map(p => (
          <div key={p} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 50, padding: "4px 12px", color: "#fff", fontSize: 12, fontWeight: 800 }}>{p}</div>
        ))}
      </div>
    </div>
    <div onClick={() => onNav("formules-eveil")} style={{
      background: `linear-gradient(135deg, #9B59B6, #8E44AD)`,
      borderRadius: 24, padding: "28px 24px", cursor: "pointer",
      boxShadow: `0 8px 28px #9B59B644`, textAlign: "center",
      transition: "transform .18s",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = ""}
    >
      <div style={{ fontSize: 52, marginBottom: 10 }}>🌊</div>
      <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginBottom: 4 }}>Éveil Aquatique</div>
      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>Séances de 30 min · Chaque dimanche</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 50, padding: "4px 16px", color: "#fff", fontSize: 13, fontWeight: 900 }}>20 € / séance</div>
      </div>
    </div>
  </div>
</div>
```

);
}

// ── FORMULES ÉVEIL AQUATIQUE ──────────────────────────────
// Generate all Sundays between 6 July and 22 August 2026
function buildEveilSundays() {
const sundays = [];
const start = new Date(2026, 6, 6);  // 6 juillet (dimanche)
const end   = new Date(2026, 7, 22); // 22 août
const months = [“jan”,“fév”,“mar”,“avr”,“mai”,“jun”,“juil”,“août”];
const cur = new Date(start);
while (cur <= end) {
if (cur.getDay() === 0) {
const label = `Dimanche ${cur.getDate()} ${months[cur.getMonth()]}`;
sundays.push({
id: `dim-${cur.getDate()}-${cur.getMonth()}`,
label,
date: new Date(cur),
slots: [
{ id: `dim-${cur.getDate()}-${cur.getMonth()}-1`, time: “10h00 – 10h30”, spots: 4 },
{ id: `dim-${cur.getDate()}-${cur.getMonth()}-2`, time: “10h45 – 11h15”, spots: 4 },
{ id: `dim-${cur.getDate()}-${cur.getMonth()}-3`, time: “11h30 – 12h00”, spots: 4 },
],
});
}
cur.setDate(cur.getDate() + 1);
}
return sundays;
}

function FormulesEveilScreen({ onNav, user }) {
const [eveilSundays, setEveilSundays] = useState(() => buildEveilSundays());
const [selectedSunday, setSelectedSunday] = useState(0);
const [booking, setBooking] = useState(null);
const [done, setDone] = useState(null);
const [showPayPal, setShowPayPal] = useState(false);

// 🔒 Gate inscription
if (!user) return (
<div style={{ background: C.shell, minHeight: “100%”, display: “flex”, flexDirection: “column” }}>
<div style={{ background: `linear-gradient(135deg, #9B59B6, #8E44AD)`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 8 }}>
<BackBtn onNav={onNav} to="formules" />
<h2 style={{ color: “#fff”, margin: 0, fontWeight: 900, fontSize: 20 }}>🌊 Éveil Aquatique</h2>
</div>
<Wave fill={C.shell} />
</div>
<div style={{ flex: 1, display: “flex”, flexDirection: “column”, alignItems: “center”, justifyContent: “center”, padding: “32px 24px”, textAlign: “center” }}>
<div style={{ fontSize: 72, marginBottom: 16 }}>🔒</div>
<h2 style={{ color: C.dark, fontSize: 22, margin: “0 0 10px” }}>Inscription requise</h2>
<p style={{ color: “#777”, fontSize: 15, margin: “0 0 28px”, lineHeight: 1.6 }}>
Pour réserver une séance d’éveil aquatique, tu dois d’abord t’inscrire au Club de Plage FNCP.
</p>
<SunBtn color={C.coral} onClick={() => onNav(“inscription”)} style={{ marginBottom: 14 }}>📋 S’inscrire maintenant</SunBtn>
<button onClick={() => onNav(“home”)} style={{ background: “none”, border: “none”, color: “#aaa”, fontSize: 14, cursor: “pointer”, fontFamily: “inherit”, fontWeight: 700 }}>← Retour à l’accueil</button>
</div>
</div>
);

const handleBook = (sundayIdx, slotId) => {
setBooking({ sundayIdx, slotId });
};

const confirmBook = () => {
setShowPayPal(true);
};

const onPayPalSuccess = () => {
setShowPayPal(false);
setEveilSundays(prev => prev.map((sun, si) =>
si === booking.sundayIdx
? { …sun, slots: sun.slots.map(sl => sl.id === booking.slotId ? { …sl, spots: Math.max(0, sl.spots - 1) } : sl) }
: sun
));
const sun = eveilSundays[booking.sundayIdx];
const sl = sun.slots.find(s => s.id === booking.slotId);
setDone({ sunday: sun.label, slot: sl.time });
setBooking(null);
};

if (done) return (
<div style={{ padding: 32, textAlign: “center”, background: C.shell, minHeight: “100%” }}>
<div style={{ width: 90, height: 90, borderRadius: “50%”, background: “linear-gradient(135deg, #9B59B6, #8E44AD)”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 42, margin: “0 auto 20px” }}>✓</div>
<h2 style={{ color: “#9B59B6”, fontSize: 24, margin: “0 0 8px” }}>Réservation confirmée !</h2>
<p style={{ color: “#666”, fontSize: 15, lineHeight: 1.6 }}>
🌊 Éveil Aquatique<br />
<strong>{done.sunday}</strong><br />
🕐 {done.slot}
</p>
<p style={{ color: “#aaa”, fontSize: 13 }}>20 €</p>
<SunBtn color=”#9B59B6” onClick={() => { setDone(null); }}>Réserver un autre créneau</SunBtn>
<div style={{ marginTop: 14 }}>
<button onClick={() => onNav(“home”)} style={{ background: “none”, border: “none”, color: “#aaa”, fontSize: 14, cursor: “pointer”, fontFamily: “inherit” }}>← Retour à l’accueil</button>
</div>
</div>
);

if (booking !== null) {
const sun = eveilSundays[booking.sundayIdx];
const sl = sun.slots.find(s => s.id === booking.slotId);
return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, #9B59B6, #8E44AD)`, padding: “20px 20px 0”, textAlign: “center” }}>
<div style={{ display: “flex”, alignItems: “center”, marginBottom: 8 }}>
<BackBtn onNav={() => setBooking(null)} />
<div style={{ flex: 1, color: “rgba(255,255,255,0.9)”, fontSize: 13, fontWeight: 700 }}>🌊 Confirmer la réservation</div>
</div>
<div style={{ fontSize: 44, fontWeight: 900, color: “#fff”, margin: “8px 0 4px” }}>{sl.time}</div>
<div style={{ color: “#e8d0ff”, fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{sun.label} ☀️</div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “16px 18px 24px”, display: “flex”, flexDirection: “column”, gap: 14 }}>
<div style={{ background: “#fff”, borderRadius: 20, padding: 18, boxShadow: “0 4px 16px rgba(0,0,0,0.06)” }}>
<h3 style={{ color: C.dark, margin: “0 0 10px”, fontSize: 15 }}>👤 Parent / Responsable</h3>
<div style={{ display: “grid”, gridTemplateColumns: “auto 1fr”, gap: “6px 12px”, fontSize: 14 }}>
<span style={{ color: “#aaa” }}>Nom</span><strong>{user?.prenom} {user?.nom || “—”}</strong>
<span style={{ color: “#aaa” }}>Email</span><span>{user?.email || “—”}</span>
<span style={{ color: “#aaa” }}>Tél.</span><span>{user?.tel || “—”}</span>
</div>
</div>
<div style={{ background: “#F3E8FF”, border: “2px solid #9B59B640”, borderRadius: 16, padding: “14px 18px” }}>
<div style={{ fontWeight: 900, color: “#9B59B6”, marginBottom: 4 }}>💰 Tarif : 20 €</div>
<div style={{ fontSize: 13, color: “#777” }}>1 séance d’éveil aquatique · 30 min</div>
</div>
<SunBtn color="#9B59B6" full onClick={confirmBook}>🌊 Payer et confirmer · 20 €</SunBtn>
{showPayPal && (
<PayPalModal
amount={20}
label=“Éveil Aquatique · 1 séance”
onSuccess={onPayPalSuccess}
onCancel={() => setShowPayPal(false)}
/>
)}
</div>
</div>
);
}

const sun = eveilSundays[selectedSunday];
const spotColor = n => n === 0 ? C.sunset : n <= 1 ? C.coral : n <= 2 ? “#FF9500” : C.green;
const spotLabel = n => n === 0 ? “🔴 Complet” : n === 1 ? “🟡 1 place” : n === 2 ? “🟠 2 places” : n === 3 ? “🟢 3 places” : “🟢 4 places”;

return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, #9B59B6, #8E44AD)`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 12 }}>
<BackBtn onNav={onNav} to="formules" />
<div>
<h2 style={{ color: “#fff”, margin: 0, fontWeight: 900, fontSize: 20 }}>🌊 Éveil Aquatique</h2>
<p style={{ color: “rgba(255,255,255,0.8)”, fontSize: 12, margin: 0 }}>Dimanche matin · 30 min · 20 € · 4 places max</p>
</div>
</div>
{/* Sunday selector */}
<div style={{ display: “flex”, gap: 6, overflowX: “auto”, paddingBottom: 4 }}>
{eveilSundays.map((s, i) => {
const totalSpots = s.slots.reduce((acc, sl) => acc + sl.spots, 0);
return (
<button key={s.id} onClick={() => setSelectedSunday(i)} style={{
background: selectedSunday === i ? “#fff” : “rgba(255,255,255,0.25)”,
color: selectedSunday === i ? “#9B59B6” : “#fff”,
border: “none”, borderRadius: 16, padding: “8px 12px”,
cursor: “pointer”, fontWeight: 800, fontFamily: “inherit”,
minWidth: 68, textAlign: “center”, transition: “all .15s”,
boxShadow: selectedSunday === i ? “0 4px 14px rgba(0,0,0,0.15)” : “none”,
flexShrink: 0,
}}>
<div style={{ fontSize: 10 }}>Dim.</div>
<div style={{ fontSize: 16, fontWeight: 900 }}>{s.date.getDate()}</div>
<div style={{ fontSize: 9, marginTop: 1, color: selectedSunday === i ? (totalSpots > 0 ? “#6BCB77” : C.sunset) : “rgba(255,255,255,0.7)” }}>
{totalSpots > 0 ? `${totalSpots} pl.` : “Complet”}
</div>
</button>
);
})}
</div>
<Wave fill={C.shell} />
</div>

```
  <div style={{ padding: "12px 18px 24px" }}>
    {/* Info banner */}
    <div style={{ background: "#F3E8FF", border: "2px solid #9B59B640", borderRadius: 18, padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ fontSize: 28 }}>🌊</div>
      <div>
        <div style={{ fontWeight: 900, color: "#9B59B6", fontSize: 14 }}>{sun.label}</div>
        <div style={{ fontSize: 12, color: "#888" }}>Sous réserve d'avoir plusieurs enfants · 20 € / séance</div>
      </div>
    </div>

    {/* Slots */}
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {sun.slots.filter(sl => sl.spots > 0).map(sl => (
        <div key={sl.id} style={{
          background: "#fff",
          borderRadius: 18, padding: "14px 18px",
          boxShadow: "0 3px 12px rgba(155,89,182,0.10)",
          border: `2px solid ${sl.spots <= 1 ? C.coral+"50" : "#9B59B630"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg, #9B59B6, #8E44AD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🌊</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 17, color: C.dark }}>{sl.time}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: spotColor(sl.spots) }}>{spotLabel(sl.spots)}</div>
            </div>
          </div>
          <button onClick={() => handleBook(selectedSunday, sl.id)} style={{ background: "linear-gradient(135deg, #9B59B6, #8E44AD)", color: "#fff", border: "none", borderRadius: 50, padding: "9px 20px", fontWeight: 900, fontSize: 13, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px #9B59B644" }}>Réserver</button>
        </div>
      ))}
      {sun.slots.every(sl => sl.spots === 0) && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🔴</div>
          <div style={{ fontWeight: 900, color: C.sunset, fontSize: 16 }}>Tous les créneaux sont complets</div>
          <div style={{ fontSize: 13, color: "#aaa", marginTop: 6 }}>Essayez un autre dimanche</div>
        </div>
      )}
    </div>
  </div>
</div>
```

);
}

// ── FORMULES NATATION ─────────────────────────────────────
function FormulesNatationScreen({ onNav }) {
const [selected, setSelected] = useState(null);
const [done, setDone] = useState(false);
const [showPayPal, setShowPayPal] = useState(false);
if (done) return (
<div style={{ padding: 32, textAlign: “center”, background: C.shell, minHeight: “100%” }}>
<div style={{ fontSize: 90 }}>🎉</div>
<h2 style={{ color: C.green, fontSize: 24 }}>Super choix !</h2>
<p style={{ color: “#666” }}>Ta formule <strong>{selected?.label}</strong> ({selected?.price} €) est enregistrée.</p>
<SunBtn color={C.ocean} onClick={() => { setDone(false); setSelected(null); onNav(“home”); }}>Retour à l’accueil</SunBtn>
</div>
);
return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, ${C.ocean}, ${C.sea})`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 8 }}>
<BackBtn onNav={onNav} to="formules" />
<div><h2 style={{ color: “#fff”, margin: 0, fontWeight: 900, fontSize: 22 }}>🎫 Formules Natation</h2><p style={{ color: “rgba(255,255,255,0.8)”, fontSize: 12, margin: 0 }}>Choisis ta formule et plonge ! 🏊‍♀️</p></div>
</div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “10px 18px 24px” }}>
<div style={{ display: “flex”, flexDirection: “column”, gap: 13, marginBottom: 18 }}>
{FORMULES_NAT.map(f => {
const sel = selected?.id === f.id;
return (
<div key={f.id} onClick={() => setSelected(f)} style={{ background: sel ? `linear-gradient(135deg, ${f.color}18, ${f.color}08)` : “#fff”, border: `3px solid ${sel ? f.color : "#f0f0f0"}`, borderRadius: 22, padding: “16px 18px”, cursor: “pointer”, display: “flex”, alignItems: “center”, justifyContent: “space-between”, boxShadow: sel ? `0 8px 28px ${f.color}33` : “0 4px 14px rgba(0,0,0,0.06)”, transform: sel ? “scale(1.02)” : “scale(1)”, transition: “all .2s” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 14 }}>
<div style={{ width: 58, height: 58, borderRadius: 18, background: `linear-gradient(135deg, ${f.color}, ${f.color}aa)`, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 28, flexShrink: 0 }}>{f.emoji}</div>
<div>
<div style={{ display: “flex”, alignItems: “center”, gap: 8, marginBottom: 4, flexWrap: “wrap” }}>
<span style={{ fontWeight: 900, fontSize: 17, color: C.dark }}>{f.label}</span>
<Pill color={f.color}>{f.badge}</Pill>
</div>
<div style={{ fontSize: 22, fontWeight: 900, color: f.color }}>{f.price} €</div>
{f.saving && <div style={{ fontSize: 12, color: C.green, fontWeight: 800 }}>🎁 {f.saving}</div>}
<div style={{ fontSize: 11, color: “#bbb”, marginTop: 1 }}>soit {(f.price / f.qty).toFixed(1)} €/leçon</div>
</div>
</div>
<div style={{ width: 26, height: 26, borderRadius: “50%”, border: `3px solid ${sel ? f.color : "#ddd"}`, background: sel ? f.color : “transparent”, display: “flex”, alignItems: “center”, justifyContent: “center”, color: “#fff”, fontWeight: 900, fontSize: 13, transition: “all .2s”, flexShrink: 0 }}>{sel ? “✓” : “”}</div>
</div>
);
})}
</div>
{selected && (
<Card style={{ background: `linear-gradient(135deg, ${selected.color}15, ${selected.color}05)`, border: `2px solid ${selected.color}40`, textAlign: “center” }}>
<div style={{ fontSize: 30, marginBottom: 6 }}>{selected.emoji}</div>
<div style={{ fontWeight: 900, color: C.dark, marginBottom: 2 }}>Formule : {selected.label}</div>
<div style={{ fontSize: 26, fontWeight: 900, color: selected.color, marginBottom: 16 }}>{selected.price} €</div>
<SunBtn color={selected.color} full onClick={() => setShowPayPal(true)}>🔒 Payer et commander · {selected?.price} €</SunBtn>
{showPayPal && (
<PayPalModal
amount={selected?.price}
label={`Formule Natation · ${selected?.label}`}
onSuccess={() => { setShowPayPal(false); setDone(true); }}
onCancel={() => setShowPayPal(false)}
/>
)}
</Card>
)}
</div>
</div>
);
}

// ── CLUB DE PLAGE – TARIFS ────────────────────────────────
function TarifTable({ tarif, enfants }) {
const row = tarif.rows[0]; // just show selected enfants count
return null;
}

function PrestationsScreen({ onNav }) {
const [tab, setTab] = useState(“club”);
const [formulType, setFormulType] = useState(“matin”);
const [nbEnfants, setNbEnfants] = useState(1);
const [selectedRow, setSelectedRow] = useState(null);
const [done, setDone] = useState(false);
const [showPayPal, setShowPayPal] = useState(false);
const [selectedLiberte, setSelectedLiberte] = useState(null);

const tarifData = formulType === “matin” ? TARIFS_MATIN : formulType === “apmidi” ? TARIFS_APMIDI : TARIFS_JOURNEE;

const priceForRow = (row) => {
if (nbEnfants === 1) return row.e1;
if (nbEnfants === 2) return row.e2;
if (nbEnfants === 3) return row.e3;
return row.e3 + (nbEnfants - 3) * row.sup;
};

if (done) return (
<div style={{ padding: 32, textAlign: “center”, background: C.shell, minHeight: “100%” }}>
<div style={{ fontSize: 80 }}>🏖️</div>
<h2 style={{ color: C.green }}>À la plage ! 🎉</h2>
<p style={{ color: “#666”, fontSize: 14 }}>Ta réservation est enregistrée.</p>
<SunBtn color={C.ocean} onClick={() => { setDone(false); setSelectedRow(null); setSelectedLiberte(null); onNav(“home”); }}>Retour à l’accueil</SunBtn>
</div>
);

return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.sun})`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 8 }}>
<BackBtn onNav={onNav} />
<div><h2 style={{ color: “#fff”, margin: 0, fontWeight: 900 }}>🏖️ Club de Plage</h2><p style={{ color: “rgba(255,255,255,0.85)”, margin: 0, fontSize: 12 }}>Réserve ta demi-journée de plage !</p></div>
</div>
{/* Tab selector */}
<div style={{ display: “flex”, gap: 8, marginBottom: 16 }}>
{[[“club”, “🏖️ Formule Club”], [“liberte”, “🎟️ Formule Liberté”]].map(([k, l]) => (
<button key={k} onClick={() => setTab(k)} style={{ flex: 1, background: tab === k ? “#fff” : “rgba(255,255,255,0.25)”, color: tab === k ? C.coral : “#fff”, border: “none”, borderRadius: 14, padding: “9px 8px”, cursor: “pointer”, fontWeight: 900, fontSize: 12, fontFamily: “inherit”, transition: “all .15s” }}>{l}</button>
))}
</div>
<Wave fill={C.shell} />
</div>

```
  <div style={{ padding: "10px 18px 24px" }}>

    {tab === "club" && (
      <>
        {/* Session type */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 800, color: C.dark, fontSize: 13, marginBottom: 8 }}>Type de session</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["matin", "☀️ Matin", C.coral], ["apmidi", "🌊 Après-midi", C.ocean], ["journee", "🌞 Journée", C.green]].map(([k, l, col]) => (
              <button key={k} onClick={() => { setFormulType(k); setSelectedRow(null); }} style={{
                flex: 1, background: formulType === k ? col : "#f0f0f0",
                color: formulType === k ? "#fff" : "#888",
                border: "none", borderRadius: 14, padding: "10px 6px",
                cursor: "pointer", fontWeight: 900, fontSize: 11, fontFamily: "inherit", transition: "all .15s",
                boxShadow: formulType === k ? `0 4px 14px ${col}44` : "none",
              }}>{l}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 6, textAlign: "center" }}>🕐 {tarifData.horaires}</div>
        </div>

        {/* Nb enfants */}
        <Card style={{ marginBottom: 14, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 800, color: C.dark, fontSize: 14 }}>👧 Nombre d'enfants</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => { setNbEnfants(Math.max(1, nbEnfants-1)); setSelectedRow(null); }} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: C.coral, color: "#fff", fontWeight: 900, fontSize: 18, cursor: "pointer" }}>−</button>
              <span style={{ fontWeight: 900, fontSize: 20, color: C.dark, minWidth: 24, textAlign: "center" }}>{nbEnfants}</span>
              <button onClick={() => { setNbEnfants(nbEnfants+1); setSelectedRow(null); }} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: C.coral, color: "#fff", fontWeight: 900, fontSize: 18, cursor: "pointer" }}>+</button>
            </div>
          </div>
          {nbEnfants > 3 && <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>3 enfants + {nbEnfants-3} enfant(s) supplémentaire(s)</div>}
        </Card>

        {/* Tarif rows */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 800, color: C.dark, fontSize: 13, marginBottom: 8 }}>Choisir une durée</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tarifData.rows.map((row, i) => {
              const price = priceForRow(row);
              const sel = selectedRow?.label === row.label;
              // savings vs daily rate
              const dailyRate = priceForRow(tarifData.rows[0]);
              const savings = i > 0 ? Math.round((dailyRate * (i === 1 ? 5 : i === 2 ? 10 : i === 3 ? 15 : 20)) - price) : 0;
              return (
                <div key={row.label} onClick={() => setSelectedRow({ ...row, price })} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: sel ? `linear-gradient(135deg, ${tarifData.color}18, ${tarifData.color}06)` : "#fff",
                  border: `2.5px solid ${sel ? tarifData.color : "#f0f0f0"}`,
                  borderRadius: 18, padding: "13px 16px", cursor: "pointer",
                  boxShadow: sel ? `0 6px 20px ${tarifData.color}33` : "0 2px 10px rgba(0,0,0,0.05)",
                  transform: sel ? "scale(1.01)" : "scale(1)", transition: "all .18s",
                }}>
                  <div>
                    <div style={{ fontWeight: 800, color: C.dark, fontSize: 14 }}>{row.label}</div>
                    {savings > 0 && <div style={{ fontSize: 11, color: C.green, fontWeight: 800 }}>🎁 -{savings}€ d'économie</div>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontWeight: 900, fontSize: 20, color: tarifData.color }}>{price} €</div>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2.5px solid ${sel ? tarifData.color : "#ddd"}`, background: sel ? tarifData.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 900 }}>{sel ? "✓" : ""}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedRow && (
          <Card style={{ background: `linear-gradient(135deg, ${tarifData.color}15, ${tarifData.color}05)`, border: `2px solid ${tarifData.color}40`, textAlign: "center" }}>
            <div style={{ fontWeight: 900, color: C.dark, marginBottom: 2 }}>{tarifData.emoji} {tarifData.label} · {selectedRow.label}</div>
            <div style={{ fontWeight: 900, color: C.dark, fontSize: 13, marginBottom: 4 }}>👧 {nbEnfants} enfant{nbEnfants > 1 ? "s" : ""}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: tarifData.color, marginBottom: 16 }}>{selectedRow.price} €</div>
            <SunBtn color={tarifData.color} full onClick={() => setDone(true)}>Confirmer la réservation ✓</SunBtn>
          </Card>
        )}
      </>
    )}

    {tab === "liberte" && (
      <>
        <Card style={{ background: `linear-gradient(135deg, ${C.sand}50, #fff8dc)`, border: `2px solid ${C.sun}`, marginBottom: 16 }}>
          <div style={{ fontWeight: 900, color: C.dark, marginBottom: 4 }}>🎟️ Formule Liberté</div>
          <div style={{ fontSize: 13, color: "#666" }}>Utilisable matin ou après-midi selon vos disponibilités. Valable toute la saison 2026.</div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {TARIFS_LIBERTE.map((t, i) => {
            const sel = selectedLiberte?.label === t.label;
            const pricePerDj = Math.round(t.price / parseInt(t.label));
            return (
              <div key={t.label} onClick={() => setSelectedLiberte(t)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: sel ? `${C.sun}20` : "#fff",
                border: `2.5px solid ${sel ? C.sun : "#f0f0f0"}`,
                borderRadius: 18, padding: "13px 16px", cursor: "pointer",
                boxShadow: sel ? `0 6px 20px ${C.sun}44` : "0 2px 10px rgba(0,0,0,0.05)",
                transform: sel ? "scale(1.01)" : "scale(1)", transition: "all .18s",
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: C.dark, fontSize: 14 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: C.green, fontWeight: 700 }}>soit {pricePerDj} €/demi-journée</div>
                  {i > 0 && <div style={{ fontSize: 11, color: C.green, fontWeight: 800 }}>🎁 Économie vs tarif unitaire</div>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontWeight: 900, fontSize: 20, color: C.coral }}>{t.price} €</div>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2.5px solid ${sel ? C.sun : "#ddd"}`, background: sel ? C.sun : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 900 }}>{sel ? "✓" : ""}</div>
                </div>
              </div>
            );
          })}
        </div>
        {selectedLiberte && (
          <Card style={{ background: `${C.sun}15`, border: `2px solid ${C.sun}40`, textAlign: "center" }}>
            <div style={{ fontWeight: 900, color: C.dark, marginBottom: 2 }}>🎟️ {selectedLiberte.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.coral, marginBottom: 16 }}>{selectedLiberte.price} €</div>
            <SunBtn color={C.coral} full onClick={() => setDone(true)}>Confirmer la réservation ✓</SunBtn>
          </Card>
        )}
      </>
    )}
  </div>
</div>
```

);
}

// ── RESERVATION ───────────────────────────────────────────
function ReservationScreen({ onNav, user, sessions, setSessions, reservations, setReservations }) {
const [selectedDay, setSelectedDay] = useState(“lun7”);
const [booking, setBooking] = useState(null);
const [selectedEnfants, setSelectedEnfants] = useState([]);
const [done, setDone] = useState(null);
const [showPayPal, setShowPayPal] = useState(false);

const allForDay = sessions.filter(s => s.day === selectedDay);
const morning = allForDay.filter(s => { const [h] = s.time.split(”:”).map(Number); return h < 13; });
const afternoon = allForDay.filter(s => { const [h] = s.time.split(”:”).map(Number); return h >= 13; });

const handleConfirm = () => setShowPayPal(true);
const onPayPalSuccess = () => {
setShowPayPal(false);
setSessions(prev => prev.map(s => s.id === booking.id ? { …s, spots: Math.max(0, s.spots-1) } : s));
const resa = { …booking, parent: user?.prenom || “Invité”, enfants: selectedEnfants, id: Date.now() };
setReservations(prev => […prev, resa]);
setDone(resa); setBooking(null); setSelectedEnfants([]);
};

// 🔒 Gate : inscription obligatoire
if (!user) return (
<div style={{ background: C.shell, minHeight: “100%”, display: “flex”, flexDirection: “column” }}>
<div style={{ background: `linear-gradient(135deg, #00C9FF, ${C.sea})`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 8 }}>
<BackBtn onNav={onNav} />
<h2 style={{ color: “#fff”, margin: 0, fontWeight: 900, fontSize: 20 }}>🏊 Réservations Natation</h2>
</div>
<Wave fill={C.shell} />
</div>
<div style={{ flex: 1, display: “flex”, flexDirection: “column”, alignItems: “center”, justifyContent: “center”, padding: “32px 24px”, textAlign: “center” }}>
<div style={{ fontSize: 72, marginBottom: 16 }}>🔒</div>
<h2 style={{ color: C.dark, fontSize: 22, margin: “0 0 10px” }}>Inscription requise</h2>
<p style={{ color: “#777”, fontSize: 15, margin: “0 0 28px”, lineHeight: 1.6 }}>
Pour réserver un créneau de natation, tu dois d’abord t’inscrire au Club de Plage FNCP.
</p>
<SunBtn color={C.coral} onClick={() => onNav(“inscription”)} style={{ marginBottom: 14 }}>
📋 S’inscrire maintenant
</SunBtn>
<button onClick={() => onNav(“home”)} style={{ background: “none”, border: “none”, color: “#aaa”, fontSize: 14, cursor: “pointer”, fontFamily: “inherit”, fontWeight: 700 }}>
← Retour à l’accueil
</button>
</div>
</div>
);
if (done) return (
<div style={{ padding: 32, textAlign: “center”, background: C.shell, minHeight: “100%” }}>
<div style={{ fontSize: 90 }}>🎊</div>
<h2 style={{ color: C.green, fontSize: 24 }}>C’est réservé !</h2>
<Card style={{ margin: “16px 0”, textAlign: “left” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12 }}>
<div style={{ fontSize: 44 }}>🏊</div>
<div>
<div style={{ fontWeight: 900, fontSize: 24, color: C.ocean }}>{done.time}</div>
<div style={{ color: “#666” }}>{DAYS.find(d => d.id === done.day)?.label} {DAYS.find(d => d.id === done.day)?.num} Juillet</div>
{done.enfants?.length > 0 && <div style={{ marginTop: 6, display: “flex”, gap: 4, flexWrap: “wrap” }}>{done.enfants.map(e => <Pill key={e} color={C.sea}>{e}</Pill>)}</div>}
</div>
</div>
</Card>
<SunBtn color={C.ocean} onClick={() => { setDone(null); onNav(“home”); }}>🏠 Retour à l’accueil</SunBtn>
</div>
);
if (booking) return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, #00C9FF, ${C.sea})`, padding: “20px 20px 0”, textAlign: “center” }}>
<div style={{ display: “flex”, alignItems: “center”, marginBottom: 6 }}><BackBtn onNav={() => setBooking(null)} /><div style={{ flex: 1, color: “rgba(255,255,255,0.9)”, fontSize: 13, fontWeight: 700 }}>🏊 Réserver la séance</div></div>
<div style={{ fontSize: 56, fontWeight: 900, color: “#fff”, letterSpacing: -2 }}>{booking.time}</div>
<div style={{ color: C.sun, fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{DAYS.find(d => d.id === booking.day)?.label} {DAYS.find(d => d.id === booking.day)?.num} Juillet 2026 ☀️</div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “10px 18px 24px”, display: “flex”, flexDirection: “column”, gap: 14 }}>
<Card>
<h3 style={{ color: C.dark, margin: “0 0 10px”, fontSize: 15 }}>👤 Parent / Responsable</h3>
<div style={{ display: “grid”, gridTemplateColumns: “auto 1fr”, gap: “6px 12px”, fontSize: 14 }}>
<span style={{ color: “#aaa” }}>Nom</span><strong>{user?.prenom} {user?.nom || “—”}</strong>
<span style={{ color: “#aaa” }}>Email</span><span>{user?.email || “—”}</span>
<span style={{ color: “#aaa” }}>Tél.</span><span>{user?.tel || “—”}</span>
</div>
</Card>
{user?.enfants?.length > 0 && (
<Card>
<h3 style={{ color: C.dark, margin: “0 0 12px”, fontSize: 15 }}>🧒 Enfants participants</h3>
<div style={{ display: “flex”, flexWrap: “wrap”, gap: 10 }}>
{user.enfants.map(e => {
const sel = selectedEnfants.includes(e.prenom);
return (
<div key={e.id} onClick={() => setSelectedEnfants(s => sel ? s.filter(x => x !== e.prenom) : […s, e.prenom])} style={{ display: “flex”, alignItems: “center”, gap: 8, background: sel ? `${C.sea}30` : “#f5f5f5”, border: `2.5px solid ${sel ? C.sea : "#e0e0e0"}`, borderRadius: 50, padding: “8px 16px”, cursor: “pointer”, fontWeight: 700, color: sel ? C.deep : “#888” }}>
<span>{sel ? “✓” : “○”}</span><span>{e.prenom}</span>
</div>
);
})}
</div>
</Card>
)}
<SunBtn color={C.green} full onClick={handleConfirm}>🏊 Payer et confirmer · 20 €</SunBtn>
{showPayPal && (
<PayPalModal
amount={20}
label={`Natation · ${booking?.time}`}
onSuccess={onPayPalSuccess}
onCancel={() => setShowPayPal(false)}
/>
)}
</div>
</div>
);
const SlotRow = ({ s }) => (
<div style={{ display: “flex”, alignItems: “center”, justifyContent: “space-between”, background: “#fff”, borderRadius: 18, padding: “12px 16px”, boxShadow: “0 3px 12px rgba(0,102,204,0.08)”, border: `2px solid ${s.spots === 1 ? C.coral+"60" : C.sea+"40"}` }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12 }}>
<div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${C.ocean}, ${C.sea})`, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 20 }}>🏊</div>
<div>
<div style={{ fontWeight: 900, fontSize: 18, color: C.dark }}>{s.time}</div>
<div style={{ fontSize: 12, fontWeight: 700, color: s.spots === 1 ? C.coral : C.green }}>{s.spots === 1 ? “🟡 1 place restante” : “🟢 2 places dispo”}</div>
</div>
</div>
<SunBtn small color={s.spots === 1 ? C.coral : C.ocean} onClick={() => setBooking(s)}>Réserver</SunBtn>
</div>
);
return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, #00C9FF, ${C.sea})`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 12 }}>
<BackBtn onNav={onNav} />
<div><h2 style={{ color: “#fff”, margin: 0, fontWeight: 900, fontSize: 20 }}>🏊 Réservations Natation</h2><p style={{ color: “rgba(255,255,255,0.8)”, margin: 0, fontSize: 12 }}>Créneaux 30 min · 2 places max · Juillet 2026</p></div>
</div>
<div style={{ display: “flex”, gap: 6, overflowX: “auto”, paddingBottom: 4 }}>
{DAYS.map(d => {
const avail = sessions.filter(s => s.day === d.id && s.spots > 0).length;
return (
<button key={d.id} onClick={() => setSelectedDay(d.id)} style={{ background: selectedDay === d.id ? “#fff” : “rgba(255,255,255,0.25)”, color: selectedDay === d.id ? C.ocean : “#fff”, border: “none”, borderRadius: 16, padding: “10px 12px”, cursor: “pointer”, fontWeight: 800, fontFamily: “inherit”, minWidth: 52, textAlign: “center”, transition: “all .15s” }}>
<div style={{ fontSize: 10 }}>{d.label}</div>
<div style={{ fontSize: 18, fontWeight: 900 }}>{d.num}</div>
<div style={{ fontSize: 9, color: selectedDay === d.id ? C.green : “rgba(255,255,255,0.7)” }}>{avail}</div>
</button>
);
})}
</div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “10px 18px 24px” }}>
{morning.filter(s => s.spots > 0).length > 0 && (
<div style={{ marginBottom: 20 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 10, marginBottom: 12 }}>
<div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${C.sun}, transparent)` }} />
<span style={{ fontWeight: 900, color: C.coral, fontSize: 13, whiteSpace: “nowrap” }}>☀️ Matin · 9h00 – 12h30</span>
<div style={{ height: 2, flex: 1, background: `linear-gradient(270deg, ${C.sun}, transparent)` }} />
</div>
<div style={{ display: “flex”, flexDirection: “column”, gap: 8 }}>{morning.filter(s => s.spots > 0).map(s => <SlotRow key={s.id} s={s} />)}</div>
</div>
)}
{afternoon.filter(s => s.spots > 0).length > 0 && (
<div>
<div style={{ display: “flex”, alignItems: “center”, gap: 10, marginBottom: 12 }}>
<div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${C.ocean}, transparent)` }} />
<span style={{ fontWeight: 900, color: C.ocean, fontSize: 13, whiteSpace: “nowrap” }}>🌊 Après-midi · 13h30 – 19h00</span>
<div style={{ height: 2, flex: 1, background: `linear-gradient(270deg, ${C.ocean}, transparent)` }} />
</div>
<div style={{ display: “flex”, flexDirection: “column”, gap: 8 }}>{afternoon.filter(s => s.spots > 0).map(s => <SlotRow key={s.id} s={s} />)}</div>
</div>
)}
{allForDay.filter(s => s.spots > 0).length === 0 && (
<Card style={{ textAlign: “center”, padding: 32 }}>
<div style={{ fontSize: 50, marginBottom: 8 }}>🔴</div>
<p style={{ color: C.sunset, fontWeight: 800 }}>Tous les créneaux sont complets</p>
<p style={{ color: “#aaa”, fontSize: 13 }}>Essayez un autre jour</p>
</Card>
)}
</div>
</div>
);
}

// ── MES RÉSERVATIONS ─────────────────────────────────────
function MesReservationsScreen({ onNav, reservations }) {
return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, ${C.green}, #27AE60)`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 8 }}><BackBtn onNav={onNav} /><h2 style={{ color: “#fff”, margin: 0, fontWeight: 900 }}>📅 Mes séances</h2></div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “10px 18px 24px” }}>
{reservations.length === 0 ? (
<Card style={{ textAlign: “center”, padding: 40 }}>
<div style={{ fontSize: 60, marginBottom: 10 }}>🌊</div>
<h3 style={{ color: C.dark }}>Aucune séance pour l’instant</h3>
<p style={{ color: “#888”, fontSize: 14 }}>Plonge et réserve ta première séance !</p>
<SunBtn color={C.ocean} onClick={() => onNav(“reservation”)}>🏊 Réserver maintenant</SunBtn>
</Card>
) : reservations.map(r => (
<Card key={r.id} style={{ marginBottom: 14 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start”, marginBottom: 10 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12 }}>
<div style={{ width: 46, height: 46, borderRadius: 14, background: `linear-gradient(135deg, ${C.ocean}, ${C.sea})`, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 22 }}>🏊</div>
<div>
<div style={{ fontWeight: 900, fontSize: 22, color: C.ocean }}>{r.time}</div>
<div style={{ fontSize: 13, color: “#999” }}>{DAYS.find(d => d.id === r.day)?.label} {DAYS.find(d => d.id === r.day)?.num} Juillet · 30 min</div>
</div>
</div>
<Pill color={C.green}>✓ Confirmé</Pill>
</div>
{r.enfants?.length > 0 && <div style={{ display: “flex”, gap: 6, flexWrap: “wrap” }}>{r.enfants.map(e => <Pill key={e} color={C.sea}>{e}</Pill>)}</div>}
</Card>
))}
</div>
</div>
);
}

// ── INSCRIPTION ───────────────────────────────────────────
function InscriptionScreen({ onNav, setUser }) {
const [step, setStep] = useState(1);
const [form, setForm] = useState({ prenom: “”, nom: “”, email: “”, tel: “”, tel2: “”, adresse: “”, ville: “”, cp: “”, enfants: [], droitImage: false, droitDiffusion: false });
const [newEnfant, setNewEnfant] = useState({ prenom: “”, nom: “”, naissance: “”, activite: “club”, niveau: “debutant”, allergies: “” });
const [done, setDone] = useState(false);
const [step1Error, setStep1Error] = useState(false);
const f = k => v => setForm(p => ({ …p, [k]: v }));

const emailValid = /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(form.email);
const cpValid = /^\d{5}$/.test(form.cp);
const step1Valid = form.prenom && form.nom && form.email && emailValid && form.tel && form.adresse && form.ville && form.cp && cpValid;

const goToStep2 = () => {
if (!step1Valid) { setStep1Error(true); return; }
setStep1Error(false); setStep(2);
};

if (done) return (
<div style={{ minHeight: “100%”, background: `linear-gradient(160deg, #0099FF 0%, #00C9FF 45%, ${C.sea} 100%)`, display: “flex”, flexDirection: “column”, alignItems: “center”, justifyContent: “center”, padding: “40px 28px”, textAlign: “center”, position: “relative”, overflow: “hidden” }}>
<div style={{ position: “absolute”, width: 300, height: 300, borderRadius: “50%”, background: “rgba(255,255,255,0.07)”, top: -80, right: -80 }} />
<div style={{ position: “absolute”, width: 200, height: 200, borderRadius: “50%”, background: “rgba(255,255,255,0.07)”, bottom: -40, left: -60 }} />
<div style={{ position: “relative”, zIndex: 2 }}>
<div style={{ width: 100, height: 100, borderRadius: “50%”, background: “rgba(255,255,255,0.2)”, border: “3px solid rgba(255,255,255,0.5)”, display: “flex”, alignItems: “center”, justifyContent: “center”, margin: “0 auto 24px”, fontSize: 46 }}>✓</div>
<div style={{ display: “inline-block”, background: “rgba(255,255,255,0.2)”, borderRadius: 50, padding: “4px 18px”, marginBottom: 16, border: “1.5px solid rgba(255,255,255,0.4)” }}>
<span style={{ color: “#fff”, fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: “uppercase” }}>Inscription confirmée</span>
</div>
<h1 style={{ color: “#fff”, fontSize: 32, fontWeight: 900, margin: “0 0 8px” }}>Bienvenue {form.prenom} !</h1>
<p style={{ color: “rgba(255,255,255,0.85)”, fontSize: 16, margin: “0 0 32px”, fontWeight: 600 }}>Tu fais maintenant partie de la famille FNCP 🌊</p>
<div style={{ display: “flex”, gap: 10, justifyContent: “center”, flexWrap: “wrap”, marginBottom: 32 }}>
<div style={{ background: “rgba(255,255,255,0.22)”, borderRadius: 50, padding: “8px 18px”, color: “#fff”, fontWeight: 800, fontSize: 13 }}>👧 {form.enfants.length} enfant{form.enfants.length > 1 ? “s” : “”}</div>
{form.droitImage && <div style={{ background: “rgba(255,255,255,0.22)”, borderRadius: 50, padding: “8px 18px”, color: “#fff”, fontWeight: 800, fontSize: 13 }}>📸 Droit image ✓</div>}
<div style={{ background: “rgba(255,255,255,0.22)”, borderRadius: 50, padding: “8px 18px”, color: “#fff”, fontWeight: 800, fontSize: 13 }}>☀️ Été 2026</div>
</div>
<button onClick={() => onNav(“home”)} style={{ background: “#fff”, color: C.ocean, border: “none”, borderRadius: 50, padding: “16px 40px”, fontSize: 16, fontWeight: 900, cursor: “pointer”, boxShadow: “0 8px 28px rgba(0,0,0,0.18)”, fontFamily: “inherit” }}>C’est parti ! 🏊</button>
</div>
</div>
);

return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.sun})`, padding: “20px 20px 0” }}>
<button onClick={() => onNav(“home”)} style={{ background: “rgba(255,255,255,0.28)”, border: “none”, color: “#fff”, borderRadius: 50, width: 38, height: 38, fontSize: 18, cursor: “pointer”, fontWeight: 900 }}>←</button>
<div style={{ textAlign: “center”, padding: “6px 0 0” }}>
<div style={{ fontSize: 38 }}>📋</div>
<h2 style={{ color: “#fff”, margin: “4px 0”, fontWeight: 900 }}>Inscription</h2>
<div style={{ display: “flex”, gap: 6, justifyContent: “center”, marginBottom: 14 }}>
{[1,2,3,4].map(i => <div key={i} style={{ height: 6, flex: 1, maxWidth: 65, borderRadius: 10, background: i <= step ? “#fff” : “rgba(255,255,255,0.33)”, transition: “all .3s” }} />)}
</div>
</div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “10px 18px 24px” }}>
{step === 1 && (
<Card>
<h3 style={{ color: C.dark, marginTop: 0 }}>👤 Parent / Responsable</h3>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: “0 12px” }}>
<FInput label=“Prénom” value={form.prenom} onChange={f(“prenom”)} required />
<FInput label=“Nom” value={form.nom} onChange={f(“nom”)} required />
</div>
<FInput label=“Email” type=“email” value={form.email} onChange={f(“email”)} required />
{form.email && !emailValid && <div style={{ fontSize: 12, color: C.sunset, fontWeight: 700, marginTop: -10, marginBottom: 12 }}>⚠️ Format invalide — ex : prenom@exemple.fr</div>}
<FInput label=“Téléphone” type=“tel” value={form.tel} onChange={f(“tel”)} required />
<FInput label=“Téléphone 2” type=“tel” value={form.tel2} onChange={f(“tel2”)} placeholder=“Autre numéro (optionnel)” />
<FInput label=“Adresse” value={form.adresse} onChange={f(“adresse”)} required placeholder=“Ex : 4 allée des Roitelets” />
{step1Error && !form.adresse && <div style={{ fontSize: 12, color: C.sunset, fontWeight: 700, marginTop: -10, marginBottom: 12 }}>⚠️ L’adresse est obligatoire</div>}
<div style={{ display: “grid”, gridTemplateColumns: “2fr 1fr”, gap: “0 12px” }}>
<div>
<FInput label=“Ville” value={form.ville} onChange={f(“ville”)} required placeholder=“Ex : La Baule” />
{step1Error && !form.ville && <div style={{ fontSize: 12, color: C.sunset, fontWeight: 700, marginTop: -10, marginBottom: 12 }}>⚠️ Obligatoire</div>}
</div>
<div>
<FInput label=“Code postal” value={form.cp} onChange={f(“cp”)} required placeholder=“44500” />
{form.cp && !cpValid && <div style={{ fontSize: 12, color: C.sunset, fontWeight: 700, marginTop: -10, marginBottom: 12 }}>⚠️ 5 chiffres</div>}
</div>
</div>
{step1Error && (
<div style={{ background: `${C.sunset}18`, border: `2px solid ${C.sunset}`, borderRadius: 14, padding: “10px 14px”, marginBottom: 14, display: “flex”, alignItems: “center”, gap: 10 }}>
<span style={{ fontSize: 20 }}>⚠️</span>
<span style={{ fontSize: 13, fontWeight: 700, color: C.sunset }}>
{form.email && !emailValid ? “L’adresse email n’est pas valide (ex : prenom@exemple.fr)”
: form.cp && !cpValid ? “Le code postal doit contenir 5 chiffres (ex : 44500)”
: “Merci de remplir tous les champs obligatoires (✦) avant de continuer.”}
</span>
</div>
)}
<SunBtn color={C.coral} full onClick={goToStep2}>Suivant → Les enfants 👧</SunBtn>
</Card>
)}

```
    {step === 2 && (
      <Card>
        <h3 style={{ color: C.dark, marginTop: 0 }}>🧒 Enfants inscrits</h3>
        {form.enfants.map(e => (
          <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: `${C.sea}18`, border: `2px solid ${C.sea}40`, borderRadius: 14, padding: "10px 14px", marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 800, color: C.dark }}>{e.prenom} {e.nom}</div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {e.naissance ? e.naissance.split("-").reverse().join("/") : ""} · {e.activite === "club" ? "🏖️ Club" : e.activite === "natation" ? "🏊 Natation" : "🏖️🏊 Club & Natation"}
                {e.activite !== "club" && ` · ${e.niveau}`}
              </div>
              {e.allergies && <div style={{ fontSize: 12, color: C.sunset }}>⚠️ {e.allergies}</div>}
            </div>
            <button onClick={() => setForm(p => ({ ...p, enfants: p.enfants.filter(x => x.id !== e.id) }))} style={{ background: `${C.sunset}20`, border: "none", color: C.sunset, borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontWeight: 900 }}>✕</button>
          </div>
        ))}
        <div style={{ border: `2.5px dashed ${C.sea}`, borderRadius: 18, padding: 16, marginBottom: 14, background: `${C.sea}06` }}>
          <h4 style={{ color: C.ocean, marginTop: 0 }}>+ Ajouter un enfant</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
            <FInput label="Prénom" value={newEnfant.prenom} onChange={v => setNewEnfant(e => ({ ...e, prenom: v }))} required />
            <FInput label="Nom" value={newEnfant.nom} onChange={v => setNewEnfant(e => ({ ...e, nom: v }))} required />
          </div>
          <FInput label="Date de naissance" type="date" value={newEnfant.naissance} onChange={v => setNewEnfant(e => ({ ...e, naissance: v }))} required />
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 900, color: C.deep, display: "block", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>Activité</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[["club","🏖️ Club"],["natation","🏊 Natation"],["les deux","🏖️🏊 Les deux"]].map(([val, label]) => (
                <div key={val} onClick={() => setNewEnfant(e => ({ ...e, activite: val }))} style={{ flex: 1, textAlign: "center", padding: "9px 6px", borderRadius: 14, cursor: "pointer", fontWeight: 800, fontSize: 12, background: newEnfant.activite === val ? C.sea : "#f0f0f0", color: newEnfant.activite === val ? "#fff" : "#888", border: `2px solid ${newEnfant.activite === val ? C.sea : "transparent"}`, transition: "all .15s" }}>{label}</div>
              ))}
            </div>
          </div>
          {(newEnfant.activite === "natation" || newEnfant.activite === "les deux") && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 900, color: C.deep, display: "block", marginBottom: 5, letterSpacing: 0.5, textTransform: "uppercase" }}>Niveau 🏊</label>
              <select value={newEnfant.niveau} onChange={e => setNewEnfant(n => ({ ...n, niveau: e.target.value }))} style={{ width: "100%", border: `2.5px solid ${C.sky}`, borderRadius: 12, padding: "10px 14px", fontSize: 15, fontFamily: "inherit", background: "#fafcff" }}>
                <option value="debutant">🌱 Débutant</option>
                <option value="intermediaire">🌊 Intermédiaire</option>
                <option value="avance">🏊 Avancé</option>
              </select>
            </div>
          )}
          <FInput label="Allergies / informations médicales" value={newEnfant.allergies} onChange={v => setNewEnfant(e => ({ ...e, allergies: v }))} placeholder="Aucune si vide" />
          <SunBtn small color={C.sea} full onClick={() => {
            if (newEnfant.prenom && newEnfant.nom && newEnfant.naissance) {
              setForm(p => ({ ...p, enfants: [...p.enfants, { ...newEnfant, id: Date.now() }] }));
              setNewEnfant({ prenom: "", nom: "", naissance: "", activite: "club", niveau: "debutant", allergies: "" });
            }
          }}>+ Ajouter cet enfant</SunBtn>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <SunBtn color="#bbb" onClick={() => setStep(1)} style={{ flex: 1 }}>← Retour</SunBtn>
          <SunBtn color={C.coral} onClick={() => setStep(3)} style={{ flex: 2 }}>Suivant → Droits 📸</SunBtn>
        </div>
      </Card>
    )}

    {step === 3 && (
      <Card>
        <h3 style={{ color: C.dark, marginTop: 0 }}>📸 Droit à l'image</h3>
        <div style={{ background: `${C.sky}20`, border: `2px solid ${C.sky}`, borderRadius: 16, padding: 16, marginBottom: 20, fontSize: 14, color: "#555", lineHeight: 1.7 }}>
          Dans le cadre des activités du Club de Plage FNCP, des photos et/ou vidéos pourront être réalisées lors des séances. Ces images peuvent être utilisées à des fins de communication non commerciale.
        </div>
        {[
          { key: "droitImage",    label: "J'autorise le Club de Plage FNCP à photographier et/ou filmer mon/mes enfant(s) lors des activités.", icon: "📷" },
          { key: "droitDiffusion",label: "J'autorise la diffusion de ces images sur les supports de communication du club (site, réseaux sociaux, affiches).", icon: "📢" },
        ].map(({ key, label, icon }) => (
          <div key={key} onClick={() => setForm(p => ({ ...p, [key]: !p[key] }))} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", marginBottom: 12, background: form[key] ? `${C.green}15` : "#f9f9f9", border: `2.5px solid ${form[key] ? C.green : "#e0e0e0"}`, borderRadius: 18, cursor: "pointer", transition: "all .18s" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: form[key] ? C.green : "#ddd", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15, flexShrink: 0, marginTop: 2, transition: "all .18s" }}>{form[key] ? "✓" : ""}</div>
            <div style={{ fontSize: 14, color: C.dark, fontWeight: 600, lineHeight: 1.5 }}><span style={{ marginRight: 6 }}>{icon}</span>{label}</div>
          </div>
        ))}
        <div style={{ background: "#FFF8EF", border: `1.5px solid ${C.sun}`, borderRadius: 12, padding: 12, marginBottom: 16, fontSize: 12, color: "#888" }}>
          ⚠️ Ces autorisations sont valables pour la saison estivale 2026 et peuvent être révoquées à tout moment par écrit.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <SunBtn color="#bbb" onClick={() => setStep(2)} style={{ flex: 1 }}>← Retour</SunBtn>
          <SunBtn color={C.coral} onClick={() => setStep(4)} style={{ flex: 2 }}>Suivant → Récap 📋</SunBtn>
        </div>
      </Card>
    )}

    {step === 4 && (
      <Card>
        <h3 style={{ color: C.dark, marginTop: 0 }}>✅ Récapitulatif</h3>
        <div style={{ background: `${C.sea}15`, border: `2px solid ${C.sea}40`, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ fontWeight: 900, fontSize: 17, color: C.dark }}>{form.prenom} {form.nom}</div>
          <div style={{ color: "#666", fontSize: 14 }}>{form.email} · {form.tel}{form.tel2 ? ` · ${form.tel2}` : ""}</div>
          {form.adresse && <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>{form.adresse}, {form.cp} {form.ville}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontWeight: 800, color: C.dark }}>Enfants inscrits :</div>
          <div style={{ background: form.enfants.length === 0 ? "#eee" : `linear-gradient(135deg, ${C.sea}, ${C.ocean})`, color: form.enfants.length === 0 ? "#aaa" : "#fff", borderRadius: 50, padding: "4px 16px", fontWeight: 900, fontSize: 15 }}>
            {form.enfants.length} enfant{form.enfants.length > 1 ? "s" : ""}
          </div>
        </div>
        {form.enfants.length === 0 ? <p style={{ color: "#bbb", fontSize: 14 }}>Aucun enfant ajouté</p> : form.enfants.map(e => (
          <div key={e.id} style={{ background: `${C.sun}30`, borderRadius: 12, padding: "8px 14px", marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>{e.prenom} {e.nom} <span style={{ fontWeight: 500, fontSize: 13, color: "#666" }}>— {e.activite === "club" ? "🏖️ Club" : e.activite === "natation" ? "🏊 Natation" : "🏖️🏊 Club & Natation"}{e.activite !== "club" ? ` · ${e.niveau}` : ""}</span></div>
            {e.allergies && <div style={{ fontSize: 12, color: C.sunset, marginTop: 2 }}>⚠️ {e.allergies}</div>}
          </div>
        ))}
        <div style={{ background: `${C.sky}15`, border: `1.5px solid ${C.sky}`, borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 13 }}>
          <div style={{ fontWeight: 800, color: C.dark, marginBottom: 6 }}>📸 Droit à l'image</div>
          <div style={{ color: "#666" }}>Photos : {form.droitImage ? "✅ Autorisé" : "❌ Refusé"}</div>
          <div style={{ color: "#666" }}>Diffusion : {form.droitDiffusion ? "✅ Autorisée" : "❌ Refusée"}</div>
        </div>
        <div style={{ background: "#FFF8EF", border: `1.5px solid ${C.sun}`, borderRadius: 12, padding: 13, marginBottom: 16, fontSize: 13, color: "#777" }}>
          ☀️ En confirmant, j'accepte le règlement intérieur du Club de Plage FNCP et j'autorise la prise en charge dans le cadre des activités aquatiques.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <SunBtn color="#bbb" onClick={() => setStep(3)} style={{ flex: 1 }}>← Retour</SunBtn>
          <SunBtn color={C.green} onClick={() => { setUser({ ...form }); setDone(true); }} style={{ flex: 2 }}>🎉 Confirmer !</SunBtn>
        </div>
      </Card>
    )}
  </div>
</div>
```

);
}

// ── INFOS ─────────────────────────────────────────────────
function InfosScreen({ onNav }) {
return (
<div style={{ background: C.shell, minHeight: “100%” }}>
<div style={{ background: `linear-gradient(135deg, #9B59B6, #8E44AD)`, padding: “20px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, marginBottom: 8 }}><BackBtn onNav={onNav} /><h2 style={{ color: “#fff”, margin: 0, fontWeight: 900 }}>ℹ️ Infos du Club</h2></div>
<Wave fill={C.shell} />
</div>
<div style={{ padding: “10px 18px 24px”, display: “flex”, flexDirection: “column”, gap: 14 }}>
<Card>
<h3 style={{ color: C.dark, marginTop: 0 }}>🕐 Horaires</h3>
{[[“Lun – Sam”, “9h30 – 12h30 · 14h30 – 18h00”], [“Dimanche”, “Fermé 😴”]].map(([j, h]) => (
<div key={j} style={{ display: “flex”, justifyContent: “space-between”, padding: “10px 0”, borderBottom: “1.5px solid #f0f5ff” }}>
<span style={{ color: “#888” }}>{j}</span><strong style={{ color: C.dark, fontSize: 13 }}>{h}</strong>
</div>
))}
</Card>
<Card>
<h3 style={{ color: C.dark, marginTop: 0 }}>🏊 Créneaux natation</h3>
<div style={{ display: “flex”, gap: 10 }}>
<div style={{ background: `${C.sun}30`, borderRadius: 14, padding: “10px 14px”, flex: 1 }}>
<div style={{ fontWeight: 900, color: C.coral, fontSize: 12 }}>☀️ Matin</div>
<div style={{ fontWeight: 700, color: C.dark, fontSize: 13 }}>9h00 – 12h30</div>
<div style={{ fontSize: 11, color: “#888” }}>Créneaux 30 min</div>
</div>
<div style={{ background: `${C.sea}25`, borderRadius: 14, padding: “10px 14px”, flex: 1 }}>
<div style={{ fontWeight: 900, color: C.ocean, fontSize: 12 }}>🌊 Après-midi</div>
<div style={{ fontWeight: 700, color: C.dark, fontSize: 13 }}>13h30 – 19h00</div>
<div style={{ fontSize: 11, color: “#888” }}>Créneaux 30 min</div>
</div>
</div>
<div style={{ marginTop: 8, fontSize: 12, color: “#888”, background: “#f9f9f9”, borderRadius: 10, padding: “8px 12px” }}>⚠️ Max 2 enfants par créneau</div>
</Card>
<Card>
<h3 style={{ color: C.dark, marginTop: 0 }}>🌊 Éveil aquatique</h3>
<div style={{ background: “#F3E8FF”, borderRadius: 14, padding: “10px 14px”, marginBottom: 12, border: “1.5px solid #9B59B640” }}>
<div style={{ fontWeight: 900, color: “#9B59B6”, fontSize: 13, marginBottom: 2 }}>📅 Chaque dimanche matin</div>
<div style={{ fontSize: 12, color: “#666” }}>Sous réserve d’avoir plusieurs enfants</div>
</div>
<div style={{ display: “flex”, flexDirection: “column”, gap: 8 }}>
{[[“10h00”,“10h30”],[“10h45”,“11h15”],[“11h30”,“12h00”]].map(([start, end]) => (
<div key={start} style={{ display: “flex”, alignItems: “center”, gap: 12 }}>
<div style={{ background: “#9B59B6”, color: “#fff”, borderRadius: 10, padding: “5px 12px”, fontSize: 12, fontWeight: 900, whiteSpace: “nowrap” }}>{start} – {end}</div>
<div style={{ fontSize: 13, color: “#555”, fontWeight: 600 }}>Créneau éveil aquatique</div>
</div>
))}
</div>
</Card>
<Card>
<h3 style={{ color: C.coral, marginTop: 0 }}>📋 Règlement · Club de Plage</h3>
{[“Respecter les consignes des animateurs 👨‍🏫”, “Prévoir un équipement adapté (casquette, gourde, serviette de bain, maillot de bain…) 🩱”, “Pas de nourriture dans l’espace de jeux 🚫”].map(r => (
<div key={r} style={{ display: “flex”, gap: 10, marginBottom: 9, fontSize: 14, color: “#555” }}><span style={{ color: C.coral }}>•</span>{r}</div>
))}
</Card>
<Card>
<h3 style={{ color: C.ocean, marginTop: 0 }}>🏊 Règlement · Natation</h3>
{[“Arriver 5 min avant la séance 🏃”, “Enfants accompagnés jusqu’au bassin 👨‍👧”, “Inscription préalable obligatoire 📋”].map(r => (
<div key={r} style={{ display: “flex”, gap: 10, marginBottom: 9, fontSize: 14, color: “#555” }}><span style={{ color: C.ocean }}>•</span>{r}</div>
))}
</Card>
<Card style={{ background: `linear-gradient(135deg, ${C.sky}18, ${C.sea}10)` }}>
<h3 style={{ color: C.dark, marginTop: 0 }}>📍 Nous trouver</h3>
<div style={{ fontSize: 14, color: “#555”, lineHeight: 2.4 }}>
<div>🏖️ <strong>Club de Plage FNCP</strong></div>
<div>📍 Promenade des Sables, 44500 La Baule</div>
<div>📞 <a href=“tel:0240000000” style={{ color: C.ocean, fontWeight: 700 }}>02 40 00 00 00</a></div>
<div>✉️ <a href=“mailto:contact@fncp-plage.fr” style={{ color: C.ocean, fontWeight: 700 }}>contact@fncp-plage.fr</a></div>
<div>🌐 <a href=“https://www.fncp.fr” target=”_blank” rel=“noreferrer” style={{ color: C.ocean, fontWeight: 700 }}>www.fncp.fr</a></div>
</div>
</Card>
</div>
</div>
);
}

// ── ADMIN ─────────────────────────────────────────────────
// ── ADMIN SÉANCES TAB ─────────────────────────────────────
function SeancesTab({ sessions, setSessions }) {
// Build season weeks
const weeks = [];
let week = [];
ALL_SEASON_DAYS.forEach((d, i) => {
week.push(d);
if (d.label === “Sam” || i === ALL_SEASON_DAYS.length - 1) {
weeks.push(week);
week = [];
}
});
const [weekIdx, setWeekIdx] = useState(0);
const currentWeek = weeks[Math.min(weekIdx, weeks.length - 1)] || [];
const [selectedDayId, setSelectedDayId] = useState(ALL_SEASON_DAYS[0]?.id);
const [confirmCancel, setConfirmCancel] = useState(null);

// When week changes, auto-select first day of that week
const handleWeekChange = (idx) => {
setWeekIdx(idx);
const w = weeks[Math.min(idx, weeks.length - 1)];
if (w?.length) setSelectedDayId(w[0].id);
};

// All season slots stored in admin state (passed as allSeasonSlots)
const daySessions = sessions.filter(s => s.day === selectedDayId);
const morning  = daySessions.filter(s => parseInt(s.time) < 13);
const afternoon = daySessions.filter(s => parseInt(s.time) >= 13);

const weekSessions = sessions.filter(s => currentWeek.some(d => d.id === s.day));
const weekTotal  = weekSessions.reduce((acc) => acc + 2, 0);
const dayAvail   = daySessions.reduce((acc, s) => acc + s.spots, 0);
const dayPrises  = daySessions.reduce((acc, s) => acc + (2 - s.spots), 0);

const spotColor = n => n === 0 ? C.sunset : n === 1 ? C.coral : C.green;
const spotDot   = n => n === 0 ? “#FF6B6B” : n === 1 ? “#FF8E53” : “#6BCB77”;

const doCancel = (id) => {
setSessions(prev => prev.filter(x => x.id !== id));
setConfirmCancel(null);
};

const weekLabel = currentWeek.length > 0
? `${currentWeek[0].num} ${currentWeek[0].month} – ${currentWeek[currentWeek.length-1].num} ${currentWeek[currentWeek.length-1].month}`
: “”;

return (
<div>
{/* Week navigator */}
<div style={{ background: “#fff”, borderRadius: 16, padding: “10px 14px”, marginBottom: 12, boxShadow: “0 2px 8px rgba(0,0,0,0.05)”, display: “flex”, alignItems: “center”, justifyContent: “space-between” }}>
<button onClick={() => handleWeekChange(Math.max(0, weekIdx-1))} disabled={weekIdx === 0}
style={{ background: weekIdx === 0 ? “#f0f0f0” : C.ocean, border: “none”, color: weekIdx === 0 ? “#bbb” : “#fff”, borderRadius: “50%”, width: 30, height: 30, cursor: weekIdx === 0 ? “not-allowed” : “pointer”, fontWeight: 900, fontSize: 16, fontFamily: “inherit” }}>‹</button>
<div style={{ textAlign: “center” }}>
<div style={{ fontWeight: 900, color: C.dark, fontSize: 13 }}>Semaine {weekIdx + 1} / {weeks.length}</div>
<div style={{ fontSize: 11, color: “#aaa” }}>🗓️ {weekLabel} 2026</div>
</div>
<button onClick={() => handleWeekChange(Math.min(weeks.length-1, weekIdx+1))} disabled={weekIdx >= weeks.length-1}
style={{ background: weekIdx >= weeks.length-1 ? “#f0f0f0” : C.ocean, border: “none”, color: weekIdx >= weeks.length-1 ? “#bbb” : “#fff”, borderRadius: “50%”, width: 30, height: 30, cursor: weekIdx >= weeks.length-1 ? “not-allowed” : “pointer”, fontWeight: 900, fontSize: 16, fontFamily: “inherit” }}>›</button>
</div>

```
  {/* Summary bar */}
  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
    {[
      { label: "Places semaine", value: weekTotal,  color: C.ocean },
      { label: "Places dispo",   value: dayAvail,   color: C.green },
      { label: "Places prises",  value: dayPrises,  color: C.sunset },
    ].map(s => (
      <div key={s.label} style={{ flex: 1, background: "#fff", borderRadius: 14, padding: "10px 8px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.value}</div>
        <div style={{ fontSize: 10, color: "#aaa", fontWeight: 700 }}>{s.label}</div>
      </div>
    ))}
  </div>

  {/* Day selector */}
  <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 2 }}>
    {currentWeek.map(d => {
      const ds = sessions.filter(s => s.day === d.id);
      const dAvail = ds.reduce((acc, s) => acc + s.spots, 0) > 0;
      const dFull  = ds.some(s => s.spots === 0);
      const sel = selectedDayId === d.id;
      return (
        <button key={d.id} onClick={() => setSelectedDayId(d.id)} style={{
          flexShrink: 0, background: sel ? `linear-gradient(135deg, ${C.ocean}, ${C.sea})` : "#fff",
          border: "none", borderRadius: 16, padding: "10px 14px", cursor: "pointer",
          fontFamily: "inherit", boxShadow: sel ? `0 4px 14px ${C.ocean}44` : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all .15s", minWidth: 68, textAlign: "center",
        }}>
          <div style={{ fontSize: 10, fontWeight: 900, color: sel ? "rgba(255,255,255,0.8)" : "#aaa" }}>{d.label}</div>
          <div style={{ fontSize: 17, fontWeight: 900, color: sel ? "#fff" : C.dark }}>{d.num}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 4 }}>
            {dAvail  && <div style={{ width: 6, height: 6, borderRadius: "50%", background: sel ? "#fff" : C.green }} />}
            {dFull   && <div style={{ width: 6, height: 6, borderRadius: "50%", background: sel ? "rgba(255,255,255,0.5)" : C.sunset }} />}
          </div>
          <div style={{ fontSize: 9, color: sel ? "rgba(255,255,255,0.7)" : "#bbb", marginTop: 2 }}>
            {ds.length} créneaux
          </div>
        </button>
      );
    })}
  </div>

  {/* Slot grid */}
  {daySessions.length === 0 ? (
    <div style={{ textAlign: "center", padding: "32px 0", color: "#aaa", fontSize: 14 }}>Aucun créneau ce jour</div>
  ) : (
    <div style={{ background: "#fff", borderRadius: 20, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
      {morning.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 900, color: C.coral, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>☀️ Matin</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {morning.map(s => (
              <div key={s.id} onClick={() => setConfirmCancel(confirmCancel === s.id ? null : s.id)} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: confirmCancel === s.id ? "#FFF0F0" : "#F8FBFF",
                border: `1.5px solid ${confirmCancel === s.id ? C.sunset : spotColor(s.spots)}30`,
                borderRadius: 12, padding: "7px 11px", cursor: "pointer", transition: "all .15s",
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: spotDot(s.spots), flexShrink: 0 }} />
                <span style={{ fontWeight: 800, fontSize: 13, color: C.dark }}>{s.time}</span>
                <span style={{ fontSize: 10, color: spotColor(s.spots), fontWeight: 700 }}>
                  {s.spots === 0 ? "●" : `${s.spots}/2`}
                </span>
                {confirmCancel === s.id && (
                  <button onClick={e => { e.stopPropagation(); doCancel(s.id); }} style={{ background: C.sunset, border: "none", color: "#fff", borderRadius: 8, padding: "2px 8px", fontSize: 11, fontWeight: 900, cursor: "pointer", marginLeft: 2 }}>✕</button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {afternoon.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 900, color: C.ocean, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>🌊 Après-midi</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {afternoon.map(s => (
              <div key={s.id} onClick={() => setConfirmCancel(confirmCancel === s.id ? null : s.id)} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: confirmCancel === s.id ? "#FFF0F0" : "#F8FBFF",
                border: `1.5px solid ${confirmCancel === s.id ? C.sunset : spotColor(s.spots)}30`,
                borderRadius: 12, padding: "7px 11px", cursor: "pointer", transition: "all .15s",
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: spotDot(s.spots), flexShrink: 0 }} />
                <span style={{ fontWeight: 800, fontSize: 13, color: C.dark }}>{s.time}</span>
                <span style={{ fontSize: 10, color: spotColor(s.spots), fontWeight: 700 }}>
                  {s.spots === 0 ? "●" : `${s.spots}/2`}
                </span>
                {confirmCancel === s.id && (
                  <button onClick={e => { e.stopPropagation(); doCancel(s.id); }} style={{ background: C.sunset, border: "none", color: "#fff", borderRadius: 8, padding: "2px 8px", fontSize: 11, fontWeight: 900, cursor: "pointer", marginLeft: 2 }}>✕</button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ marginTop: 14, fontSize: 11, color: "#bbb", fontStyle: "italic" }}>
        💡 Appuie sur un créneau pour l'annuler
      </div>
    </div>
  )}
</div>
```

);
}

// ── ADMIN DATA ────────────────────────────────────────────
const MEMBRES = [
{ id: 1, name: “Martin Dupont”,  email: “martin@gmail.com”,  phone: “06 00 00 00 00”, adresse: “12 rue de la Mer, 44500 La Baule”, av: “👨”, color: C.ocean,
enfants: [
{ prenom: “Emma”,  nom: “Dupont”, naissance: “2018-03-14”, activite: “les deux”,  niveau: “intermediaire”, allergies: “” },
{ prenom: “Lucas”, nom: “Dupont”, naissance: “2020-07-02”, activite: “club”,       niveau: “debutant”,      allergies: “Arachides” },
], resa: 3, droitImage: true, droitDiffusion: false },
{ id: 2, name: “Sophie Bernard”, email: “sophie@gmail.com”,  phone: “06 12 34 56 78”, adresse: “4 allée des Pins, 44500 La Baule”, av: “👩”, color: C.coral,
enfants: [
{ prenom: “Léo”,   nom: “Bernard”, naissance: “2017-11-20”, activite: “natation”, niveau: “avance”,        allergies: “” },
{ prenom: “Chloé”, nom: “Bernard”, naissance: “2019-05-08”, activite: “club”,     niveau: “debutant”,      allergies: “” },
], resa: 5, droitImage: true, droitDiffusion: true },
{ id: 3, name: “Pierre Martin”,  email: “pierre@gmail.com”,  phone: “06 55 44 33 22”, adresse: “8 bd de l’Océan, 44500 La Baule”, av: “👨”, color: C.green,
enfants: [
{ prenom: “Noah”,  nom: “Martin”,  naissance: “2021-01-15”, activite: “club”,     niveau: “debutant”,      allergies: “Gluten” },
], resa: 1, droitImage: false, droitDiffusion: false },
{ id: 4, name: “Julie Leroy”,    email: “julie@gmail.com”,   phone: “06 77 88 99 11”, adresse: “2 impasse des Goélands, 44500 La Baule”, av: “👩”, color: “#9B59B6”,
enfants: [
{ prenom: “Manon”, nom: “Leroy”,   naissance: “2016-09-30”, activite: “les deux”, niveau: “avance”,        allergies: “” },
{ prenom: “Tom”,   nom: “Leroy”,   naissance: “2018-12-05”, activite: “natation”, niveau: “intermediaire”, allergies: “” },
{ prenom: “Clara”, nom: “Leroy”,   naissance: “2022-04-22”, activite: “club”,     niveau: “debutant”,      allergies: “Lactose” },
], resa: 7, droitImage: true, droitDiffusion: true },
];

function FicheModal({ membre, onClose }) {
const actLabel = a => a === “club” ? “🏖️ Club” : a === “natation” ? “🏊 Natation” : “🏖️🏊 Club & Natation”;
return (
<div style={{ position: “fixed”, inset: 0, zIndex: 1000, display: “flex”, flexDirection: “column” }}>
<div onClick={onClose} style={{ position: “absolute”, inset: 0, background: “rgba(0,20,50,0.6)”, backdropFilter: “blur(5px)” }} />
<div style={{ position: “relative”, marginTop: “auto”, background: “#F0F4F8”, borderRadius: “28px 28px 0 0”, maxHeight: “88vh”, display: “flex”, flexDirection: “column”, boxShadow: “0 -12px 48px rgba(0,0,0,0.25)” }}>
{/* Handle */}
<div style={{ display: “flex”, justifyContent: “center”, padding: “12px 0 4px” }}>
<div style={{ width: 40, height: 5, borderRadius: 10, background: “#ddd” }} />
</div>
{/* Header */}
<div style={{ background: `linear-gradient(135deg, ${membre.color}, ${membre.color}cc)`, margin: “0 16px”, borderRadius: 20, padding: “16px 18px”, position: “relative”, marginBottom: 12 }}>
<button onClick={onClose} style={{ position: “absolute”, top: 12, right: 12, background: “rgba(255,255,255,0.25)”, border: “none”, color: “#fff”, borderRadius: “50%”, width: 30, height: 30, cursor: “pointer”, fontWeight: 900, fontSize: 16, fontFamily: “inherit” }}>✕</button>
<div style={{ display: “flex”, alignItems: “center”, gap: 14 }}>
<div style={{ width: 56, height: 56, borderRadius: 18, background: “rgba(255,255,255,0.25)”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 28 }}>{membre.av}</div>
<div>
<div style={{ color: “#fff”, fontWeight: 900, fontSize: 18 }}>{membre.name}</div>
<div style={{ color: “rgba(255,255,255,0.8)”, fontSize: 13 }}>{membre.email}</div>
<div style={{ color: “rgba(255,255,255,0.8)”, fontSize: 13 }}>📞 {membre.phone}</div>
</div>
</div>
</div>
<div style={{ overflowY: “auto”, padding: “0 16px 24px”, display: “flex”, flexDirection: “column”, gap: 12 }}>
{/* Adresse */}
<div style={{ background: “#fff”, borderRadius: 16, padding: “12px 16px”, boxShadow: “0 2px 8px rgba(0,0,0,0.05)” }}>
<div style={{ fontWeight: 800, color: “#2C3E50”, fontSize: 12, marginBottom: 4 }}>📍 ADRESSE</div>
<div style={{ fontSize: 14, color: “#555” }}>{membre.adresse}</div>
</div>
{/* Enfants */}
<div style={{ background: “#fff”, borderRadius: 16, padding: “12px 16px”, boxShadow: “0 2px 8px rgba(0,0,0,0.05)” }}>
<div style={{ fontWeight: 800, color: “#2C3E50”, fontSize: 12, marginBottom: 10 }}>👧 ENFANTS ({membre.enfants.length})</div>
{membre.enfants.map((e, i) => (
<div key={i} style={{ background: “#F8FBFF”, borderRadius: 14, padding: “10px 14px”, marginBottom: 8 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 4 }}>
<div style={{ fontWeight: 900, color: “#2C3E50”, fontSize: 14 }}>{e.prenom} {e.nom}</div>
<div style={{ fontSize: 11, color: “#888” }}>Né(e) le {e.naissance.split(”-”).reverse().join(”/”)}</div>
</div>
<div style={{ display: “flex”, gap: 6, flexWrap: “wrap” }}>
<div style={{ background: `${membre.color}18`, color: membre.color, borderRadius: 50, padding: “2px 10px”, fontSize: 11, fontWeight: 800 }}>{actLabel(e.activite)}</div>
{e.activite !== “club” && <div style={{ background: `${C.sea}20`, color: C.sea, borderRadius: 50, padding: “2px 10px”, fontSize: 11, fontWeight: 800 }}>Niveau : {e.niveau}</div>}
{e.allergies && <div style={{ background: “#FFF0F0”, color: C.sunset, borderRadius: 50, padding: “2px 10px”, fontSize: 11, fontWeight: 800 }}>⚠️ {e.allergies}</div>}
</div>
</div>
))}
</div>
{/* Droit image */}
<div style={{ background: “#fff”, borderRadius: 16, padding: “12px 16px”, boxShadow: “0 2px 8px rgba(0,0,0,0.05)” }}>
<div style={{ fontWeight: 800, color: “#2C3E50”, fontSize: 12, marginBottom: 8 }}>📸 DROIT À L’IMAGE</div>
<div style={{ display: “flex”, gap: 8 }}>
<div style={{ flex: 1, background: membre.droitImage ? `${C.green}15` : “#f5f5f5”, borderRadius: 12, padding: “8px 12px”, textAlign: “center” }}>
<div style={{ fontSize: 16 }}>{membre.droitImage ? “✅” : “❌”}</div>
<div style={{ fontSize: 11, color: membre.droitImage ? C.green : “#aaa”, fontWeight: 700 }}>Photos</div>
</div>
<div style={{ flex: 1, background: membre.droitDiffusion ? `${C.green}15` : “#f5f5f5”, borderRadius: 12, padding: “8px 12px”, textAlign: “center” }}>
<div style={{ fontSize: 16 }}>{membre.droitDiffusion ? “✅” : “❌”}</div>
<div style={{ fontSize: 11, color: membre.droitDiffusion ? C.green : “#aaa”, fontWeight: 700 }}>Diffusion</div>
</div>
</div>
</div>
{/* Stats */}
<div style={{ background: “#fff”, borderRadius: 16, padding: “12px 16px”, boxShadow: “0 2px 8px rgba(0,0,0,0.05)” }}>
<div style={{ fontWeight: 800, color: “#2C3E50”, fontSize: 12, marginBottom: 8 }}>📊 ACTIVITÉ</div>
<div style={{ display: “flex”, gap: 10 }}>
<div style={{ flex: 1, background: `${C.ocean}10`, borderRadius: 12, padding: “10px”, textAlign: “center” }}>
<div style={{ fontSize: 22, fontWeight: 900, color: C.ocean }}>{membre.resa}</div>
<div style={{ fontSize: 11, color: “#aaa” }}>Réservations</div>
</div>
<div style={{ flex: 1, background: `${C.sea}10`, borderRadius: 12, padding: “10px”, textAlign: “center” }}>
<div style={{ fontSize: 22, fontWeight: 900, color: C.sea }}>{membre.enfants.length}</div>
<div style={{ fontSize: 11, color: “#aaa” }}>Enfants</div>
</div>
</div>
</div>
</div>
</div>
</div>
);
}

function MembresTab({ allResas }) {
const [selectedMembre, setSelectedMembre] = useState(null);
return (
<div style={{ display: “flex”, flexDirection: “column”, gap: 10 }}>
{selectedMembre && <FicheModal membre={selectedMembre} onClose={() => setSelectedMembre(null)} />}
<div style={{ fontWeight: 900, color: “#2C3E50”, fontSize: 14, marginBottom: 4 }}>{MEMBRES.length} membres inscrits</div>
{MEMBRES.map(u => (
<div key={u.id} onClick={() => setSelectedMembre(u)} style={{ background: “#fff”, borderRadius: 20, padding: “14px 16px”, boxShadow: “0 4px 16px rgba(0,0,0,0.06)”, display: “flex”, alignItems: “center”, gap: 14, cursor: “pointer”, transition: “transform .15s” }}
onMouseEnter={e => e.currentTarget.style.transform = “translateY(-2px)”}
onMouseLeave={e => e.currentTarget.style.transform = “”}
>
<div style={{ width: 50, height: 50, borderRadius: 18, background: `linear-gradient(135deg, ${u.color}, ${u.color}bb)`, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 24, flexShrink: 0 }}>{u.av}</div>
<div style={{ flex: 1 }}>
<div style={{ fontWeight: 900, color: “#2C3E50”, fontSize: 14 }}>{u.name}</div>
<div style={{ fontSize: 11, color: “#aaa”, marginBottom: 6 }}>{u.email}</div>
<div style={{ display: “flex”, gap: 6, flexWrap: “wrap” }}>
<div style={{ background: `${u.color}18`, color: u.color, borderRadius: 50, padding: “3px 10px”, fontSize: 11, fontWeight: 800 }}>👧 {u.enfants.length} enfant{u.enfants.length > 1 ? “s” : “”}</div>
<div style={{ background: `${C.ocean}15`, color: C.ocean, borderRadius: 50, padding: “3px 10px”, fontSize: 11, fontWeight: 800 }}>📅 {u.resa} résas</div>
{u.enfants.some(e => e.allergies) && <div style={{ background: “#FFF0F0”, color: C.sunset, borderRadius: 50, padding: “3px 10px”, fontSize: 11, fontWeight: 800 }}>⚠️ Allergie</div>}
</div>
</div>
<div style={{ fontSize: 20, color: “#ddd” }}>›</div>
</div>
))}
</div>
);
}

function RechercheTab({ allResas, sessions }) {
const [query, setQuery] = useState(””);
const [selectedMembre, setSelectedMembre] = useState(null);
const q = query.toLowerCase().trim();
const resultsMembres = q ? MEMBRES.filter(m =>
m.name.toLowerCase().includes(q) ||
m.email.toLowerCase().includes(q) ||
m.phone.includes(q) ||
m.enfants.some(e => `${e.prenom} ${e.nom}`.toLowerCase().includes(q))
) : [];
const resultsSessions = q ? sessions.filter(s =>
s.time.includes(q) ||
DAYS.find(d => d.id === s.day)?.label.toLowerCase().includes(q) ||
DAYS.find(d => d.id === s.day)?.num.includes(q)
) : [];
return (
<div>
{selectedMembre && <FicheModal membre={selectedMembre} onClose={() => setSelectedMembre(null)} />}
{/* Search bar */}
<div style={{ position: “relative”, marginBottom: 16 }}>
<div style={{ position: “absolute”, left: 14, top: “50%”, transform: “translateY(-50%)”, fontSize: 16, color: “#aaa” }}>🔍</div>
<input
type=“text” value={query} onChange={e => setQuery(e.target.value)}
placeholder=“Nom, email, enfant, créneau…”
style={{ width: “100%”, boxSizing: “border-box”, border: “2px solid #E8EFF8”, borderRadius: 16, padding: “13px 14px 13px 42px”, fontSize: 15, fontFamily: “inherit”, outline: “none”, background: “#fff”, boxShadow: “0 2px 10px rgba(0,0,0,0.06)” }}
onFocus={e => e.target.style.borderColor = C.ocean}
onBlur={e => e.target.style.borderColor = “#E8EFF8”}
autoFocus
/>
{query && <button onClick={() => setQuery(””)} style={{ position: “absolute”, right: 12, top: “50%”, transform: “translateY(-50%)”, background: “#eee”, border: “none”, borderRadius: “50%”, width: 24, height: 24, cursor: “pointer”, fontSize: 12, fontWeight: 900 }}>✕</button>}
</div>

```
  {!query && (
    <div style={{ textAlign: "center", padding: "32px 0", color: "#bbb" }}>
      <div style={{ fontSize: 48, marginBottom: 10 }}>🔍</div>
      <div style={{ fontSize: 14 }}>Recherche par nom, email, enfant ou créneau</div>
    </div>
  )}

  {query && resultsMembres.length === 0 && resultsSessions.length === 0 && (
    <div style={{ textAlign: "center", padding: "32px 0", color: "#bbb" }}>
      <div style={{ fontSize: 48, marginBottom: 10 }}>😶</div>
      <div style={{ fontSize: 14 }}>Aucun résultat pour « {query} »</div>
    </div>
  )}

  {resultsMembres.length > 0 && (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 900, color: "#2C3E50", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>👥 Membres ({resultsMembres.length})</div>
      {resultsMembres.map(u => (
        <div key={u.id} onClick={() => setSelectedMembre(u)} style={{ background: "#fff", borderRadius: 16, padding: "12px 14px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 12, marginBottom: 8, cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: `linear-gradient(135deg, ${u.color}, ${u.color}bb)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{u.av}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, color: "#2C3E50", fontSize: 13 }}>{u.name}</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>{u.email}</div>
            {u.enfants.some(e => `${e.prenom} ${e.nom}`.toLowerCase().includes(q)) && (
              <div style={{ fontSize: 11, color: u.color, fontWeight: 700, marginTop: 2 }}>
                👧 {u.enfants.filter(e => `${e.prenom} ${e.nom}`.toLowerCase().includes(q)).map(e => e.prenom).join(", ")}
              </div>
            )}
          </div>
          <div style={{ fontSize: 18, color: "#ddd" }}>›</div>
        </div>
      ))}
    </div>
  )}

  {resultsSessions.length > 0 && (
    <div>
      <div style={{ fontWeight: 900, color: "#2C3E50", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🏊 Créneaux ({resultsSessions.length})</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {resultsSessions.slice(0, 20).map(s => (
          <div key={s.id} style={{ background: "#fff", borderRadius: 12, padding: "8px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.spots === 0 ? C.sunset : s.spots === 1 ? C.coral : C.green }} />
            <span style={{ fontWeight: 800, fontSize: 13, color: C.dark }}>{DAYS.find(d => d.id === s.day)?.label} {DAYS.find(d => d.id === s.day)?.num} · {s.time}</span>
            <span style={{ fontSize: 11, color: s.spots === 0 ? C.sunset : C.green, fontWeight: 700 }}>{s.spots === 0 ? "Complet" : `${s.spots}/2`}</span>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
```

);
}

function AdminScreen({ onNav, sessions, setSessions, reservations, allSeasonSessions, setAllSeasonSessions }) {
const [tab, setTab] = useState(“dashboard”);

const MOCK_RESAS = [
{ id: 1, parent: “Martin Dupont”,  email: “martin@gmail.com”,  phone: “06 00 00 00 00”, enfants: [“Emma”,“Lucas”], session: “09:00 - Lun 7”,  status: “confirmed” },
{ id: 2, parent: “Sophie Bernard”, email: “sophie@gmail.com”,  phone: “06 12 34 56 78”, enfants: [“Léo”,“Chloé”],  session: “13:30 - Lun 7”,  status: “confirmed” },
{ id: 3, parent: “Pierre Martin”,  email: “pierre@gmail.com”,  phone: “06 55 44 33 22”, enfants: [“Noah”],          session: “10:00 - Mar 8”,  status: “pending”   },
{ id: 4, parent: “Julie Leroy”,    email: “julie@gmail.com”,   phone: “06 77 88 99 11”, enfants: [“Manon”,“Tom”],   session: “11:30 - Mer 9”,  status: “confirmed” },
];
const allResas = […MOCK_RESAS, …reservations.map((r,i) => ({
id: 1000+i, parent: r.parent, email: “—”, phone: “—”, enfants: r.enfants || [],
session: `${r.time} - ${DAYS.find(d=>d.id===r.day)?.label} ${DAYS.find(d=>d.id===r.day)?.num}`, status: “confirmed”
}))];

const totalSpots = sessions.reduce((s,x) => s + x.spots, 0);
const takenSpots = sessions.reduce((s,x) => s + (2 - x.spots), 0);
const fillRate = sessions.length > 0 ? Math.round((takenSpots / (sessions.length * 2)) * 100) : 0;

const tabs = [
{ id: “dashboard”,    emoji: “📊”, label: “Dashboard”  },
{ id: “seances”,      emoji: “🏊”, label: “Séances”    },
{ id: “reservations”, emoji: “📋”, label: “Résas”      },
{ id: “membres”,      emoji: “👥”, label: “Membres”    },
{ id: “recherche”,    emoji: “🔍”, label: “Recherche”  },
];

return (
<div style={{ background: “#F0F4F8”, minHeight: “100%” }}>
<div style={{ background: “linear-gradient(135deg, #0F2027, #203A43, #2C5364)”, padding: “24px 20px 0” }}>
<div style={{ display: “flex”, alignItems: “center”, justifyContent: “space-between”, marginBottom: 20 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12 }}>
<BackBtn onNav={onNav} />
<div>
<div style={{ color: “rgba(255,255,255,0.6)”, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: “uppercase” }}>Espace</div>
<h2 style={{ color: “#fff”, margin: 0, fontWeight: 900, fontSize: 20 }}>Administration</h2>
</div>
</div>
<div style={{ background: “rgba(255,255,255,0.12)”, borderRadius: 12, padding: “6px 12px”, textAlign: “center” }}>
<div style={{ color: “rgba(255,255,255,0.7)”, fontSize: 10 }}>Remplissage</div>
<div style={{ color: C.sun, fontWeight: 900, fontSize: 18 }}>{fillRate}%</div>
</div>
</div>
<div style={{ display: “flex”, gap: 4 }}>
{tabs.map(t => (
<button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? “#fff” : “rgba(255,255,255,0.1)”, color: tab === t.id ? “#203A43” : “rgba(255,255,255,0.7)”, border: “none”, borderRadius: “12px 12px 0 0”, padding: “10px 4px 8px”, cursor: “pointer”, fontWeight: 900, fontSize: 10, fontFamily: “inherit”, transition: “all .15s” }}>
<div style={{ fontSize: 18, marginBottom: 2 }}>{t.emoji}</div>
<div>{t.label}</div>
</button>
))}
</div>
</div>

```
  <div style={{ padding: "16px 16px 24px" }}>
    {tab === "dashboard" && (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Séances actives", value: sessions.length, emoji: "🗓️", bg: `linear-gradient(135deg, ${C.ocean}, #0052A3)`, sh: C.ocean },
            { label: "Réservations",    value: allResas.length, emoji: "👥",  bg: `linear-gradient(135deg, ${C.green}, #1E8449)`, sh: C.green },
            { label: "Places libres",   value: totalSpots,      emoji: "🌊",  bg: `linear-gradient(135deg, ${C.sea}, #17A589)`,   sh: C.sea   },
            { label: "Places prises",   value: takenSpots,      emoji: "✅",  bg: `linear-gradient(135deg, ${C.coral}, #C0392B)`, sh: C.coral },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 20, padding: "16px 14px", boxShadow: `0 6px 20px ${s.sh}44` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 700, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 800, color: "#2C3E50", fontSize: 14 }}>📈 Taux de remplissage</span>
            <span style={{ fontWeight: 900, color: C.ocean, fontSize: 14 }}>{fillRate}%</span>
          </div>
          <div style={{ background: "#EEF5FF", borderRadius: 50, height: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${fillRate}%`, background: `linear-gradient(90deg, ${C.ocean}, ${C.sea})`, borderRadius: 50 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#aaa" }}>
            <span>{takenSpots} places prises</span>
            <span>{totalSpots} places libres</span>
          </div>
        </div>

        {/* 💳 Suivi des paiements */}
        {(() => {
          const MOCK_PAYMENTS = [
            { id: 1, parent: "Martin Dupont",  montant: 20,  type: "Natation · 1 leçon",          date: "06/07/2026" },
            { id: 2, parent: "Sophie Bernard", montant: 95,  type: "Natation · 5 leçons",         date: "06/07/2026" },
            { id: 3, parent: "Pierre Martin",  montant: 39,  type: "Club · Matin · 3 enfants",    date: "07/07/2026" },
            { id: 4, parent: "Julie Leroy",    montant: 264, type: "Club · Journée · 2 semaines", date: "07/07/2026" },
            { id: 5, parent: "Emma Renard",    montant: 40,  type: "Eveil Aquatique · 2 séances", date: "08/07/2026" },
            { id: 6, parent: "Lucie Morin",    montant: 113, type: "Natation · 6 leçons",         date: "08/07/2026" },
          ];
          const totalEncaissé = MOCK_PAYMENTS.reduce((s, p) => s + p.montant, 0);
          return (
            <div style={{ background: "#fff", borderRadius: 20, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontWeight: 800, color: "#2C3E50", fontSize: 14 }}>💳 Paiements reçus</div>
                <div style={{ background: `${C.green}18`, color: C.green, borderRadius: 50, padding: "4px 14px", fontWeight: 900, fontSize: 13 }}>{totalEncaissé} € encaissés</div>
              </div>

              {/* KPI */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                <div style={{ background: `${C.green}12`, borderRadius: 14, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontWeight: 900, color: C.green, fontSize: 22 }}>{totalEncaissé} €</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Total encaissé</div>
                </div>
                <div style={{ background: `${C.ocean}12`, borderRadius: 14, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontWeight: 900, color: C.ocean, fontSize: 22 }}>{MOCK_PAYMENTS.length}</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Transactions</div>
                </div>
              </div>

              {/* Liste */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {MOCK_PAYMENTS.map((p, i) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < MOCK_PAYMENTS.length - 1 ? "1px solid #F0F4F8" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: `${C.green}18`, color: C.green, fontWeight: 900 }}>✓</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 13, color: "#2C3E50", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.parent}</div>
                      <div style={{ fontSize: 11, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.type}</div>
                      <div style={{ fontSize: 10, color: "#bbb" }}>{p.date} · PayPal</div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: C.green, flexShrink: 0 }}>{p.montant} €</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <div style={{ background: "#fff", borderRadius: 20, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ fontWeight: 800, color: "#2C3E50", fontSize: 14, marginBottom: 14 }}>🔔 Dernières réservations</div>
          {allResas.slice(0, 5).map((r, i) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? "1px solid #F0F4F8" : "none" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: r.status === "confirmed" ? `linear-gradient(135deg, ${C.green}, #1E8449)` : `linear-gradient(135deg, ${C.coral}, #C0392B)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, color: "#fff", fontWeight: 900 }}>
                {r.status === "confirmed" ? "✓" : "⏳"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, color: "#2C3E50", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.parent}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>🏊 {r.session}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: r.status === "confirmed" ? C.green : C.coral, flexShrink: 0 }}>
                {r.status === "confirmed" ? "Confirmé" : "Attente"}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {tab === "seances" && (
      <SeancesTab sessions={allSeasonSessions} setSessions={setAllSeasonSessions} />
    )}

    {tab === "reservations" && (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ fontWeight: 900, color: "#2C3E50", fontSize: 14 }}>{allResas.length} réservation(s)</div>
          <Pill color={C.green}>{allResas.filter(r => r.status === "confirmed").length} confirmées</Pill>
        </div>
        {allResas.map(r => (
          <div key={r.id} style={{ background: "#fff", borderRadius: 20, padding: "14px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 14, background: `linear-gradient(135deg, ${C.ocean}, ${C.sea})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>👤</div>
                <div>
                  <div style={{ fontWeight: 900, color: "#2C3E50", fontSize: 14 }}>{r.parent}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>{r.email}</div>
                </div>
              </div>
              <div style={{ background: r.status === "confirmed" ? `${C.green}20` : `${C.coral}20`, color: r.status === "confirmed" ? C.green : C.coral, borderRadius: 10, padding: "3px 10px", fontSize: 11, fontWeight: 900 }}>
                {r.status === "confirmed" ? "✓ Confirmé" : "⏳ Attente"}
              </div>
            </div>
            <div style={{ background: "#F8FBFF", borderRadius: 12, padding: "8px 12px", marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: C.ocean, fontWeight: 800 }}>🏊 {r.session}</div>
              {r.phone !== "—" && <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>📞 {r.phone}</div>}
            </div>
            {r.enfants?.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {r.enfants.map(c => <Pill key={c} color={C.sea}>{c}</Pill>)}
              </div>
            )}
          </div>
        ))}
      </div>
    )}

    {tab === "membres" && (
      <MembresTab allResas={allResas} />
    )}

    {tab === "recherche" && (
      <RechercheTab allResas={allResas} sessions={sessions} />
    )}
  </div>
</div>
```

);
}
// ── BOTTOM NAV ────────────────────────────────────────────
function BottomNav({ current, onNav }) {
const items = [
{ id:“home”,             emoji:“🏠”, label:“Accueil”    },
{ id:“formules”,         emoji:“🎫”, label:“Formules”   },
{ id:“reservation”,      emoji:“🏊”, label:“Réserver”   },
{ id:“mes-reservations”, emoji:“📅”, label:“Mes séances” },
{ id:“profil”,           emoji:“👤”, label:“Profil”     },
];
return (
<div style={{ background:”#fff”, borderTop:“2.5px solid #EEF5FF”, display:“flex”, boxShadow:“0 -6px 24px rgba(0,102,204,0.09)” }}>
{items.map(item => (
<button key={item.id} onClick={() => onNav(item.id)} style={{ flex:1, background:“none”, border:“none”, padding:“9px 4px 11px”, cursor:“pointer”, display:“flex”, flexDirection:“column”, alignItems:“center”, gap:2 }}>
<span style={{ fontSize:21, filter:current===item.id?“none”:“grayscale(0.6) opacity(0.5)” }}>{item.emoji}</span>
<span style={{ fontSize:9, fontWeight:900, color:current===item.id?C.ocean:”#ccc”, letterSpacing:0.2 }}>{item.label}</span>
{current===item.id && <div style={{ width:18, height:3, background:`linear-gradient(90deg,${C.ocean},${C.sea})`, borderRadius:10, marginTop:1 }} />}
</button>
))}
</div>
);
}

// ── ROOT ──────────────────────────────────────────────────
export default function App() {
const [screen, setScreen] = useState(“home”);
const [user, setUser] = useState(null);
const [sessions, setSessions] = useState(INIT_SESSIONS);
const [allSeasonSessions, setAllSeasonSessions] = useState(ALL_SEASON_SLOTS_INIT);
const [reservations, setReservations] = useState([]);
const props = { onNav: setScreen, user, setUser, sessions, setSessions, reservations, setReservations, allSeasonSessions, setAllSeasonSessions };

const renderScreen = () => {
switch (screen) {
case “home”:             return <HomeScreen {…props} />;
case “formules”:          return <FormulesChoixScreen {…props} />;
case “formules-natation”: return <FormulesNatationScreen {…props} />;
case “formules-eveil”:    return <FormulesEveilScreen {…props} />;
case “reservation”:      return <ReservationScreen {…props} />;
case “prestations”:      return <PrestationsScreen {…props} />;
case “mes-reservations”: return <MesReservationsScreen {…props} />;
case “inscription”:      return <InscriptionScreen {…props} />;
case “infos”:            return <InfosScreen {…props} />;
case “admin”:            return <AdminScreen {…props} />;
case “profil”:           return (
<div style={{ padding:24, background:C.shell, minHeight:“100%” }}>
<button onClick={() => setScreen(“home”)} style={{ background:“none”, border:“none”, fontSize:22, cursor:“pointer” }}>←</button>
{user ? (
<Card style={{ marginTop:14, textAlign:“center” }}>
<div style={{ width:80, height:80, borderRadius:26, background:`linear-gradient(135deg,${C.ocean},${C.sea})`, display:“flex”, alignItems:“center”, justifyContent:“center”, fontSize:40, margin:“0 auto 14px” }}>👤</div>
<h2 style={{ color:C.dark, margin:“0 0 4px” }}>{user.prenom} {user.nom}</h2>
<p style={{ color:”#888”, fontSize:14, margin:“0 0 2px” }}>{user.email}</p>
<p style={{ color:”#888”, fontSize:14, margin:“0 0 16px” }}>{user.tel}</p>
{user.enfants?.length > 0 && <div style={{ marginBottom:16, display:“flex”, gap:6, flexWrap:“wrap”, justifyContent:“center” }}>{user.enfants.map(e => <Pill key={e.id} color={C.sea}>{e.prenom}</Pill>)}</div>}
<SunBtn color={C.sunset} onClick={() => { setUser(null); setScreen(“home”); }}>Se déconnecter</SunBtn>
</Card>
) : (
<Card style={{ textAlign:“center”, marginTop:14 }}>
<div style={{ fontSize:60 }}>🌊</div>
<p style={{ color:”#888” }}>Pas encore inscrit ?</p>
<SunBtn color={C.coral} onClick={() => setScreen(“inscription”)}>S’inscrire 🎉</SunBtn>
</Card>
)}
{/* Accès Admin discret */}
<div style={{ marginTop: 24 }}>
<div onClick={() => setScreen(“admin”)} style={{ display: “flex”, alignItems: “center”, justifyContent: “space-between”, background: “linear-gradient(135deg, #0F2027, #203A43)”, borderRadius: 20, padding: “14px 18px”, cursor: “pointer”, boxShadow: “0 4px 16px rgba(0,0,0,0.15)” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 12 }}>
<div style={{ width: 40, height: 40, borderRadius: 14, background: “rgba(255,255,255,0.15)”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 20 }}>⚙️</div>
<div>
<div style={{ color: “#fff”, fontWeight: 900, fontSize: 14 }}>Espace Administrateur</div>
<div style={{ color: “rgba(255,255,255,0.6)”, fontSize: 11 }}>Dashboard · Séances · Membres</div>
</div>
</div>
<div style={{ color: “rgba(255,255,255,0.4)”, fontSize: 20 }}>›</div>
</div>
</div>
</div>
);
default: return <HomeScreen {…props} />;
}
};

return (
<div style={{ maxWidth:430, margin:“0 auto”, minHeight:“100vh”, display:“flex”, flexDirection:“column”, fontFamily:”‘Nunito’,‘Segoe UI’,sans-serif”, background:C.shell }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'); * { box-sizing: border-box; } body { margin: 0; background: #87CEEB; } input:focus, select:focus { border-color: #1A8FE3 !important; box-shadow: 0 0 0 3px rgba(26,143,227,0.15); outline: none; } a { text-decoration: none; color: inherit; } a:hover { text-decoration: underline; } ::-webkit-scrollbar { width: 0; } button { font-family: 'Nunito', sans-serif; }`}</style>
<div style={{ flex:1, overflowY:“auto” }}>{renderScreen()}</div>
{screen !== “inscription” && <BottomNav current={screen} onNav={setScreen} />}
</div>
);
}

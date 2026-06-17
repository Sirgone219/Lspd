const WEBHOOK_URL = "https://discord.com/api/webhooks/1516842643198316676/1NfKW6TSVj6jt5qdTmW9rv-IWhSWxk-6f55HWxDb5It4P7RK0RM3Nb6dM0QiYSVmjsMY";
const STAFF_PASSWORD = "lspd123";

const applyForm = document.getElementById("applyForm");
const formStatus = document.getElementById("formStatus");
const bandoStatus = document.getElementById("bandoStatus");

let bandoAperto = localStorage.getItem("bandoAperto");

if (bandoAperto === null) {
  bandoAperto = "true";
  localStorage.setItem("bandoAperto", "true");
}

updateBandoUI();

applyForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (localStorage.getItem("bandoAperto") !== "true") {
    formStatus.style.color = "#ef4444";
    formStatus.innerText = "Il bando è attualmente chiuso.";
    return;
  }

  const nomeIC = document.getElementById("nomeIC").value.trim();
  const discord = document.getElementById("discord").value.trim();
  const eta = document.getElementById("eta").value.trim();
  const ore = document.getElementById("ore").value.trim();
  const esperienza = document.getElementById("esperienza").value.trim();
  const motivo = document.getElementById("motivo").value.trim();
  const pregiDifetti = document.getElementById("pregiDifetti").value.trim();

  const payload = {
    username: "Los Santos PD Recruitment",
    embeds: [
      {
        title: "🚔 Nuova candidatura Los Santos PD",
        color: 13398,
        fields: [
          { name: "👤 Nome IC", value: nomeIC || "Non inserito", inline: true },
          { name: "💬 Discord", value: discord || "Non inserito", inline: true },
          { name: "🎂 Età OOC", value: eta || "Non inserita", inline: true },
          { name: "⏰ Disponibilità", value: ore || "Non inserita", inline: true },
          { name: "📌 Esperienza RP / Polizia", value: esperienza || "Non inserita" },
          { name: "🚔 Motivazione", value: motivo || "Non inserita" },
          { name: "⚖️ Pregi e difetti", value: pregiDifetti || "Non inseriti" }
        ],
        footer: {
          text: "Los Santos Police Department Recruitment"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    formStatus.style.color = "#f8f9fa";
    formStatus.innerText = "Invio candidatura in corso...";

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      formStatus.style.color = "#22c55e";
      formStatus.innerText = "Candidatura inviata con successo.";
      applyForm.reset();
    } else {
      formStatus.style.color = "#ef4444";
      formStatus.innerText = "Errore durante l'invio. Controlla il webhook.";
    }
  } catch (err) {
    formStatus.style.color = "#ef4444";
    formStatus.innerText = "Errore di connessione.";
  }
});

function openStaff() {
  document.getElementById("staffModal").style.display = "flex";
}

function closeStaff() {
  document.getElementById("staffModal").style.display = "none";
}

function staffLogin() {
  const password = document.getElementById("staffPassword").value;
  const loginStatus = document.getElementById("loginStatus");

  if (password === STAFF_PASSWORD) {
    document.getElementById("loginPanel").classList.add("hidden");
    document.getElementById("staffPanel").classList.remove("hidden");
  } else {
    loginStatus.style.color = "#ef4444";
    loginStatus.innerText = "Password errata.";
  }
}

function setBando(state) {
  localStorage.setItem("bandoAperto", state ? "true" : "false");
  updateBandoUI();
}

function updateBandoUI() {
  const isOpen = localStorage.getItem("bandoAperto") === "true";

  if (isOpen) {
    bandoStatus.innerText = "BANDO APERTO";
    bandoStatus.classList.remove("closed");
    bandoStatus.classList.add("open");
  } else {
    bandoStatus.innerText = "BANDO CHIUSO";
    bandoStatus.classList.remove("open");
    bandoStatus.classList.add("closed");
  }
}

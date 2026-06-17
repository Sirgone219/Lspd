const WEBHOOK_URL = "INSERISCI_WEBHOOK_DISCORD";

const form = document.getElementById("applyForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const discord = document.getElementById("discord").value;
    const eta = document.getElementById("eta").value;
    const ore = document.getElementById("ore").value;
    const esperienza = document.getElementById("esperienza").value;
    const motivo = document.getElementById("motivo").value;
    const punti = document.getElementById("punti").value;

    const message = {
        username: "LSPD Recruitment",
        avatar_url: "https://i.imgur.com/3ZQ3ZQp.png",
        embeds: [
            {
                title: "📋 Nuova candidatura LSPD",
                color: 3447003,
                fields: [
                    {
                        name: "👤 Nome IC",
                        value: nome,
                        inline: true
                    },
                    {
                        name: "💬 Discord",
                        value: discord,
                        inline: true
                    },
                    {
                        name: "🎂 Età OOC",
                        value: eta,
                        inline: true
                    },
                    {
                        name: "⏰ Ore disponibili",
                        value: ore,
                        inline: true
                    },
                    {
                        name: "📌 Esperienza RP / Polizia",
                        value: esperienza
                    },
                    {
                        name: "🚔 Motivazione",
                        value: motivo
                    },
                    {
                        name: "⚖️ Punti di forza/debolezza",
                        value: punti
                    }
                ],
                footer: {
                    text: "Sistema candidature LSPD"
                },
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        statusText.style.color = "#60a5fa";
        statusText.innerText = "Invio candidatura in corso...";

        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });

        if (response.ok) {
            statusText.style.color = "#22c55e";
            statusText.innerText = "Candidatura inviata con successo!";
            form.reset();
        } else {
            statusText.style.color = "#ef4444";
            statusText.innerText = "Errore durante l'invio. Contatta lo staff.";
        }
    } catch (error) {
        statusText.style.color = "#ef4444";
        statusText.innerText = "Errore di connessione.";
    }
});

const envelope = document.getElementById("envelope");
const flap = document.querySelector(".flap");
const message = document.querySelector(".message");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let estado = 0;
/*
0 = cerrado
1 = sobre abierto
2 = carta expandida
3 = carta contraída
*/

let typingDone = false;

/* ✍️ EFECTO DE ESCRITURA */
function typeWriter(element, text, speed = 70) {
    element.textContent = "";
    let i = 0;

    const interval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
        }
    }, speed);
}

/* 💖 CORAZONES */
function lanzarCorazones() {
    const rect = envelope.getBoundingClientRect();

    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "💖";

            const offsetX = (Math.random() - 0.5) * rect.width * 0.6;
            const offsetY = (Math.random() - 0.5) * rect.height * 0.2;

            heart.style.left = rect.left + rect.width / 2 + offsetX + "px";
            heart.style.top = rect.top + rect.height / 2 + offsetY + "px";
            heart.style.fontSize = 18 + Math.random() * 10 + "px";
            heart.style.animationDuration = "1.5s";

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }, i * 200);
    }
}

/* 💘 CORAZÓN FINAL */
function corazonFinal() {
    const rect = envelope.getBoundingClientRect();

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💘";

    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top - 10 + "px";
    heart.style.fontSize = "18px";
    heart.style.animationDuration = "3s";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

/* 📨 CLICK SOBRE */
envelope.addEventListener("click", () => {

    // 1️⃣ Abrir sobre → escribir mensaje
    if (estado === 0) {
        envelope.classList.add("open");
        estado = 1;

        // iniciar escritura casi inmediata
        setTimeout(() => {
            if (!typingDone) {
                const text = message.dataset.text;
                message.style.visibility = "visible";
                message.style.opacity = "1";
                typeWriter(message, text);
                lanzarCorazones();
                typingDone = true;
            }
        }, 300);
    }

    // 2️⃣ Expandir carta → ocultar mensaje
    else if (estado === 1) {
        envelope.classList.add("expanded");
        message.style.opacity = "0";
        message.style.visibility = "hidden";
        estado = 2;
    }

    // 3️⃣ Contraer carta → mostrar mensaje SIN escribir
    else if (estado === 2) {
        envelope.classList.remove("expanded");

        setTimeout(() => {
            const text = message.dataset.text;
            message.textContent = text;
            message.style.visibility = "visible";
            message.style.opacity = "1";
        }, 400);

        estado = 3;
    }

    // 4️⃣ Cerrar sobre → reset total
    else if (estado === 3) {
        envelope.classList.remove("open");
        setTimeout(corazonFinal, 800);

        message.textContent = "";
        message.style.opacity = "0";
        message.style.visibility = "hidden";

        typingDone = false;
        estado = 0;
    }
});

/* 🎵 BOTÓN DE MÚSICA */
musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.volume = 0.2;
        music.play();
        musicBtn.textContent = "⏸ Pausar música";
    } else {
        music.pause();
        musicBtn.textContent = "🎵 Reproducir música";
    }
});



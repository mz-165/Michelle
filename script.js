// ======================================
// 💌 CONFIGURACIÓN - PERSONALIZA AQUÍ 💌
// ======================================
const CONFIG = {
    // ✏️ Cambia estos datos por los tuyos
    tuNombre: "Michelle",
    suNombre: "Alejo",
    
    // 📅 Fecha en que empezaron a ser novios → 23/03/2023 ✅
    fechaInicio: new Date(2023, 2, 23), // AÑO, MES (0=Enero), DÍA → 2023, Marzo=2, Día 23
    
    // 💖 Mensajes sorpresa - puedes agregar más si quieres
    mensajesSorpresa: [
        "Conocerte fue una de esas casualidades que se convierten en algo especial. ",
        "Me encanta saber que existes y que puedo compartir momentos contigo. ",
        "Si pudiera guardar mis momentos favoritos, muchos tendrían tu nombre. ",
        "No necesito que todo sea perfecto, solo quiero que lo nuestro sea bonito y sincero.",
        "Entre tantas personas en el mundo, qué bonito haber coincidido contigo. ",
        "Eres mi notificación favorita del día entero.",
        "Gracias por ser tú, por estar aquí y por hacerme sentir amada."
    ],
    
    // 💬 Respuestas al botón "Cuéntame"
    respuestasCuentame: [
        "Es algo muy especial... y solo es para ti.",
        "Me hace feliz que quieras saberlo. Sigue leyendo... ",
        "Es una promesa que quiero cumplir cada día. "
    ]
};

// ======================================
// 🎵 MÚSICA
// ======================================
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

// Reproductor con tu canción
const miCancion = new Audio('cancion/Igual Que Ayer - Maelo Ruiz - Topic (128k).mp3');
miCancion.loop = true; // Se repite sola 💜

musicBtn.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    musicBtn.textContent = musicPlaying ? '🔊' : '🎵';
    
    if (musicPlaying) {
        miCancion.play();
    } else {
        miCancion.pause();
    }
});

// ======================================
// 💖 CORAZONES FLOTANTES DE FONDO
// ======================================
const heartsBg = document.getElementById('heartsBg');
const corazones = ['❤️', '💕', '💗', '💖', '💘', '🌹'];

function crearCorazonFlotante() {
    const corazon = document.createElement('span');
    corazon.className = 'heart-float';
    corazon.textContent = corazones[Math.floor(Math.random() * corazones.length)];
    corazon.style.left = Math.random() * 100 + '%';
    corazon.style.animationDuration = (Math.random() * 5 + 5) + 's';
    corazon.style.fontSize = (Math.random() * 12 + 12) + 'px';
    heartsBg.appendChild(corazon);
    
    setTimeout(() => corazon.remove(), 10000);
}

setInterval(crearCorazonFlotante, 800);

// ======================================
// 📄 CAMBIO DE PANTALLAS
// ======================================
function mostrarPantalla(idPantalla) {
    document.querySelectorAll('.screen').forEach(pantalla => {
        pantalla.classList.remove('active');
    });
    document.getElementById(idPantalla).classList.add('active');
}

// ======================================
// 💌 PANTALLA 0: EL SOBRE
// ======================================
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
        mostrarPantalla('screen1');
    }, 700);
});

// ======================================
// 💬 PANTALLA 1: BIENVENIDA
// ======================================
document.getElementById('startBtn').addEventListener('click', () => {
    mostrarPantalla('screen2');
});

// ======================================
// 💖 PANTALLA 2: MENSAJES SORPRESA
// ======================================
let indiceMensaje = 0;
const nextMsgBtn = document.getElementById('nextMsgBtn');
const loveMsg = document.getElementById('loveMsg');
const questionMsg = document.getElementById('questionMsg');

nextMsgBtn.addEventListener('click', () => {
    questionMsg.classList.add('hidden');
    loveMsg.classList.remove('hidden');
    
    loveMsg.style.opacity = 0;
    loveMsg.style.transform = 'translateY(10px)';
    loveMsg.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        loveMsg.textContent = CONFIG.mensajesSorpresa[indiceMensaje];
        loveMsg.style.opacity = 1;
        loveMsg.style.transform = 'translateY(0)';
    }, 100);
    
    indiceMensaje++;
    
    if (indiceMensaje >= CONFIG.mensajesSorpresa.length) {
        nextMsgBtn.textContent = "Sigue leyendo...";
        nextMsgBtn.onclick = () => {
            mostrarPantalla('screen3');
        };
    }
});

// ======================================
// 💍 PANTALLA 3: PREGUNTA ESPECIAL
// ======================================
let indiceRespuesta = 0;
const tellBtn = document.getElementById('tellBtn');
const tellMsg = document.getElementById('tellMsg');
const continueBtn = document.getElementById('continueBtn');

tellBtn.addEventListener('click', () => {
    tellMsg.classList.remove('hidden');
    continueBtn.classList.remove('hidden');
    
    tellMsg.style.opacity = 0;
    tellMsg.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        tellMsg.textContent = CONFIG.respuestasCuentame[indiceRespuesta];
        tellMsg.style.opacity = 1;
    }, 100);
    
    indiceRespuesta++;
    if (indiceRespuesta >= CONFIG.respuestasCuentame.length) {
        indiceRespuesta = 0;
    }
});

continueBtn.addEventListener('click', () => {
    mostrarPantalla('screen4');
});

document.getElementById('yesBtn').addEventListener('click', () => {
    mostrarPantalla('screen4');
});

// ======================================
// ✨ PANTALLA 4: LA PROMESA
// ======================================
document.getElementById('finalBtn').addEventListener('click', () => {
    mostrarPantalla('screen5');
    iniciarContador();
});

// ======================================
// ⏳ CONTADOR DE TIEMPO JUNTOS
// ======================================
function iniciarContador() {
    const fechaElement = document.getElementById('specialDate');
    const tiempoElement = document.getElementById('timeTogether');
    
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    fechaElement.textContent = CONFIG.fechaInicio.toLocaleDateString('es-ES', opcionesFecha);
    
    function actualizarContador() {
        const ahora = new Date();
        const diferencia = ahora - CONFIG.fechaInicio;
        
        if (diferencia < 0) {
            tiempoElement.textContent = "¡Esa fecha aún no llega! 💜";
            return;
        }
        
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        
        tiempoElement.textContent = `${dias} días, ${horas} horas y ${minutos} minutos 💞`;
    }
    
    actualizarContador();
    setInterval(actualizarContador, 60000);
}

// ======================================
// 🔄 REINICIAR LA EXPERIENCIA
// ======================================
document.getElementById('restartBtn').addEventListener('click', () => {
    indiceMensaje = 0;
    indiceRespuesta = 0;
    
    questionMsg.classList.remove('hidden');
    loveMsg.classList.add('hidden');
    nextMsgBtn.textContent = "¿Qué cosa, mi amor?";
    nextMsgBtn.onclick = null;
    nextMsgBtn.addEventListener('click', () => {
        questionMsg.classList.add('hidden');
        loveMsg.classList.remove('hidden');
        loveMsg.style.opacity = 0;
        loveMsg.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            loveMsg.textContent = CONFIG.mensajesSorpresa[indiceMensaje];
            loveMsg.style.opacity = 1;
        }, 100);
        indiceMensaje++;
        if (indiceMensaje >= CONFIG.mensajesSorpresa.length) {
            nextMsgBtn.textContent = "Sigue leyendo...";
            nextMsgBtn.onclick = () => mostrarPantalla('screen3');
        }
    });
    
    tellMsg.classList.add('hidden');
    continueBtn.classList.add('hidden');
    
    mostrarPantalla('screen0');
    envelope.classList.remove('open');
});

console.log("%c💌 Para ti, mi amor 💌", "font-size: 20px; color: #E88C96; font-weight: bold;");
console.log("%cHecho con muchísimo amor ❤️", "font-size: 14px; color: #F06292;");
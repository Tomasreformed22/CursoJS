const preguntas = [
  {
    pregunta: "🧙‍♂️ ¿Cuál de estos campeones es un mago?",
    opciones: ["Lux", "Garen", "Lee Sin"],
    correcta: 0
  },
  {
    pregunta: "⚔️ ¿Qué línea suele jugar Jhin?",
    opciones: ["Top", "Mid", "Bot"],
    correcta: 2
  },
  {
    pregunta: "🐉 ¿Qué dragón otorga velocidad de movimiento permanente?",
    opciones: ["Dragón de viento", "Dragón de fuego", "Dragón de océano"],
    correcta: 0
  },
  {
    pregunta: "👑 ¿Cuál es el rol principal de Thresh?",
    opciones: ["Soporte", "Asesino", "Tirador"],
    correcta: 0
  },
  {
    pregunta: "🛡️ ¿Qué objeto otorga escudo a los aliados?",
    opciones: ["Espada del Rey Arruinado", "Redención", "Filo Infinito"],
    correcta: 1
  }
];

let indicePregunta = 0;
let puntaje = 0;

const contenedor = document.getElementById("pregunta-container");
const resultado = document.getElementById("resultado");
const btnReiniciar = document.getElementById("reiniciar");
const btnBorrar = document.getElementById("borrar-puntaje");
const puntajeAnterior = document.getElementById("puntaje-anterior");

function mostrarPregunta() {
  const actual = preguntas[indicePregunta];
  contenedor.innerHTML = "<h2>" + actual.pregunta + "</h2>";

  actual.opciones.forEach((opcion, i) => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.className = "opcion";
    boton.addEventListener("click", () => verificarRespuesta(i));
    contenedor.appendChild(boton);
  });
}

function verificarRespuesta(indiceSeleccionado) {
  const correcta = preguntas[indicePregunta].correcta;
  if (indiceSeleccionado === correcta) {
    puntaje++;
  }

  indicePregunta++;

  if (indicePregunta < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  contenedor.innerHTML = "";
  resultado.innerHTML =
    "<h2>🏁 Partida terminada</h2><p>Tu puntaje fue de <strong>" +
    puntaje +
    " / " +
    preguntas.length +
    "</strong></p>";

  localStorage.setItem("puntajeLOL", puntaje);
}

function mostrarPuntajeGuardado() {
  const guardado = localStorage.getItem("puntajeLOL");
  if (guardado) {
    puntajeAnterior.innerHTML =
      "📊 Último puntaje guardado: <strong>" + guardado + "</strong>";
  }
}

btnReiniciar.addEventListener("click", () => {
  indicePregunta = 0;
  puntaje = 0;
  resultado.innerHTML = "";
  mostrarPregunta();
});

btnBorrar.addEventListener("click", () => {
  localStorage.removeItem("puntajeLOL");
  puntajeAnterior.innerHTML = "";
});

mostrarPuntajeGuardado();
mostrarPregunta();

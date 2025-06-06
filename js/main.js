// Preguntas sobre League of Legends
const preguntas = [
  {
    pregunta: "🧙‍♂️ ¿Cuál de estos campeones es un mago?",
    opciones: ["Lux", "Garen", "Lee Sin"],
    correcta: 1
  },
  {
    pregunta: "⚔️ ¿Qué línea suele jugar Jhin?",
    opciones: ["Top", "Mid", "Bot"],
    correcta: 3
  },
  {
    pregunta: "🐉 ¿Qué dragón otorga velocidad de movimiento permanente?",
    opciones: ["Dragón de viento", "Dragón de fuego", "Dragón de océano"],
    correcta: 1
  },
  {
    pregunta: "👑 ¿Cuál es el rol principal de Thresh?",
    opciones: ["Soporte", "Asesino", "Tirador"],
    correcta: 1
  },
  {
    pregunta: "🛡️ ¿Qué objeto otorga escudo a los aliados?",
    opciones: ["Espada del Rey Arruinado", "Redención", "Filo Infinito"],
    correcta: 2
  }
];

// Función para hacer una pregunta
function hacerPregunta(preguntaObj) {
  let texto = `${preguntaObj.pregunta}\n`;
  for (let i = 0; i < preguntaObj.opciones.length; i++) {
    texto += `${i + 1}. ${preguntaObj.opciones[i]}\n`;
  }

  let respuesta = prompt(texto);
  console.log(`Pregunta: ${preguntaObj.pregunta} - Respuesta ingresada: ${respuesta}`);

  if (verificarRespuesta(respuesta, preguntaObj.correcta)) {
    alert("✅ ¡Correcto, invocador!");
    return true;
  } else {
    alert(`❌ Incorrecto. La respuesta correcta era: ${preguntaObj.opciones[preguntaObj.correcta - 1]}`);
    return false;
  }
}

// Función para verificar respuesta
function verificarRespuesta(respuestaUsuario, respuestaCorrecta) {
  return parseInt(respuestaUsuario) === respuestaCorrecta;
}

// Función para mostrar resultado final
function mostrarResultadoFinal(puntaje, total) {
  alert(`🏁 Partida terminada. Tu puntaje: ${puntaje} de ${total}`);
  if (puntaje === total) {
    alert("🌟 ¡Challenger sin duda!");
  } else if (puntaje >= 3) {
    alert("💪 ¡Buen KDA! Sos un rankeado decente.");
  } else {
    alert("😅 Sos nivel 1 con Ashe... ¡a seguir practicando!");
  }
  console.log(`Puntaje final: ${puntaje}/${total}`);
}

// Juego principal
alert("🎮 Bienvenido a la Trivia de League of Legends");

let puntaje = 0;

for (let i = 0; i < preguntas.length; i++) {
  if (hacerPregunta(preguntas[i])) {
    puntaje++;
  }
}

mostrarResultadoFinal(puntaje, preguntas.length);

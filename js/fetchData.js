export async function obtenerProductos() {
  try {
    const respuesta = await fetch("data/productos.json");
    if (!respuesta.ok) throw new Error("Error al cargar los productos.");
    return await respuesta.json();
  } catch (error) {
    Toastify({
      text: "Error al cargar productos.",
      duration: 3000,
      style: { background: "red" }
    }).showToast();
    return [];
  }
}

export function mostrarToast(mensaje, tipo = "info") {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background:
        tipo === "error"
          ? "#f44336"
          : tipo === "success"
          ? "#4CAF50"
          : "#2196F3",
    },
  }).showToast();
}

export function guardarEnHistorial(usuario, total) {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push({ usuario, total });
  localStorage.setItem("historial", JSON.stringify(historial));
}

export function obtenerHistorial() {
  return JSON.parse(localStorage.getItem("historial")) || [];
}

export function borrarEntradaHistorial(index) {
  const historial = obtenerHistorial();
  historial.splice(index, 1);
  localStorage.setItem("historial", JSON.stringify(historial));
}

export function editarTagHistorial(index, nuevoNombre) {
  const historial = obtenerHistorial();
  historial[index].usuario = nuevoNombre;
  localStorage.setItem("historial", JSON.stringify(historial));
}

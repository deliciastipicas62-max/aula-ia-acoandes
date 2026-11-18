/*
  AULA IA — PERSONALIZA AQUÍ TUS CUATRO PROFESORES VIRTUALES.

  INSTRUCCIONES:
  1. Busca el bloque PROFESORES más abajo.
  2. Cambia nombre, asignatura y descripción si lo necesitas.
  3. En el campo enlace, pega la dirección completa del Gem de Gemini
     entre comillas. Ejemplo: enlace: "https://gemini.google.com/gem/..."
  4. No borres las comillas ni la coma al final de cada elemento.

  Mientras el enlace tenga el texto PEGA_AQUI..., la tarjeta aparecerá
  pero el botón indicará que falta configurar el enlace.
*/

const profesores = [
  {
    nombre: "MateBot",
    asignatura: "Matemáticas",
    descripcion: "Comprende conceptos, resuelve ejercicios y descubre las matemáticas paso a paso.",
    icono: "∑",
    color: "#59e1e8",
    enlace: "https://gemini.google.com/gem/1YxkEK_CubqVkIM-lDVjd6ArG0PXWuUUB?usp=sharing"
  },
  {
    nombre: "CienciaBot",
    asignatura: "Ciencias Naturales",
    descripcion: "Explora la vida, la materia, la energía y los fenómenos que nos rodean.",
    icono: "⚛",
    color: "#a58bff",
    enlace: "PEGA_AQUI_EL_ENLACE_DE_CIENCIABOT"
  },
  {
    nombre: "EnglishBot",
    asignatura: "Inglés",
    descripcion: "Practica vocabulario, gramática, lectura y comunicación en inglés.",
    icono: "文",
    color: "#ffbd72",
    enlace: "PEGA_AQUI_EL_ENLACE_DE_ENGLISHBOT"
  },
  {
    nombre: "LetrasBot",
    asignatura: "Lengua Castellana",
    descripcion: "Fortalece la lectura, la escritura, la comprensión y la expresión de ideas.",
    icono: "¶",
    color: "#ff83b5",
    enlace: "PEGA_AQUI_EL_ENLACE_DE_LETRASBOT"
  }
];

const teacherGrid = document.getElementById("teacherGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");

function enlaceConfigurado(enlace) {
  return typeof enlace === "string" &&
    enlace.startsWith("https://") &&
    !enlace.includes("PEGA_AQUI");
}

function crearTarjeta(profesor, indice) {
  const configurado = enlaceConfigurado(profesor.enlace);
  const tarjeta = document.createElement("article");
  tarjeta.className = "teacher-card";
  tarjeta.style.setProperty("--card-color", profesor.color);
  tarjeta.style.setProperty("--card-glow", profesor.color);

  const top = document.createElement("div");
  top.className = "card-top";

  const icono = document.createElement("div");
  icono.className = "subject-icon";
  icono.textContent = profesor.icono;

  const numero = document.createElement("span");
  numero.className = "card-index";
  numero.textContent = `PROFESOR 0${indice + 1}`;

  top.append(icono, numero);

  const nombre = document.createElement("h3");
  nombre.textContent = profesor.nombre;

  const asignatura = document.createElement("div");
  asignatura.className = "subject";
  asignatura.textContent = profesor.asignatura;

  const descripcion = document.createElement("p");
  descripcion.textContent = profesor.descripcion;

  const boton = document.createElement(configurado ? "a" : "div");
  boton.className = `card-link${configurado ? "" : " disabled"}`;
  if (configurado) {
    boton.href = profesor.enlace;
    boton.target = "_blank";
    boton.rel = "noopener noreferrer";
    boton.setAttribute("aria-label", `Abrir ${profesor.nombre} en una nueva pestaña`);
  } else {
    boton.setAttribute("aria-label", `Falta agregar el enlace de ${profesor.nombre}`);
    boton.title = "Agrega el enlace de este Gem en script.js";
  }

  const textoBoton = document.createElement("span");
  textoBoton.textContent = configurado ? "ENTRAR A MI PROFESOR" : "ENLACE POR CONFIGURAR";
  const flecha = document.createElement("span");
  flecha.textContent = configurado ? "↗" : "＋";
  boton.append(textoBoton, flecha);

  tarjeta.append(top, nombre, asignatura, descripcion, boton);
  return tarjeta;
}

function mostrarProfesores(filtro = "") {
  const termino = filtro.trim().toLocaleLowerCase("es");
  const resultados = profesores.filter(profesor =>
    [profesor.nombre, profesor.asignatura, profesor.descripcion]
      .some(dato => dato.toLocaleLowerCase("es").includes(termino))
  );

  teacherGrid.replaceChildren();
  resultados.forEach(profesor => {
    const indiceOriginal = profesores.indexOf(profesor);
    teacherGrid.appendChild(crearTarjeta(profesor, indiceOriginal));
  });
  emptyState.hidden = resultados.length > 0;
}

searchInput.addEventListener("input", evento => {
  mostrarProfesores(evento.target.value);
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
mostrarProfesores();

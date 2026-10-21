const zonasDefinidas = [
	{ porcentajeMin: 0, porcentajeMax: 55, colorClass: "zona-1", nombre: "Z1 · Recuperación" },
	{ porcentajeMin: 56, porcentajeMax: 74, colorClass: "zona-2", nombre: "Z2 · Resistencia" },
	{ porcentajeMin: 75, porcentajeMax: 89, colorClass: "zona-3", nombre: "Z3 · Tempo" },
	{ porcentajeMin: 90, porcentajeMax: 104, colorClass: "zona-4", nombre: "Z4 · Umbral" },
	{ porcentajeMin: 105, porcentajeMax: 119, colorClass: "zona-5", nombre: "Z5 · VO2 máx" },
	{ porcentajeMin: 120, porcentajeMax: Infinity, colorClass: "zona-6", nombre: "Z6 · Anaeróbica" },
];

const porcentajesMostrar = [
	55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
];

const CLAVE_FTP = "ftp";

function calcularZonas() {
	const ftpInput = document.getElementById("ftp");
	const error = document.getElementById("error");
	const resultado = document.getElementById("resultado");
	const ftp = parseFloat(ftpInput.value);

	if (isNaN(ftp) || ftp <= 0) {
		error.hidden = false;
		resultado.hidden = true;
		return;
	}
	error.hidden = true;

	try {
		localStorage.setItem(CLAVE_FTP, String(ftp));
	} catch (e) {}

	const lista = document.getElementById("tablaZonas");
	lista.innerHTML = ""; // Limpiar el resultado anterior

	let zonaActual = null;
	porcentajesMostrar.forEach((porcentaje) => {
		const zona = zonasDefinidas.find(
			(z) => porcentaje >= z.porcentajeMin && porcentaje <= z.porcentajeMax,
		);

		// Encabezado de zona cuando cambia
		if (zona !== zonaActual) {
			zonaActual = zona;
			const titulo = document.createElement("li");
			titulo.className = "zona-titulo " + zona.colorClass;
			titulo.textContent = zona.nombre;
			lista.appendChild(titulo);
		}

		const valorZona = Math.round((porcentaje / 100) * ftp);
		const fila = document.createElement("li");
		fila.className = "fila " + zona.colorClass;
		fila.innerHTML =
			'<span class="pct">' + porcentaje + "%</span>" +
			'<span class="watts">' + valorZona + "<small> W</small></span>";
		lista.appendChild(fila);
	});

	resultado.hidden = false;
}

document.getElementById("formFtp").addEventListener("submit", (e) => {
	e.preventDefault();
	document.getElementById("ftp").blur(); // cierra el teclado en el celular
	calcularZonas();
});

// Recordar el último FTP usado
try {
	const guardado = localStorage.getItem(CLAVE_FTP);
	if (guardado) {
		document.getElementById("ftp").value = guardado;
		calcularZonas();
	}
} catch (e) {}

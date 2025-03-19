function calcularZonas() {
	const ftpInput = document.getElementById("ftp");
	const ftp = parseFloat(ftpInput.value);

	if (isNaN(ftp) || ftp <= 0) {
		alert("Por favor, ingresa un valor de FTP válido.");
		return;
	}

	const zonasDefinidas = [
		{ porcentajeMin: 50, porcentajeMax: 55, nombre: "Zona 1", colorClass: "" }, // No especificada, gris por defecto
		{
			porcentajeMin: 56,
			porcentajeMax: 75,
			nombre: "Zona 2",
			colorClass: "zona-2",
		},
		{
			porcentajeMin: 76,
			porcentajeMax: 90,
			nombre: "Zona 3",
			colorClass: "zona-3",
		},
		{
			porcentajeMin: 91,
			porcentajeMax: 105,
			nombre: "Zona 4",
			colorClass: "zona-4",
		},
		{
			porcentajeMin: 106,
			porcentajeMax: Infinity,
			nombre: "Zona 5",
			colorClass: "zona-5",
		},
	];

	const tablaZonasBody = document.getElementById("tablaZonas");
	tablaZonasBody.innerHTML = ""; // Limpiar la tabla anterior

	zonasDefinidas.forEach((zona) => {
		const valorMinZona = (zona.porcentajeMin / 100) * ftp;
		const valorMaxZona =
			zona.porcentajeMax === Infinity
				? "∞"
				: Math.round((zona.porcentajeMax / 100) * ftp);

		const fila = tablaZonasBody.insertRow();
		fila.classList.add(zona.colorClass); // Agregar la clase de color

		const celdaZona = fila.insertCell();
		const celdaRango = fila.insertCell();

		celdaZona.textContent = zona.nombre;
		celdaRango.textContent = `${Math.round(valorMinZona)} - ${valorMaxZona} W`;
	});

	// Agregar filas para porcentajes individuales clave
	agregarFilaIndividual(50, ftp, tablaZonasBody);
	agregarFilaIndividual(100, ftp, tablaZonasBody);
	agregarFilaIndividual(120, ftp, tablaZonasBody);
}

function agregarFilaIndividual(porcentaje, ftp, tablaZonasBody) {
	const valor = Math.round((porcentaje / 100) * ftp);
	const fila = tablaZonasBody.insertRow();
	const celdaPorcentaje = fila.insertCell();
	const celdaPotencia = fila.insertCell();

	celdaPorcentaje.textContent = porcentaje + "%";
	celdaPotencia.textContent = valor + " W";
}

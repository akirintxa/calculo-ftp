function calcularZonas() {
	const ftpInput = document.getElementById("ftp");
	const ftp = parseFloat(ftpInput.value);

	if (isNaN(ftp) || ftp <= 0) {
		alert("Por favor, ingresa un valor de FTP válido.");
		return;
	}

	const zonasDefinidas = [
		{ porcentajeMin: 0, porcentajeMax: 55, colorClass: "zona-1" },
		{ porcentajeMin: 56, porcentajeMax: 74, colorClass: "zona-2" },
		{ porcentajeMin: 75, porcentajeMax: 89, colorClass: "zona-3" },
		{ porcentajeMin: 90, porcentajeMax: 104, colorClass: "zona-4" },
		{ porcentajeMin: 105, porcentajeMax: 119, colorClass: "zona-5" },
		{ porcentajeMin: 120, porcentajeMax: Infinity, colorClass: "zona-6" },
	];

	const porcentajesMostrar = [
		55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
	];
	const tablaZonasBody = document.getElementById("tablaZonas");
	tablaZonasBody.innerHTML = ""; // Limpiar la tabla anterior

	porcentajesMostrar.forEach((porcentaje) => {
		const valorZona = Math.round((porcentaje / 100) * ftp);
		const fila = tablaZonasBody.insertRow();
		const celdaPorcentaje = fila.insertCell();
		const celdaPotencia = fila.insertCell();

		celdaPorcentaje.textContent = porcentaje + "%";
		celdaPotencia.textContent = valorZona + " W";

		// Determinar la zona y aplicar el color
		let colorAplicado = false;
		zonasDefinidas.forEach((zona) => {
			if (
				porcentaje >= zona.porcentajeMin &&
				porcentaje <= zona.porcentajeMax
			) {
				fila.classList.add(zona.colorClass);
				colorAplicado = true;
			} else if (porcentaje >= 105 && zona.porcentajeMin === 105) {
				fila.classList.add(zona.colorClass);
				colorAplicado = true;
			}
		});
		// Si no cae en ninguna zona específica, puedes dejarlo sin color o aplicar un color por defecto
		// if (!colorAplicado) {
		//     // fila.classList.add('color-por-defecto');
		// }
	});
}

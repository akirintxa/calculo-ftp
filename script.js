function calcularZonas() {
    const ftpInput = document.getElementById('ftp');
    const ftp = parseFloat(ftpInput.value);

    if (isNaN(ftp) || ftp <= 0) {
        alert('Por favor, ingresa un valor de FTP válido.');
        return;
    }

    const porcentajes = [50, 60, 70, 75, 80, 85, 90, 95, 100, 105, 110, 120];
    const tablaZonasBody = document.getElementById('tablaZonas');
    tablaZonasBody.innerHTML = ''; // Limpiar la tabla anterior

    porcentajes.forEach(porcentaje => {
        const valorZona = (porcentaje / 100) * ftp;
        const fila = tablaZonasBody.insertRow();
        const celdaPorcentaje = fila.insertCell();
        const celdaPotencia = fila.insertCell();

        celdaPorcentaje.textContent = porcentaje + '%';
        celdaPotencia.textContent = Math.round(valorZona); // Redondear a número entero
    });
}
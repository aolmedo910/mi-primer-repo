document.addEventListener('DOMContentLoaded', function() {
    let contador = 0;
    const btnContar = document.getElementById('btn-contador');
    const btnPajero = document.getElementById('btn-pajero');
    const btnReset = document.getElementById('btn-reset');
    const contadorPajeros = document.getElementById('contador-pajeros');

    if (btnContar && contadorPajeros) {
        btnContar.addEventListener('click', function() {
            contador++;
            contadorPajeros.textContent = 'Pajeros: ' + contador;
        });
    }

    if (btnPajero) {
        btnPajero.addEventListener('click', function() {
            alert(contador + ' Pajeros Detectados');
        });
    }

    if (btnReset && contadorPajeros) {
        btnReset.addEventListener('click', function() {
            contador = 0;
            contadorPajeros.textContent = 'Pajeros: 0';
        });
    }
});

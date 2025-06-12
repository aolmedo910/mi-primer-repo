document.addEventListener('DOMContentLoaded', function() {
    let contador = 0;
    let prestigios = 0;
    let logros = 0;
    let esperandoPrestigio = false;
    const btnContar = document.getElementById('btn-contador');
    const btnPajero = document.getElementById('btn-pajero');
    const btnReset = document.getElementById('btn-reset');
    const contadorPajeros = document.getElementById('contador-pajeros');
    const mensajePajero = document.getElementById('mensaje-pajero');
    let tiemposClicks = [];
    let ultimoClick = null;
    const btnPoder1 = document.getElementById('btn-poder1');
    const btnPoder2 = document.getElementById('btn-poder2');
    const btnPoder3 = document.getElementById('btn-poder3');
    let poder1Disponible = true;
    let poder1Timeout = null;
    let poder1Interval = null;
    let poder2Disponible = true;
    let poder2Timeout = null;
    let poder2Interval = null;
    let poder3Disponible = true;
    let poder3Timeout = null;
    let poder3Interval = null;
    let recordPajeros = 0;
    const prestigioInfo = document.getElementById('prestigio-info');
    const recordPajerosDiv = document.getElementById('record-pajeros');
    // Nuevo: para antichetos, solo clicks manuales
    let ultimoClickManual = null;
    let tiemposClicksManual = [];

    const timerPoder1 = document.getElementById('timer-poder1');
    const timerPoder2 = document.getElementById('timer-poder2');
    const timerPoder3 = document.getElementById('timer-poder3');

    function mostrarLogro(n) {
        mensajePajero.innerHTML = `¡Logro desbloqueado: ${n} Pajeros!`;
        if (prestigios > 0) {
            mensajePajero.innerHTML += '<div style="margin-top:0.5rem;">' + '⭐'.repeat(prestigios) + '</div>';
        }
    }

    function mostrarPrestigio() {
        mensajePajero.innerHTML = `¡Prestigio Pajoso! Ahora cada click suma ${prestigios + 1}`;
        mensajePajero.innerHTML += '<div style="margin-top:0.5rem;">' + '⭐'.repeat(prestigios) + '</div>';
    }

    function mostrarChetos() {
        mensajePajero.textContent = 'PAJERO CHETERO';
        contador = 0;
        contadorPajeros.textContent = 'Pajeros: 0';
        tiemposClicks = [];
    }

    function actualizarPrestigioInfo() {
        prestigioInfo.textContent = `Prestigio ${prestigios}`;
    }
    function actualizarRecord() {
        recordPajerosDiv.textContent = `Récord de Pajeros: ${recordPajeros}`;
    }

    if (btnContar && contadorPajeros) {
        btnContar.addEventListener('click', function(e) {
            // Solo cuenta para antichetos si es click manual
            if (!e.isTrusted) {
                // Click programático, no cuenta para antichetos
            } else {
                const ahora = Date.now();
                if (ultimoClickManual !== null) {
                    tiemposClicksManual.push(ahora - ultimoClickManual);
                    if (tiemposClicksManual.length > 5) tiemposClicksManual.shift();
                    if (
                        tiemposClicksManual.length === 5 &&
                        tiemposClicksManual.every((v, i, arr) => v === arr[0])
                    ) {
                        mostrarChetos();
                        return;
                    }
                }
                ultimoClickManual = ahora;
            }
            // Contador y prestigio
            contador += prestigios + 1;
            contadorPajeros.textContent = 'Pajeros: ' + contador;
            if (contador > recordPajeros) {
                recordPajeros = contador;
                actualizarRecord();
            }
            // Logros (cada 100 hasta 1000)
            if (contador >= (logros + 1) * 100 && logros < 10) {
                logros++;
                mostrarLogro(logros * 100);
            }
            // Activar botón de prestigio si corresponde
            const btnPrestigio = document.getElementById('btn-prestigio');
            if (contador >= 1000 && prestigios < 10) {
                btnPrestigio.classList.add('activo');
            } else {
                btnPrestigio.classList.remove('activo');
            }
        });
    }

    // Botón de prestigio manual
    const btnPrestigio = document.getElementById('btn-prestigio');
    if (btnPrestigio) {
        btnPrestigio.addEventListener('click', function() {
            if (contador >= 1000 && prestigios < 10 && btnPrestigio.classList.contains('activo')) {
                prestigios++;
                actualizarPrestigioInfo();
                contador = 0;
                logros = 0;
                mostrarPrestigio();
                contadorPajeros.textContent = 'Pajeros: 0';
                btnPrestigio.classList.remove('activo');
            }
        });
    }

    if (btnPajero && mensajePajero) {
        btnPajero.addEventListener('click', function() {
            mensajePajero.textContent = 'Récord de Pajeros: ' + recordPajeros;
        });
    }

    if (btnReset && contadorPajeros) {
        btnReset.addEventListener('click', function() {
            contador = 0;
            logros = 0;
            prestigios = 0;
            contadorPajeros.textContent = 'Pajeros: 0';
            mensajePajero.textContent = '';
            tiemposClicks = [];
            ultimoClick = null;
        });
    }

    // Poderes: solo clicks programáticos
    function clickProgramatico() {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
        btnContar.dispatchEvent(event);
    }

    function activarPoder1() {
        if (!poder1Disponible) return;
        poder1Disponible = false;
        btnPoder1.style.opacity = '0.3';
        btnPoder1.style.pointerEvents = 'none';
        let segundos = 0;
        let duracion = 15;
        let cooldown = 5;
        timerPoder1.textContent = `D:${duracion}`;
        poder1Interval = setInterval(() => {
            if (segundos < duracion) {
                clickProgramatico();
                timerPoder1.textContent = `D:${duracion - segundos - 1}`;
                segundos++;
            } else {
                clearInterval(poder1Interval);
                timerPoder1.textContent = `E:${cooldown}`;
                let cd = cooldown;
                poder1Timeout = setInterval(() => {
                    cd--;
                    if (cd > 0) {
                        timerPoder1.textContent = `E:${cd}`;
                    } else {
                        clearInterval(poder1Timeout);
                        poder1Disponible = true;
                        btnPoder1.style.opacity = '1';
                        btnPoder1.style.pointerEvents = 'auto';
                        timerPoder1.textContent = '';
                    }
                }, 1000);
            }
        }, 1000);
    }
    function activarPoder2() {
        if (!poder2Disponible) return;
        poder2Disponible = false;
        btnPoder2.style.opacity = '0.3';
        btnPoder2.style.pointerEvents = 'none';
        let segundos = 0;
        let duracion = 15;
        let cooldown = 25;
        timerPoder2.textContent = `D:${duracion}`;
        poder2Interval = setInterval(() => {
            if (segundos < duracion) {
                clickProgramatico();
                setTimeout(clickProgramatico, 500);
                timerPoder2.textContent = `D:${duracion - segundos - 1}`;
                segundos++;
            } else {
                clearInterval(poder2Interval);
                timerPoder2.textContent = `E:${cooldown}`;
                let cd = cooldown;
                poder2Timeout = setInterval(() => {
                    cd--;
                    if (cd > 0) {
                        timerPoder2.textContent = `E:${cd}`;
                    } else {
                        clearInterval(poder2Timeout);
                        poder2Disponible = true;
                        btnPoder2.style.opacity = '1';
                        btnPoder2.style.pointerEvents = 'auto';
                        timerPoder2.textContent = '';
                    }
                }, 1000);
            }
        }, 1000);
    }
    function activarPoder3() {
        if (!poder3Disponible) return;
        poder3Disponible = false;
        btnPoder3.style.opacity = '0.3';
        btnPoder3.style.pointerEvents = 'none';
        let segundos = 0;
        let duracion = 15;
        let cooldown = 45;
        timerPoder3.textContent = `D:${duracion}`;
        poder3Interval = setInterval(() => {
            if (segundos < duracion) {
                clickProgramatico();
                setTimeout(clickProgramatico, 333);
                setTimeout(clickProgramatico, 666);
                timerPoder3.textContent = `D:${duracion - segundos - 1}`;
                segundos++;
            } else {
                clearInterval(poder3Interval);
                timerPoder3.textContent = `E:${cooldown}`;
                let cd = cooldown;
                poder3Timeout = setInterval(() => {
                    cd--;
                    if (cd > 0) {
                        timerPoder3.textContent = `E:${cd}`;
                    } else {
                        clearInterval(poder3Timeout);
                        poder3Disponible = true;
                        btnPoder3.style.opacity = '1';
                        btnPoder3.style.pointerEvents = 'auto';
                        timerPoder3.textContent = '';
                    }
                }, 1000);
            }
        }, 1000);
    }

    if (btnPoder1) btnPoder1.addEventListener('click', activarPoder1);
    if (btnPoder2) btnPoder2.addEventListener('click', activarPoder2);
    if (btnPoder3) btnPoder3.addEventListener('click', activarPoder3);

    // Atajos de teclado para poderes y clicks manuales
    let spacePressed = false;
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === '1') activarPoder1();
        if (e.key === '2') activarPoder2();
        if (e.key === '3') activarPoder3();
        if ((e.code === 'Space' || e.key === ' ') && !spacePressed) {
            e.preventDefault();
            btnContar.click();
            spacePressed = true;
        }
        if ((e.key === 'Enter' || e.code === 'Enter') && btnPrestigio.classList.contains('activo')) {
            btnPrestigio.click();
        }
        if ((e.key === 'r' || e.key === 'R') && btnReset) {
            btnReset.click();
        }
    });
    document.addEventListener('keyup', function(e) {
        if (e.code === 'Space' || e.key === ' ') {
            spacePressed = false;
        }
    });

    // Inicializar valores al cargar
    actualizarPrestigioInfo();
    actualizarRecord();
});

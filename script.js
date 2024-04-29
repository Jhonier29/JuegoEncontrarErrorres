document.addEventListener('DOMContentLoaded', function() {
    const empezarButton = document.getElementById('empezar');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const inicioSection = document.getElementById('inicio');
    const juegoSection = document.getElementById('juego');
    const finSection = document.getElementById('fin');
    const tiempoSpan = document.getElementById('tiempo');
    const imagenContainer = document.getElementById('imagen-container');
    const contadorErroresSpan = document.getElementById('contador-errores');
    const erroresEncontradosSpan = document.getElementById('errores-encontrados');
    const desempenoP = document.getElementById('desempeno');
    const mensajeError = document.getElementById('mensaje-error');
    const mensajeRecordar = document.getElementById('mensaje-recordar');

    let tiempoRestante = 120;
    let contadorErrores = 0;


    // Obtener todas las imágenes de error
    const imagenesError = document.querySelectorAll('.error-icon');

    // Mensajes de error

    imagenContainer.addEventListener('click', function(event) {
        // Verificar si se hizo clic en una imagen dentro del contenedor
        if (event.target.tagName === 'IMG') {
            // Obtener el mensaje asociado a la imagen
            const mensaje = event.target.dataset.mensaje;
            // Mostrar el mensaje en el div
            mostrarMensaje(mensaje);
        }
    });
  
    // Agregar un controlador de eventos de clic a cada imagen de error
    imagenesError.forEach(imagenError => {
        imagenError.addEventListener('click', () => {
            // Verificar si la imagen ya ha sido contada

            if (!imagenError.classList.contains('contada')) {
                // Incrementar el contador de errores
                contadorErrores++;

                // Actualizar el valor del contador en la interfaz
                contadorErroresSpan.textContent = contadorErrores;

                // Agregar la clase 'contada' a la imagen para indicar que ya ha sido contada
                imagenError.classList.add('contada');
                imagenError.classList.remove('opacity') ;

            } 

            if ( contadorErrores == 11 ){
                endGame();
            }

        });
    });
    empezarButton.addEventListener('click', function() {
        inicioSection.classList.add('hidden');
        mensajeRecordar.classList.remove('hidden');
    });
    // Iniciar juego al hacer clic en el botón "Empezar Juego"
    startButton.addEventListener('click', function() {
        //inicioSection.classList.add('hidden');
        mensajeRecordar.classList.add('hidden');
        juegoSection.classList.remove('hidden');
        startTimer();
    });

    // Reiniciar juego al hacer clic en el botón "Reiniciar Juego"
    restartButton.addEventListener('click', function() {

        location.reload();
    });

    // Función para iniciar el temporizador
    function startTimer() {
        const interval = setInterval(function() {
            tiempoRestante--;
            const minutos = Math.floor(tiempoRestante / 60);
            const segundos = tiempoRestante % 60;
            tiempoSpan.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
            if (tiempoRestante <= 0) {
                clearInterval(interval);
                endGame();
            }
        }, 1000);
    }

    // Función para finalizar el juego
    function endGame() {
        juegoSection.classList.add('hidden');
        finSection.classList.remove('hidden');
        if(contadorErrores<=11 && contadorErrores>=9){
            desempenoP.textContent="Felicitaciones";
        }else if(contadorErrores<9 && contadorErrores>=6){
            desempenoP.textContent="Bien hecho";
        }else{
            desempenoP.textContent="Puedes hacerlo mejor";
        }
        erroresEncontradosSpan.textContent = contadorErrores;
    }


    // Función para mostrar el mensaje de error en la página
    function mostrarMensaje(mensaje) {

        mensajeError.textContent = mensaje;
        mensajeError.classList.remove('hidden');
    }

    // Aquí puedes agregar más funcionalidades para detectar errores en la imagen y actualizar el contador de errores
});

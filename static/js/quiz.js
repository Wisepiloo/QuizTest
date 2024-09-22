const slides = document.querySelectorAll('.slide'); //Obtenemos todos los slides
const btns = document.querySelectorAll('.btn_option'); //Obtenemos todos los botones
let slide_actual = 0;
let lista_correctos = [];
let vueltas = 0;


// Función que avanza al siguiente slide
function siguiente() {
    slides[slide_actual].classList.remove('active'); // Remueve la clase 'active' del slide actual
    slide_actual = slide_actual = (slide_actual + 1) % slides.length; // Encuentra el siguiente slide no visitado
    if(slide_actual == 0){
        vueltas++;
    }
    if(vueltas > 0){
        slide_actual = saltear_visitados()
    }
    slides[slide_actual].classList.add('active'); // Agrega la clase 'active' al siguiente slide
}

// Función que saltea los slides visitados
function saltear_visitados() {
    if(slides.length != lista_correctos.length){
        // Mientras el slide actual esté en la lista de correctos, avanza al siguiente
        while (lista_correctos.includes(slide_actual)) {
            slide_actual = (slide_actual + 1) % slides.length;
        }
    }else{
        alert_quiz_finish();
    }
    return slide_actual;
}

function alert_quiz_finish(){
    alerta = document.querySelector(".quizAlert");
    alerta.style.display = "block";
}

//Cambia el fondo del btn a verde si es correcta, rojo si no lo es.
function mostrar_eleccion(btn) {
    if (btn.classList.contains("btn--transform")) {
        btn.style.backgroundColor = "#0f0"; 
        slides_correctos();
    } else {
        btn.style.backgroundColor = "#f00"; 
    }
}

//Funcion encargada de bloquear los btn al seleccionar una opcion
function bloquearTemporalmente() {
    btns.forEach(boton => boton.disabled = true);
    // Habilita nuevamente los botones después de 1 segundos
    setTimeout(() => {
    btns.forEach(boton => boton.disabled = false);
    }, 1000); // 1000 milisegundos = 1 segundos
}
//Funcion encargada de contabilizar las respuestas correctas, retornarlas si es necesario
function slides_correctos(push = true){
    if(push){
        lista_correctos.push(slide_actual);
    }else{
        return lista_correctos;
    }
}

//Al precionar un btn_option 
btns.forEach(button => {
    button.addEventListener('click', function() {
    mostrar_eleccion(this);
    bloquearTemporalmente(); 
    setTimeout(siguiente, 500); //0.5s despues cambiamos al siguiente slide 
    });
});
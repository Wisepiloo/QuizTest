const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        
        function siguiente() {
            slides[currentSlide].classList.remove('active'); // Remueve la clase 'active' del slide actual
            currentSlide = (currentSlide + 1) % slides.length; // Avanza al siguiente slide
            slides[currentSlide].classList.add('active'); // Agrega la clase 'active' al siguiente slide
        }
        
        function mostrar_eleccion(btn) {
            if (btn.classList.contains("btn--transform")) {
                btn.style.backgroundColor = "#0f0"; // Cambia el color si tiene la clase "element--transform"
            } else {
                btn.style.backgroundColor = "#f00"; // De lo contrario, cambia a rojo
            }
        }
        
        // Asignamos la función 'mostrar_elecciones' a los botones
        document.querySelectorAll('.btn_option').forEach(button => {
            button.addEventListener('click', function() {
                mostrar_eleccion(this);
                setTimeout(siguiente, 500); //0.5s despues cambiamos al siguiente slide 
            });
        });
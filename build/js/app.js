/*

	app.js / Portafolio Skills

*/

// Efecto de desplazamiento desde navegación
document.addEventListener("DOMContentLoaded", function() {
	const enlaces = document.querySelectorAll(".nav-principal a");

	enlaces.forEach(link => {
		link.addEventListener("click", function(e) {
			e.preventDefault();
			console.log(e.target.getAttribute("href"));
			const seccionEnlace = e.target.getAttribute("href");
			const seccion = document.querySelector(seccionEnlace);

			seccion.scrollIntoView({behavior: "smooth"});
		});
	});
});

// Manejo del formulario de contacto con Web3Forms
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");

    if (formulario) {
        formulario.addEventListener("submit", async function (e) {
            e.preventDefault(); // Evita el envío normal y la redirección

            const boton = formulario.querySelector(".contacto .boton");
            boton.disabled = true;
            boton.value = "Enviando...";

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: new FormData(formulario)
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    resultado.textContent = "¡Mensaje enviado correctamente! Gracias por contactarme.";
                    resultado.className = "mensaje-resultado exito";
                    resultado.style.display = "block";
                    formulario.reset();
                } else {
                    resultado.textContent = data.message || "Error al enviar el mensaje. Inténtalo más tarde.";
                    resultado.className = "mensaje-resultado error";
                    resultado.style.display = "block";
                }
            } catch (error) {
                resultado.textContent = "Error de conexión. Revisa tu internet e inténtalo nuevamente.";
                resultado.className = "mensaje-resultado error";
                resultado.style.display = "block";
            } finally {
                boton.disabled = false;
                boton.value = "Enviar Mensaje";
            }
        });
    }
});
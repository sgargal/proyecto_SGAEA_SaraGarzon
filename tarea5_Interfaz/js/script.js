
document.addEventListener('DOMContentLoaded', function() {
    //Selecciono todos los botones
    const botones = document.querySelectorAll('.menu');

    //Agrego un evento a cada uno de los botones
    botones.forEach(boton=> {
        boton.addEventListener("click", function() {
            const url = boton.getAttribute("data-url");
            window.location.href=url;
        });
    });
});

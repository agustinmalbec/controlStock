function imprimirTablas() {

    const tablas = document.querySelectorAll(".table");
    tablas.forEach((tabla) => {
        tabla.style.visibility = "visible";
        tabla.style.position = 'relative';
    });
    window.print();
}

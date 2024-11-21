function imprimirTabla(idTabla) {
    const tablas = document.querySelectorAll(".tablaImprimir");
    tablas.forEach((tabla) => {
        tabla.style.visibility = "hidden";
    });
    const tablaSeleccionada = document.getElementById(idTabla);
    tablaSeleccionada.style.visibility = "visible";
    window.print();
    tablas.forEach((tabla) => {
        tabla.style.visibility = "visible";
    });
}

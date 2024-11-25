function imprimirTablas(idTabla) {
    const tabla = document.getElementById(idTabla);
    tabla.removeAttribute("hidden");
    window.print();
    tabla.setAttribute("hidden", "hidden");
}

function imprimirTablas(idTabla) {
    if (idTabla === "orders") {
        const tabla = document.querySelectorAll(".orders");
        tabla.forEach(element => {
            element.removeAttribute('hidden');

        });
        let contenidoImprimir = "";
        tabla.forEach((tabla) => {
            contenidoImprimir += tabla.outerHTML + '<br><br>';
        });
        const ventanaImpresion = window.open("", "", "height=800,width=1200");
        ventanaImpresion.document.write(
            "<html><head><title>Imprimir Tablas</title>"
        );
        ventanaImpresion.document.write(
            "<style>table {width: 100%; table-layout: fixed; border-collapse: collapse;} th, td {border: 1px solid #000; padding: 8px; text-align: left;}</style>"
        );
        ventanaImpresion.document.write("</head><body>");
        ventanaImpresion.document.write(contenidoImprimir);
        ventanaImpresion.document.write("</body></html>");
        ventanaImpresion.document.close();
        ventanaImpresion.print();
        tabla.forEach(element => {
            element.setAttribute("hidden", "hidden");
        });

    } else {
        const tabla = document.getElementById(idTabla);
        tabla.removeAttribute("hidden");
        window.print();
        tabla.setAttribute("hidden", "hidden");
    }
}

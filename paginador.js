document.addEventListener("DOMContentLoaded", function() {
    const paginator = document.getElementById("paginator");
    const totalPages = 100; // Ajusta según sea necesario
    const currentPage = getCurrentPageNumber();

    function updatePaginator() {
        paginator.innerHTML = "";

        // Botón anterior
        const prev = document.createElement("a");
        prev.className = "page-link prev";
        prev.textContent = "⮜";
        if (currentPage === 1) {
            prev.classList.add("disabled");
        } else {
            prev.addEventListener("click", () => {
                window.location.href = currentPage === 2 ? "index.html" : `pagina${currentPage - 1}.html`;
            });
        }
        paginator.appendChild(prev);

        // Números dinámicos
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        for (let i = start; i <= end; i++) {
            const pageLink = document.createElement("a");
            pageLink.className = "page-link";
            pageLink.textContent = i;

            if (i === currentPage) {
                pageLink.classList.add("disabled");
            } else {
                pageLink.addEventListener("click", () => {
                    window.location.href = i === 1 ? "index.html" : `pagina${i}.html`;
                });
            }
            paginator.appendChild(pageLink);
        }

        // Botón siguiente
        const next = document.createElement("a");
        next.className = "page-link next";
        next.textContent = "⮞";
        if (currentPage === totalPages) {
            next.classList.add("disabled");
        } else {
            next.addEventListener("click", () => {
                window.location.href = currentPage === 1 ? "pagina2.html" : `pagina${currentPage + 1}.html`;
            });
        }
        paginator.appendChild(next);
    }

    updatePaginator();
});

// Función para obtener el número de la página actual desde la URL
function getCurrentPageNumber() {
    const url = window.location.href;
    const pageMatch = url.match(/pagina(\d+)\.html/);
    return pageMatch ? parseInt(pageMatch[1]) : 1;
}

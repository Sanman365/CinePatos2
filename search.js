document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const suggestionsContainer = document.getElementById("suggestions");
    const searchButton = document.getElementById("searchButton");

    let movies = []; // Aquí se guardarán los datos de las películas

    // Mostrar sugerencias mientras el usuario escribe
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionsContainer.innerHTML = "";

        if (query.length === 0) {
            suggestionsContainer.style.display = "none";
            return;
        }

        // Filtrar películas que coincidan con la consulta (búsqueda por API)
        fetch(`/api/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    suggestionsContainer.innerHTML = "<p>No se encontraron resultados</p>";
                    suggestionsContainer.style.display = "block";
                    return;
                }

                // Mostrar sugerencias como enlaces
                data.forEach(movie => {
                    const suggestionItem = document.createElement("a");
                    suggestionItem.href = movie.link;
                    suggestionItem.textContent = movie.title;
                    suggestionItem.classList.add("suggestion-item");

                    suggestionsContainer.appendChild(suggestionItem);
                });

                suggestionsContainer.style.display = "block"; // Mostrar sugerencias
            })
            .catch(error => console.error("Error fetching movies:", error));
    });

    // Hacer que el botón de búsqueda funcione
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) return;

        // Hacer la consulta a la API
        fetch(`/api/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("searchResults", JSON.stringify(data));
                window.location.href = "/RESULTS.html"; // Redirigir a la página de resultados
            })
            .catch(error => console.error("Error searching:", error));
    });

    // Ocultar sugerencias si el usuario hace clic fuera
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.innerHTML = "";
            suggestionsContainer.style.display = "none";
        }
    });
});

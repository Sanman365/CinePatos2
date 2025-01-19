document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const suggestionsContainer = document.getElementById("suggestions");
    const searchButton = document.getElementById("searchButton");
    const resultsPage = "results.html"; // Página donde se mostrarán los resultados

    let movies = []; // Lista de películas de ejemplo

    // Cargar el JSON externo (solo ejemplo)
    fetch("videos.json")
        .then(response => response.json())
        .then(data => {
            movies = data;
        })
        .catch(error => console.error("Error loading videos.json:", error));

    // Mostrar sugerencias mientras el usuario escribe
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionsContainer.innerHTML = ""; // Limpiar sugerencias anteriores

        if (query.length === 0) {
            suggestionsContainer.style.display = "none"; // Ocultar sugerencias si no hay texto
            return;
        }

        // Filtrar películas que comienzan con las letras ingresadas
        const filteredMovies = movies
            .filter(movie => movie.title.toLowerCase().startsWith(query))
            .slice(0, 5); // Mostrar un máximo de 5 sugerencias

        if (filteredMovies.length === 0) {
            suggestionsContainer.innerHTML = "<p>No results found</p>";
            suggestionsContainer.style.display = "block"; // Mostrar mensaje si no hay resultados
            return;
        }

        // Mostrar las sugerencias
        filteredMovies.forEach(movie => {
            const suggestionItem = document.createElement("a");
            suggestionItem.href = movie.link;
            suggestionItem.textContent = movie.title;
            suggestionItem.classList.add("suggestion-item");

            suggestionsContainer.appendChild(suggestionItem);
        });

        suggestionsContainer.style.display = "block"; // Mostrar contenedor de sugerencias
    });

    // Hacer que el botón de búsqueda funcione correctamente
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) return;

        const results = movies.filter(movie => movie.title.toLowerCase().includes(query));
        localStorage.setItem("searchResults", JSON.stringify(results));
        window.location.href = resultsPage; // Redirigir a la página de resultados
    });

    // Ocultar sugerencias si el usuario hace clic fuera
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = "none";
        }
    });
});

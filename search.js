document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const suggestionsContainer = document.getElementById("suggestions");
    const searchButton = document.getElementById("searchButton");

    let movies = []; // Aquí se guardarán los datos de las películas

    // Cargar el JSON externo con los datos de las películas
    fetch("videos.json")
        .then(response => response.json())
        .then(data => {
            movies = data;
        })
        .catch(error => console.error("Error loading videos.json:", error));

    // Mostrar sugerencias mientras el usuario escribe
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionsContainer.innerHTML = "";

        if (query.length === 0) {
            suggestionsContainer.style.display = "none";
            return;
        }   

        // Filtrar películas que coincidan con la consulta
        const filteredMovies = movies
            .filter(movie => movie.title.toLowerCase().startsWith(query))
            .slice(0, 5); // Mostrar un máximo de 5 sugerencias

        if (filteredMovies.length === 0) {
            suggestionsContainer.innerHTML = "<p>No se encontraron resultados</p>";
            suggestionsContainer.style.display = "block";
            return;
        }

        // Agregar las sugerencias como enlaces
        filteredMovies.forEach(movie => {
            const suggestionItem = document.createElement("a");
            suggestionItem.href = movie.link;
            suggestionItem.textContent = movie.title;
            suggestionItem.classList.add("suggestion-item");

            suggestionsContainer.appendChild(suggestionItem);
        });

        suggestionsContainer.style.display = "block"; // Mostrar sugerencias
    });

    // Hacer que el botón de búsqueda funcione
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) return;

        const results = movies.filter(movie => movie.title.toLowerCase().includes(query));

        localStorage.setItem("searchResults", JSON.stringify(results));
        window.location.href = "results.html"; // Redirigir a la página de resultados
    });

    // Ocultar sugerencias si el usuario hace clic fuera
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.innerHTML = "";
            suggestionsContainer.style.display = "none";
        }
    });
});

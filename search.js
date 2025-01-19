document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const suggestionsContainer = document.getElementById("suggestions");
    const searchButton = document.getElementById("searchButton"); // Asegúrate de que el botón tenga este ID en HTML
    const resultsPage = "results.html"; // Página donde se mostrarán los resultados

    let movies = [];

    // Cargar el JSON externo
    fetch("videos.json")
        .then(response => response.json())
        .then(data => {
            movies = data;
        })
        .catch(error => console.error("Error loading videos.json:", error));

    // Función para hacer una búsqueda en el servidor
    const buscarEnServidor = async (query) => {
        try {
            const response = await fetch(`/api/search?q=${query}`);
            const data = await response.json();

            localStorage.setItem("searchResults", JSON.stringify(data));
            window.location.href = resultsPage; // Redirigir a la página de resultados
        } catch (error) {
            console.error("Error al buscar en el servidor:", error);
        }
    };

    // Mostrar sugerencias mientras el usuario escribe
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionsContainer.innerHTML = "";

        if (query.length === 0) return;

        // Filtrar películas que comiencen con las letras ingresadas
        const filteredMovies = movies
            .filter(movie => movie.title.toLowerCase().startsWith(query))
            .slice(0, 5); // Mostrar un máximo de 5 sugerencias

        if (filteredMovies.length === 0) {
            suggestionsContainer.innerHTML = "<p>No results found</p>";
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
    });

    // Hacer que el botón de búsqueda funcione correctamente
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) return;

        if (query.length >= 3) {
            buscarEnServidor(query); // Si la búsqueda es válida, usar la API del servidor
        } else {
            // Usar búsqueda local si es menor a 3 caracteres
            const results = movies.filter(movie => movie.title.toLowerCase().includes(query));
            localStorage.setItem("searchResults", JSON.stringify(results));
            window.location.href = resultsPage;
        }
    });

    // Permitir búsqueda con Enter
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.toLowerCase().trim();
            if (query.length === 0) return;
            
            if (query.length >= 3) {
                buscarEnServidor(query);
            } else {
                const results = movies.filter(movie => movie.title.toLowerCase().includes(query));
                localStorage.setItem("searchResults", JSON.stringify(results));
                window.location.href = resultsPage;
            }
        }
    });

    // Ocultar sugerencias si el usuario hace clic fuera
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.innerHTML = "";
        }
    });
});

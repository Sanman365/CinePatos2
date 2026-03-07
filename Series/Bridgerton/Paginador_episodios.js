// Obtener el nombre del archivo actual (ejemplo: "01x02.html" o "1x2.html")
let currentPage = window.location.pathname.split('/').pop();

// Intentar detectar formatos con y sin ceros a la izquierda
let match = currentPage.match(/(\d{1,2})x(\d{1,2})\.html/);

if (match) {
    // Captura temporada y episodio como texto
    let seasonText = match[1];
    let episodeText = match[2];

    // Convertir a número para cálculo
    let seasonNumber = parseInt(seasonText);
    let episodeNumber = parseInt(episodeText);

    // Detectar si hay ceros a la izquierda
    let seasonPad = seasonText.length === 2;
    let episodePad = episodeText.length === 2;

    // Generar episodio anterior (si no es el primero)
    let prevEpisode = episodeNumber > 1
        ? `${seasonPad ? String(seasonNumber).padStart(2, '0') : seasonNumber}x${String(episodeNumber - 1).padStart(episodePad ? 2 : 1, '0')}.html`
        : null;

    // Generar episodio siguiente
    let nextEpisode = `${seasonPad ? String(seasonNumber).padStart(2, '0') : seasonNumber}x${String(episodeNumber + 1).padStart(episodePad ? 2 : 1, '0')}.html`;

    // Modificar enlaces si existen
    let prevLink = document.getElementById("prev-link");
    let nextLink = document.getElementById("next-link");

    if (prevLink && prevEpisode) {
        prevLink.href = prevEpisode;
    } else if (prevLink) {
        prevLink.style.display = "none";
    }

    if (nextLink) {
        nextLink.href = nextEpisode;
    }
}

function toggleChapters(seasonId) {
    const chapters = document.getElementById(seasonId);
    chapters.style.display = chapters.style.display === 'none' ? 'flex' : 'none';
}

function generateChapters(temporada, cantidad) {
    let chaptersHTML = '';
    for (let i = 1; i <= cantidad; i++) {
        chaptersHTML += `<a href="temporada${temporada}/capitulo${i}.html" class="chapter-btn">Capítulo ${i}</a>`;
    }
    return chaptersHTML;
}

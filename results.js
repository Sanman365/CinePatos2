const resultsContainer = document.getElementById('resultsContainer');
const searchResults = JSON.parse(localStorage.getItem('searchResults'));

if (searchResults && searchResults.length > 0) {
    searchResults.forEach(video => {
        console.log("Cargando video:", video.title, "Link:", window.location.origin + "/" + video.link); // 🔍 Depuración
        
        const videoCard = document.createElement('div');
        videoCard.classList.add('image-gallery');
        videoCard.innerHTML = `
            <a href="${video.link}">
                <img src="${video.image}" alt="${video.title}">
            </a>
            <h3>${video.title}</h3>
        `;
        resultsContainer.appendChild(videoCard);
    });
} else {
    resultsContainer.innerHTML = '<p>No results found.</p>';
}

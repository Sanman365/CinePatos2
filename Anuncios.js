// Intercepta intentos de abrir nuevas ventanas y las cierra inmediatamente
(function () {
    const originalOpen = window.open;
    window.open = function (...args) {
        const newWindow = originalOpen.apply(this, args);
        if (newWindow) {
            console.warn("Ventana emergente detectada y cerrada.");
            newWindow.close();
        }
        return newWindow;
    };
})();

// Monitorea la apertura de nuevas pestañas en segundo plano
setInterval(() => {
    if (window.opener) {
        console.warn("Ventana emergente detectada. Cerrando...");
        window.close();
    }
}, 500);

// Bloquea cualquier script que intente ejecutarse en el DOM
document.addEventListener("DOMContentLoaded", function () {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === "SCRIPT") {
                    console.warn("Script bloqueado:", node.src || node.innerHTML);
                    node.remove(); // Elimina el script antes de ejecutarse
                }
            });
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
});

// Bloquea la apertura de nuevas ventanas desde el iframe
window.open = function () {
    console.warn("Intento de abrir una ventana bloqueado.");
    return null;
};

// Bloquea métodos que intentan abrir pop-ups
document.addEventListener("DOMContentLoaded", function () {
    const blockMethods = ["open", "showModalDialog"];

    blockMethods.forEach((method) => {
        if (window[method]) {
            window[method] = function () {
                console.warn(`Intento de ejecutar ${method} bloqueado.`);
                return null;
            };
        }
    });

    // Bloquea cualquier script que intente inyectarse
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

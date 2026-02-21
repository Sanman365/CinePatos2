// adblocker.js
class AdBlocker {
    constructor() {
        this.isActive = true;
        this.blockedAds = 0;
        this.blockedPopups = 0;
        this.adPatterns = [
            'ad',
            'ads',
            'banner',
            'popup',
            'sponsor',
            'promo',
            'advertisement',
            'advert',
            'doubleclick',
            'googleads',
            'partner',
            'affiliate'
        ];
        
        this.init();
    }

    init() {
        this.loadState();
        this.setupEventListeners();
        this.overrideWindowOpen();
        this.blockAds();
        this.observeDOMChanges();
    }

    loadState() {
        const savedState = localStorage.getItem('adBlockerActive');
        if (savedState !== null) {
            this.isActive = savedState === 'true';
        }
        this.updateUI();
    }

    setupEventListeners() {
        const toggleButton = document.getElementById('toggleAdBlocker');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleAdBlocker());
        }

        // Prevenir clics en elementos de anuncios
        document.addEventListener('click', (e) => this.preventAdClicks(e), true);
        
        // Bloquear nuevos elementos que podrían ser anuncios
        document.addEventListener('DOMNodeInserted', (e) => this.checkNewNode(e.target), false);
    }

    toggleAdBlocker() {
        this.isActive = !this.isActive;
        localStorage.setItem('adBlockerActive', this.isActive);
        this.updateUI();
        
        if (this.isActive) {
            this.blockAds();
            this.showNotification('Bloqueador de anuncios activado');
        } else {
            this.showNotification('Bloqueador de anuncios desactivado');
        }
    }

    updateUI() {
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.ad-blocker-status span:last-child');
        const toggleButton = document.getElementById('toggleAdBlocker');
        
        if (statusIndicator) {
            statusIndicator.className = `status-indicator ${this.isActive ? 'active' : 'inactive'}`;
        }
        
        if (statusText) {
            statusText.textContent = `Bloqueador de Anuncios: ${this.isActive ? 'ACTIVADO' : 'DESACTIVADO'}`;
        }
        
        if (toggleButton) {
            toggleButton.textContent = this.isActive ? 'Desactivar Bloqueador' : 'Activar Bloqueador';
            toggleButton.className = `ad-blocker-toggle ${this.isActive ? '' : 'inactive'}`;
        }
    }

    overrideWindowOpen() {
        // Prevenir ventanas emergentes
        const originalWindowOpen = window.open;
        window.open = (...args) => {
            if (this.isActive && this.isAdUrl(args[0])) {
                this.blockedPopups++;
                this.updateStats();
                this.showNotification('¡Ventana emergente bloqueada!');
                console.log('Popup bloqueado:', args[0]);
                return null;
            }
            return originalWindowOpen.apply(window, args);
        };
    }

    isAdUrl(url) {
        if (!url) return false;
        url = url.toLowerCase();
        return this.adPatterns.some(pattern => url.includes(pattern));
    }

    isAdElement(element) {
        if (!element) return false;
        
        // Verificar clases
        if (element.className && typeof element.className === 'string') {
            const classes = element.className.toLowerCase();
            if (this.adPatterns.some(pattern => classes.includes(pattern))) {
                return true;
            }
        }
        
        // Verificar ID
        if (element.id && typeof element.id === 'string') {
            const id = element.id.toLowerCase();
            if (this.adPatterns.some(pattern => id.includes(pattern))) {
                return true;
            }
        }
        
        // Verificar atributos
        const attributes = ['data-ad', 'data-ads', 'data-advertisement'];
        for (const attr of attributes) {
            if (element.hasAttribute(attr)) {
                return true;
            }
        }
        
        return false;
    }

    blockAds() {
        if (!this.isActive) return;
        
        // Buscar y bloquear elementos que parecen anuncios
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            if (this.isAdElement(element)) {
                this.blockAdElement(element);
            }
        });
        
        // Bloquear iframes sospechosos
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            if (this.isAdElement(iframe)) {
                this.blockAdElement(iframe);
            }
        });
    }

    blockAdElement(element) {
        if (!element || element.hasAttribute('data-ad-blocked')) return;
        
        // Guardar referencia al elemento original
        element.setAttribute('data-ad-blocked', 'true');
        
        // Ocultar el elemento
        element.style.display = 'none';
        element.style.visibility = 'hidden';
        
        // Incrementar contador
        this.blockedAds++;
        this.updateStats();
        
        console.log('Anuncio bloqueado:', element);
    }

    checkNewNode(node) {
        if (!this.isActive || !node || !node.nodeType === Node.ELEMENT_NODE) return;
        
        // Verificar si el nuevo nodo es un anuncio
        if (this.isAdElement(node)) {
            this.blockAdElement(node);
        }
        
        // Verificar elementos hijos
        if (node.querySelectorAll) {
            const adElements = node.querySelectorAll('*');
            adElements.forEach(element => {
                if (this.isAdElement(element)) {
                    this.blockAdElement(element);
                }
            });
        }
    }

    preventAdClicks(event) {
        if (!this.isActive) return;
        
        // Prevenir clics en elementos que parecen anuncios
        const target = event.target;
        if (this.isAdElement(target)) {
            event.preventDefault();
            event.stopPropagation();
            this.showNotification('¡Clic en anuncio bloqueado!');
        }
    }

    observeDOMChanges() {
        // Observar cambios en el DOM para detectar nuevos anuncios
        const observer = new MutationObserver((mutations) => {
            if (!this.isActive) return;
            
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    this.checkNewNode(node);
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    updateStats() {
        const adCountSpan = document.getElementById('adCount');
        const popupCountSpan = document.getElementById('popupCount');
        
        if (adCountSpan) {
            adCountSpan.textContent = this.blockedAds;
        }
        
        if (popupCountSpan) {
            popupCountSpan.textContent = this.blockedPopups;
        }
        
        // Guardar estadísticas
        localStorage.setItem('blockedAds', this.blockedAds);
        localStorage.setItem('blockedPopups', this.blockedPopups);
    }

    showNotification(message) {
        // Eliminar notificaciones anteriores
        const oldNotifications = document.querySelectorAll('.ad-blocked-message');
        oldNotifications.forEach(notif => notif.remove());
        
        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = 'ad-blocked-message';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Función para simular anuncios (solo para demostración)
window.simulateAd = function(type) {
    const adBlocker = window.adBlockerInstance;
    
    switch(type) {
        case 'popup':
            window.open('https://anuncio-ejemplo.com', '_blank');
            break;
            
        case 'banner':
            const banner = document.createElement('div');
            banner.className = 'demo-ad-banner';
            banner.innerHTML = '<img src="https://via.placeholder.com/728x90" alt="Anuncio de demostración">';
            banner.style.position = 'fixed';
            banner.style.bottom = '10px';
            banner.style.left = '10px';
            banner.style.zIndex = '9999';
            document.body.appendChild(banner);
            
            if (adBlocker && adBlocker.isActive) {
                setTimeout(() => adBlocker.checkNewNode(banner), 100);
            }
            break;
            
        case 'video':
            const videoAd = document.createElement('div');
            videoAd.className = 'video-ad-overlay';
            videoAd.innerHTML = '<p style="background: rgba(0,0,0,0.8); color: white; padding: 10px;">Anuncio de video</p>';
            videoAd.style.position = 'absolute';
            videoAd.style.top = '50%';
            videoAd.style.left = '50%';
            videoAd.style.transform = 'translate(-50%, -50%)';
            videoAd.style.zIndex = '9999';
            
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.style.position = 'relative';
                videoContainer.appendChild(videoAd);
                
                if (adBlocker && adBlocker.isActive) {
                    setTimeout(() => adBlocker.checkNewNode(videoAd), 100);
                }
            }
            break;
    }
};

// Inicializar el bloqueador cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    window.adBlockerInstance = new AdBlocker();
});
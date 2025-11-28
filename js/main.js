// Archivo principal - Configuración y estado global

// Configuración de videos
// El usuario debe reemplazar estos nombres con los archivos de video reales
const VIDEO_CONFIG = [
    { id: 1, src: 'videos/video1.mp4', title: 'Video 1' },
    { id: 2, src: 'videos/video2.mp4', title: 'Video 2' },
    { id: 3, src: 'videos/video3.mp4', title: 'Video 3' },
    { id: 4, src: 'videos/video4.mp4', title: 'Video 4' },
    { id: 5, src: 'videos/video5.mp4', title: 'Video 5' },
    { id: 6, src: 'videos/video6.mp4', title: 'Video 6' },
    { id: 7, src: 'videos/video7.mp4', title: 'Video 7' },
    { id: 8, src: 'videos/video8.mp4', title: 'Video 8' },
    // Puedes agregar hasta 10 videos
    // { id: 9, src: 'videos/video9.mp4', title: 'Video 9' },
    // { id: 10, src: 'videos/video10.mp4', title: 'Video 10' },
];

// Estado global de la aplicación
const AppState = {
    giftOpened: false,
    currentVideo: null,
    confettiActive: false
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎁 Aplicación de Regalo Iniciada');
    
    // Inicializar los módulos
    initGiftBox();
    initCards();
    initVideoPlayer();
    
    // Precarga opcional de videos (comentado para no consumir mucho ancho de banda)
    // preloadVideos();
});

// Función para precarga de videos (opcional)
function preloadVideos() {
    VIDEO_CONFIG.forEach(video => {
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.src = video.src;
    });
}

// Utilidad: esperar un tiempo específico
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Utilidad: generar número aleatorio en un rango
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Utilidad: obtener un elemento del DOM de forma segura
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Elemento no encontrado: ${selector}`);
    }
    return element;
}

// Exportar configuración y utilidades
window.AppState = AppState;
window.VIDEO_CONFIG = VIDEO_CONFIG;
window.wait = wait;
window.random = random;
window.getElement = getElement;


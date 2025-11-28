// configuracion de videos, se llaman de la carpeta video
const VIDEOS = [
    { id: 1, src: 'videos/video1.mp4', title: 'Esposito' },
    { id: 2, src: 'videos/video2.mp4', title: 'Mamá' },
    { id: 3, src: 'videos/video3.mp4', title: 'Papá' },
    { id: 4, src: 'videos/video4.mp4', title: 'Juan Diego' },
    { id: 5, src: 'videos/video5.mp4', title: 'Tu hermana favorita' },
    { id: 6, src: 'videos/video6.mp4', title: 'Kathy y Lambo' },
    { id: 7, src: 'videos/video7.mp4', title: 'Jenny' },
    { id: 8, src: 'videos/video8.mp4', title: 'Cesar' },
    { id: 9, src: 'videos/video9.mp4', title: 'Mary' },
    { id: 10, src: 'videos/video10.mp4', title: 'Danna' },
    { id: 11, src: 'videos/video11.mp4', title: 'Hayde' },
    { id: 12, src: 'videos/video12.mp4', title: 'Elvis' },
    { id: 13, src: 'videos/video13.mp4', title: 'Luis' },
    { id: 14, src: 'videos/video14.mp4', title: 'Blanqui C.' },
    { id: 15, src: 'videos/video15.mp4', title: 'Karen' },
    { id: 16, src: 'videos/video16.mp4', title: 'Diego Gald.' },
    { id: 17, src: 'videos/video17.mp4', title: 'Tito y Andy' },
    { id: 18, src: 'videos/video18.mp4', title: 'Adriana' },
];

document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const welcomeScreen = document.getElementById('welcome-screen');
    const gridScreen = document.getElementById('grid-screen');
    const finalLetterScreen = document.getElementById('final-letter-screen');
    const giftBtn = document.getElementById('gift-btn');
    const videoGrid = document.getElementById('video-grid');
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('main-player');
    const closeModalBtn = document.getElementById('close-modal');
    const videoSource = player.querySelector('source');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const btnFinalSurprise = document.getElementById('btn-final-surprise');
    const giantEnvelope = document.getElementById('giant-envelope');
    const backToGridBtn = document.getElementById('back-to-grid');
    const btnBackHome = document.getElementById('btn-back-home'); // Nuevo botón
    const gissiImg = document.getElementById('gissi-img');
    const dogsContainer = document.getElementById('dogs-container');
    const birthdayContainer = document.getElementById('birthday-container');
    
    // Control de Música
    const bgMusic = document.getElementById('bg-music');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeControlContainer = document.querySelector('.volume-control-container');
    const volumeIconContainer = document.querySelector('.volume-icon'); // Contenedor del icono
    
    // aqui volumen por defecto
    let userVolume = 0.2;
    bgMusic.volume = userVolume;
    volumeSlider.value = userVolume;

    // Función para actualizar icono
    function updateVolumeIcon(vol) {
        if (vol <= 0) {
            volumeIconContainer.classList.add('muted');
        } else {
            volumeIconContainer.classList.remove('muted');
        }
    }

    // cambios del volumen automatico
    volumeSlider.addEventListener('input', (e) => {
        userVolume = parseFloat(e.target.value);
        bgMusic.volume = userVolume;
        updateVolumeIcon(userVolume);
    });

    // Inicializar icono
    updateVolumeIcon(userVolume);

    // bloqueo del navegador , prevencion jaja
    bgMusic.play().catch(error => {
        console.log("Autoplay bloqueado, esperando interacción...", error);
    });

    // Pantalla de Bienvenida 
    giftBtn.addEventListener('click', () => {
        // La musica inicia al darle click
        bgMusic.play().catch(e => console.log("Error al reproducir música:", e));
        
        // Mostrar control de volumen
        if (volumeControlContainer) {
            volumeControlContainer.classList.add('visible');
        }

        fireConfetti();
        welcomeScreen.classList.remove('active');
        // Ocultar imágenes 
        if(dogsContainer) dogsContainer.style.opacity = '0';
        if(birthdayContainer) birthdayContainer.style.opacity = '0';

        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            if(dogsContainer) dogsContainer.style.display = 'none';
            if(birthdayContainer) birthdayContainer.style.display = 'none';
            
            gridScreen.style.display = 'flex';
            void gridScreen.offsetWidth;
            gridScreen.classList.add('active');
        }, 800);
        renderGrid();
    });

    // aqui se muestran los sobres
    function renderGrid() {
        videoGrid.innerHTML = '';
        
        VIDEOS.forEach((video, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'envelope-wrapper';
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'translateY(20px)';
            wrapper.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                wrapper.style.opacity = '1';
                wrapper.style.transform = 'translateY(0)';
            }, index * 100 + 500);

            // sobres y los corazones que salen de ellos
            wrapper.innerHTML = `
                <div class="envelope">
                    <div class="envelope-flap"></div>
                    <div class="flying-hearts">
                        <span class="heart-particle">❤️</span>
                        <span class="heart-particle">🩷</span>
                        <span class="heart-particle">💜</span>
                        <span class="heart-particle">💖</span>
                        <span class="heart-particle">❤️</span>
                        <span class="heart-particle">🩷</span>
                        <span class="heart-particle">💜</span>
                        <span class="heart-particle">💖</span>
                    </div>
                    <div class="envelope-heart"></div>
                </div>
                <div class="envelope-title">${video.title}</div>
            `;
            
            // animacion previa 
            wrapper.onclick = () => handleEnvelopeClick(wrapper, video);
            
            videoGrid.appendChild(wrapper);
        });
    }

    function handleEnvelopeClick(wrapper, video) {
        const envelope = wrapper.querySelector('.envelope');
        
        // evitando el doble click, por si ya abrió 
        if(envelope.classList.contains('opening')) return;
        
        // activando anmimaciones, cuando abre y muestra los corazones
        envelope.classList.add('opening');
        
        //cuando termina la animacion muestra el video
        setTimeout(() => {
            openModal(video);
            setTimeout(() => {
                envelope.classList.remove('opening');
            }, 1000);
        }, 1000);
    }

    // Confeti
    function fireConfetti() {
        if (!confettiCanvas) return;
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 100;
        const colors = ['#ba68c8', '#7b1fa2', '#ea80fc', '#e040fb', '#ffd740'];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                r: Math.random() * 6 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15 - 5,
                gravity: 0.25,
                opacity: 1
            });
        }
        
        function render() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let activeParticles = false;
            particles.forEach(p => {
                if (p.opacity > 0) {
                    activeParticles = true;
                    p.vy += p.gravity;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.opacity -= 0.008;
                    ctx.globalAlpha = p.opacity;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            if (activeParticles) requestAnimationFrame(render);
            else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
        render();
    }

    window.addEventListener('resize', () => {
        if(confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
    });

    //muestra el video
    function openModal(video) {
        // Bajar volumen el volumen de la musica para esuchar el video
        bgMusic.volume = 0.02;

        videoSource.src = video.src;
        player.load();
        modal.classList.add('active');
        player.play().catch(e => console.log("Autoplay prevenido:", e));
    }

    function closeModal() {
        modal.classList.remove('active');
        
        // Restaurando el volumen original 
        bgMusic.volume = userVolume;

        setTimeout(() => {
            player.pause();
            player.currentTime = 0;
            videoSource.src = "";
        }, 300);
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // cierre automatico al terminal el video
    player.addEventListener('ended', () => {
        closeModal();
    });

    //boton de sorpresa final
    btnFinalSurprise.addEventListener('click', () => {
        gridScreen.classList.remove('active');
        setTimeout(() => {
            gridScreen.style.display = 'none';
            finalLetterScreen.style.display = 'flex';
            void finalLetterScreen.offsetWidth;
            finalLetterScreen.classList.add('active');
            // Prevenir scroll en el body
            document.body.classList.add('no-scroll');
        }, 500);
    });

    // para abrir la carta gigante
    giantEnvelope.addEventListener('click', () => {
        giantEnvelope.classList.toggle('open');
        if (gissiImg) gissiImg.classList.toggle('visible');
    });

    // boton para volver al inicio (Nuevo)
    if (btnBackHome) {
        btnBackHome.addEventListener('click', () => {
            gridScreen.classList.remove('active');
            
            // Ocultar control de volumen al volver al inicio
            if (volumeControlContainer) {
                volumeControlContainer.classList.remove('visible');
            }

            setTimeout(() => {
                gridScreen.style.display = 'none';
                welcomeScreen.style.display = 'flex'; // Restaurar flex
                void welcomeScreen.offsetWidth;
                welcomeScreen.classList.add('active');
                
                // Mostrar imágenes de bienvenida
                if(dogsContainer) {
                    dogsContainer.style.display = 'block';
                    setTimeout(() => dogsContainer.style.opacity = '1', 10);
                }
                if(birthdayContainer) {
                    birthdayContainer.style.display = 'block';
                    setTimeout(() => birthdayContainer.style.opacity = '1', 10);
                }
            }, 500);
        });
    }

    //boton para volver al inicio (Desde carta final a grid)
    backToGridBtn.addEventListener('click', () => {
        finalLetterScreen.classList.remove('active');
        if (gissiImg) gissiImg.classList.remove('visible');
        // Restaurar scroll en el body
        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            giantEnvelope.classList.remove('open');
            finalLetterScreen.style.display = 'none';
            gridScreen.style.display = 'flex';
            void gridScreen.offsetWidth;
            gridScreen.classList.add('active');
        }, 500);
    });
});

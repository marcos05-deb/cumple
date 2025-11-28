# 🎁 Regalo de Cumpleaños - Estilo Moderno

Una experiencia web minimalista y elegante para compartir videos de recuerdo.

## 📁 Estructura

```
leslie/
├── index.html          # Página principal
├── styles/
│   └── style.css       # Todos los estilos (Diseño Flat)
├── js/
│   └── app.js          # Lógica de la aplicación
└── videos/             # Carpeta para tus videos mp4
```

## 🚀 Cómo Usar

1.  **Agrega tus videos:** Pon tus archivos `.mp4` en la carpeta `videos/`.
    *   Nombres recomendados: `video1.mp4`, `video2.mp4`, etc.

2.  **Configura los títulos:**
    *   Abre `js/app.js`.
    *   Edita la lista `VIDEOS` al inicio del archivo:
    ```javascript
    const VIDEOS = [
        { id: 1, src: 'videos/video1.mp4', title: 'Un título bonito' },
        // ...
    ];
    ```

3.  **Abre la página:** Haz doble clic en `index.html`.

## ✨ Personalización (Opcional)

Puedes cambiar los colores fácilmente en `styles/style.css` editando las variables al principio del archivo:

```css
:root {
    --accent-color: #6366f1; /* Cambia este color */
    --gift-color: #ec4899;   /* O este otro */
}
```

¡Disfruta!

# Fútbol 1

**Fútbol 1** es una **Progressive Web App (PWA)** diseñada para seguir información, estadísticas, partidos y ligas de fútbol de todo el mundo en tiempo real. Construida con **Preact** y **Vite**, surge como un homenaje al viejo diseño de Promiedos mezclado con un toque moderno y lo mas ligero posible para garantizar una carga instantánea y una experiencia fluida.

---

##  Características Principales

* **Seguimiento Global:** Información detallada de ligas y copas nacionales e internacionales (Fixture, Tablas de posiciones, cruces/brackets e historial).
* **Vistas de Partidos en Detalle:** Cabecera interactiva, línea de tiempo de eventos dinámicos, formaciones en cancha visual, estadísticas avanzadas y barra de posesión.
* **Perfiles de Jugadores y Equipos:** Datos biográficos, transferencias, palmarés, plantillas dinámicas y estadísticas de rendimiento individual.
* **Sección de Contenido Multimedia:** Artículos de noticias y reproducción de videos/highlights de los partidos.
* **Experiencia PWA Completa:** Instalable en dispositivos móviles y de escritorio, optimizada para funcionar con fluidez gracias al bajísimo *footprint* de Preact.
* **Gestión de Estado Eficiente:** Implementación nativa de **Preact Signals** para un manejo del estado reactivo, granular y sin re-renders innecesarios.

---

##  Stack

* **Frontend Core:** [Preact](https://preactjs.com/) (Alternativa rápida y ligera a React de solo 3kB).
* **Herramienta de Construcción:** [Vite](https://vite.dev/) (Bundler ultra rápido).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Diseño responsivo, fluido y modular).
* **Manejo de Estado:** [Preact Signals](https://preactjs.com/guide/v10/signals) (Estado global reactivo).
* **Despliegue:** Optimizado para [Vercel](https://vercel.com/).

---

##  Instalación local

`git clone https://github.com/gabrielJGB/futbol-1`
`cd futbol-1`  
`npm run dev` - Inicia un servidor de desarrollo local en http://localhost:5173/ 
`npm run build` - Compila para producción
`npm run preview` -  Inicia un servidor en http://localhost:4173/ para probar localmente la compilación de producción

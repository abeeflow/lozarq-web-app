# Lozarq Estudio - Web Application

Aplicación web para Lozarq Estudio de Arquitectura e Interiorismo.

## Tecnologías

- **React 19** con TypeScript
- **Vite** como build tool
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Supabase** para backend (base de datos y storage)
- **Google Calendar** para sistema de citas

## Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase
- Cuenta de Google Calendar

## Instalación Local

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd lozarq-web-app
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Completar con tus credenciales de Supabase y Google Calendar

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

## Deployment en Vercel

### Paso 1: Preparar el repositorio

Asegúrate de que tu código esté en un repositorio Git (GitHub, GitLab, o Bitbucket).

### Paso 2: Importar proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en "Add New Project"
3. Importa tu repositorio de Git
4. Vercel detectará automáticamente que es un proyecto Vite

### Paso 3: Configurar variables de entorno

En la sección "Environment Variables" de Vercel, añade:

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
VITE_CALENDLY_URL=tu_url_de_google_calendar
```

### Paso 4: Deploy

1. Click en "Deploy"
2. Vercel construirá y desplegará automáticamente tu aplicación
3. Recibirás una URL de producción cuando termine

### Configuración Automática

El proyecto ya incluye:
- ✅ `vercel.json` - Configuración de rewrites para SPA
- ✅ `package.json` - Scripts de build correctos
- ✅ `.gitignore` - Archivos excluidos del repositorio
- ✅ `.env.example` - Plantilla de variables de entorno

## Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── hooks/         # Custom React hooks
├── services/      # Servicios (Supabase, etc.)
├── types/         # Definiciones de TypeScript
└── App.tsx        # Componente principal
```

## Características

- ✨ Responsive design (móvil, tablet, desktop)
- 🎨 Dark mode support
- 🖼️ Galería de proyectos con categorías
- 📅 Sistema de reserva de citas con Google Calendar
- 🔐 Panel de administración para gestión de proyectos
- 📱 Optimización de carga con lazy loading
- 🚀 Deploy automático con Vercel
- 🔍 **SEO optimizado** con meta tags dinámicos por página
- ⚡ **Performance optimizado** - PageSpeed Score 95-99/100
- 🌐 Open Graph y Twitter Cards para compartir en redes sociales
- 🗺️ Sitemap.xml y robots.txt configurados
- 🎯 Core Web Vitals optimizados (LCP, FID, CLS)

## Performance & SEO

Este proyecto está optimizado para obtener excelentes resultados en PageSpeed Insights:

- **Performance**: 95-99/100
- **SEO**: 95-100/100
- **Best Practices**: 100/100
- **Accessibility**: 100/100

### Optimizaciones Implementadas:
- Meta tags completos (Open Graph, Twitter Cards)
- SEO dinámico por página con hook personalizado
- Preconnect a dominios externos
- Font loading optimizado con `display=swap`
- Image lazy loading y fetchPriority
- Width/height en imágenes para evitar CLS
- Sitemap.xml y robots.txt
- Canonical URLs

Ver [SEO_OPTIMIZATIONS.md](SEO_OPTIMIZATIONS.md) para detalles completos.

## Soporte

Para problemas o consultas, contactar al equipo de desarrollo.

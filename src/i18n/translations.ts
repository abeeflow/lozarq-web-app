export const translations = {
  es: {
    // Nav
    nav: {
      home: 'Home',
      proyectos: 'Proyectos',
      servicios: 'Servicios',
      estudio: 'Estudio',
      contacto: 'Contacto',
    },
    // Home
    home: {
      tagline: 'ARQUITECTURA E INTERIORISMO',
      title: 'Arquitectura y Diseño de Interiores que Inspira',
      description: 'Estudio creativo especializado en transformar espacios con funcionalidad y estética. Llevamos tu idea desde el concepto hasta la realidad.',
      cta: 'Conoce nuestros proyectos',
    },
    // Proyectos
    proyectos: {
      categorias: 'Categorias',
      volver: 'Volver',
      volverCategorias: 'Categorias',
      cargando: 'Cargando...',
      noProyectos: 'No hay proyectos en esta categoría',
      volverAProyectos: 'Volver a proyectos',
    },
    // Proyecto detalle
    proyectoDetalle: {
      volver: 'Volver',
      cargando: 'Cargando...',
      noEncontrado: 'Proyecto no encontrado',
      volverAProyectos: 'Volver a proyectos',
    },
    // Servicios
    servicios: {
      tagline: 'NUESTROS SERVICIOS',
      subtitulo: 'Combinamos creatividad y experiencia para transformar espacios.',
      disenoInterior: 'Diseño Interior',
      disenoInteriorDesc: 'Transformación de espacios para elevar estética, funcionalidad y confort, creando ambientes que reflejan personalidad y estilo.',
      consultoria: 'Consultoría diseño',
      consultoriaDesc: 'Asesoría profesional para tomar decisiones claras sobre materiales, distribución, iluminación y acabados, optimizando el resultado final de cada proyecto.',
      mobiliario: 'Mobiliario',
      mobiliarioDesc: 'Diseño y fabricación de mobiliario a medida, creado para adaptarse al espacio y potenciar su uso con piezas únicas, funcionales y atemporales.',
      arquitectura: 'Arquitectura & Construcción',
      arquitecturaDesc: 'Desarrollo integral de proyectos desde la idea hasta la ejecución, asegurando soluciones técnicas eficientes, materiales de calidad y construcción responsable.',
      ctaTexto: '¿Tienes una idea en mente? Hablemos de cómo podemos ayudarte a hacerla realidad.',
      ctaBoton: 'Iniciar un Proyecto',
    },
    // Estudio
    estudio: {
      tagline: 'SOBRE NOSOTROS',
      parrafo1: 'Lozarq Estudio es un estudio de arquitectura e interiorismo ubicado en Trujillo, especializado en diseñar y transformar espacios residenciales, comerciales y corporativos. Ofrecen un servicio integral que va desde la concepción del concepto hasta la ejecución final de la obra, incluyendo diseño arquitectónico, remodelaciones, selección de materiales y mobiliario a medida.',
      parrafo2: 'Se distinguen por ofrecer un trato cercano, transparente y profesional, diseñando cada proyecto como único, sin plantillas genéricas. Su objetivo es crear ambientes que reflejen la identidad del usuario y mejoren su experiencia en el espacio.',
    },
    // Contacto
    contacto: {
      tagline: 'CONTACTO',
      subtitulo: 'Selecciona el dia y hora que mejor te convenga',
    },
    // Footer
    footer: {
      derechos: 'Todos los derechos reservados.',
    },
  },
  en: {
    // Nav
    nav: {
      home: 'Home',
      proyectos: 'Projects',
      servicios: 'Services',
      estudio: 'Studio',
      contacto: 'Contact',
    },
    // Home
    home: {
      tagline: 'ARCHITECTURE & INTERIOR DESIGN',
      title: 'Architecture and Interior Design that Inspires',
      description: 'Creative studio specialized in transforming spaces with functionality and aesthetics. We take your idea from concept to reality.',
      cta: 'Discover our projects',
    },
    // Proyectos
    proyectos: {
      categorias: 'Categories',
      volver: 'Back',
      volverCategorias: 'Categories',
      cargando: 'Loading...',
      noProyectos: 'No projects in this category',
      volverAProyectos: 'Back to projects',
    },
    // Proyecto detalle
    proyectoDetalle: {
      volver: 'Back',
      cargando: 'Loading...',
      noEncontrado: 'Project not found',
      volverAProyectos: 'Back to projects',
    },
    // Servicios
    servicios: {
      tagline: 'OUR SERVICES',
      subtitulo: 'We combine creativity and experience to transform spaces.',
      disenoInterior: 'Interior Design',
      disenoInteriorDesc: 'Space transformation to elevate aesthetics, functionality and comfort, creating environments that reflect personality and style.',
      consultoria: 'Design Consulting',
      consultoriaDesc: 'Professional advice to make clear decisions about materials, layout, lighting and finishes, optimizing the final result of each project.',
      mobiliario: 'Furniture',
      mobiliarioDesc: 'Custom furniture design and manufacturing, created to adapt to the space and enhance its use with unique, functional and timeless pieces.',
      arquitectura: 'Architecture & Construction',
      arquitecturaDesc: 'Comprehensive project development from idea to execution, ensuring efficient technical solutions, quality materials and responsible construction.',
      ctaTexto: 'Have an idea in mind? Let\'s talk about how we can help you make it a reality.',
      ctaBoton: 'Start a Project',
    },
    // Estudio
    estudio: {
      tagline: 'ABOUT US',
      parrafo1: 'Lozarq Estudio is an architecture and interior design studio based in Trujillo, specialized in designing and transforming residential, commercial and corporate spaces. They offer a comprehensive service from concept to final execution, including architectural design, remodeling, material selection and custom furniture.',
      parrafo2: 'They stand out for offering a close, transparent and professional approach, designing each project as unique, without generic templates. Their goal is to create environments that reflect the user\'s identity and improve their experience in the space.',
    },
    // Contacto
    contacto: {
      tagline: 'CONTACT',
      subtitulo: 'Select the day and time that suits you best',
    },
    // Footer
    footer: {
      derechos: 'All rights reserved.',
    },
  },
} as const;

export type Language = 'es' | 'en';
export type Translations = (typeof translations)[Language];

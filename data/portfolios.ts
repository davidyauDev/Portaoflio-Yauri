export type Portfolio = {
  slug: string
  title: string
  description: string
  highlights?: string[]
  website?: string
  tags?: string[]
  images: PortfolioImage[]
}

type PortfolioMeta = Omit<Portfolio, 'images'>

export type PortfolioImage = {
  url: string
  title: string
}

const portfolioMeta: PortfolioMeta[] = [
  {
    slug: 'amparo',
    title: 'Amparo',
    description:
      'Sistema tipo “Salon Control” para gestionar un negocio de belleza: UI/UX claro, paneles de control y flujos pensados para operación diaria.',
    highlights: [
      'Control de servicios, turnos y operaciones en un solo lugar',
      'Paneles y pantallas optimizadas para uso diario',
      'UI/UX personalizado para rapidez y claridad'
    ],
    tags: ['Web app', 'Operaciones', 'UI/UX']
  },
  {
    slug: 'trend',
    title: 'Trend Belleza',
    description:
      'Página web personalizada para la agencia de viajes Trend Belleza: UI/UX a medida, estética floral y una experiencia pensada para convertir visitas en consultas.',
    highlights: [
      'UI/UX personalizado con identidad floral',
      'Secciones a medida para servicios, destinos y promociones',
      'Diseño responsive, performance y enfoque en conversión'
    ],
    tags: ['Sitio web', 'UI', 'UX']
  },
  {
    slug: 'juegosjhigger',
    title: 'Jhigger',
    description:
      'Sitio web para Jhigger con vitrina de proyectos y contenido visual: UI/UX personalizado, navegación clara y una presentación llamativa para destacar el portafolio.',
    highlights: [
      'UI/UX personalizado con foco en claridad y velocidad',
      'Sección de proyectos con estructura y jerarquía visual',
      'Optimización para mostrar trabajo y generar confianza'
    ],
    website: 'https://www.juegosjhigger.pe',
    tags: ['Sitio web', 'Portafolio', 'UI/UX']
  },
  {
    slug: 'serlung',
    title: 'Serlung',
    description:
      'Sistema web para control de historial de pacientes: registro desde la plataforma, gestión clínica diaria y generación de recetas médicas e informes con acceso rápido para el personal.',
    highlights: [
      'Registro y seguimiento de pacientes desde la plataforma',
      'Historial clínico, recetas médicas e informes en un solo flujo',
      'Panel para personal con datos claros y acciones rápidas'
    ],
    website: 'https://serlungsrl.com',
    tags: ['Web app', 'Salud', 'Dashboard']
  },
  {
    slug: 'dargui',
    title: 'Dargui',
    description:
      'Plataforma de cotización para Dargui Tours: de la cotización a la venta, con procesos ordenados para agencias de viaje e integración de facturación para cerrar ventas más rápido.',
    highlights: [
      'Flujo completo de cotización a venta para agencias',
      'Facturación integrada y control del proceso comercial',
      'Experiencia optimizada para operadores y administración'
    ],
    website: 'https://travel.darguitours.com',
    tags: ['Agencias', 'Web app', 'Facturación']
  },
  {
    slug: 'cechriza',
    title: 'Cechriza',
    description:
      'Plataforma de asistencia para Cechriza: soporte técnico y administrativo, asignación y seguimiento de solicitudes, con automatización de comunicaciones por correo y procesos internos más ágiles.',
    highlights: [
      'Gestión de solicitudes para técnicos y administrativos',
      'Derivaciones, seguimiento y trazabilidad por caso',
      'Automatización de correos y comunicación operativa'
    ],
    website: 'https://asistencia.cechriza.com',
    tags: ['Soporte', 'Operaciones', 'Automatización']
  },
  {
    slug: 'cechriza-mesadeayuda',
    title: 'Cechriza - Mesa de Ayuda',
    description:
      'Mesa de ayuda para control de tickets: registro, asignación y derivaciones, con notificaciones por WhatsApp y correo para mantener a todos informados y reducir tiempos de atención.',
    highlights: [
      'Control de tickets con estados, derivaciones y responsables',
      'Notificaciones por WhatsApp y correo para mejorar respuesta',
      'Mucho trabajo de colas, envíos y automatización de mensajes'
    ],
    website: 'https://mesadeayuda.cechriza.com',
    tags: ['Mesa de ayuda', 'Tickets', 'Notificaciones']
  }
]

const imageModules = import.meta.glob('../app/assets/images/*/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

function cleanTitleFromFilename(filename: string): string {
  const withoutExt = filename.replace(/\.[a-z0-9]+$/i, '')
  const normalized = withoutExt
    .replace(/^FireShot Capture \d+ -\s*/i, '')
    .replace(/\s*-\s*\[[^\]]+\]\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()

  return normalized || 'Screenshot'
}

function filenameFromPath(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 1] || path
}

function imagesFor(slug: string): PortfolioImage[] {
  const prefix = `../app/assets/images/${slug}/`

  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url]) => {
      const filename = filenameFromPath(path)
      return {
        url,
        title: cleanTitleFromFilename(filename)
      }
    })
}

function defaultMetaFor(slug: string): PortfolioMeta {
  return {
    slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: 'Galeria de capturas.'
  }
}

const metaBySlug = new Map(portfolioMeta.map(meta => [meta.slug, meta] as const))
const metaSlugs = portfolioMeta.map(meta => meta.slug)

const discoveredSlugs = Array.from(new Set(Object.keys(imageModules)
  .map(path => path.match(/^..\/app\/assets\/images\/([^/]+)\//)?.[1])
  .filter(Boolean))) as string[]

const extraSlugs = discoveredSlugs
  .filter(slug => !metaBySlug.has(slug))
  .sort((a, b) => a.localeCompare(b))

const allSlugs = [...metaSlugs, ...extraSlugs]

export const portfolios: Portfolio[] = allSlugs.map((slug) => {
  const meta = metaBySlug.get(slug) ?? defaultMetaFor(slug)

  return {
    ...meta,
    images: imagesFor(slug)
  }
})

export const portfoliosBySlug: Record<string, Portfolio> = Object.fromEntries(
  portfolios.map(p => [p.slug, p])
)

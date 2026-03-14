export type Portfolio = {
  slug: string
  title: string
  eyebrow?: string
  description: string
  highlights?: string[]
  detailCards?: PortfolioDetail[]
  website?: string
  tags?: string[]
  images: PortfolioImage[]
}

type PortfolioMeta = Omit<Portfolio, 'images'>

export type PortfolioDetail = {
  label: string
  value: string
}

export type PortfolioImage = {
  url: string
  title: string
}

const portfolioMeta: PortfolioMeta[] = [
  {
    slug: 'juegosjhigger',
    title: 'Jhigger',
    description:
      'Sitio corporativo para Jhigger orientado a catálogo y conversión, con una experiencia visual potente, navegación clara y una implementación moderna sobre Next.js.',
    highlights: [
      'Stack moderno con Next.js, Tailwind CSS y entrega optimizada de imágenes',
      'Catálogo visual de productos, CTAs directos a contacto y presencia fuerte de marca',
      'UX/UI enfocado en mobile, claridad comercial y confianza para clientes nuevos'
    ],
    detailCards: [
      { label: 'Estado', value: 'Sitio en producción' },
      { label: 'Rol', value: 'UX/UI, Figma y Frontend' },
      { label: 'Objetivo', value: 'Catálogo visual y conversión' }
    ],
    website: 'https://www.juegosjhigger.pe',
    tags: ['Next.js', 'Tailwind CSS', 'Cloudinary', 'UX/UI', 'Figma']
  },
  {
    slug: 'cechriza-mesadeayuda',
    title: 'Cechriza - Sistema Interno de Mesa de Ayuda',
    description:
      'Sistema interno de la empresa para mesa de ayuda y control de tickets: registro, asignación y derivaciones, con integración de APIs internas provistas por la empresa, notificaciones por WhatsApp y correo para mantener a todos informados y reducir tiempos de atención.',
    highlights: [
      'Sistema interno para centralizar solicitudes y flujo de atención de la empresa',
      'Control de tickets con estados, derivaciones y responsables',
      'Integración con APIs internas provistas por la empresa para conectar procesos y datos',
      'Notificaciones por WhatsApp y correo para mejorar respuesta',
      'Mucho trabajo de colas, envíos y automatización de mensajes'
    ],
    tags: ['Mesa de ayuda', 'Tickets', 'Notificaciones']
  },
  {
    slug: 'dargui',
    title: 'Agencia de Viajes Dargui Tours',
    description:
      'Sistema comercial y administrativo para la agencia de viajes Dargui Tours, creado para gestionar cotizaciones, ventas, cobranzas y un facturador propio dentro del mismo flujo. La plataforma centraliza operación, control financiero y seguimiento comercial con una lógica pensada para escalar el negocio.',
    highlights: [
      'Facturador propio integrado al flujo de cotización, venta, cobranza y emisión de documentos',
      'Módulos de gastos, bancos, proveedores, ventas a crédito y ventas en divisas',
      'Control de comisiones mayoristas, cuentas por cobrar, cuentas por pagar y estados de cuenta',
      'Generación de PDFs clave: cotizaciones, itinerarios, vouchers de servicio y recibos de pago',
      'Reportes de ventas, productividad, comisiones, pagos y configuración de metas comerciales'
    ],
    detailCards: [
      { label: 'Tipo', value: 'Sistema comercial interno' },
      { label: 'Core', value: 'Facturador propio y ventas' },
      { label: 'Cobertura', value: 'Finanzas, reportes y operación' }
    ],
    tags: ['Sistema comercial', 'Facturador propio', 'Ventas en divisas', 'Créditos', 'Reportes']
  },
  {
    slug: 'serlung',
    title: 'Dr. Jose Godofredo Portugal Vivanco',
    description:
      'Sistema interno para el Dr. Jose Godofredo Portugal Vivanco, neumologo de Clinica la San Felipe, enfocado en ordenar la atencion clinica con una plataforma para historial de pacientes, seguimiento medico, recetas e informes en un flujo claro y rapido para consulta y soporte administrativo.',
    highlights: [
      'Sistema interno para registro, seguimiento y consulta de pacientes en atencion neumologica',
      'Historial clinico, recetas medicas e informes centralizados en un solo sistema',
      'Flujo optimizado para consulta, soporte administrativo y acceso rapido a informacion clave'
    ],
    tags: ['Salud', 'Neumologia', 'Historial clinico']
  },
  {
    slug: 'cechriza',
    title: 'Cechriza',
    description:
      'Plataforma de control de asistencias para Cechriza, diseñada para usuarios administrativos y tecnicos con el objetivo de ordenar la operacion, monitorear atenciones y dar mayor visibilidad al trabajo de campo. El proyecto incluyo desarrollo movil para mejorar el seguimiento de tecnicos, verificacion de rutas, reportes operativos y notificaciones dentro del flujo diario.',
    highlights: [
      'Control de asistencias, atenciones y seguimiento operativo para personal administrativo y tecnico',
      'Desarrollo movil para monitoreo de tecnicos, validacion de recorridos y verificacion de rutas',
      'Reportes y notificaciones para mejorar trazabilidad, respuesta y control de campo'
    ],
    detailCards: [
      { label: 'Tipo', value: 'Plataforma operativa interna' },
      { label: 'Usuarios', value: 'Administrativos y tecnicos' },
      { label: 'Extra', value: 'App movil y monitoreo de rutas' }
    ],
    tags: ['Operaciones', 'App movil', 'Monitoreo', 'Reportes', 'Notificaciones']
  },
  {
    slug: 'amparo',
    title: 'Amparo',
    description:
      'Sistema interno para Amparo, pensado para ordenar la operacion de salon con control de inventario, facturacion y seguimiento comercial en un solo flujo. La plataforma ayuda a tener visibilidad del negocio, mejorar la administracion diaria y tomar decisiones con reportes claros sobre servicios, ventas y rendimiento por estilista.',
    highlights: [
      'Control de inventario, productos, movimientos y stock para sostener la operacion diaria',
      'Facturacion integrada dentro del sistema interno para registrar servicios, ventas y cobros',
      'Reportes operativos y comerciales para revisar ventas, atenciones y comportamiento del negocio',
      'Calculo de comisiones por cada estilista para tener mejor control del rendimiento y liquidacion',
      'Flujo administrativo pensado para trabajar rapido, con orden y trazabilidad en caja y servicios'
    ],
    detailCards: [
      { label: 'Tipo', value: 'Sistema interno de gestion' },
      { label: 'Core', value: 'Inventario, facturacion y caja' },
      { label: 'Valor', value: 'Reportes y comisiones por estilista' }
    ],
    tags: ['Inventario', 'Facturacion', 'Reportes', 'Comisiones', 'Sistema interno']
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

const hiddenSlugs = new Set(['trend'])
const metaBySlug = new Map(portfolioMeta.map(meta => [meta.slug, meta] as const))
const metaSlugs = portfolioMeta.map(meta => meta.slug)

const discoveredSlugs = Array.from(new Set(Object.keys(imageModules)
  .map(path => path.match(/^..\/app\/assets\/images\/([^/]+)\//)?.[1])
  .filter((slug): slug is string => typeof slug === 'string')
  .filter(slug => !hiddenSlugs.has(slug)))) as string[]

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

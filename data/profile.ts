export type ProfileLink = {
  label: string
  icon: string
  to: string
  target?: '_blank'
}

export type ProfileSkill = {
  label: string
  icon: string
}

export type Profile = {
  name: string
  role: string
  headline?: string
  verified?: boolean
  avatarSrc?: string
  avatarAlt?: string
  availability?: string
  email?: string
  bio: string
  intro: string
  featuredSkillsTitle: string
  featuredSkills: ProfileSkill[]
  links: ProfileLink[]
}

export const profile: Profile = {
  name: 'David Yauri Lapa',
  role: 'Software Engineer • Full Stack',
  verified: true,
  bio: 'Portafolio de proyectos por empresa: dashboards, web apps y sitios.',
  email: 'yauridavid00@gmail.com',
  intro:
    'Cuento con mas de 4 anos de experiencia desarrollando proyectos para distintos rubros y puedo liderar soluciones de inicio a fin como Full Stack Developer, conectando frontend, backend, despliegue e integraciones para entregar sistemas solidos, escalables y listos para operar.',
  featuredSkillsTitle: 'Stack y herramientas',
  featuredSkills: [
    { label: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
    { label: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs' },
    { label: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
    { label: 'React', icon: 'i-simple-icons-react' },
    { label: 'NestJS', icon: 'i-simple-icons-nestjs' },
    { label: 'Laravel', icon: 'i-simple-icons-laravel' },
    { label: 'TypeScript', icon: 'i-simple-icons-typescript' },
    { label: 'MySQL', icon: 'i-simple-icons-mysql' },
    { label: 'PostgreSQL', icon: 'i-simple-icons-postgresql' },
    { label: 'SQL Server', icon: 'i-simple-icons-microsoftsqlserver' },
    { label: 'Linux', icon: 'i-simple-icons-linux' },
    { label: 'Tailwind', icon: 'i-simple-icons-tailwindcss' },
    { label: 'Figma', icon: 'i-simple-icons-figma' },
    { label: 'Docker', icon: 'i-simple-icons-docker' },
    { label: 'Cloudflare', icon: 'i-simple-icons-cloudflare' },
    { label: 'AWS', icon: 'i-simple-icons-amazonaws' },
    { label: 'DigitalOcean', icon: 'i-simple-icons-digitalocean' },
    { label: 'Prisma', icon: 'i-simple-icons-prisma' },
    { label: 'Vercel', icon: 'i-simple-icons-vercel' },
    { label: 'GitHub', icon: 'i-simple-icons-github' },
    { label: 'Postman', icon: 'i-simple-icons-postman' }
  ],
  links: [
    {
      label: 'WhatsApp',
      icon: 'i-simple-icons-whatsapp',
      to: '#'
    },
    {
      label: 'LinkedIn',
      icon: 'i-simple-icons-linkedin',
      to: '#',
      target: '_blank'
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: '#',
      target: '_blank'
    },
    {
      label: 'Instagram',
      icon: 'i-simple-icons-instagram',
      to: '#',
      target: '_blank'
    },
    {
      label: 'Twitter',
      icon: 'i-simple-icons-x',
      to: '#',
      target: '_blank'
    }
  ]
}

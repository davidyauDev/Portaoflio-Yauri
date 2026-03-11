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
  verified?: boolean
  avatarSrc?: string
  avatarAlt?: string
  email?: string
  bio: string
  introTitle: string
  intro: string
  skillsTitle: string
  skills: ProfileSkill[]
  links: ProfileLink[]
}

export const profile: Profile = {
  name: 'David Yauri Lapa',
  role: 'Software Engineer',
  verified: true,
  bio: 'Portafolio de proyectos por empresa: dashboards, web apps y sitios.',
  email: 'yauridavid00@gmail.com',
  introTitle: 'Hola Mundo!',
  intro:
    'Soy Ingeniero de Software y Full Stack Developer con experiencia en el desarrollo de aplicaciones web modernas. Me especializo en crear interfaces intuitivas y sistemas escalables que combinan rendimiento, diseño y funcionalidad. Disfruto optimizar procesos, escribir código limpio y transformar ideas en productos digitales que generan impacto.',
  skillsTitle: 'Lo que uso para crear',
  skills: [
    { label: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
    { label: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs' },
    { label: 'Laravel', icon: 'i-simple-icons-laravel' },
    { label: 'MySQL', icon: 'i-simple-icons-mysql' },
    { label: 'AWS', icon: 'i-simple-icons-amazonaws' },
    { label: 'DigitalOcean', icon: 'i-simple-icons-digitalocean' },
    { label: 'Bash', icon: 'i-simple-icons-gnubash' },
    { label: 'Cloudflare', icon: 'i-simple-icons-cloudflare' },
    { label: 'Figma', icon: 'i-simple-icons-figma' },
    { label: 'Git', icon: 'i-simple-icons-git' },
    { label: 'GitHub', icon: 'i-simple-icons-github' },
    { label: 'JavaScript', icon: 'i-simple-icons-javascript' },
    { label: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
    { label: 'PostgreSQL', icon: 'i-simple-icons-postgresql' },
    { label: 'Postman', icon: 'i-simple-icons-postman' },
    { label: 'Prisma', icon: 'i-simple-icons-prisma' },
    { label: 'React', icon: 'i-simple-icons-react' },
    { label: 'Tailwind', icon: 'i-simple-icons-tailwindcss' },
    { label: 'TypeScript', icon: 'i-simple-icons-typescript' },
    { label: 'Vercel', icon: 'i-simple-icons-vercel' },
    { label: 'Vite', icon: 'i-simple-icons-vite' },
    { label: 'Zod', icon: 'i-simple-icons-zod' }
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

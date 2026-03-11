import { portfolios } from './portfolios'

export type Project = {
  id: string
  title: string
  description: string
  link?: string
  image?: string
  tags?: string[]
}

const projects: Project[] = portfolios.map(portfolio => ({
  id: `portfolio-${portfolio.slug}`,
  title: portfolio.title,
  description: portfolio.description,
  link: `/portfolio/${portfolio.slug}`,
  image: portfolio.images[0]?.url,
  tags: portfolio.tags
}))

export default projects

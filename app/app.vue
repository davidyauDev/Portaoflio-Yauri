<script setup>
import { portfolios } from '../data/portfolios'
import { profile } from '../data/profile'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'es'
  }
})

const title = `${profile.name} - Portafolio`
const description = profile.bio

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/changelog-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/changelog-light.png',
  twitterCard: 'summary_large_image'
})

const route = useRoute()
const isHome = computed(() => route.path === '/')
const activeLinks = computed(() => profile.links.filter(link => link.to && link.to !== '#'))
const heroStats = computed(() => [
  { label: 'Experiencia', value: `${String(portfolios.length).padStart(2, '0')} soluciones reales en produccion` },
  { label: 'Cobertura', value: 'Frontend, backend, despliegue e integraciones' },
  { label: 'Tipo de solucion', value: 'Web, software, dashboards y APIs internas' }
])
</script>

<template>
  <UApp>
    <div class="min-h-screen xl:h-screen xl:overflow-hidden xl:grid xl:grid-cols-2">
      <UPageSection
        orientation="vertical"
        :ui="{
          root: 'border-b border-default xl:border-b-0 xl:sticky xl:inset-y-0 xl:h-screen overflow-hidden',
          container: 'h-full items-center justify-center px-4 py-10 sm:px-6 sm:py-12 xl:px-0 xl:py-0',
          wrapper: 'flex flex-col items-start w-full',
          header: 'w-full',
          body: 'w-full mt-8 sm:mt-6'
        }"
      >
        <template #top>
          <SkyBg />

          <div class="absolute -right-1/2 z-[-1] rounded-full bg-primary blur-[300px] size-60 sm:size-100 transform -translate-y-1/2 top-1/2" />
        </template>

        <template #header>
          <div class="w-full max-w-xl">
            <div class="animate-enter flex items-start gap-3 sm:items-center sm:gap-4 [--enter-delay:110ms]">
              <UAvatar
                :src="profile.avatarSrc"
                :alt="profile.avatarAlt || profile.name"
                size="3xl"
                class="hero-avatar ring-2 ring-default shadow-lg shadow-primary/10"
              />

              <div class="min-w-0">
                <p class="max-w-[18rem] text-[11px] font-medium leading-relaxed tracking-[0.16em] text-primary uppercase sm:max-w-none sm:text-sm sm:tracking-[0.18em]">
                  {{ profile.role }}
                </p>
                <div class="mt-1 flex items-center gap-2">
                  <h1 class="text-2xl leading-tight font-bold tracking-tight text-highlighted sm:text-4xl">
                    {{ profile.name }}
                  </h1>
                  <UIcon
                    v-if="profile.verified"
                    name="i-lucide-badge-check"
                    class="size-5 shrink-0 text-sky-400"
                  />
                </div>

              </div>
            </div>

            <p class="animate-enter mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-relaxed [--enter-delay:240ms]">
              {{ profile.intro }}
            </p>

            <div class="animate-enter mt-6 grid w-full grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap [--enter-delay:380ms]">
              <UButton
                :to="`mailto:${profile.email}`"
                color="primary"
                icon="i-lucide-mail"
                label="Hablemos"
                class="w-full justify-center sm:w-auto"
              />
              <UButton
                to="/#proyectos"
                color="neutral"
                variant="soft"
                icon="i-lucide-arrow-down-right"
                label="Ver casos"
                class="w-full justify-center sm:w-auto"
              />
            </div>

            <p
              v-if="profile.email"
              class="mt-3 text-sm leading-6 text-muted-foreground"
            >
              Correo directo:
              <a
                :href="`mailto:${profile.email}`"
                class="break-all text-primary hover:underline sm:break-normal"
              >
                {{ profile.email }}
              </a>
            </p>

            <div class="animate-enter mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 [--enter-delay:500ms]">
              <div
                v-for="stat in heroStats"
                :key="stat.label"
                class="motion-glow rounded-2xl border border-default bg-ui-bg-elevated/30 px-4 py-3"
              >
                <p class="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  {{ stat.label }}
                </p>
                <p class="mt-1 text-sm font-semibold text-highlighted">
                  {{ stat.value }}
                </p>
              </div>
            </div>

            <div
              v-if="activeLinks.length"
              class="animate-enter mt-5 flex flex-wrap items-center gap-1.5 [--enter-delay:560ms]"
            >
              <UButton
                v-for="link in activeLinks"
                :key="link.label"
                :to="link.to"
                :target="link.target"
                color="neutral"
                variant="ghost"
                size="sm"
                :icon="link.icon"
                :label="link.label"
              />
            </div>
          </div>
        </template>

        <template #body>
          <div class="w-full max-w-xl">
            <h2 class="animate-enter text-sm font-semibold tracking-[0.2em] text-highlighted uppercase [--enter-delay:620ms]">
              {{ profile.featuredSkillsTitle }}
            </h2>
            <div class="animate-enter mt-4 flex flex-wrap gap-2 [--enter-delay:680ms] sm:gap-2.5">
              <span
                v-for="skill in profile.featuredSkills"
                :key="skill.label"
                class="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-primary/8 px-2.5 py-2 text-[11px] font-medium text-highlighted shadow-sm shadow-primary/5 sm:px-3 sm:text-xs"
              >
                <UIcon
                  :name="skill.icon"
                  class="size-4"
                />
                <span>{{ skill.label }}</span>
              </span>
            </div>
          </div>
        </template>
      </UPageSection>

      <section
        :class="[
          'px-4 sm:px-6 xl:px-0 xl:-ms-30 xl:flex-1 xl:h-full xl:overflow-y-auto xl:overscroll-contain',
          isHome ? 'xl:snap-y xl:snap-mandatory xl:scroll-smooth xl:scroll-py-10' : ''
        ]"
      >
        <UColorModeButton class="fixed top-3 right-3 z-10 sm:top-4 sm:right-4" />

        <NuxtPage />
      </section>
    </div>
  </UApp>
</template>

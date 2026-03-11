<script setup>
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
</script>

<template>
  <UApp>
    <div class="min-h-screen xl:h-screen xl:overflow-hidden xl:grid xl:grid-cols-2">
      <UPageSection
        orientation="vertical"
        :ui="{
          root: 'border-b border-default xl:border-b-0 xl:sticky xl:inset-y-0 xl:h-screen overflow-hidden',
          container: 'h-full items-center justify-center',
          wrapper: 'flex flex-col items-start w-full',
          header: 'w-full',
          body: 'w-full mt-6'
        }"
      >
        <template #top>
          <SkyBg />

          <div class="absolute -right-1/2 z-[-1] rounded-full bg-primary blur-[300px] size-60 sm:size-100 transform -translate-y-1/2 top-1/2" />
        </template>

        <template #header>
          <div class="w-full max-w-xl">
            <div class="flex items-center gap-4">
              <UAvatar
                :src="profile.avatarSrc"
                :alt="profile.avatarAlt || profile.name"
                size="3xl"
                class="ring-2 ring-default"
              />

              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-highlighted truncate">
                    {{ profile.name }}
                  </h1>
                  <UIcon
                    v-if="profile.verified"
                    name="i-lucide-badge-check"
                    class="size-5 shrink-0 text-sky-400"
                  />
                </div>

                <p class="mt-1 text-sm sm:text-base text-muted-foreground">
                  {{ profile.role }}
                </p>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-1.5">
              <UButton
                v-for="link in profile.links"
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

            <p
              v-if="profile.email"
              class="mt-3 text-sm text-muted-foreground"
            >
              O enviame un correo electronico a
              <a
                :href="`mailto:${profile.email}`"
                class="text-primary hover:underline"
              >
                {{ profile.email }}
              </a>
            </p>
          </div>
        </template>

        <template #body>
          <div class="w-full max-w-xl">
            <h2 class="text-xl font-semibold text-highlighted">
              {{ profile.introTitle }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
              {{ profile.intro }}
            </p>

            <h3 class="mt-8 text-sm font-semibold tracking-wide text-highlighted">
              {{ profile.skillsTitle }}
            </h3>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="skill in profile.skills"
                :key="skill.label"
                class="inline-flex items-center gap-2 rounded-lg border border-default bg-ui-bg-elevated/40 px-3 py-2 text-xs text-highlighted"
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
        <UColorModeButton class="fixed top-4 right-4 z-10" />

        <NuxtPage />
      </section>
    </div>
  </UApp>
</template>

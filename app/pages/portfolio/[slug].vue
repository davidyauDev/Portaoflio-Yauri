<script setup lang="ts">
import { portfoliosBySlug } from '../../../data/portfolios'

const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))
const portfolio = computed(() => {
  const p = portfoliosBySlug[slug.value]

  if (!p) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Portfolio not found'
    })
  }

  return p
})
const titleClass = computed(() =>
  portfolio.value.slug === 'juegosjhigger'
    ? 'font-display text-5xl sm:text-6xl uppercase tracking-[0.08em] leading-none'
    : ''
)

useSeoMeta({
  title: `${portfolio.value.title} — Portafolio`,
  description: portfolio.value.description
})

const selectedImage = shallowRef<string | null>(null)
const isPreviewOpen = computed({
  get: () => selectedImage.value !== null,
  set: (open) => {
    if (!open) selectedImage.value = null
  }
})

function openPreview(url: string) {
  selectedImage.value = url
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
    <header class="flex flex-col gap-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UButton
          to="/"
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
          label="Volver"
          class="w-full justify-center sm:w-auto"
        />
        <UButton
          v-if="portfolio.website"
          :to="portfolio.website"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          variant="soft"
          icon="i-lucide-external-link"
          label="Sitio en vivo"
          class="w-full justify-center sm:w-auto"
        />
      </div>

      <div class="text-center">
        <div
          v-if="portfolio.eyebrow"
          class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-primary uppercase"
        >
          <span class="size-2 rounded-full bg-primary" />
          {{ portfolio.eyebrow }}
        </div>
        <h1
          class="text-xl leading-tight font-bold tracking-tight text-highlighted sm:text-3xl"
          :class="titleClass"
        >
          {{ portfolio.title }}
        </h1>
        <p class="mt-2 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-relaxed">
          {{ portfolio.description }}
        </p>

        <div
          v-if="portfolio.tags?.length"
          class="mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2"
        >
          <UBadge
            v-for="tag in portfolio.tags"
            :key="tag"
            color="neutral"
            variant="soft"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>

        <div
          v-if="portfolio.detailCards?.length"
          class="mx-auto mt-5 grid max-w-4xl gap-3 text-left sm:grid-cols-3"
        >
          <div
            v-for="detail in portfolio.detailCards"
            :key="detail.label"
            class="rounded-2xl border border-default bg-ui-bg-elevated/40 px-4 py-3"
          >
            <p class="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {{ detail.label }}
            </p>
            <p class="mt-1 text-sm font-semibold text-highlighted text-balance">
              {{ detail.value }}
            </p>
          </div>
        </div>

        <ul
          v-if="portfolio.highlights?.length"
          class="mx-auto mt-5 grid max-w-3xl gap-2 text-left text-sm text-muted-foreground"
        >
          <li
            v-for="(item, i) in portfolio.highlights"
            :key="`${portfolio.slug}-hl-${i}`"
            class="flex gap-3"
          >
            <UIcon
              name="i-lucide-check"
              class="mt-0.5 size-4 shrink-0 text-primary/80"
            />
            <span class="min-w-0 text-balance">{{ item }}</span>
          </li>
        </ul>
      </div>
    </header>

    <section
      class="mt-7 sm:mt-10"
      aria-label="Portfolio gallery"
    >
      <div class="grid grid-cols-1 gap-4 sm:gap-6">
        <button
          v-for="(img, idx) in portfolio.images"
          :key="`${portfolio.slug}-${idx}`"
          type="button"
          class="group relative overflow-hidden rounded-[1.35rem] border border-default bg-ui-bg-elevated/40 shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:rounded-2xl"
          @click="openPreview(img.url)"
        >
          <img
            :src="img.url"
            :alt="img.title"
            loading="lazy"
            decoding="async"
            class="w-full object-cover object-top"
          >

          <div class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />

          <div class="pointer-events-none absolute bottom-3 right-3">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm sm:px-3 sm:text-xs">
              <UIcon
                name="i-lucide-expand"
                class="size-3.5"
              />
              Preview
            </span>
          </div>

          <div class="pointer-events-none absolute left-3 top-3">
            <span class="inline-flex max-w-[85%] items-center rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] leading-none text-white backdrop-blur-sm">
              <span class="truncate">{{ img.title }}</span>
            </span>
          </div>
        </button>
      </div>
    </section>

    <UModal
      v-model:open="isPreviewOpen"
      :title="portfolio.title"
      :ui="{ content: 'p-0 overflow-hidden' }"
    >
      <template #body>
        <div class="bg-black/80 p-4 sm:p-6">
          <img
            v-if="selectedImage"
            :src="selectedImage"
            :alt="portfolio.title"
            class="mx-auto max-h-[80vh] w-full rounded-lg object-contain shadow-2xl"
          >
        </div>
      </template>
    </UModal>
  </main>
</template>

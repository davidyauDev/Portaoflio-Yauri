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
  <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
    <header class="flex flex-col gap-4">
      <div class="flex items-center justify-between gap-3">
        <UButton
          to="/"
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
          label="Volver"
        />
      </div>

      <div class="text-center">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-highlighted">
          {{ portfolio.title }}
        </h1>
        <p class="mt-2 text-sm sm:text-base text-muted-foreground text-balance">
          {{ portfolio.description }}
        </p>

        <div
          v-if="portfolio.tags?.length"
          class="mt-4 flex flex-wrap justify-center gap-2"
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

        <ul
          v-if="portfolio.highlights?.length"
          class="mx-auto mt-5 grid max-w-3xl gap-1.5 text-left text-sm text-muted-foreground"
        >
          <li
            v-for="(item, i) in portfolio.highlights"
            :key="`${portfolio.slug}-hl-${i}`"
            class="flex gap-2"
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
      class="mt-8 sm:mt-10"
      aria-label="Portfolio gallery"
    >
      <div class="grid grid-cols-1 gap-5 sm:gap-6">
        <button
          v-for="(img, idx) in portfolio.images"
          :key="`${portfolio.slug}-${idx}`"
          type="button"
          class="group relative overflow-hidden rounded-2xl border border-default bg-ui-bg-elevated/40 shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-sm">
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

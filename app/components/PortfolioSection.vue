<script setup lang="ts">
import type { Portfolio } from '../../data/portfolios'

const props = defineProps<{ portfolio: Portfolio }>()

const portfolio = computed(() => props.portfolio)
const selectedImage = shallowRef<string | null>(null)
const scroller = ref<HTMLDivElement | null>(null)

const isPreviewOpen = computed({
  get: () => selectedImage.value !== null,
  set: (open) => {
    if (!open) selectedImage.value = null
  }
})

function openPreview(url: string) {
  selectedImage.value = url
}

function scrollCarousel(direction: -1 | 1) {
  const el = scroller.value
  if (!el) return

  const amount = Math.max(320, Math.floor(el.clientWidth * 0.9))
  el.scrollBy({ left: amount * direction, behavior: 'smooth' })
}
</script>

<template>
  <section class="rounded-3xl border border-default bg-ui-bg-elevated/40 p-5 sm:p-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div class="min-w-0">
        <h2 class="text-xl sm:text-2xl font-semibold tracking-tight text-highlighted">
          {{ portfolio.title }}
        </h2>
        <p class="mt-1 text-sm sm:text-base text-muted-foreground">
          {{ portfolio.description }}
        </p>

        <div
          v-if="portfolio.tags?.length"
          class="mt-3 flex flex-wrap gap-2"
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
          class="mt-4 grid gap-1.5 text-sm text-muted-foreground"
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

      <div class="flex items-center gap-2 self-start">
        <UButton
          :to="`/portfolio/${portfolio.slug}`"
          color="neutral"
          variant="ghost"
          icon="i-lucide-images"
          label="Ver pagina"
        />
      </div>
    </header>

    <div
      v-if="portfolio.images.length"
      class="mt-5"
    >
      <div class="flex items-center justify-between gap-3">
        <p class="text-xs text-muted-foreground">
          {{ portfolio.images.length }} imagen{{ portfolio.images.length === 1 ? '' : 'es' }}
        </p>

        <div class="flex items-center gap-2">
          <UButton
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-chevron-left"
            aria-label="Previous images"
            @click="scrollCarousel(-1)"
          />
          <UButton
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-lucide-chevron-right"
            aria-label="Next images"
            @click="scrollCarousel(1)"
          />
        </div>
      </div>

      <div class="relative mt-3">
        <div class="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ui-bg to-transparent opacity-70" />
        <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ui-bg to-transparent opacity-70" />

        <div
          ref="scroller"
          class="-mx-2 flex snap-x snap-proximity gap-4 overflow-x-auto px-2 pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            v-for="(img, idx) in portfolio.images"
            :key="`${portfolio.slug}-${idx}`"
            type="button"
            class="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-default bg-ui-bg-elevated/40 shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-[360px] md:w-[520px]"
            @click="openPreview(img.url)"
          >
            <div class="relative aspect-[16/9]">
              <img
                :src="img.url"
                :alt="img.title"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover object-top"
              >

              <div class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />

              <div class="pointer-events-none absolute left-3 top-3">
                <span class="inline-flex max-w-[85%] items-center rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] leading-none text-white backdrop-blur-sm">
                  <span class="truncate">{{ img.title }}</span>
                </span>
              </div>

              <div class="pointer-events-none absolute bottom-3 right-3">
                <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  <UIcon
                    name="i-lucide-expand"
                    class="size-3.5"
                  />
                  Preview
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="mt-5 rounded-2xl border border-default bg-ui-bg-elevated/30 p-4 text-sm text-muted-foreground"
    >
      No hay imagenes en <code class="text-xs">app/assets/images/{{ portfolio.slug }}/</code>.
    </div>

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
  </section>
</template>

<script setup lang="ts">
import type { Portfolio } from '../../data/portfolios'

const props = defineProps<{ portfolio: Portfolio }>()

const portfolio = computed(() => props.portfolio)
const isFeatured = computed(() => portfolio.value.slug === 'juegosjhigger')
const titleClass = computed(() =>
  portfolio.value.slug === 'juegosjhigger'
    ? 'font-display text-4xl sm:text-5xl uppercase tracking-[0.08em] leading-none'
    : ''
)
const selectedImage = shallowRef<string | null>(null)
const scroller = ref<HTMLDivElement | null>(null)
const activeIndex = ref(0)

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

function updateActiveIndex() {
  const el = scroller.value
  if (!el) return

  const items = Array.from(el.querySelectorAll<HTMLElement>('[data-carousel-item="true"]'))
  if (!items.length) {
    activeIndex.value = 0
    return
  }

  const viewportCenter = el.scrollLeft + el.clientWidth / 2
  let nearest = 0
  let minDistance = Number.POSITIVE_INFINITY

  items.forEach((item, index) => {
    const itemCenter = item.offsetLeft + item.clientWidth / 2
    const distance = Math.abs(itemCenter - viewportCenter)

    if (distance < minDistance) {
      minDistance = distance
      nearest = index
    }
  })

  activeIndex.value = nearest
}

function scrollToIndex(index: number) {
  const el = scroller.value
  if (!el) return

  const items = Array.from(el.querySelectorAll<HTMLElement>('[data-carousel-item="true"]'))
  const item = items[index]
  if (!item) return

  el.scrollTo({
    left: Math.max(0, item.offsetLeft - 8),
    behavior: 'smooth'
  })
}

onMounted(() => {
  nextTick(() => updateActiveIndex())
})

watch(() => portfolio.value.images.length, () => {
  nextTick(() => updateActiveIndex())
})
</script>

<template>
  <section class="motion-glow animate-enter rounded-[1.65rem] border border-default bg-ui-bg-elevated/40 p-4 shadow-[0_24px_80px_-48px_rgba(0,220,130,0.22)] sm:rounded-[2rem] sm:p-6 [--enter-delay:120ms]">
    <header class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div class="min-w-0">
        <div
          v-if="portfolio.eyebrow"
          class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-primary uppercase"
        >
          <span class="size-2 rounded-full bg-primary" />
          {{ portfolio.eyebrow }}
        </div>
        <h2
          class="text-xl sm:text-2xl font-semibold tracking-tight text-highlighted"
          :class="titleClass"
        >
          {{ portfolio.title }}
        </h2>
        <p class="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-relaxed">
          {{ portfolio.description }}
        </p>

        <div
          v-if="portfolio.tags?.length"
          class="mt-4 flex flex-wrap gap-1.5 sm:gap-2"
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
          class="mt-5 grid gap-3 sm:grid-cols-3"
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
          class="mt-5 grid gap-2.5 text-sm text-muted-foreground"
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

      <div class="grid w-full grid-cols-1 gap-2 self-start sm:flex sm:w-auto sm:flex-col sm:items-end">
        <UButton
          v-if="portfolio.website"
          :to="portfolio.website"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          :variant="isFeatured ? 'solid' : 'soft'"
          icon="i-lucide-external-link"
          label="Sitio en vivo"
          class="w-full justify-center sm:w-auto"
        />
        <UButton
          :to="`/portfolio/${portfolio.slug}`"
          color="neutral"
          variant="ghost"
          icon="i-lucide-images"
          label="Ver detalle"
          class="w-full justify-center sm:w-auto"
        />
      </div>
    </header>

    <div
      v-if="portfolio.images.length"
      class="mt-6"
    >
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Galeria
          </p>
          <p class="mt-1 text-sm text-highlighted">
            {{ portfolio.images.length }} captura{{ portfolio.images.length === 1 ? '' : 's' }} seleccionada{{ portfolio.images.length === 1 ? '' : 's' }}
          </p>
        </div>

        <div class="flex items-center gap-2 self-end rounded-full border border-default bg-ui-bg-elevated/30 p-1">
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
        <div class="pointer-events-none absolute inset-y-0 left-0 hidden w-10 bg-gradient-to-r from-ui-bg to-transparent opacity-70 sm:block" />
        <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-10 bg-gradient-to-l from-ui-bg to-transparent opacity-70 sm:block" />

        <div
          ref="scroller"
          @scroll.passive="updateActiveIndex"
          class="-mx-2 flex snap-x snap-proximity gap-4 overflow-x-auto px-2 pb-2 pt-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            v-for="(img, idx) in portfolio.images"
            :key="`${portfolio.slug}-${idx}`"
            type="button"
            data-carousel-item="true"
            class="group relative w-[84vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[1.35rem] border border-default bg-ui-bg-elevated/40 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-[360px] sm:max-w-none sm:rounded-[1.6rem] md:w-[520px]"
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
                <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm sm:px-3 sm:text-xs">
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

      <div
        v-if="portfolio.images.length > 1"
        class="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-xs text-muted-foreground">
          {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(portfolio.images.length).padStart(2, '0') }}
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="(_, idx) in portfolio.images"
            :key="`${portfolio.slug}-dot-${idx}`"
            type="button"
            class="carousel-dot"
            :class="{ 'carousel-dot-active': idx === activeIndex }"
            :aria-label="`Ir a captura ${idx + 1}`"
            @click="scrollToIndex(idx)"
          />
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

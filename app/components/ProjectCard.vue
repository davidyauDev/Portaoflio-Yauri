<script setup lang="ts">
import type { Project } from '../../data/projects'

const props = defineProps<{ project: Project }>()

const project = computed(() => props.project)

const hasLink = computed(() => !!project.value.link)
const href = computed(() => project.value.link || '')
const isInternal = computed(() => href.value.startsWith('/'))
const isExternal = computed(() => /^https?:\/\//.test(href.value || ''))
const tags = computed(() => project.value.tags ?? [])

const isPreviewOpen = shallowRef(false)
</script>

<template>
  <article class="project-card group">
    <div
      class="relative h-full overflow-hidden rounded-2xl border border-default bg-ui-bg-elevated/70 shadow-sm transition duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        class="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-b from-primary/10 via-transparent to-transparent"
      />

      <div
        v-if="project.image"
        class="relative aspect-[16/9] overflow-hidden"
      >
        <button
          type="button"
          class="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          :aria-label="`View ${project.title} image`"
          @click="isPreviewOpen = true"
        >
          <img
            :src="project.image"
            :alt="project.title"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          >
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 dark:from-black/55" />

          <div class="pointer-events-none absolute bottom-3 right-3">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-sm">
              <UIcon
                name="i-lucide-expand"
                class="size-3.5"
              />
              Preview
            </span>
          </div>
        </button>
      </div>

      <div class="flex flex-col gap-3 p-5">
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-lg font-semibold tracking-tight text-highlighted">
            <span class="inline-flex items-center gap-2">
              <span
                v-if="hasLink"
                class="line-clamp-2"
              >
                <NuxtLink
                  v-if="isInternal"
                  :to="href"
                  class="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {{ project.title }}
                </NuxtLink>
                <a
                  v-else
                  :href="href"
                  :target="isExternal ? '_blank' : undefined"
                  :rel="isExternal ? 'noopener noreferrer' : undefined"
                  class="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {{ project.title }}
                </a>
              </span>
              <span
                v-else
                class="line-clamp-2"
              >
                {{ project.title }}
              </span>
              <UIcon
                v-if="hasLink"
                name="i-lucide-arrow-up-right"
                class="size-4 opacity-0 translate-y-0.5 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              />
            </span>
          </h3>
        </div>

        <p class="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {{ project.description }}
        </p>

        <div
          v-if="tags.length"
          class="flex flex-wrap gap-2 pt-1"
        >
          <UBadge
            v-for="tag in tags"
            :key="tag"
            color="neutral"
            variant="soft"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <UModal
        v-if="project.image"
        v-model:open="isPreviewOpen"
        :title="project.title"
        :description="project.description"
        :ui="{
          content: 'p-0 overflow-hidden'
        }"
      >
        <template #body>
          <div class="bg-black/80 p-4 sm:p-6">
            <img
              :src="project.image"
              :alt="project.title"
              class="mx-auto max-h-[75vh] w-full rounded-lg object-contain shadow-2xl"
            >
          </div>
        </template>
      </UModal>
    </div>
  </article>
</template>

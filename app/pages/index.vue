<script setup lang="ts">
import PortfolioSection from '../components/PortfolioSection.vue'
import { portfolios } from '../../data/portfolios'
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-14 sm:py-16 xl:py-10">
    <header class="mb-10 sm:mb-12 text-center xl:hidden">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-highlighted mb-2">
        Portafolio
      </h1>
      <p class="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground text-balance">
        Trabajos y capturas organizadas por empresa.
      </p>
    </header>

    <section aria-label="Portafolios por empresa">
      <div class="mx-auto max-w-3xl space-y-6 sm:space-y-7 xl:max-w-none xl:space-y-0">
        <div
          v-for="p in portfolios"
          :key="p.slug"
          class="xl:min-h-screen xl:snap-start xl:flex xl:items-center xl:py-10"
        >
          <div class="mx-auto w-full max-w-3xl">
            <PortfolioSection :portfolio="p" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

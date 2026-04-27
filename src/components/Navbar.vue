<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '../store/cart'

const route = useRoute()
const cartStore = useCartStore()
const { itemCount } = storeToRefs(cartStore)

const links = [
  { name: 'Home', path: '/' },
  { name: 'Cart', path: '/cart' },
  { name: 'Location', path: '/location' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-hero text-lg font-black text-white shadow-lg">FD</div>
        <div>
          <p class="text-lg font-bold text-slate-900">FoodDash</p>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Customer UI</p>
        </div>
      </RouterLink>

      <div class="hidden items-center gap-2 rounded-full border border-orange-100 bg-orange-50/80 p-1 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="rounded-full px-4 py-2 text-sm font-medium transition"
          :class="route.path === link.path ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-orange-600'"
        >
          {{ link.name }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/80 p-1 md:hidden">
          <RouterLink
            v-for="link in links"
            :key="`mobile-${link.path}`"
            :to="link.path"
            class="rounded-full px-3 py-2 text-xs font-medium transition"
            :class="route.path === link.path ? 'bg-white text-slate-900 shadow' : 'text-slate-600'"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <RouterLink to="/cart" class="relative flex h-12 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg transition hover:bg-orange-500" aria-label="Cart">
          <span class="text-xs font-bold uppercase tracking-[0.2em]">Cart</span>
          <span class="absolute -right-1 -top-1 min-w-6 rounded-full bg-orange-500 px-1.5 py-0.5 text-center text-xs font-bold text-white">
            {{ itemCount }}
          </span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

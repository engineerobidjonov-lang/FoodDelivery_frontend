<script setup>
import { RouterLink } from 'vue-router'
import FoodCard from '../components/FoodCard.vue'
import { useMenuData } from '../composables/useMenuData'

const { categories, foods, loading, error, reload } = useMenuData()

function getFoodsByCategory(categoryName) {
  return foods.value.filter(
    (food) => food.category.toLowerCase() === categoryName.toLowerCase(),
  )
}
</script>

<template>
  <section class="space-y-10">
    <div class="grid gap-6 overflow-hidden rounded-[2rem] bg-hero px-6 py-10 text-white shadow-float lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
      <div class="space-y-6">
        <p class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em]">
          Fast customer ordering
        </p>
        <div class="space-y-3">
          <h1 class="max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
            Discover bold flavors and order your next meal in minutes.
          </h1>
          <p class="max-w-xl text-sm text-orange-50 sm:text-base">
            Browse curated dishes across traditional, seafood, and fast food menus. Add favorites, review your cart, and set your delivery location with a clean customer flow.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <RouterLink
            v-for="category in categories"
            :key="category.id"
            :to="`/category/${category.name}`"
            class="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-orange-100"
          >
            Explore {{ category.name }}
          </RouterLink>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <div
          v-for="category in categories"
          :key="`${category.id}-panel`"
          class="rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
        >
          <p class="text-xs uppercase tracking-[0.25em] text-orange-100">{{ category.name }}</p>
          <p class="mt-2 text-sm text-white/85">{{ category.subtitle }}</p>
        </div>
      </div>
    </div>

    <div v-if="error" class="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
      <p>Menu data could not be loaded.</p>
      <button class="mt-3 rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700" @click="reload">
        Retry
      </button>
    </div>

    <section v-for="category in categories" :key="category.id" class="space-y-4">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">{{ category.name }}</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900">{{ category.subtitle }}</h2>
        </div>
        <RouterLink
          :to="`/category/${category.name}`"
          class="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600"
        >
          View all
        </RouterLink>
      </div>

      <div v-if="loading" class="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
        <div v-for="index in 3" :key="index" class="min-w-[280px] animate-pulse rounded-3xl bg-white p-4 shadow-float">
          <div class="h-48 rounded-2xl bg-orange-100"></div>
          <div class="mt-4 h-5 rounded bg-orange-100"></div>
          <div class="mt-3 h-10 rounded-2xl bg-orange-100"></div>
        </div>
      </div>

      <div v-else class="hide-scrollbar flex gap-5 overflow-x-auto pb-2">
        <div
          v-for="item in getFoodsByCategory(category.name).slice(0, 5)"
          :key="item.id"
          class="min-w-[280px] max-w-[280px]"
        >
          <FoodCard :item="item" />
        </div>
      </div>
    </section>
  </section>
</template>

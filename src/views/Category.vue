<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import FoodCard from '../components/FoodCard.vue'
import { useMenuData } from '../composables/useMenuData'

const route = useRoute()
const search = ref('')
const maxPrice = ref(30)
const { categories, foods, loading, error, reload } = useMenuData()

const currentCategory = computed(() =>
  categories.value.find(
    (category) => category.name.toLowerCase() === String(route.params.name).toLowerCase(),
  ),
)

const categoryItems = computed(() =>
  foods.value.filter((item) => {
    const matchesCategory =
      item.category.toLowerCase() === String(route.params.name).toLowerCase()
    const matchesSearch = item.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesPrice = item.price <= maxPrice.value
    return matchesCategory && matchesSearch && matchesPrice
  }),
)
</script>

<template>
  <section class="space-y-8">
    <div class="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-float">
      <div class="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div class="space-y-4 p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">Category Menu</p>
          <h1 class="text-4xl font-black text-slate-900">{{ currentCategory?.name || route.params.name }}</h1>
          <p class="max-w-2xl text-slate-600">
            {{ currentCategory?.subtitle || 'Browse the full menu and add dishes to your cart.' }}
          </p>

          <div class="grid gap-4 md:grid-cols-2">
            <label class="rounded-2xl bg-orange-50 p-4">
              <span class="mb-2 block text-sm font-semibold text-slate-700">Search dishes</span>
              <input
                v-model="search"
                type="text"
                placeholder="Try burger, salmon, plov..."
                class="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
              />
            </label>

            <label class="rounded-2xl bg-orange-50 p-4">
              <span class="mb-2 block text-sm font-semibold text-slate-700">Max price: ${{ maxPrice }}</span>
              <input v-model="maxPrice" type="range" min="5" max="30" class="mt-3 w-full accent-orange-500" />
            </label>
          </div>
        </div>

        <img :src="currentCategory?.banner" :alt="currentCategory?.name || route.params.name" class="h-full min-h-80 w-full object-cover" />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <p class="text-sm font-medium text-slate-500">Showing {{ categoryItems.length }} items</p>
      <p class="text-sm text-slate-500">Live API data</p>
    </div>

    <div v-if="error" class="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
      <p>Category data could not be loaded.</p>
      <button class="mt-3 rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700" @click="reload">
        Retry
      </button>
    </div>

    <div v-else-if="loading" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <div v-for="index in 6" :key="index" class="animate-pulse rounded-3xl bg-white p-4 shadow-float">
        <div class="h-48 rounded-2xl bg-orange-100"></div>
        <div class="mt-4 h-5 rounded bg-orange-100"></div>
        <div class="mt-3 h-10 rounded-2xl bg-orange-100"></div>
      </div>
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <FoodCard v-for="item in categoryItems" :key="item.id" :item="item" />
    </div>
  </section>
</template>

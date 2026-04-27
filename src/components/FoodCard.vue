<script setup>
import { useCartStore } from '../store/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()
</script>

<template>
  <article class="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-float transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <div class="relative h-48 overflow-hidden">
      <img :src="props.item.imageUrl" :alt="props.item.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/55 to-transparent p-4">
        <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
          {{ props.item.category }}
        </span>
      </div>
    </div>

    <div class="space-y-4 p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-lg font-semibold text-slate-900">{{ props.item.name }}</h3>
        <span class="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600">
          ${{ props.item.price }}
        </span>
      </div>

      <button class="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-500" @click="cartStore.addToCart(props.item)">
        Add to Cart
      </button>
    </div>
  </article>
</template>

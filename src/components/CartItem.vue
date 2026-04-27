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
  <article class="flex flex-col gap-4 rounded-3xl border border-orange-100 bg-white p-4 shadow-float sm:flex-row sm:items-center">
    <img :src="props.item.imageUrl" :alt="props.item.name" class="h-24 w-full rounded-2xl object-cover sm:w-28" />

    <div class="min-w-0 flex-1">
      <h3 class="text-lg font-semibold text-slate-900">{{ props.item.name }}</h3>
      <p class="mt-1 text-sm text-slate-500">${{ props.item.price }} each</p>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex items-center rounded-full bg-orange-50 p-1">
        <button class="h-9 w-9 rounded-full text-lg font-semibold text-slate-700 transition hover:bg-white" @click="cartStore.updateQuantity(props.item.id, props.item.quantity - 1)">-</button>
        <span class="w-10 text-center text-sm font-semibold text-slate-900">{{ props.item.quantity }}</span>
        <button class="h-9 w-9 rounded-full text-lg font-semibold text-slate-700 transition hover:bg-white" @click="cartStore.updateQuantity(props.item.id, props.item.quantity + 1)">+</button>
      </div>

      <p class="w-20 text-right text-base font-bold text-orange-600">${{ props.item.price * props.item.quantity }}</p>
    </div>
  </article>
</template>

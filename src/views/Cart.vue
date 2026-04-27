<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import CartItem from '../components/CartItem.vue'
import Modal from '../components/Modal.vue'
import { useCartStore } from '../store/cart'
import { fetchOrderQuote, createOrder, fetchSellerContact } from '../data/orders'

const cartStore = useCartStore()
const { items, itemCount, totalPrice } = storeToRefs(cartStore)

const isCallModalOpen = ref(false)
const sellerInfo = ref(null)
const quote = ref(null)
const loading = ref(false)

async function updateQuote() {
  if (items.value.length === 0) {
    quote.value = null
    return
  }
  try {
    const payload = items.value.map(item => ({ foodId: item.id, quantity: item.quantity }))
    quote.value = await fetchOrderQuote(payload)
  } catch (err) {
    console.error('Failed to fetch quote:', err)
  }
}

async function handleCheckout() {
  if (items.value.length === 0) return
  loading.value = true
  try {
    const payload = {
      customerName: 'Guest User',
      contactPhone: '+1 555 000 0000',
      address: {
        street: '742 Market Street',
        city: 'San Francisco',
        region: 'CA',
        postalCode: '94103'
      },
      items: items.value.map(item => ({ foodId: item.id, quantity: item.quantity }))
    }
    const order = await createOrder(payload)
    alert(`Order #${order._id} placed successfully!`)
    cartStore.clearCart()
  } catch (err) {
    alert('Checkout failed: ' + err.message)
  } finally {
    loading.value = false
  }
}

async function openCallModal() {
  if (items.value.length === 0) return
  try {
    sellerInfo.value = await fetchSellerContact(items.value[0].id)
    isCallModalOpen.value = true
  } catch (err) {
    alert('Could not fetch seller info.')
  }
}

const deliveryFee = computed(() => quote.value?.deliveryFee ?? (items.value.length ? 4 : 0))
const grandTotal = computed(() => quote.value?.total ?? (totalPrice.value + deliveryFee.value))

watch(items, updateQuote, { deep: true, immediate: true })
</script>

<template>
  <section class="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
    <div class="space-y-5">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">Your Cart</p>
        <h1 class="mt-2 text-4xl font-black text-slate-900">Review your order</h1>
      </div>

      <div v-if="!items.length" class="rounded-[2rem] bg-white p-10 text-center shadow-float">
        <p class="text-2xl font-bold text-slate-900">Your cart is empty</p>
        <p class="mt-2 text-slate-500">Add meals from any category to start building your order.</p>
      </div>

      <div v-else class="space-y-4">
        <CartItem v-for="item in items" :key="item.id" :item="item" />
      </div>
    </div>

    <aside class="h-fit rounded-[2rem] bg-slate-900 p-6 text-white shadow-float">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Order summary</p>
      <div class="mt-6 space-y-4 border-b border-white/10 pb-6">
        <div class="flex items-center justify-between text-sm text-slate-200">
          <span>Items</span>
          <span>{{ itemCount }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-slate-200">
          <span>Subtotal</span>
          <span>${{ quote?.subtotal ?? totalPrice }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-slate-200">
          <span>Delivery fee</span>
          <span>${{ deliveryFee }}</span>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <span class="text-base text-slate-300">Total</span>
        <span class="text-3xl font-black">${{ grandTotal }}</span>
      </div>

      <button 
        class="mt-6 w-full rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-400 disabled:opacity-50"
        :disabled="loading || items.length === 0"
        @click="handleCheckout"
      >
        {{ loading ? 'Placing Order...' : 'Checkout' }}
      </button>
      <button
        class="mt-3 w-full rounded-2xl border border-white/15 px-4 py-3 font-semibold text-white transition hover:border-orange-300 hover:text-orange-200 disabled:opacity-50"
        :disabled="items.length === 0"
        @click="openCallModal"
      >
        Call Seller
      </button>

      <p class="mt-4 text-xs text-slate-400">
        Checkout and calling are now integrated with the backend API.
      </p>
    </aside>

    <Modal :open="isCallModalOpen" :title="`Contact ${sellerInfo?.seller || 'Seller'}`" @close="isCallModalOpen = false">
      <div v-if="sellerInfo" class="mt-6 rounded-3xl bg-orange-50 p-5 text-slate-800">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Seller for {{ sellerInfo.foodName }}</p>
        <h4 class="mt-2 text-2xl font-bold">{{ sellerInfo.seller }}</h4>
        <div class="mt-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Call</span>
          <div>
            <p class="text-sm text-slate-500">Official contact number</p>
            <p class="text-lg font-semibold">{{ sellerInfo.phone }}</p>
          </div>
        </div>
      </div>
    </Modal>
  </section>
</template>

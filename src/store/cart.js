import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const itemCount = computed(() =>
    items.value.reduce((count, item) => count + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0),
  )

  function addToCart(food) {
    const existingItem = items.value.find((item) => item.id === food.id)

    if (existingItem) {
      existingItem.quantity += 1
      return
    }

    items.value.push({ ...food, quantity: 1 })
  }

  function updateQuantity(id, nextQuantity) {
    const target = items.value.find((item) => item.id === id)
    if (!target) return

    if (nextQuantity <= 0) {
      removeFromCart(id)
      return
    }

    target.quantity = nextQuantity
  }

  function removeFromCart(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    itemCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }
})

import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orders', () => {
  // Load orders from localStorage
  const orders = ref(JSON.parse(localStorage.getItem('order_history')) || [])

  // Sync with localStorage
  watch(orders, (newOrders) => {
    localStorage.setItem('order_history', JSON.stringify(newOrders))
  }, { deep: true })

  function createOrder(orderData) {
    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, preparing, delivering, delivered
      ...orderData
    }
    
    // Add to the beginning of the list
    orders.value.unshift(newOrder)
    return newOrder
  }

  function getOrderById(id) {
    return orders.value.find(o => o.id === id)
  }

  return {
    orders,
    createOrder,
    getOrderById
  }
})
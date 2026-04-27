<script setup>
import { computed, onMounted, ref } from 'vue'
import { fetchAddresses, detectLocation as detectLocationApi, saveAddress as saveAddressApi } from '../data/location'

const addressStr = ref('')
const savedAddresses = ref([])
const detectedInfo = ref(null)
const loading = ref(false)
const error = ref('')

async function loadAddresses() {
  try {
    savedAddresses.value = await fetchAddresses()
  } catch (err) {
    console.error('Failed to load addresses:', err)
  }
}

async function detectLocation() {
  loading.value = true
  error.value = ''
  try {
    const data = await detectLocationApi()
    detectedInfo.value = data
    addressStr.value = `${data.address.street}, ${data.address.city}, ${data.address.region}`
  } catch (err) {
    error.value = 'Could not detect location. Please try manually.'
  } finally {
    loading.value = false
  }
}

async function saveAddress() {
  if (!addressStr.value) return
  
  // Simple parsing for mock purposes
  const parts = addressStr.value.split(',').map(s => s.trim())
  const payload = {
    label: 'New Address',
    street: parts[0] || '',
    city: parts[1] || 'San Francisco',
    region: parts[2] || 'CA',
    postalCode: parts[3] || '94103'
  }

  try {
    await saveAddressApi(payload)
    await loadAddresses()
    alert('Address saved successfully!')
  } catch (err) {
    alert('Failed to save address: ' + err.message)
  }
}

const estimate = computed(() => (detectedInfo.value ? detectedInfo.value.estimate : '25-35 minutes'))

onMounted(loadAddresses)
</script>

<template>
  <section class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
    <div class="space-y-6 rounded-[2rem] bg-white p-8 shadow-float">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">Delivery location</p>
        <h1 class="mt-2 text-4xl font-black text-slate-900">Set your address</h1>
        <p class="mt-3 text-slate-500">
          Enter a delivery address manually or use the mock location detector to preview delivery timing.
        </p>
      </div>

      <div v-if="savedAddresses.length" class="space-y-3">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Saved Addresses</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="addr in savedAddresses"
            :key="addr.id"
            class="rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-2 text-sm text-slate-700 transition hover:bg-orange-100"
            @click="addressStr = `${addr.street}, ${addr.city}, ${addr.region}`"
          >
            {{ addr.label }}: {{ addr.street }}
          </button>
        </div>
      </div>

      <label class="block">
        <span class="mb-2 block text-sm font-semibold text-slate-700">Address</span>
        <input
          v-model="addressStr"
          type="text"
          placeholder="Street, City, Region, Zip..."
          class="w-full rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 outline-none transition focus:border-orange-400"
        />
      </label>

      <div class="flex flex-wrap gap-3">
        <button 
          class="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-orange-500 disabled:opacity-50" 
          :disabled="loading"
          @click="detectLocation"
        >
          {{ loading ? 'Detecting...' : 'Detect Location' }}
        </button>
        <button 
          class="rounded-2xl border border-orange-200 px-5 py-3 font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600"
          @click="saveAddress"
        >
          Save Address
        </button>
      </div>

      <div v-if="error" class="text-sm text-red-500">{{ error }}</div>

      <div class="rounded-3xl bg-orange-50 p-5">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Estimated delivery time</p>
        <p class="mt-2 text-3xl font-black text-slate-900">{{ estimate }}</p>
      </div>
    </div>

    <div class="overflow-hidden rounded-[2rem] bg-white shadow-float">
      <div class="flex items-center justify-between border-b border-orange-100 px-6 py-5">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Map preview</p>
          <p class="mt-1 text-slate-500">UI placeholder for delivery zone</p>
        </div>
        <span class="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">Active route</span>
      </div>

      <div class="relative h-[430px] overflow-hidden bg-gradient-to-br from-orange-100 via-amber-50 to-white">
        <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(circle at 1px 1px, #fb923c 1px, transparent 0); background-size: 32px 32px;"></div>
        <div class="absolute left-[18%] top-[22%] h-24 w-24 rounded-full bg-orange-200/60 blur-2xl"></div>
        <div class="absolute bottom-[18%] right-[16%] h-28 w-28 rounded-full bg-amber-200/70 blur-2xl"></div>
        <div class="absolute left-[22%] top-[58%] h-4 w-52 rotate-12 rounded-full bg-slate-300/70"></div>
        <div class="absolute left-[42%] top-[26%] h-4 w-64 -rotate-6 rounded-full bg-slate-300/70"></div>
        <div class="absolute left-[30%] top-[35%] flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl">
          Pin
        </div>
        <div class="absolute bottom-6 left-6 rounded-3xl bg-white/90 p-4 shadow-lg backdrop-blur">
          <p class="text-xs uppercase tracking-[0.25em] text-orange-500">Current drop-off</p>
          <p class="mt-2 max-w-xs text-sm font-medium text-slate-700">
            {{ addressStr || 'No address selected yet. Use Detect Location to populate a sample address.' }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Modal',
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="props.open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4" @click.self="emit('close')">
        <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm uppercase tracking-[0.25em] text-orange-500">Seller Contact</p>
              <h3 class="mt-2 text-2xl font-bold text-slate-900">{{ props.title }}</h3>
            </div>
            <button class="rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-orange-100" @click="emit('close')">
              Close
            </button>
          </div>
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

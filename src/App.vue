<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    <main class="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

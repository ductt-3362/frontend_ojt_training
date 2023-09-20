<script setup>
import NavBar from "@components/NavBar.vue";
import BaseFooter from "@components/BaseFooter.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="max-w-screen-xl min-h-screen mx-auto">
    <slot></slot>
  </div>

  <footer class="w-full border-t-2">
    <BaseFooter />
  </footer>
</template>

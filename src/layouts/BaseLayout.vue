<script setup>
import NavBar from "@components/NavBar.vue";
import BaseFooter from "@components/BaseFooter.vue";
import { ref } from "vue";
const containerStyle = ref(
  "max-w-screen-xl max-xl:max-w-screen-lg max-lg:max-w-screen-md max-md:max-w-screen-sm max-sm:max-w-md mx-auto px-4"
);
</script>

<template>
  <header :class="containerStyle">
    <NavBar />
  </header>
  <div class="border-t-2 mb-4"></div>
  <div class="min-h-[64vh]" :class="containerStyle">
    <slot></slot>
  </div>
  <div class="border-t-2"></div>
  <footer :class="containerStyle">
    <BaseFooter />
  </footer>
</template>

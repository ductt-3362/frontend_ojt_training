<script setup>
import NavBar from "@components/NavBar.vue";
import BaseFooter from "@components/BaseFooter.vue";
import { reactive } from "vue";
const style = reactive({
  container:
    "max-w-screen-xl max-xl:max-w-screen-lg max-lg:max-w-screen-md max-md:max-w-screen-sm max-sm:max-w-md mx-auto px-4",
  header: "sticky top-0 bg-slate-50/95 backdrop-blur-md z-50 shadow-md",
  divider: "border-t-2 max-sm:hidden",
});
</script>

<template>
  <header :class="style.header">
    <NavBar :class="style.container" />
  </header>
  <div class="min-h-[68vh] py-4" :class="style.container">
    <slot></slot>
  </div>
  <div :class="style.divider"></div>
  <footer :class="style.container" class="max-sm:hidden">
    <BaseFooter />
  </footer>
</template>

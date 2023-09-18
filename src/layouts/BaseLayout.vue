<script setup>
import NavbarComp from "@components/NavbarComp.vue";
import FooterComp from "@components/FooterComp.vue";
</script>

<template>
  <header>
    <NavbarComp />
  </header>
  <div class="max-w-screen-xl min-h-screen mx-auto">
    <slot></slot>
  </div>

  <footer class="w-full border-t-2">
    <FooterComp />
  </footer>
</template>

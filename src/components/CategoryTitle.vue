<script setup>
defineProps(["title"]);
</script>

<template>
  <p class="text-2xl font-bold text-gray-900 text-center my-4">
    {{ title }}
  </p>
  <hr class="h-px my-4 bg-gray-200 border-0" />
</template>

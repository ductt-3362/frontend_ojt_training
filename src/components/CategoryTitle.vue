<script setup>
defineProps(["title", "slug"]);
</script>

<template>
  <div class="my-4 text-center">
    <router-link
      :to="{ name: 'collections', params: { slug } }"
      class="text-gray text-2xl font-bold duration-300 hover:text-red-600"
    >
      {{ title }}
    </router-link>
  </div>
</template>

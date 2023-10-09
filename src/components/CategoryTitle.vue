<script setup>
defineProps(["title", "slug"]);
</script>

<template>
  <div class="inline-flex w-full items-center justify-center">
    <hr class="border-1 h-px w-full bg-gray-200 dark:bg-gray-700" />
    <span
      class="absolute left-1/2 -translate-x-1/2 bg-white px-6 font-medium text-gray-900"
      ><router-link
        :to="{ name: 'collections', params: { slug } }"
        class="text-gray text-2xl font-bold duration-300 hover:text-red-600"
      >
        {{ title }}
      </router-link></span
    >
  </div>
</template>

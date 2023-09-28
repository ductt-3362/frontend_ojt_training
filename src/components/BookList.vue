<script setup>
import BookItem from "@components/BookItem.vue";
defineProps(["list"]);
</script>

<template>
  <div
    class="grid-cols-5 grid gap-6 my-6 md:max-xl:grid-cols-4 sm:max-md:grid-cols-3 max-sm:grid-cols-1"
  >
    <template v-for="book in list" :key="book.id">
      <BookItem :book="book" />
    </template>
  </div>
</template>

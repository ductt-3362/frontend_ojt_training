<script setup>
import { reactive } from "vue";
import BookItem from "@components/BookItem.vue";
defineProps(["list"]);
const style = reactive({
  grid: "my-10 grid grid-cols-5 gap-6 max-lg:grid-cols-5 max-sm:grid-cols-2 sm:max-md:grid-cols-2 md:max-lg:grid-cols-3 lg:max-xl:grid-cols-4",
});
</script>

<template>
  <div :class="style.grid">
    <template v-for="book in list" :key="book.slug">
      <BookItem :book="book" />
    </template>
  </div>
</template>

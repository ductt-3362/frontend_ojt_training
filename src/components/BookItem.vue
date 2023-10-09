<script setup>
import { formatPrice } from "@utils/function.js";
import { reactive } from "vue";
defineProps(["book"]);

const style = reactive({
  container:
    "relative flex flex-col justify-between rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:transform",
  image: "h-auto min-h-[300px] w-full rounded-t-lg object-cover",
  name: "transtion-colors truncate tracking-tight text-gray-900 duration-300 hover:text-red-600",
  price: "font-bold text-red-700",
  oldPrice: "text-gray-500 line-through",
});
</script>

<template>
  <div :class="style.container">
    <span
      class="absolute right-2 top-2 mr-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800"
      >-10%</span
    >
    <router-link :to="{ path: `/books/${book.slug}` }">
      <img :class="style.image" :src="book.image" alt="product image" />
    </router-link>
    <div class="p-4">
      <router-link :to="{ path: `/books/${book.slug}` }">
        <h5 :class="style.name">{{ book.name }}</h5>
      </router-link>
      <div class="flex justify-between">
        <div :class="style.price">{{ formatPrice(book.price) }}</div>
        <div :class="style.oldPrice">{{ formatPrice(book.price * 1.1) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from "@utils/function.js";
import { reactive } from "vue";
import { useProductStore } from "@stores/product";

defineProps(["book"]);
const productStore = useProductStore();

const style = reactive({
  name: "transtion-colors line-clamp-2 text-md tracking-tight text-gray-900 duration-150 hover:text-red-600 h-12",
  price: "text-lg font-bold text-red-700",
  image:
    "max:lg:h-60 h-80 w-full rounded-t-lg object-cover max-xl:h-72 max-md:h-80 max-sm:h-60",
  container:
    "relative h-fit rounded-lg border border-gray-200  bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:transform",
  badge:
    "absolute right-2 top-2 mr-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800",
  oldPrice: "text-gray-500 line-through",
});

const handleAddSeenProduct = (product) => {
  productStore.addSeenProduct(product);
};
</script>

<template>
  <div :class="style.container">
    <span :class="style.badge">-10%</span>
    <router-link
      :to="{ path: `/books/${book.slug}` }"
      @click="handleAddSeenProduct(book)"
    >
      <img :class="style.image" :src="book.image" alt="product image" />
    </router-link>
    <div class="p-4">
      <router-link
        :to="{ path: `/books/${book.slug}` }"
        @click="handleAddSeenProduct(book)"
      >
        <h5 :class="style.name">
          {{ book.name }}
        </h5>
      </router-link>
      <div class="flex justify-between">
        <div :class="style.price">{{ formatPrice(book.price) }}</div>
        <div :class="style.oldPrice">{{ formatPrice(book.price * 1.1) }}</div>
      </div>
    </div>
  </div>
</template>

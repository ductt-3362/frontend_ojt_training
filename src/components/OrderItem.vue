<script setup>
import { formatPrice } from "@utils/function.js";
import { computed, reactive } from "vue";
const props = defineProps(["order"]);
const book = computed(() => props.order.book);
const style = reactive({
  container:
    "mb-6 flex select-none items-center justify-between rounded-lg border border-gray-200 p-5 shadow-md max-sm:p-3",
  image: "w-24 rounded object-contain object-center",
  name: "text-lg text-gray-900 duration-300 hover:text-red-600 max-md:line-clamp-2 max-sm:text-base max-sm:line-clamp-4",
  price: "text-xl font-bold text-red-700 max-md:text-lg max-sm:text-base",
  quantity: "m-10 max-md:m-4 text-xl font-bold max-md:text-lg max-sm:text-base",
});
</script>

<template>
  <div :class="style.container">
    <router-link :to="{ path: `/books/${book.slug}` }">
      <div>
        <img :class="style.image" :src="book.image" alt="product image" />
      </div>
    </router-link>
    <div class="ml-4 w-3/5 max-sm:w-2/5">
      <router-link :to="{ path: `/books/${book.slug}` }">
        <h5 :class="style.name">
          {{ book.name }}
        </h5>
      </router-link>
      <p class="text-xl max-md:text-lg max-sm:hidden">
        Đơn giá:
        <span class="ml-2 font-medium text-red-700">
          {{ formatPrice(order.price) }}
        </span>
      </p>
    </div>
    <div class="flex w-2/5 items-center justify-center outline-none">
      <span :class="style.quantity">Số lượng: {{ order.quantity }} </span>
    </div>
    <p :class="style.price">
      {{ formatPrice(order.quantity * order.price) }}
    </p>
  </div>
</template>

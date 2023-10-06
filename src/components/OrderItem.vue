<script setup>
import { formatPrice } from "@utils/function.js";
import { computed } from "vue";
const props = defineProps(["order"]);
const book = computed(() => props.order.book);
</script>

<template>
  <div
    class="mb-6 flex select-none items-center justify-between rounded-lg border border-gray-200 p-5 transition-shadow hover:shadow-lg"
  >
    <router-link :to="{ path: `/books/${book.slug}` }">
      <div>
        <img
          class="w-24 rounded object-contain object-center"
          :src="book.image"
          alt="product image"
        />
      </div>
    </router-link>
    <div class="w-3/5">
      <router-link :to="{ path: `/books/${book.slug}` }">
        <h5
          class="transtion-colors text-xl tracking-tight text-gray-900 duration-300 hover:text-red-600"
        >
          {{ book.name }}
        </h5>
      </router-link>
      <p class="text-xl">
        Đơn giá:
        <span class="ml-2 font-medium text-red-700">
          {{ formatPrice(order.price) }}
        </span>
      </p>
    </div>
    <div class="flex items-center justify-center outline-none">
      <span class="m-10 text-xl font-bold"
        >Số lượng : {{ order.quantity }}
      </span>
    </div>
    <p class="text-xl font-bold text-red-700">
      {{ formatPrice(order.quantity * order.price) }}
    </p>
  </div>
</template>

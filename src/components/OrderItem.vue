<script setup>
import { formatPrice } from "@utils/function.js";
import { computed } from "vue";
const props = defineProps(["order"]);
const book = computed(() => props.order.book);
</script>

<template>
  <div
    class="border border-gray-200 rounded-lg hover:shadow-lg transition-shadow flex justify-between items-center mb-6 p-5 select-none"
  >
    <router-link :to="{ path: `/books/${book.slug}` }">
      <div>
        <img
          class="object-contain object-center w-24 rounded"
          :src="book.image"
          alt="product image"
        />
      </div>
    </router-link>
    <div class="w-3/5">
      <router-link :to="{ path: `/books/${book.slug}` }">
        <h5
          class="text-xl tracking-tight text-gray-900 hover:text-red-600 transtion-colors duration-150"
        >
          {{ book.name }}
        </h5>
      </router-link>
      <p class="text-xl">
        Đơn giá:
        <span class="font-medium text-red-700 ml-2">
          {{ formatPrice(order.price) }}
        </span>
      </p>
    </div>
    <div class="flex items-center justify-center outline-none">
      <span class="text-xl font-bold m-10"
        >Số lượng : {{ order.quantity }}
      </span>
    </div>
    <p class="text-xl font-bold text-red-700">
      {{ formatPrice(order.quantity * order.price) }}
    </p>
  </div>
</template>

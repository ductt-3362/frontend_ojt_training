<script setup>
import { formatPrice } from "@utils/function.js";
import IconPlus from "@components/icons/IconPlus.vue";
import IconMinus from "@components/icons/IconMinus.vue";
import IconDelete from "@components/icons/IconDelete.vue";
import { useCartStore } from "@stores/cart";

const props = defineProps(["book"]);
const cartStore = useCartStore();

const handlePlus = () => {
  cartStore.increment(props.book.id);
};

const handleMinus = () => {
  cartStore.decrement(props.book.id);
};

const handleDelete = () => {
  cartStore.removeItem(props.book.id);
};
</script>

<template>
  <div
    class="border border-gray-200 rounded-lg hover:shadow-lg transition-shadow flex justify-between items-center mb-6 p-5"
  >
    <router-link :to="{ path: `/books/${book.id}` }">
      <div>
        <img
          class="object-contain object-center w-24 rounded"
          :src="book.image"
          alt="product image"
        />
      </div>
    </router-link>
    <div class="w-1/2">
      <router-link :to="{ path: `/books/${book.id}` }">
        <h5
          class="text-xl tracking-tight text-gray-900 hover:text-red-600 transtion-colors duration-150"
        >
          {{ book.name }}
        </h5>
      </router-link>
      <p class="text-xl">
        Đơn giá:
        <span class="font-medium text-red-700 ml-2">
          {{ formatPrice(book.price) }}
        </span>
      </p>
    </div>
    <p class="text-xl font-bold text-red-700">
      {{ formatPrice(book.inCartQuantity * book.price) }}
    </p>
    <div class="flex items-center justify-center">
      <IconPlus v-on:click="handlePlus" />
      <p class="text-xl font-bold m-6">
        {{ book.inCartQuantity }}
      </p>
      <IconMinus v-on:click="handleMinus" />
    </div>
    <IconDelete class="mr-4" v-on:click="handleDelete" />
  </div>
</template>

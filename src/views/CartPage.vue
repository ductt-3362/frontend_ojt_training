<script setup>
import CartList from "@components/CartList.vue";
import { useCartStore } from "@stores/cart";
const cartStore = useCartStore();
</script>

<template>
  <p class="text-3xl my-12">
    Giỏ hàng của bạn có {{ cartStore.cart.length }} sản phẩm
  </p>
  <CartList :list="cartStore.cart" />
</template>

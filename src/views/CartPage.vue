<script setup>
import { computed } from "vue";
import CartList from "@components/CartList.vue";
import BaseButton from "@components/BaseButton.vue";
import { useCartStore } from "@stores/cart";
const cartStore = useCartStore();
const total = computed(() => {
  return cartStore.cart.length;
});
</script>

<template>
  <template v-if="total">
    <p class="my-6 text-xl font-semibold">
      Giỏ hàng của bạn có {{ total }} sản phẩm
    </p>
    <CartList :list="cartStore.cart" />
  </template>
  <template v-else>
    <p class="my-6 text-xl font-semibold">Giỏ hàng</p>
    <div class="mt-20 flex flex-col items-center justify-center">
      <div class="h-36">
        <img
          src="https://cdn-icons-png.flaticon.com/256/4555/4555971.png"
          alt="empty_cart_icon"
          class="h-full"
        />
      </div>
      <p class="my-8 text-2xl">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
      <router-link to="/">
        <BaseButton>Tiếp tục mua sắm</BaseButton>
      </router-link>
    </div>
  </template>
</template>

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
    <p class="text-3xl my-12">Giỏ hàng của bạn có {{ total }} sản phẩm</p>
    <CartList :list="cartStore.cart" />
  </template>
  <template v-else>
    <div class="h-[60vh] flex flex-col justify-center items-center">
      <div class="h-32">
        <img
          src="https://cdn-icons-png.flaticon.com/256/4555/4555971.png"
          alt="empty_cart_icon"
          class="h-full"
        />
      </div>
      <p class="text-3xl my-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
      <router-link to="/">
        <BaseButton>Tiếp tục mua sắm</BaseButton>
      </router-link>
    </div>
  </template>
</template>

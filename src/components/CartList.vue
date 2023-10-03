<script setup>
const props = defineProps(["list"]);
import CartItem from "@components/CartItem.vue";
import BaseButton from "@components/BaseButton.vue";
import { formatPrice } from "@utils/function";
import { useToast } from "vue-toast-notification";
import { orderMessage, orderApiMessage } from "@locales/vi/messages";
import { INITIAL_ORDER_STATUS } from "@constants/order";
import { useCartStore } from "@stores/cart";
import { useAuthStore } from "@stores/auth";
import { postOrderApi, postOrderDetailApi } from "@apis/order";

const cartStore = useCartStore();
const authStore = useAuthStore();
const $toast = useToast();

const handleOrder = async () => {
  // post order to server
  const order = {
    userId: authStore.userInfo.id,
    createdAt: new Date(),
    status: INITIAL_ORDER_STATUS,
    total: cartStore.getTotalPrice,
  };
  try {
    const { data: orderData } = await postOrderApi(order);
    const orderId = orderData.id;

    // post order detail to server
    props.list.forEach(async (item) => {
      const orderDetail = {
        orderId,
        book: item,
        quantity: item.inCartQuantity,
        price: item.price,
      };
      try {
        await postOrderDetailApi(orderDetail);
      } catch {
        $toast.error(orderApiMessage.error);
      }
    });
    $toast.success(orderMessage.success);
  } catch {
    $toast.error(orderMessage.error);
    return;
  }
};
</script>

<template>
  <div class="my-6">
    <template v-for="book in list" :key="book.id">
      <CartItem :book="book" />
    </template>
  </div>
  <div v-if="list.length" class="flex w-full justify-end items-center mb-6">
    <p class="text-2xl mr-8">
      Thành tiền:
      <span class="text-red-700 font-bold ml-2">{{
        formatPrice(cartStore.getTotalPrice)
      }}</span>
    </p>
    <BaseButton @click="handleOrder">Đặt hàng</BaseButton>
  </div>
</template>

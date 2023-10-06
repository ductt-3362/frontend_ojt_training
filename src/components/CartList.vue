<script setup>
const props = defineProps(["list"]);
import CartItem from "@components/CartItem.vue";
import BaseButton from "@components/BaseButton.vue";
import { formatPrice } from "@utils/function";
import { useToast } from "vue-toast-notification";
import { orderMessage } from "@locales/vi/messages";
import {
  INITIAL_ORDER_STATUS,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCESS,
} from "@constants/order";
import { useCartStore } from "@stores/cart";
import { useAuthStore } from "@stores/auth";
import { postOrderApi, postOrderDetailApi } from "@apis/order";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const authStore = useAuthStore();
const $toast = useToast();
const router = useRouter();

const routeToOrderResultPage = (result, id) => {
  router.push({
    name: "order-result",
    params: { result, id },
  });
};

const handleOrder = async () => {
  const userId = authStore.userInfo?.id;
  if (!userId) {
    $toast.error(orderMessage.loginRequired);
    router.push({ name: "login" });
  } else {
    // post order to server
    const order = {
      userId,
      createdAt: new Date(),
      status: INITIAL_ORDER_STATUS,
      total: cartStore.getTotalPrice,
    };
    try {
      const { data } = await postOrderApi(order);
      const { id: orderId } = data;
      // post order detail to server
      props.list.forEach(async (item) => {
        const { inCartQuantity: quantity, price } = item;
        const orderDetail = { orderId, book: item, quantity, price };
        await postOrderDetailApi(orderDetail);
      });
      $toast.success(orderMessage.success);
      routeToOrderResultPage(CREATE_ORDER_SUCCESS, orderId);
      cartStore.removeAllItem();
    } catch {
      $toast.error(orderMessage.error);
      routeToOrderResultPage(CREATE_ORDER_FAILED, 1);
    }
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

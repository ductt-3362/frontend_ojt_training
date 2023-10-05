<script setup>
import { ref } from "vue";
import IconCheckCircle from "@components/icons/IconCheckCircle.vue";
import IconCloseCircle from "@components/icons/IconCloseCircle.vue";
import BaseButton from "@components/BaseButton.vue";
import { useRoute } from "vue-router";
import { CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED } from "@constants/order";

const route = useRoute();
const orderId = ref(route.params.id);
const result = ref(route.params.result);
</script>

<template>
  <div class="flex flex-col items-center h-[50vh] justify-center">
    <template v-if="result === CREATE_ORDER_SUCCESS">
      <IconCheckCircle />
      <h1 class="mt-4 text-3xl font-bold text-green-500">
        Đơn hàng của bạn đã được tiếp nhận
      </h1>
      <p class="mt-2 text-gray-500 text-xl">
        Cảm ơn bạn đã mua hàng tại NXB Đức Duy
      </p>
      <p class="mt-2 text-gray-500 text-xl">
        Mã đơn hàng của bạn là
        <router-link
          :to="{ name: 'order-detail' }"
          class="font-bold hover:underline"
          >#{{ orderId }}</router-link
        >
      </p>
      <router-link to="/" class="mt-4">
        <BaseButton> Tiếp tục mua sắm </BaseButton>
      </router-link>
    </template>
    <template v-if="result === CREATE_ORDER_FAILED">
      <IconCloseCircle />
      <h1 class="mt-4 text-3xl font-bold text-red-500">
        Đơn hàng của bạn chưa thành công
      </h1>
      <p class="mt-2 text-gray-500 text-xl">
        Đã lỗi xảy ra trong quá trình xử lý đơn hàng
      </p>
      <p class="mt-2 text-gray-500 text-xl">
        Vui lòng thử lại sau hoặc liên hệ với chúng tôi
      </p>
      <router-link to="/" class="mt-4">
        <BaseButton>Trang chủ</BaseButton>
      </router-link>
    </template>
  </div>
</template>

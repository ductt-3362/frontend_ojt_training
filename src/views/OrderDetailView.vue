<script setup>
import { ref, onMounted, computed } from "vue";
import { getOrderDetailApi } from "@apis/order";
import { useRoute } from "vue-router";
import { formatDate, formatPrice } from "@utils/function";
import OrderItem from "@components/OrderItem.vue";
import { useToast } from "vue-toast-notification";
import { orderApiMessage } from "@locales/vi/messages";

const $toast = useToast();
const route = useRoute();
const orderDetail = ref([]);

const fetchOrder = async () => {
  try {
    const { data } = await getOrderDetailApi(route.params.id);
    orderDetail.value = data;
  } catch (error) {
    $toast.error(orderApiMessage.error);
  }
};

onMounted(() => {
  fetchOrder();
});

const order = computed(() => orderDetail.value[0]?.order);
</script>

<template>
  <div v-if="order" class="mt-12">
    <div class="w-full flex justify-between items-center mb-6">
      <div class="flex items-center justify-center">
        <p class="text-3xl mr-4">Chi tiết đơn hàng #{{ order.id }}</p>
        <span
          class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
        >
          {{ order.status }}</span
        >
      </div>
      <p class="text-xl text-gray-500">
        Ngày đặt hàng: {{ formatDate(order.createdAt) }}
      </p>
    </div>
    <div>
      <template v-for="item in orderDetail" :key="item.id">
        <OrderItem :order="item" />
      </template>
      <div class="flex w-full justify-end items-center">
        <p class="text-2xl">
          Thành tiền:
          <span class="text-red-700 font-bold ml-2">{{
            formatPrice(order.total)
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

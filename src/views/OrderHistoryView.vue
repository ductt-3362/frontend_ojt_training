<script setup>
import { ref, onMounted } from "vue";
import { orderTableHeader } from "@constants/table";
import { formatPrice, formatDate } from "@utils/function";
import { getOrdersByUserApi } from "@apis/order";
import { useAuthStore } from "@stores/auth";
import { useToast } from "vue-toast-notification";
import { orderApiMessage } from "@locales/vi/messages";
import BaseLoading from "@components/BaseLoading.vue";

const $toast = useToast();
const authStore = useAuthStore();
const orders = ref([]);
const isLoading = ref(true);

const fetchOrders = async () => {
  try {
    const { data } = await getOrdersByUserApi(authStore.userInfo.id);
    orders.value = data;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = true;
    $toast.error(orderApiMessage.error);
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <template v-if="!isLoading">
    <div class="mt-12">
      <p class="mb-6 text-3xl">Lịch sử mua hàng</p>
      <div
        v-if="orders.length"
        class="relative overflow-hidden bg-white shadow-md sm:rounded-lg"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left text-gray-500">
            <thead class="bg-gray-50 uppercase text-gray-700">
              <tr>
                <template v-for="item in orderTableHeader" :key="item.key">
                  <th scope="col" class="px-4 py-3 text-base">
                    {{ item.label }}
                  </th>
                </template>
              </tr>
            </thead>
            <tbody>
              <template v-for="order in orders" :key="order.id">
                <tr class="border-b">
                  <th
                    scope="row"
                    class="whitespace-nowrap px-4 py-3 font-medium text-gray-900"
                  >
                    #{{ order.id }}
                  </th>
                  <td class="px-4 py-3">{{ formatPrice(order.total) }}</td>
                  <td class="px-4 py-3">{{ formatDate(order.createdAt) }}</td>
                  <td class="px-4 py-3">{{ order.status }}</td>
                  <td class="px-6 py-4">
                    <router-link
                      :to="{ name: 'order-detail', params: { id: order.id } }"
                      class="text-blue-600 hover:underline"
                      >Xem chi tiết</router-link
                    >
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <p class="py-4 text-center text-2xl">Bạn chưa có đơn hàng nào!</p>
      </div>
    </div>
  </template>
  <template v-else>
    <BaseLoading class="h-[80vh]" />
  </template>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { orderTableHeader } from "@constants/table";
import { formatPrice, formatDate } from "@utils/function";
import { getOrdersByUserApi } from "@apis/order";
import { useAuthStore } from "@stores/auth";

const authStore = useAuthStore();
const orders = ref([]);

const fetchOrders = async () => {
  const { data } = await getOrdersByUserApi(authStore.userInfo.id);
  orders.value = data;
};

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <div class="mt-12">
    <p class="text-3xl mb-6">Lịch sử mua hàng</p>
    <div
      v-if="orders.length"
      class="bg-white relative shadow-md sm:rounded-lg overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left text-gray-500">
          <thead class="text-gray-700 uppercase bg-gray-50">
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
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
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
      <p class="text-2xl text-center py-4">Bạn chưa có đơn hàng nào!</p>
    </div>
  </div>
</template>

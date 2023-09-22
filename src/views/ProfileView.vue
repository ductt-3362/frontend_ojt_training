<script setup>
import { useAuthStore } from "@stores/auth";
import { computed } from "vue";
import BaseButton from "@components/BaseButton.vue";
const authStore = useAuthStore();
const userInfo = computed(() => authStore.getUser);
</script>

<template>
  <div class="mt-12">
    <p class="text-3xl mb-6">Thông tin tài khoản</p>
    <div class="flex">
      <div>
        <div class="flex">
          <div class="w-96">
            <img class="rounded-3xl" :src="userInfo.avatar" />
          </div>
          <div class="ml-8 text-2xl flex flex-col justify-between">
            <div class="">
              <p class="text-2xl font-normal text-gray-400 mb-4">Email</p>
              <p>{{ userInfo.email }}</p>
            </div>
            <div class="">
              <p class="text-2xl font-normal text-gray-400 mb-4">
                Số điện thoại
              </p>
              <p>{{ userInfo.phone }}</p>
            </div>
            <div class="">
              <p class="text-2xl font-normal text-gray-400 mb-4">Địa chỉ</p>
              <p>{{ userInfo.address }}</p>
            </div>
            <BaseButton class="text-xl">Lịch sử mua hàng</BaseButton>
          </div>
        </div>
        <p class="text-2xl font-normal mt-4 text-gray-400">Họ và tên</p>
        <p class="text-3xl font-normal mt-2">{{ userInfo.name }}</p>
      </div>
    </div>
  </div>
</template>

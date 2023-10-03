<script setup>
import { computed } from "vue";
import { useAuthStore } from "@stores/auth";
import BaseButton from "@components/BaseButton.vue";
import UploadWidget from "@components/UploadWidget.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.userInfo);
</script>

<template>
  <div class="mt-12">
    <p class="text-3xl mb-6">Thông tin tài khoản</p>
    <template v-if="user">
      <div class="flex">
        <div class="w-96">
          <div class="relative">
            <img class="rounded-3xl" :src="user.avatar" />
            <UploadWidget class="absolute top-4 right-4" :user="user" />
          </div>
        </div>
        <div class="ml-8 text-2xl flex flex-col justify-between">
          <div class="">
            <p class="text-2xl font-normal text-gray-400 mb-4">Email</p>
            <p>{{ user.email }}</p>
          </div>
          <div class="">
            <p class="text-2xl font-normal text-gray-400 mb-4">Số điện thoại</p>
            <p>{{ user.phone }}</p>
          </div>
          <div class="">
            <p class="text-2xl font-normal text-gray-400 mb-4">Địa chỉ</p>
            <p>{{ user.address }}</p>
          </div>
          <BaseButton
            class="text-xl"
            @click="router.push({ name: 'order-history' })"
            >Lịch sử mua hàng</BaseButton
          >
        </div>
      </div>
      <p class="text-2xl font-normal mt-4 text-gray-400">Họ và tên</p>
      <p class="text-3xl font-normal mt-2">{{ user.name }}</p>
    </template>
  </div>
</template>

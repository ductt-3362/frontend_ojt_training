<script setup>
import BaseButton from "@components/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const handleBack = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <div class="flex h-[60vh] flex-col items-center justify-center">
    <p class="text-8xl">403</p>
    <p class="my-4 text-3xl">Bạn không đủ quyền truy cập</p>
    <BaseButton class="mt-4" @click="handleBack">Quay lại trang chủ</BaseButton>
  </div>
</template>

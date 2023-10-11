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
    <p class="text-8xl">404</p>
    <p class="my-4 text-3xl">
      Không có kết quả phù hợp với trang bạn đang tìm kiếm
    </p>
    <BaseButton class="mt-4" @click="handleBack">Quay lại trang chủ</BaseButton>
  </div>
</template>

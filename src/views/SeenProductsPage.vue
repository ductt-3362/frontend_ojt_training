<script setup>
import BookList from "@components/BookList.vue";
import { useProductStore } from "@stores/product";
import BaseButton from "@components/BaseButton.vue";
import { computed, reactive } from "vue";
import BaseBreadcrumb from "@components/BaseBreadcrumb.vue";

const productStore = useProductStore();
const style = reactive({
  button: "bg-red-600 hover:bg-red-800 py-1 px-2 rounded-md",
});
const LIMIT_NUM = 10;
const seenBooks = computed(() => {
  const startIndex = 0;
  const endIndex = LIMIT_NUM;
  return productStore.seenProducts.slice(startIndex, endIndex);
});

const breadcrumbItems = [{ title: `Sản phẩm đã xem` }];

const handleClear = () => {
  productStore.removeAllSeenProducts();
};
</script>
<template>
  <BaseBreadcrumb :items="breadcrumbItems" />
  <div class="flex items-end justify-between" v-if="seenBooks.length">
    <div class="mt-6 text-xl font-semibold">SẢN PHẨM ĐÃ XEM</div>
    <BaseButton :style-prop="style.button" @click="handleClear">
      Xóa tất cả
    </BaseButton>
  </div>
  <BookList :list="seenBooks" />
  <div
    class="flex flex-col items-center justify-center"
    v-if="!seenBooks.length"
  >
    <div>
      <img src="@images/favorite_empty_icon.png" class="h-48" />
    </div>
    <div class="flex flex-col items-center text-2xl">
      <p class="mb-4">Bạn chưa xem sản phẩm nào</p>
      <router-link to="/">
        <BaseButton>Tiếp tục mua sắm</BaseButton>
      </router-link>
    </div>
  </div>
</template>

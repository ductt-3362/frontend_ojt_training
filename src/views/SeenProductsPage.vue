<script setup>
import BookList from "@components/BookList.vue";
import { useProductStore } from "@stores/product";
import BaseButton from "@components/BaseButton.vue";
import { computed, reactive } from "vue";

const productStore = useProductStore();
const style = reactive({
  button: "bg-red-600 hover:bg-red-800 py-1 px-2 rounded-md",
});
const LIMIT_NUM = 10;
const seenBooks = computed(() => {
  const bookNum = productStore.seenProducts.length;
  const startIndex = bookNum - LIMIT_NUM;
  const endIndex = bookNum;
  return productStore.seenProducts.slice(startIndex, endIndex);
});
const handleClear = () => {
  productStore.removeAll();
};
</script>
<template>
  <div class="mt-6 text-xl font-semibold">SẢN PHẨM ĐÃ XEM</div>

  <div class="flex justify-end" v-if="seenBooks.length">
    <BaseButton :style-prop="style.button" @click="handleClear"
      >Xóa tất cả</BaseButton
    >
  </div>
  <BookList :list="seenBooks" />
  <div
    v-if="!seenBooks.length"
    class="flex h-32 items-center justify-center text-2xl"
  >
    Bạn chưa xem sản phẩm nào
  </div>
</template>

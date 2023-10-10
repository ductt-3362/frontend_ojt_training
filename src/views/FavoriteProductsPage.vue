<script setup>
import BookItem from "@components/BookItem.vue";
import BaseButton from "@components/BaseButton.vue";
import { useProductStore } from "@stores/product";
import { reactive, computed } from "vue";

const productStore = useProductStore();
const style = reactive({
  button: "bg-red-600 hover:bg-red-800 py-1 px-2 rounded-md",
});

const LIMIT_NUM = 10;
const favoriteProducts = computed(() => {
  const startIndex = 0;
  const endIndex = LIMIT_NUM;
  return productStore.favoriteProducts.slice(startIndex, endIndex);
});

const handleClear = () => {
  productStore.removeFavoriteProducts();
};

const handleRemoveItem = (product) => {
  productStore.removeFavoriteProduct(product);
};
</script>
<template>
  <div class="flex items-end justify-between">
    <div class="mt-6 text-xl font-semibold">Danh sách yêu thích</div>
    <BaseButton
      :style-prop="style.button"
      @click="handleClear"
      v-if="favoriteProducts.length"
    >
      Xóa tất cả
    </BaseButton>
  </div>

  <template v-if="favoriteProducts.length">
    <div
      class="my-10 grid grid-cols-5 gap-6 max-lg:grid-cols-5 max-sm:grid-cols-2 sm:max-md:grid-cols-2 md:max-lg:grid-cols-3 lg:max-xl:grid-cols-4"
    >
      <template v-for="book in favoriteProducts" :key="book.id">
        <div class="relative">
          <BookItem :book="book" />
          <BaseButton
            class="absolute left-0 top-0"
            :style-prop="style.button"
            @click="handleRemoveItem(book)"
          >
            Xóa
          </BaseButton>
        </div>
      </template>
    </div>
  </template>
  <template v-else>
    <div class="mt-20 flex flex-col items-center justify-center">
      <div>
        <img src="@images/favorite_empty_icon.png" class="h-48" />
      </div>
      <div class="flex flex-col items-center text-2xl">
        <p class="mb-4">Không có sản phẩm trong danh sách yêu thích.</p>
        <router-link to="/">
          <BaseButton>Tiếp tục mua sắm</BaseButton>
        </router-link>
      </div>
    </div>
  </template>
</template>

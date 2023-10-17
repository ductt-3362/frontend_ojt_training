<script setup>
import BookItem from "@components/BookItem.vue";
import BaseButton from "@components/BaseButton.vue";
import { useProductStore } from "@stores/product";
import { reactive, computed } from "vue";
import BaseBreadcrumb from "@components/BaseBreadcrumb.vue";
import { deleteFavoriteBookApi } from "@apis/book.js";
import { useToast } from "vue-toast-notification";
import { favoriteMessage } from "@locales/vi/messages";

const productStore = useProductStore();
const $toast = useToast();
const style = reactive({
  button: "bg-red-600 hover:bg-red-800 py-1 px-2 rounded-md",
});

const favoriteProducts = computed(() => {
  return productStore.favoriteProducts;
});
const breadcrumbItems = [{ title: `Yêu thích` }];

const handleRemoveItem = async (favoriteBook) => {
  try {
    await deleteFavoriteBookApi(favoriteBook.id);
    $toast.success(favoriteMessage.removeSuccess);
    productStore.removeFavoriteProduct(favoriteBook);
  } catch (error) {
    $toast.error(favoriteMessage.removeError);
  }
};
</script>
<template>
  <BaseBreadcrumb :items="breadcrumbItems" />
  <div class="flex items-end justify-between">
    <div class="mt-6 text-xl font-semibold">Danh sách yêu thích</div>
  </div>

  <template v-if="favoriteProducts.length">
    <div
      class="my-10 grid grid-cols-5 gap-6 max-lg:grid-cols-5 max-sm:grid-cols-2 sm:max-md:grid-cols-2 md:max-lg:grid-cols-3 lg:max-xl:grid-cols-4"
    >
      <template v-for="item in favoriteProducts" :key="item.id">
        <div class="relative">
          <BookItem :book="item.book" />
          <BaseButton
            class="absolute left-0 top-0"
            :style-prop="style.button"
            @click="handleRemoveItem(item)"
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

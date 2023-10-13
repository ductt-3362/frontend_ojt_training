<script setup>
import ProductDetail from "@components/ProductDetail.vue";
import { useRoute } from "vue-router";
import { getDetailBookApi } from "@apis/book";
import { ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { productApiMessage } from "@locales/vi/messages";
import BaseLoading from "@components/BaseLoading.vue";

const $toast = useToast();
const route = useRoute();
const bookDetail = ref({});
const isLoading = ref(true);
const getBookDetailData = async (slug) => {
  try {
    const { data } = await getDetailBookApi(slug);
    bookDetail.value = data[0];
    isLoading.value = false;
  } catch (error) {
    isLoading.value = true;
    $toast.error(productApiMessage.error);
  }
};

watch(
  () => route.params.slug,
  async () => {
    await getBookDetailData(route.params.slug);
  },
  { immediate: true },
);
</script>

<template>
  <template v-if="!isLoading">
    <ProductDetail :product-detail="bookDetail" />
  </template>
  <template v-else>
    <BaseLoading class="h-[80vh]" />
  </template>
</template>

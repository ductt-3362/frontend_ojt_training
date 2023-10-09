<script setup>
import ProductDetail from "@components/ProductDetail.vue";
import { useRoute } from "vue-router";
import { getDetailBookApi } from "@apis/book";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toast-notification";
import { productApiMessage } from "@locales/vi/messages";

const $toast = useToast();
const route = useRoute();
const slug = route.params.slug;
const bookDetail = ref({});
const getBookDetailData = async () => {
  try {
    const { data } = await getDetailBookApi(slug);
    bookDetail.value = data[0];
  } catch (error) {
    $toast.error(productApiMessage.error);
  }
};
onMounted(getBookDetailData);
</script>

<template>
  <ProductDetail :product-detail="bookDetail" />
</template>

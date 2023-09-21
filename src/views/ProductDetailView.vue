<script setup>
import ProductDetail from "@components/ProductDetail.vue";
import { useRoute } from "vue-router";
import { getDetailProductApi } from "@apis/category";
import { ref, onMounted } from "vue";

const route = useRoute();
const id = route.params.id;
const bookDetail = ref({});
const getBookDetailData = async () => {
  try {
    const { data } = await getDetailProductApi(id);
    bookDetail.value = data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(getBookDetailData);
</script>

<template>
  <ProductDetail :product-detail="bookDetail" />
</template>

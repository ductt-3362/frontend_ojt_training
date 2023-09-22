<script setup>
import BookList from "@components/BookList.vue";
import CategoryTitle from "@components/CategoryTitle.vue";
import { Carousel } from "flowbite-vue";
import { getBooksByCategoryApi } from "@apis/book";
import { getCategoriesApi } from "@apis/category";
import { getBannersApi } from "@apis/banner";
import { onMounted, ref } from "vue";

const homepageData = ref([]);
const pictures = ref([]);
const ITEMS_PER_PAGE = 5;
const params = { _limit: ITEMS_PER_PAGE };

const getHomepageData = async () => {
  try {
    const { data: banners } = await getBannersApi();
    pictures.value = banners;
    const { data: categories } = await getCategoriesApi();
    categories.forEach(async ({ id, name }) => {
      const { data: books } = await getBooksByCategoryApi(id, params);
      homepageData.value.push({ id, name, books });
    });
  } catch (err) {
    // handle error
  }
};

onMounted(getHomepageData);
</script>

<template>
  <Carousel :pictures="pictures" :slide="true" />
  <template v-for="category in homepageData" :key="category.id">
    <CategoryTitle :title="category.name" />
    <BookList :list="category.books" />
  </template>
</template>

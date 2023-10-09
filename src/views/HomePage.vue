<script setup>
import BookList from "@components/BookList.vue";
import CategoryTitle from "@components/CategoryTitle.vue";
import { Carousel } from "flowbite-vue";
import { getBooksByCategoryApi } from "@apis/book";
import { getCategoriesApi } from "@apis/category";
import { getBannersApi } from "@apis/banner";
import { onMounted, ref } from "vue";
import BaseLoading from "@components/BaseLoading.vue";
import { useToast } from "vue-toast-notification";
import { homePageMessage } from "@locales/vi/messages";

const homepageData = ref([]);
const pictures = ref([]);
const ITEMS_PER_CATEGORY = 5;
const params = { _limit: ITEMS_PER_CATEGORY };
const $toast = useToast();
const isLoading = ref(false);

const fetchHomepageData = async () => {
  try {
    isLoading.value = true;
    const { data: categories } = await getCategoriesApi();
    categories.forEach(async ({ id, name, slug }) => {
      const { data: books } = await getBooksByCategoryApi(id, params);
      homepageData.value.push({ id, name, slug, books });
    });
    const { data: banners } = await getBannersApi();
    pictures.value = banners;
    isLoading.value = false;
  } catch (err) {
    $toast.error(homePageMessage.error);
  }
};

onMounted(fetchHomepageData);
</script>

<template>
  <template v-if="!isLoading">
    <Carousel :pictures="pictures" :slide="true" class="mb-10" />
    <template v-for="category in homepageData" :key="category.id">
      <CategoryTitle :title="category.name" :slug="category.slug" />
      <BookList :list="category.books" />
    </template>
  </template>
  <template v-else>
    <BaseLoading class="h-[80vh]" />
  </template>
</template>

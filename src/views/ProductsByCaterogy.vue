<script setup>
import { getCategoriesApi, getCategoryApi } from "@apis/category.js";
import { getBooksByCategoryApi } from "@apis/book.js";
import { onMounted, ref, watch } from "vue";

import BookItem from "@components/BookItem.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = ref();
id.value = route.params.id;
const category = ref({});
const books = ref([]);
const categories = ref([]);

const hanldeApi = async function (newId) {
  try {
    const { data: categoryData } = await getCategoryApi(newId || id.value);
    const { data: booksData } = await getBooksByCategoryApi(newId || id.value);
    const { data: categoriesData } = await getCategoriesApi();
    category.value = categoryData;
    books.value = booksData;
    categories.value = categoriesData;
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => route.params.id,
  async (newId) => {
    id.value = newId;
    hanldeApi(newId);
  }
);
onMounted(hanldeApi);
</script>

<template>
  <div class="flex mb-4">
    <div class="w-64 mr-4 h-fit border-2 border-b-0 h">
      <p class="bg-red-700 p-4 text-white">DANH MỤC SẢN PHẨM</p>
      <template v-for="(item, index) in categories" :key="index">
        <router-link
          :to="{ path: `/collections/${item.id}` }"
          class="p-4 block border-b-2"
          >{{ item.name }}</router-link
        >
      </template>
    </div>

    <div class="grid grid-cols-4 gap-4 w-full">
      <div class="col-span-full flex justify-between">
        <p class="text-lg font-bold">{{ category.name }}</p>
        <p>Sắp xếp</p>
      </div>
      <template v-for="book in books" :key="book.id">
        <BookItem :book="book" />
      </template>
    </div>
  </div>
</template>

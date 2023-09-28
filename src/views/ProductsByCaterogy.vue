<script setup>
import { getCategoriesApi, getCategoryApi } from "@apis/category.js";
import { getBooksByCategoryApi } from "@apis/book.js";
import { onMounted, ref, watch } from "vue";

import SelectSort from "@components/SelectSort.vue";
import BookItem from "@components/BookItem.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = ref();
const category = ref({});
const books = ref([]);
const categories = ref([]);
const paramsSort = ref();

const handleSortApi = async (params) => {
  paramsSort.value = { ...params };

  const { data: booksData } = await getBooksByCategoryApi(id.value, params);
  books.value = booksData;
};

const hanldeApi = async function (newId) {
  try {
    const { data: categoryData } = await getCategoryApi(newId);
    const { data: booksData } = await getBooksByCategoryApi(newId);
    const { data: categoriesData } = await getCategoriesApi();
    category.value = categoryData;
    books.value = booksData;
    categories.value = categoriesData;
  } catch (error) {
    // handle error
  }
};

watch(
  () => route.params.id,
  async (newId) => {
    id.value = newId;
    await hanldeApi(newId);
    if (paramsSort.value) {
      await handleSortApi(paramsSort.value);
    }
  },
  { immediate: true }
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
        <p class="text-2xl font-bold">{{ category.name }}</p>
        <SelectSort
          class="max-h-9"
          @handle-sort="(params) => handleSortApi(params)"
        />
      </div>
      <template v-for="book in books" :key="book.id">
        <BookItem :book="book" />
      </template>
    </div>
  </div>
</template>

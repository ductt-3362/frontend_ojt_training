<script setup>
import { getBooksByKeywordApi } from "@apis/book";
import BookList from "@components/BookList.vue";
import { onMounted, ref, watch } from "vue";

const props = defineProps(["query"]);
const books = ref([]);

const handleSearch = async () => {
  try {
    const { data } = await getBooksByKeywordApi(props.query);
    books.value = data;
  } catch (error) {
    throw new Error(error);
  }
};

watch(() => props.query, handleSearch);

onMounted(handleSearch);
</script>

<template>
  <div class="my-12">
    <p class="text-3xl font-semibold">KẾT QUẢ TÌM KIẾM: {{ query }}</p>
    <BookList :list="books" />
  </div>
</template>

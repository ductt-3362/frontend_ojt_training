<script setup>
import { getBooksByKeywordApi } from "@apis/book";
import BookList from "@components/BookList.vue";
import { onMounted, ref, watch } from "vue";

const props = defineProps(["query"]);
const books = ref([]);

const handleSearch = async () => {
  if (!props.query) books.value = [];
  else
    try {
      const { data } = await getBooksByKeywordApi(props.query);
      books.value = data;
    } catch (error) {
      // handle error
    }
};

watch(() => props.query, handleSearch);

onMounted(handleSearch);
</script>

<template>
  <div class="my-12">
    <p v-if="query" class="text-3xl">
      Kết quả: Có {{ books.length }} sản phẩm chứa từ khóa "{{ query }}"
    </p>
    <p v-else class="text-3xl">Hãy nhập từ khóa để tìm kiếm</p>
    <BookList :list="books" />
  </div>
</template>

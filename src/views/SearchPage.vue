<script setup>
import { getBooksByKeywordApi } from "@apis/book";
import BookList from "@components/BookList.vue";
import SelectSort from "@components/SelectSort.vue";
import { productApiMessage } from "@locales/vi/messages";
import { useToast } from "vue-toast-notification";
import { onMounted, ref, watch } from "vue";

const $toast = useToast();
const props = defineProps(["query"]);
const books = ref([]);

const handleSearch = async () => {
  if (!props.query) books.value = [];
  else
    try {
      const { data } = await getBooksByKeywordApi(props.query);
      books.value = data;
    } catch (error) {
      $toast.error(productApiMessage.error);
    }
};

const fetchBooksBySortParams = async (params) => {
  try {
    const { data } = await getBooksByKeywordApi(props.query, params);
    books.value = data;
  } catch (error) {
    $toast.error(productApiMessage.error);
  }
};

watch(() => props.query, handleSearch);

onMounted(handleSearch);
</script>

<template>
  <div class="my-12">
    <div v-if="query" class="flex justify-between">
      <p class="text-3xl">
        Kết quả: Có {{ books.length }} sản phẩm chứa từ khóa "{{ query }}"
      </p>
      <SelectSort @handle-sort="(params) => fetchBooksBySortParams(params)" />
    </div>
    <p v-else class="text-3xl">Hãy nhập từ khóa để tìm kiếm</p>
    <BookList :list="books" />
  </div>
</template>

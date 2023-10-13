<script setup>
import { getBooksByKeywordApi } from "@apis/book";
import BookList from "@components/BookList.vue";
import SelectSort from "@components/SelectSort.vue";
import { productApiMessage } from "@locales/vi/messages";
import { useToast } from "vue-toast-notification";
import { onMounted, ref, watch } from "vue";
import BaseLoading from "@components/BaseLoading.vue";
const $toast = useToast();
const props = defineProps(["query"]);
const books = ref([]);
const isLoading = ref(true);
const handleSearch = async () => {
  if (!props.query) {
    books.value = [];
    isLoading.value = false;
  } else
    try {
      const { data } = await getBooksByKeywordApi(props.query);
      books.value = data;
      isLoading.value = false;
    } catch (error) {
      isLoading.value = true;
      $toast.error(productApiMessage.error);
    }
};

const fetchBooksBySortParams = async (params) => {
  try {
    const { data } = await getBooksByKeywordApi(props.query, params);
    books.value = data;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = true;
    $toast.error(productApiMessage.error);
  }
};

watch(() => props.query, handleSearch);

onMounted(handleSearch);
</script>
<template>
  <template v-if="!isLoading">
    <div class="my-12">
      <div v-if="query" class="flex justify-between max-md:flex-col">
        <p class="text-3xl max-lg:text-2xl">
          Kết quả: Có {{ books.length }} sản phẩm chứa từ khóa "{{ query }}"
        </p>
        <div class="max-md:mt-4">
          <SelectSort
            @handle-sort="(params) => fetchBooksBySortParams(params)"
          />
        </div>
      </div>
      <p v-else class="text-3xl">Hãy nhập từ khóa để tìm kiếm</p>
      <BookList :list="books" />
    </div>
  </template>
  <template v-else>
    <BaseLoading class="h-[64vh]" />
  </template>
</template>

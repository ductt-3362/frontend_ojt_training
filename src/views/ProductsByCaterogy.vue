<script setup>
import { getCategoriesApi, getCategoryBySlugApi } from "@apis/category.js";
import { getBooksByCategoryApi } from "@apis/book.js";
import {
  PRICE_FILTER,
  LESS_THAN_100K_PRICE,
  FROM_100K_TO_200K_PRICE,
  FROM_200K_TO_300K_PRICE,
  MORE_THAN_300K_PRICE,
} from "@constants/filters.js";
import { reactive, onMounted, watch } from "vue";
import CategorySearch from "@components/CategorySearch.vue";
import SelectSort from "@components/SelectSort.vue";
import FilterRadio from "@components/FilterRadio.vue";
import BookItem from "@components/BookItem.vue";
import PagiNation from "@components/PagiNation.vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import { productApiMessage } from "@locales/vi/messages";
const $toast = useToast();
const route = useRoute();
const ITEMS_PER_PAGE = 2;
const state = reactive({
  category: {},
  books: [],
  noPagiBooks: [],
  categories: [],
  params: {}, // filter, search, sort
  noFilterParams: {}, // search, sort
  isSearch: false,
  idCategory: null,
  pickedValue: null,
  pageSum: null,
  pageIndex: null,
  resetCurrentId: true,
});

// thay đổi lại params khi sort được kích hoạt
const handleSort = (params) => {
  state.params = { ...state.params, ...params };
  state.noFilterParams = state.params;
};

// thay đổi lại params khi search được kích hoạt
const handleSearch = (params) => {
  state.params = { ...state.params, ...params };
  state.noFilterParams = state.params;
  state.pageIndex = 1;
  state.resetCurrentId = !state.resetCurrentId;
  if (params.q) {
    state.isSearch = true;
  } else {
    state.isSearch = false;
    handleFilter(state.pickedValue);
  }
};

// lấy dữ liệu books khi filter được kích hoạt.
const handleFilter = async (value) => {
  state.pickedValue = value;
  state.pageIndex = 1;
  state.noFilterParams = { ...state.params, id: null };
  state.resetCurrentId = !state.resetCurrentId;
  const { data: booksData } = await getBooksByCategoryApi(
    state.idCategory,
    state.noFilterParams
  );
  const filteredBooks = booksData.filter((item) => {
    switch (value) {
      case LESS_THAN_100K_PRICE:
        // price < 100000
        return item.price < 100000;
      case FROM_100K_TO_200K_PRICE:
        // 100000 <= price < 20000
        return item.price >= 100000 && item.price < 200000;
      case FROM_200K_TO_300K_PRICE:
        // 200000 <= price < 300000
        return item.price >= 200000 && item.price < 300000;
      case MORE_THAN_300K_PRICE:
        // price > 300000
        return item.price > 300000;
      default:
        // all
        return true;
    }
  });
  const bookIds = filteredBooks.map((item) => item.id);
  if (bookIds.length === 0) {
    state.params = {
      ...state.params,
      id: 10000000,
    };
  } else {
    state.params = {
      ...state.params,
      id: bookIds,
    };
  }
};

// lấy dữ liệu books mới khi chuyển trang
const handlePaginate = (pageIndex) => {
  state.pageIndex = pageIndex;
  fetchProductsByCategory({
    ...state.params,
    _page: pageIndex,
    _limit: ITEMS_PER_PAGE,
  });
};

// get categoris
const fetchCategories = async () => {
  try {
    const { data: categoriesData } = await getCategoriesApi();
    state.categories = categoriesData;
  } catch (error) {
    $toast.error(productApiMessage.error);
  }
};

// get category by slug
const fetchCategoryBySlug = async (slug) => {
  try {
    const { data: categoryData } = await getCategoryBySlugApi(slug);
    state.idCategory = categoryData[0].id;
    state.category = categoryData[0];
  } catch (error) {
    $toast.error(productApiMessage.error);
  }
};

// get product by category
const fetchProductsByCategory = async function (params) {
  try {
    if (state.idCategory) {
      const { data: booksData } = await getBooksByCategoryApi(
        state.idCategory,
        params
      );
      state.books = booksData;
    }
  } catch (error) {
    $toast.error(productApiMessage.error);
  }
};

// get total book by category without pagination
const fetchBooksTotal = async function (params) {
  try {
    const { data: booksData } = await getBooksByCategoryApi(
      state.idCategory,
      params
    );
    state.noPagiBooks = booksData;
    state.pageSum = Math.ceil(booksData.length / ITEMS_PER_PAGE);
  } catch (error) {
    $toast.error(productApiMessage.error);
  }
};

// tính lại tổng số trang khi filter
watch(
  () => state.pickedValue,
  () => {
    if (state.pickedValue !== 0) {
      state.pageSum = Math.ceil(state.books.length / ITEMS_PER_PAGE);
    } else {
      state.pageSum = Math.ceil(state.noPagiBooks.length / ITEMS_PER_PAGE);
    }
  }
);

// Khi slug thay đổi, lấy ra tên của category theo slug
watch(
  () => route.params.slug,
  async () => {
    await fetchCategoryBySlug(route.params.slug);
  }
);

// khi id của category thay đổi (slug thay đổi),  reset lại các params và biến
// gọi hàm tính pageSum và dữ liệu books
watch(
  () => state.idCategory,
  async () => {
    state.resetCurrentId = !state.resetCurrentId;
    state.params = {};
    state.isSearch = false;
    state.pickedValue = null;
    state.pageIndex = 1;
    await fetchBooksTotal({});
    await fetchProductsByCategory({ _limit: ITEMS_PER_PAGE, _page: 1 });
  }
);

// Khi params thay đổi(search, sort, filter) lấy dữ liệu books  và pageSum mới
watch(
  () => state.params,
  async () => {
    await fetchProductsByCategory({
      ...state.params,
      _limit: ITEMS_PER_PAGE,
      _page: state.pageIndex,
    });
    await fetchBooksTotal(state.params);
  }
);

onMounted(async () => {
  const { slug } = route.params;
  await fetchCategories();
  await fetchCategoryBySlug(slug);
  await fetchProductsByCategory({ _limit: ITEMS_PER_PAGE, _page: 1 });
  await fetchBooksTotal();
});
</script>

<template>
  <div class="flex mb-4">
    <div class="flex flex-col w-64 mr-4">
      <div class="h-fit mb-4 border-2 rounded-lg overflow-hidden">
        <p class="bg-red-700 p-4 text-white">DANH MỤC SẢN PHẨM</p>
        <template v-for="item in state.categories" :key="item.id">
          <router-link
            :to="{
              path: `/collections/${item.slug}`,
            }"
            class="p-4 block border-t-2 category-navbar truncate"
            >{{ item.name }}
          </router-link>
        </template>
      </div>
      <div class="w-64 h-fit border-2 h mb-4 rounded-lg overflow-hidden">
        <p class="bg-red-700 p-4 text-white">KHOẢNG GIÁ</p>

        <FilterRadio
          :options-value="PRICE_FILTER"
          class="m-4"
          @update-radio="(pickedValue) => handleFilter(pickedValue)"
        />
      </div>
    </div>

    <div class="w-full flex flex-col">
      <div class="flex justify-between mb-4">
        <p class="text-2xl font-bold truncate w-56">
          {{ state.category.name }}
        </p>
        <div class="flex">
          <CategorySearch
            class="h-9 w-48 mr-4"
            @search="(textSearch) => handleSearch(textSearch)"
          />
          <SelectSort
            class="max-h-9"
            @handle-sort="(params) => handleSort(params)"
          />
        </div>
      </div>
      <div v-if="state.isSearch" class="mb-4 text-lg">
        <p>
          Kết quả: Có
          {{ state.books.length }} sản phẩm với từ khóa "{{ state.params.q }}"
        </p>
      </div>
      <div
        v-if="state.books.length === 0 && !state.isSearch"
        class="mb-4 text-lg"
      >
        <p>Không có kết quả phù hợp với yêu cầu</p>
      </div>
      <div class="grid grid-cols-4 gap-4 w-full">
        <template v-for="book in state.books" :key="book.id">
          <BookItem :book="book" />
        </template>
      </div>
      <PagiNation
        v-if="state.books.length > 0"
        :page-sum="state.pageSum"
        :reset-current-id="state.resetCurrentId"
        @handle-paginate="(pageIndex) => handlePaginate(pageIndex)"
        class="mt-4 self-center"
      />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  background-color: rgb(240, 187, 190);
}
.category-navbar:hover {
  background-color: rgb(240, 187, 190, 0.3);
}
</style>

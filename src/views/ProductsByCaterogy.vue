<script setup>
	import { getCategoriesApi, getCategoryApi } from "@apis/category.js";
	import { getBooksByCategoryApi } from "@apis/book.js";
	import { productApiMessage } from "@locales/vi/messages";
	import { reactive, watchEffect, onMounted, watch } from "vue";
	import CategorySearch from "@components/CategorySearch.vue";

	import SelectSort from "@components/SelectSort.vue";
	import BookItem from "@components/BookItem.vue";
	import { useRoute } from "vue-router";
	import { useToast } from "vue-toast-notification";

	const $toast = useToast();
	const route = useRoute();
	const state = reactive({
		category: {},
		books: [],
		categories: [],
		params: {},
		isSearch: false,
	});
	const handleSort = (params) => {
		state.params = { ...state.params, ...params };
	};
	const handleSearch = (params) => {
		if (params.q) state.isSearch = true;
		else state.isSearch = false;
		state.params = { ...state.params, ...params };
	};

	const fetchProductsByCategory = async function (id, params) {
		try {
			const [
				{ data: categoryData },
				{ data: booksData },
				{ data: categoriesData },
			] = await Promise.all([
				getCategoryApi(id),
				getBooksByCategoryApi(id, params),
				getCategoriesApi(),
			]);
			state.category = categoryData;
			state.books = booksData;
			state.categories = categoriesData;
		} catch (error) {
			$toast.error(productApiMessage.error);
		}
	};

	onMounted(
		watchEffect(async () => {
			await fetchProductsByCategory(route.params.id, state.params);
		}),
		{ immediate: true }
	);

	watch(
		() => route.params.id,
		() => {
			state.params = {};
		}
	);
</script>

<template>
	<div class="flex mb-4">
		<div class="w-64 mr-4 h-fit border-2 border-b-0 h">
			<p class="bg-red-700 p-4 text-white">DANH MỤC SẢN PHẨM</p>
			<template v-for="item in state.categories" :key="item.id">
				<router-link
					:to="{ path: `/collections/${item.id}` }"
					class="p-4 block border-b-2 category-navbar truncate"
					>{{ item.name }}
				</router-link>
			</template>
		</div>
		<div class="w-full flex flex-col">
			<div class="flex justify-between mb-4">
				<p class="text-2xl font-bold truncate w-56">
					{{ state.category.name }}
				</p>
				<div class="flex">
					<CategorySearch
						class="h-9 w-48 mr-4"
						@search="(textSearch) => handleSearch(textSearch)" />
					<SelectSort
						class="max-h-9"
						@handle-sort="(params) => handleSort(params)" />
				</div>
			</div>
			<div v-if="state.isSearch" class="mb-4 text-lg">
				<p>
					Kết quả: Có {{ state.books.length }} sản phẩm với từ khóa "{{
						state.params.q
					}}"
				</p>
			</div>
			<div class="grid grid-cols-4 gap-4 w-full">
				<template v-for="book in state.books" :key="book.id">
					<BookItem :book="book" />
				</template>
			</div>
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

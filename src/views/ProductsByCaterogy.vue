<script setup>
	import {
		getCategoriesApi,
		getCategoryApi,
		getCategoryBySlugApi,
	} from "@apis/category.js";
	import { getBooksByCategoryApi } from "@apis/book.js";
	import { productApiMessage } from "@locales/vi/messages";
	import { PRICE_FILTER } from "@constants/filters.js";
	import { reactive, watchEffect, watch, computed } from "vue";
	import CategorySearch from "@components/CategorySearch.vue";
	import SelectSort from "@components/SelectSort.vue";
	import FilterRadio from "@components/FilterRadio.vue";
	import BookItem from "@components/BookItem.vue";
	import { useRoute } from "vue-router";
	import { useToast } from "vue-toast-notification";

	const $toast = useToast();
	const route = useRoute();
	const state = reactive({
		category: {},
		books: [],
		filteredBooks: [],
		categories: [],
		params: {},
		isSearch: false,
		id: null,
		pickedValue: null,
	});

	state.filteredBooks = computed(() => {
		if (state.pickedValue) {
			return state.books.filter((item) => {
				switch (state.pickedValue) {
					case 1:
						// price < 100000
						return item.price < 100000;
					case 2:
						// 100000 <= price < 20000
						return item.price >= 100000 && item.price < 200000;
					case 3:
						// 200000 <= price < 300000
						return item.price >= 200000 && item.price < 300000;
					case 4:
						// price > 300000
						return item.price > 300000;
					default:
						// all
						return true;
				}
			});
		} else return state.books;
	});
	const handleSort = (params) => {
		state.params = { ...state.params, ...params };
	};
	const handleSearch = (params) => {
		if (params.q) {
			state.isSearch = true;
		} else {
			state.isSearch = false;
		}
		state.params = { ...state.params, ...params };
	};

	const handleFilter = (value) => {
		state.pickedValue = value;
	};

	const fetchProductsByCategory = async function (slug, params) {
		try {
			const { data } = await getCategoryBySlugApi(slug);
			state.id = data[0].id;
			const [
				{ data: categoryData },
				{ data: booksData },
				{ data: categoriesData },
			] = await Promise.all([
				getCategoryApi(slug),
				getBooksByCategoryApi(state.id, params),
				getCategoriesApi(),
			]);
			state.category = categoryData;
			state.books = booksData;
			state.categories = categoriesData;
		} catch (error) {
			$toast.error(productApiMessage.error);
		}
	};

	watchEffect(async () => {
		const { slug } = route.params;
		await fetchProductsByCategory(slug, state.params);
	});

	watch(
		() => route.params.slug,
		() => {
			state.params = {};
			state.isSearch = false;
			state.pickedValue = null;
		}
	);
</script>

<template>
	<div class="flex mb-4">
		<div class="flex flex-col w-64 mr-4">
			<div class="h-fit border-2 border-b-0 h mb-4">
				<p class="bg-red-700 p-4 text-white">DANH MỤC SẢN PHẨM</p>
				<template v-for="item in state.categories" :key="item.id">
					<router-link
						:to="{
							path: `/collections/${item.slug}`,
						}"
						class="p-4 block border-b-2 category-navbar truncate"
						>{{ item.name }}
					</router-link>
				</template>
			</div>
			<div class="w-64 h-fit border-2 h mb-4">
				<p class="bg-red-700 p-4 text-white">KHOẢNG GIÁ</p>

				<FilterRadio
					:options-value="PRICE_FILTER"
					class="m-4"
					@update-radio="(pickedValue) => handleFilter(pickedValue)" />
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
						@search="(textSearch) => handleSearch(textSearch)" />
					<SelectSort
						class="max-h-9"
						@handle-sort="(params) => handleSort(params)" />
				</div>
			</div>
			<div v-if="state.isSearch" class="mb-4 text-lg">
				<p>
					Kết quả: Có
					{{ state.books.length }} sản phẩm với từ khóa "{{ state.params.q }}"
				</p>
			</div>
			<div
				v-if="state.filteredBooks.length === 0 && !state.isSearch"
				class="mb-4 text-lg">
				<p>Không có kết quả phù hợp với yêu cầu</p>
			</div>
			<div class="grid grid-cols-4 gap-4 w-full">
				<template v-for="book in state.filteredBooks" :key="book.id">
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

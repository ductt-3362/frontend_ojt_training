<script setup>
	import IconSearch from "@icons/IconSearch.vue";
	import BaseInput from "@components/BaseInput.vue";
	import { useRoute } from "vue-router";
	import { watch, ref } from "vue";

	const timeOutId = ref();
	const route = useRoute();
	const emit = defineEmits(["search"]);
	const textInput = ref("");
	const DELAY = 1000;

	const handleSearch = function () {
		clearTimeout(timeOutId.value);
		timeOutId.value = setTimeout(() => {
			const textSearch = { q: textInput.value };
			emit("search", textSearch);
		}, DELAY);
	};

	watch(
		() => route.params.id,
		() => {
			textInput.value = "";
		}
	);
</script>

<template>
	<div class="relative">
		<div
			class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<IconSearch />
		</div>
		<BaseInput
			type="text"
			placeholder="Tìm trong danh mục"
			class="pl-10"
			v-model.trim="textInput"
			@input="handleSearch" />
	</div>
</template>

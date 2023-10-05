<script setup>
	import BaseSelect from "@components/BaseSelect.vue";
	import { watch, ref } from "vue";
	import { useRoute } from "vue-router";
	import { sortValueProduct } from "@constants/select.js";
	const emit = defineEmits(["handleSort"]);
	const route = useRoute();
	const optionsValue = sortValueProduct;
	const selectValue = ref("Sắp xếp");
	const handleSelect = (value) => {
		const [_sort, _order] = value.split(" ");
		const params = { _sort: _sort, _order: _order };
		emit("handleSort", params);
	};
	watch(
		() => route.params.slug,
		() => {
			selectValue.value = "Sắp xếp";
		}
	);
</script>

<template>
	<BaseSelect
		v-model="selectValue"
		@input="() => handleSelect(selectValue)"
		:options-value="optionsValue">
		<template v-slot:name>Sắp xếp</template>
	</BaseSelect>
</template>

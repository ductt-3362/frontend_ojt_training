<script setup>
	import BaseSelect from "@components/BaseSelect.vue";
	import { watch, ref } from "vue";
	import { useRoute } from "vue-router";

	const emit = defineEmits(["handleSort"]);
	const route = useRoute();
	const optionsValue = [
		{ label: "A->Z", value: "name asc" },
		{ label: "Z->A", value: "name desc" },
		{ label: "Giá từ thấp đến cao", value: "price asc" },
		{ label: "Giá từ cao đến thấp", value: "price desc" },
	];
	const selectValue = ref("Sắp xếp");
	const handleSelect = (value) => {
		const [_sort, _order] = value.split(" ");
		const params = { _sort: _sort, _order: _order };
		emit("handleSort", params);
	};
	watch(
		() => route.params.id,
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

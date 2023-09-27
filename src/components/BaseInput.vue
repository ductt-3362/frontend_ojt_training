<script setup>
	import { UPDATE_MODEL_VALUE } from "@constants/events.js";
	defineProps(["modelValue"]);
	const emit = defineEmits([UPDATE_MODEL_VALUE]);
	const handleInput = (value) => {
		emit(UPDATE_MODEL_VALUE, value);
	};
</script>

<template>
	<input
		type="text"
		id="default-search"
		class="block w-full h-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
		required
		:value="modelValue"
		@input="(e) => handleInput(e.target.value)" />
</template>

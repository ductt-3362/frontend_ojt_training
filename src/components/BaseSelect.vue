<script setup>
	import { UPDATE_MODEL_VALUE } from "@constants/events.js";
	const props = defineProps(["optionsValue", "modelValue"]);
	const emit = defineEmits([UPDATE_MODEL_VALUE]);
	const hanleSelect = function (value) {
		emit(UPDATE_MODEL_VALUE, value);
	};
</script>

<template>
	<select
		:value="modelValue"
		@input="(e) => hanleSelect(e.target.value)"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block fit-content p-2">
		<option disabled selected>
			<slot name="name"></slot>
		</option>
		<template v-for="item in props.optionsValue" :key="item.value">
			<option :value="item.value">{{ item.label }}</option>
		</template>
	</select>
</template>

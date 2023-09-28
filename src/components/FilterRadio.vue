<script setup>
	import { UPDATE_RADIO } from "@constants/events.js";
	import { ref, watch } from "vue";
	import { useRoute } from "vue-router";
	const route = useRoute();
	const props = defineProps(["modelValue", "optionsValue"]);
	const emit = defineEmits([UPDATE_RADIO]);
	const pickedValue = ref();
	const handleCheck = function () {
		emit(UPDATE_RADIO, pickedValue.value);
	};
	watch(
		() => route.params.slug,
		() => {
			pickedValue.value = null;
		}
	);
</script>

<template>
	<div class="flex flex-col">
		<template v-for="item in props.optionsValue" :key="item.value">
			<div>
				<input
					type="radio"
					:id="item.value"
					:value="item.value"
					v-model="pickedValue"
					@change="handleCheck" />
				<label :for="item.value" class="ml-2">{{ item.label }}</label>
			</div>
		</template>
	</div>
</template>

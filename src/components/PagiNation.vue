<script setup>
	import { computed, ref, watch } from "vue";
	const emit = defineEmits(["handlePaginate"]);
	const props = defineProps(["pageSum", "resetCurrentId"]);
	const currentIndex = ref(1);
	const numItems = ref(1);
	const handlePaginate = (pageIndex) => {
		if (pageIndex < 1 || pageIndex > props.pageSum) return;
		currentIndex.value = pageIndex;
		emit("handlePaginate", pageIndex);
	};

	watch(
		() => props.resetCurrentId,
		() => {
			currentIndex.value = 1;
		}
	);

	// lấy ra mảng chứa số trang trước và sau trang hiện tại
	const arrayAroundIndex = computed(() => {
		const arr = [];
		// Số lượng giá trị trước và sau currentIndex
		const start = currentIndex.value - numItems.value;
		const end = currentIndex.value + numItems.value;

		for (let i = start; i <= end; i++) {
			if (i > 0 && i < props.pageSum) arr.push(i);
		}
		return arr;
	});
</script>

<template>
	<nav aria-label="Page navigation example">
		<ul class="inline-flex -space-x-px text-sm">
			<!-- lùi lại trang phía trước-->
			<li
				@click="handlePaginate(currentIndex - 1)"
				class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-l-lg">
				Trước
			</li>
			<!--  Nếu số trang <= 3 hiển thị tất cả trang -->
			<template v-if="props.pageSum <= 3">
				<ul
					v-for="pageIndex in props.pageSum"
					class="inline-flex -space-x-px text-sm"
					:key="pageIndex">
					<li
						@click="handlePaginate(pageIndex)"
						:class="[
							currentIndex === pageIndex
								? 'bg-blue-50 text-blue-500'
								: 'bg-white text-gray-500',
						]"
						class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
						{{ pageIndex }}
					</li>
				</ul>
			</template>
			<!-- Nếu số trang lớn hơn 3, chỉ hiển thị trang đầu tiên, trang cuối cùng 
			và 1 trang trước và sau trang hiện tại.
			-->
			<template v-else>
				<li
					v-if="currentIndex > numItems + 1"
					@click="handlePaginate(1)"
					:class="[
						currentIndex === 1
							? 'bg-blue-50 text-blue-500'
							: 'bg-white text-gray-500',
					]"
					class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
					{{ 1 }}
				</li>

				<li
					v-if="currentIndex > numItems + 2"
					class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300">
					...
				</li>

				<ul
					v-for="pageIndex in arrayAroundIndex"
					class="inline-flex -space-x-px text-sm"
					:key="pageIndex">
					<li
						@click="handlePaginate(pageIndex)"
						:class="[
							currentIndex === pageIndex
								? 'bg-blue-50 text-blue-500'
								: 'bg-white text-gray-500',
						]"
						class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
						{{ pageIndex }}
					</li>
				</ul>
				<li
					v-if="currentIndex < props.pageSum - numItems - 1"
					class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300">
					...
				</li>
				<li
					@click="handlePaginate(props.pageSum)"
					:class="[
						currentIndex === props.pageSum
							? 'bg-blue-50 text-blue-500'
							: 'bg-white text-gray-500',
					]"
					class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
					{{ props.pageSum }}
				</li>
			</template>
			<!-- chuyển trang tiếp theo-->
			<li
				@click="handlePaginate(currentIndex + 1)"
				class="rounded-r-lg cursor-pointer flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
				Sau
			</li>
		</ul>
	</nav>
</template>

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
const pageIndexStyle = ref(
  "cursor-pointer flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
);

const getStylePageActive = (pageIndex) => {
  return currentIndex.value === pageIndex
    ? "bg-blue-50 text-blue-500"
    : "bg-white text-gray-500";
};

// Gets an array containing the page numbers before and after the current page
const arrayAroundIndex = computed(() => {
  const arr = [];
  // Number of values before and after currentIndex
  const start = currentIndex.value - numItems.value;
  const end = currentIndex.value + numItems.value;

  for (let i = start; i <= end; i++) {
    if (i > 0 && i < props.pageSum) arr.push(i);
  }
  return arr;
});

watch(
  () => props.resetCurrentId,
  () => {
    currentIndex.value = 1;
  }
);
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-sm">
      <!-- Go back to the previous page -->
      <li
        @click="handlePaginate(currentIndex - 1)"
        class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-l-lg"
      >
        Trước
      </li>
      <!--  If page number <= 3 display all pages -->
      <template v-if="props.pageSum <= 3">
        <ul
          v-for="pageIndex in props.pageSum"
          class="inline-flex -space-x-px text-sm"
          :key="pageIndex"
        >
          <li
            @click="handlePaginate(pageIndex)"
            :class="[getStylePageActive(pageIndex), pageIndexStyle]"
          >
            {{ pageIndex }}
          </li>
        </ul>
      </template>
      <!--If the number of pages is greater than 3, 
      only the first and last pages are displayed and 1 page before and after the current page. -->
      <template v-else>
        <li
          v-if="currentIndex > numItems + 1"
          @click="handlePaginate(1)"
          :class="[getStylePageActive(1), pageIndexStyle]"
        >
          1
        </li>

        <li
          v-if="currentIndex > numItems + 2"
          class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300"
        >
          ...
        </li>

        <ul
          v-for="pageIndex in arrayAroundIndex"
          class="inline-flex -space-x-px text-sm"
          :key="pageIndex"
        >
          <li
            @click="handlePaginate(pageIndex)"
            :class="[getStylePageActive(pageIndex), pageIndexStyle]"
          >
            {{ pageIndex }}
          </li>
        </ul>
        <li
          v-if="currentIndex < props.pageSum - numItems - 1"
          class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300"
        >
          ...
        </li>
        <li
          @click="handlePaginate(props.pageSum)"
          :class="[getStylePageActive(props.pageSum), pageIndexStyle]"
        >
          {{ props.pageSum }}
        </li>
      </template>
      <!-- move to the next page -->
      <li
        @click="handlePaginate(currentIndex + 1)"
        class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg"
      >
        Sau
      </li>
    </ul>
  </nav>
</template>

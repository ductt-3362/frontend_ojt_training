<script setup>
import { reactive } from "vue";

const props = defineProps(["size, color"]);
const style = reactive({
  size: props.size ? props.size : "h-6 w-6",
  color: props.color ? props.color : "red",
});
</script>
<template>
  <svg
    :class="[style]"
    class="h-6 w-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 19"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
    />
  </svg>
</template>

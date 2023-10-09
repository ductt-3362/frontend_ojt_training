<script setup>
import { computed, ref } from "vue";
const props = defineProps(["style"]);
defineEmits(["submit"]);
const defaultStyle = ref("text-sm px-5 py-2.5 font-medium rounded-lg ");
const style = computed(() => {
  return props.style ? props.style : defaultStyle.value;
});
</script>

<template>
  <button
    @click="() => $emit('submit')"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300focus:outline-none"
    :class="style"
  >
    <slot></slot>
  </button>
</template>

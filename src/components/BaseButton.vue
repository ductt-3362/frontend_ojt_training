<script setup>
import { computed } from "vue";
const props = defineProps(["styleProp"]);
defineEmits(["submit"]);

const styleProp = computed(() => {
  return props.styleProp
    ? props.styleProp
    : "text-sm px-5 py-2.5 font-medium rounded-lg ";
});
</script>

<template>
  <button
    @click="() => $emit('submit')"
    class="focus:ring-blue-300focus:outline-none bg-blue-700 text-white hover:bg-blue-800 focus:ring-4"
    :class="styleProp"
  >
    <slot></slot>
  </button>
</template>

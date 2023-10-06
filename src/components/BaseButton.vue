<script setup>
import { computed, ref } from "vue";
const props = defineProps(["styleProp"]);
defineEmits(["submit"]);
const defaultStyle = ref("text-sm px-5 py-2.5 font-medium rounded-lg ");
const styleProp = computed(() => {
  return props.styleProp ? props.styleProp : defaultStyle.value;
});
</script>

<template>
  <button
    @click="() => $emit('submit')"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300focus:outline-none"
    :class="styleProp"
  >
    <slot></slot>
  </button>
</template>

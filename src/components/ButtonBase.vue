<script setup>
defineEmits(["submit"]);
</script>

<template>
  <button
    @click="() => $emit('submit')"
    class="px-4 h-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg"
  >
    <slot></slot>
  </button>
</template>

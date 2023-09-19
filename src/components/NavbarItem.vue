<script setup>
defineProps(["path"]);
</script>

<template>
  <router-link
    :to="path"
    class="py-2 pr-4 text-black flex items-center"
    aria-current="page"
  >
    <slot name="icon"></slot>
    <span>
      <slot name="text"></slot>
    </span>
  </router-link>
</template>

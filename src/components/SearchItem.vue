<script setup>
import IconSearch from "@icons/IconSearch.vue";
import BaseButton from "@components/BaseButton.vue";
import BaseInput from "@components/BaseInput.vue";
import { ref } from "vue";

const textSearch = ref("");

const Search = function () {};
</script>

<template>
  <div class="relative w-96">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <IconSearch />
    </div>
    <BaseInput
      type="search"
      placeholder="Search"
      class="pl-10 pr-24"
      v-model="textSearch"
    />
    <BaseButton
      @submit="() => Search()"
      class="h-full absolute right-0 bottom-0 pt-0 pb-0"
    >
      Search
    </BaseButton>
  </div>
</template>

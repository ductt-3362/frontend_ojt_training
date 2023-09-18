<script setup>
import IconSearch from "@icons/IconSearch.vue";
import ButtonBase from "@components/ButtonBase.vue";
import InputBase from "@components/InputBase.vue";
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
    <InputBase
      type="search"
      placeholder="Search"
      class="pl-10 pr-24"
      v-model="textSearch"
    />
    <ButtonBase @submit="() => Search()" class="absolute right-0 bottom-0">
      Search
    </ButtonBase>
  </div>
</template>

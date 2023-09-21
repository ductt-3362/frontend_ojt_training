<script setup>
import IconSearch from "@icons/IconSearch.vue";
import BaseButton from "@components/BaseButton.vue";
import BaseInput from "@components/BaseInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const textSearch = ref("");

const handleSearch = function () {
  if (textSearch.value === "") {
    return;
  }
  router.push({ name: "search", query: { q: textSearch.value } });
};
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
      @keyup.enter="handleSearch"
    />
    <BaseButton
      @submit="handleSearch"
      class="h-full absolute right-0 bottom-0 pt-0 pb-0"
    >
      Search
    </BaseButton>
  </div>
</template>

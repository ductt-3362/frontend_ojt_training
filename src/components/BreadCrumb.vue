<script setup>
import IconSolidHome from "@icons/IconSolidHome.vue";
import IconArrowRight from "@icons/IconArrowRight.vue";
defineProps(["categorySlug", "categoryName", "bookName"]);
</script>
<template>
  <nav>
    <ol class="flex flex-wrap items-center space-x-1 md:space-x-3">
      <li>
        <router-link
          to="/"
          class="flex items-center hover:text-red-600 duration-300"
        >
          <IconSolidHome />

          <p>Trang chủ</p>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ path: `/collections/${categorySlug}` }"
          class="flex items-center"
        >
          <IconArrowRight />
          <span class="hover:text-red-600 duration-300 ml-1">{{
            categoryName
          }}</span>
        </router-link>
      </li>
      <li class="flex items-center">
        <IconArrowRight />
        <span class="ml-1">{{ bookName }}</span>
      </li>
    </ol>
  </nav>
</template>

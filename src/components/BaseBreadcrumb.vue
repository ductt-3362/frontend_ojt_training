<script setup>
import IconSolidHome from "@icons/IconSolidHome.vue";
import IconArrowRight from "@icons/IconArrowRight.vue";

defineProps(["items"]);
</script>

<template>
  <nav>
    <ol class="flex flex-wrap items-center space-x-1 md:space-x-3">
      <li>
        <router-link
          to="/"
          class="flex items-center duration-300 hover:text-red-600"
        >
          <IconSolidHome />

          <p>Trang chủ</p>
        </router-link>
      </li>
      <template v-for="item in items" :key="item.title">
        <li>
          <router-link
            v-if="item.path"
            :to="{ path: `${item.path}` }"
            class="flex items-center"
          >
            <IconArrowRight />
            <span class="ml-1 duration-300 hover:text-red-600">{{
              item.title
            }}</span>
          </router-link>
          <template v-else>
            <li class="flex items-center">
              <IconArrowRight />
              <span class="ml-1">{{ item.title }}</span>
            </li>
          </template>
        </li>
      </template>
    </ol>
  </nav>
</template>

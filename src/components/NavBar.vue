<script setup>
import SearchItem from "@components/SearchItem.vue";
import NavbarItem from "@components/NavbarItem.vue";
import { useAuthStore } from "@stores/auth";
import NavbarItemsDetail from "@const/navbar.js";
import { computed } from "vue";

const authStore = useAuthStore();
const isLogin = computed(() => authStore.getUser);
</script>

<template>
  <nav class="max-w-screen-xl mx-auto">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 h-20"
    >
      <router-link to="/" class="flex items-center">
        <img
          src="@images/BookWithBookmarks.svg"
          class="h-8 mr-3 inline-block"
          alt="Flowbite Logo"
        />

        <span class="self-center text-2xl font-semibold whitespace-nowrap"
          >Bookshop</span
        >
      </router-link>
      <SearchItem />
      <ul class="font-medium flex flex-row">
        <li v-for="(item, index) in NavbarItemsDetail" :key="index">
          <template v-if="isLogin">
            <navbarItem
              v-if="item.status !== 0"
              :to="item.path"
              class="block py-2 pr-4 text-black flex items-center"
            >
              <template v-slot:text>{{ item.text }}</template>
              <template v-slot:icon
                ><component :is="item.component"></component
              ></template>
            </navbarItem>
          </template>
          <template v-else>
            <navbarItem
              v-if="item.status !== 1"
              :to="item.path"
              class="block py-2 pr-4 text-black flex items-center"
            >
              <template v-slot:text>{{ item.text }}</template>
              <template v-slot:icon
                ><component :is="item.component"></component
              ></template>
            </navbarItem>
          </template>
        </li>
      </ul>
    </div>
  </nav>
</template>

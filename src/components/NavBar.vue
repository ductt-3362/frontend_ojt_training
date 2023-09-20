<script setup>
import SearchItem from "@components/SearchItem.vue";
import NavbarItem from "@components/NavbarItem.vue";
import navbarItemsDetail from "@constants/navbar.js";
</script>

<template>
  <nav class="max-w-screen-xl mx-auto">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 h-20"
    >
      <router-link to="/" class="flex items-center">
        <img
          src="../assets/BookWithBookmarks.svg"
          class="h-8 mr-3 inline-block"
          alt="Flowbite Logo"
        />

        <span class="self-center text-2xl font-semibold whitespace-nowrap"
          >Bookshop</span
        >
      </router-link>
      <SearchItem />

      <ul class="font-medium flex flex-row">
        <li v-for="(item, index) in navbarItemsDetail" :key="index">
          <NavbarItem
            :to="item.path"
            class="py-2 pr-4 text-black flex items-center"
          >
            <template v-slot:text>{{ item.text }}</template>
            <template v-slot:icon
              ><component :is="item.component"></component
            ></template>
          </NavbarItem>
        </li>
      </ul>
    </div>
  </nav>
</template>

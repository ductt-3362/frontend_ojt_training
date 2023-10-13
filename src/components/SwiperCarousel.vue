<script setup>
import { register } from "swiper/element/bundle";
register();
defineProps(["pictures"]);
</script>

<template>
  <swiper-container
    class="mb-10"
    :navigation="true"
    :pagination="true"
    :spaceBetween="30"
    :centeredSlides="true"
    :rewind="true"
    :speed="750"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: false,
    }"
  >
    <template v-for="picture in pictures" :key="picture.id">
      <swiper-slide>
        <img :src="picture.src" alt="banner" class="rounded-lg" />
      </swiper-slide>
    </template>
  </swiper-container>
</template>

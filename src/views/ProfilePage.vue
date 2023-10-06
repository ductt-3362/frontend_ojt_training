<script setup>
import { computed, reactive } from "vue";
import { useAuthStore } from "@stores/auth";
import BaseButton from "@components/BaseButton.vue";
import UploadWidget from "@components/UploadWidget.vue";
import { useRouter } from "vue-router";
import IconHome from "@icons/IconHome.vue";
import IconPhone from "@icons/IconPhone.vue";
import IconMail from "@icons/IconMail.vue";

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.userInfo);
const style = reactive({
  content: "text-xl text-gray-500 max-sm:text-sm p-2",
  button: "h-10 p-1 rounded-md max-sm:text-xs max-sm:h-9   mt-4 ",
  image: "rounded-[50%] max-sm:w-32",
  wrapIcon: "mr-2 ",
});
</script>

<template>
  <template v-if="user">
    <div
      class="flex h-[64vh] flex-col items-center justify-center min-w-[350px]"
    >
      <div class="relative max-w-[200px]">
        <img :class="style.image" :src="user.avatar" />
        <UploadWidget
          class="absolute bottom-4 right-4 max-sm:right-0"
          :user="user"
        />
      </div>
      <p class="max-sm:text-sm p-2 text-2xl">{{ user.name }}</p>
      <div class="flex flex-col">
        <div class="flex items-center">
          <div :class="style.wrapIcon">
            <IconMail />
          </div>

          <p :class="style.content">{{ user.email }}</p>
        </div>
        <div class="flex items-center">
          <div :class="style.wrapIcon"><IconPhone /></div>
          <p :class="style.content">{{ user.phone }}</p>
        </div>
        <div class="flex items-center">
          <div :class="style.wrapIcon"><IconHome /></div>
          <p :class="style.content">{{ user.address }}</p>
        </div>
        <BaseButton
          :style-prop="style.button"
          @click="router.push({ name: 'order-history' })"
          >Lịch sử mua hàng</BaseButton
        >
      </div>
    </div>
  </template>
</template>

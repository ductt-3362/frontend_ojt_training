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
  content: "text-xl text-gray-500 max-sm:text-lg p-2",
  button: "h-10 p-1 rounded-md max-sm:text-md max-sm:h-9 mt-4",
  image: "rounded-[50%]  object-cover w-full h-full",
  wrapIcon: "mr-2 ",
});
</script>

<template>
  <template v-if="user">
    <div
      class="flex h-[64vh] min-w-[350px] flex-col items-center justify-center"
    >
      <div class="relative h-[200px] w-[200px]">
        <img :class="style.image" :src="user.avatar" />
        <UploadWidget
          class="absolute bottom-4 right-4 max-sm:right-0"
          :user="user"
        />
      </div>
      <p class="p-2 text-2xl max-sm:text-xl">{{ user.name }}</p>
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

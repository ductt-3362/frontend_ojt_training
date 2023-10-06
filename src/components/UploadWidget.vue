<script setup>
import { onMounted } from "vue";
import { useToast } from "vue-toast-notification";
import { uploadMessage, userApiMessage } from "@locales/vi/messages";
import { updateUserApi } from "@apis/user";
import { DEFAULT_PASSWORD } from "@constants/user";
import { useAuthStore } from "@stores/auth";
import { cloudinaryConfig } from "@configs/global.config";
import {
  CLOUDINARY_SUCCESS_RESULT,
  CLOUDINARY_QUEUED_END_RESULT,
} from "@constants/events";
import IconPen from "@icons/IconPen.vue";

const props = defineProps(["user"]);
const $toast = useToast();
const authStore = useAuthStore();

const widget = window.cloudinary.openUploadWidget(
  cloudinaryConfig,
  async (error, result) => {
    if (!error && result && result.event === CLOUDINARY_SUCCESS_RESULT) {
      $toast.success(uploadMessage.success);
      try {
        const avatar = result.info.secure_url;
        authStore.setUserInfo({ ...props.user, avatar });
        const updateData = {
          ...props.user,
          avatar,
          password: DEFAULT_PASSWORD,
        };
        await updateUserApi(props.user.id, updateData);
        $toast.success(userApiMessage.updateSuccess);
      } catch (error) {
        $toast.error(userApiMessage.updateError);
      }
    } else if (
      error &&
      result &&
      result.event === CLOUDINARY_QUEUED_END_RESULT
    ) {
      $toast.error(uploadMessage.error);
    }
  },
);

function openUploadModal() {
  widget.open();
}

onMounted(() => {
  widget.close();
});
</script>

<template>
  <button
    type="button"
    @click="openUploadModal"
    class="inline-flex items-center rounded-full bg-gray-400 p-2.5 text-center text-sm font-medium text-white duration-300 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
  >
    <IconPen size="w-[20px] h-[20px] text-white" />
  </button>
</template>

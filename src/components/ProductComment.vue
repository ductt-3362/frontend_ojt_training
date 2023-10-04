<script setup>
import BaseSelect from "@components/BaseSelect.vue";
import { sortValueCommnet } from "@constants/select.js";
import {
  getCommentsApi,
  postCommentApi,
  putCommentApi,
} from "@apis/comment.js";
import { commentApiMessage } from "@locales/vi/messages";
import { computed, reactive, ref, watch } from "vue";
import { useAuthStore } from "@stores/auth.js";
import StarRating from "vue-star-rating";
import { formatDate } from "@utils/function";
import { useToast } from "vue-toast-notification";
import IconPen from "@icons/IconPen.vue";
import BaseLoading from "@components/BaseLoading.vue";
const $toast = useToast();
const authStore = useAuthStore();
const props = defineProps(["productDetail"]);
const optionsValue = sortValueCommnet;
const selectValue = ref("Sắp xếp theo");
const state = reactive({
  rating: null,
  isCommenting: false,
  commentContent: "",
  comments: [],
  params: {},
  averageRating: 0,
  isCommented: false,
  isEditComment: false,
});
const isLoading = ref(false);
const userId = computed(() => {
  if (authStore.userInfo) return authStore.userInfo.id;
  return 0;
});
const myComment = computed(() => {
  let comment;
  state.comments.forEach((item) => {
    if (item.userId === userId.value)
      comment = { content: item.content, rating: item.rating };
  });
  return comment;
});
state.isCommenting = computed(() => {
  return state.commentContent ? true : false;
});

state.isCommented = computed(() => {
  return state.comments.find((item) => {
    return item.user.id == userId.value;
  });
});

const handleEditComment = () => {
  state.isEditComment = true;
};

const handleCancelEdit = () => {
  state.isEditComment = false;
};
const handleCancelComment = () => {
  state.isEditComment = false;
  state.commentContent = "";
  state.rating = "";
};
const handleUpdateComment = async () => {
  let currentDate = new Date();
  let commentId;
  state.comments.forEach((item) => {
    if (item.userId === userId.value) commentId = item.id;
  });

  const params = {
    content: myComment.value.content,
    createdAt: currentDate,
    userId: userId.value,
    bookId: props.productDetail.id,
    rating: myComment.value.rating,
  };

  try {
    await putCommentApi(commentId, params);
    const { data: comments } = await getCommentsApi(
      props.productDetail.id,
      state.params
    );
    state.comments = comments;
    state.averageRating = averageRating();
    state.commentContent = "";
    state.isEditComment = false;
    $toast.success(commentApiMessage.success);
  } catch (error) {
    $toast.error(commentApiMessage.error);
  }
};
const handleSelect = (value) => {
  const [_sort, _order] = value.split(" ");
  const params = { _sort: _sort, _order: _order };
  state.params = params;
};

const averageRating = () => {
  let total = 0;
  if (state.comments.length > 0) {
    state.comments.forEach((item) => {
      total += item.rating;
    });
    return parseFloat((total / state.comments.length).toFixed(1));
  }
};
const handleComment = async () => {
  let currentDate = new Date();

  const params = {
    content: state.commentContent,
    createdAt: currentDate,
    userId: userId.value,
    bookId: props.productDetail.id,
    rating: state.rating,
  };

  try {
    await postCommentApi(params);
    const { data: comments } = await getCommentsApi(
      props.productDetail.id,
      state.params
    );
    state.comments = comments;
    state.averageRating = averageRating();
    state.commentContent = "";
    state.isEditComment = false;
    $toast.success(commentApiMessage.success);
  } catch (error) {
    $toast.error(commentApiMessage.error);
  }
};

watch(
  () => [state.params, props.productDetail],
  async () => {
    try {
      isLoading.value = true;
      const { data: comments } = await getCommentsApi(
        props.productDetail.id,
        state.params
      );
      state.comments = comments;
      state.averageRating = averageRating();
      isLoading.value = false;
    } catch (error) {
      $toast.error(commentApiMessage.error);
    }
  },
  { immediate: true }
);
</script>
<template>
  <template v-if="!isLoading">
    <div class="flex items-end">
      <template v-if="state.averageRating">
        <StarRating
          :rating="state.averageRating"
          :star-size="40"
          :show-rating="false"
          :read-only="true"
        />
      </template>
      <p class="ml-4 text-2xl leading-6">{{ state.averageRating }}</p>
    </div>
    <div>
      <div class="flex py-4 justify-between border-b-2 mb-6 items-center">
        <div class="flex font-semibold text-sm">
          <p class="pr-1">{{ state.comments.length }}</p>
          <p>bình luận</p>
        </div>
        <div class="text-sm">
          <BaseSelect
            v-model="selectValue"
            @input="() => handleSelect(selectValue)"
            :options-value="optionsValue"
          >
            <template v-slot:name>Sắp xếp theo</template>
          </BaseSelect>
        </div>
      </div>
      <!-- Đăng bình luận -->
      <div v-if="authStore.userInfo && !state.isCommented" class="flex mb-6">
        <div class="max-w-1/12 h-12 mr-4">
          <img class="h-full rounded-md" :src="authStore.userInfo.avatar" />
        </div>
        <div class="w-full relative">
          <div class="mb-2">
            <StarRating
              v-model:rating="state.rating"
              :star-size="30"
              :show-rating="false"
            />
          </div>
          <textarea
            type="text"
            placeholder="Viết bình luận"
            class="block w-full h-24 p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            v-model="state.commentContent"
          />

          <div class="absolute right-0 flex">
            <button
              :disabled="!state.isCommenting && !state.rating"
              class="mt-2 h-6 py-3 px-3 bg-red-600 text-white flex items-center border-2 rounded justify-center disabled:opacity-50"
              @click="handleCancelComment"
            >
              Hủy
            </button>
            <button
              class="mt-2 h-6 py-3 px-3 bg-blue-600 text-white flex items-center border-2 rounded justify-center disabled:opacity-50"
              :disabled="!state.isCommenting && !state.rating"
              @click="handleComment"
            >
              Đăng
            </button>
          </div>
        </div>
      </div>
      <!-- Form Chỉnh sửa bình luận -->
      <div v-if="state.isEditComment" class="flex mb-6">
        <div class="max-w-1/12 h-12 mr-4">
          <img class="h-full rounded-md" :src="authStore.userInfo.avatar" />
        </div>
        <div class="w-full relative">
          <div class="mb-2">
            <StarRating
              v-model:rating="myComment.rating"
              :star-size="30"
              :show-rating="false"
            />
          </div>
          <textarea
            type="text"
            placeholder="Viết bình luận"
            class="block w-full h-24 p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            v-model="myComment.content"
          />
          <div class="absolute right-0 flex">
            <button
              class="mt-2 h-6 py-3 px-3 bg-blue-600 text-white flex items-center border-2 rounded justify-center disabled:opacity-50"
              :disabled="!myComment.content && !myComment.rating"
              @click="handleUpdateComment"
            >
              Cập nhật
            </button>
            <button
              class="mt-2 h-6 py-3 px-3 bg-red-600 text-white flex items-center border-2 rounded justify-center disabled:opacity-50"
              @click="handleCancelEdit"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
      <!-- Hiển thị danh sách bình luận -->
      <template v-for="comment in state.comments" :key="comment.id">
        <div class="flex border-b py-6">
          <div class="w-12 h-12 mr-4">
            <img class="h-full rounded-md" :src="comment.user.avatar" />
          </div>
          <div class="w-full flex-col pb-2">
            <div class="mb-1">
              <p class="font-medium leading-4">{{ comment.user.name }}</p>
              <div class="flex items-center">
                <StarRating
                  :rating="comment.rating"
                  :star-size="10"
                  :show-rating="false"
                  :read-only="true"
                />
                <div
                  v-if="userId === comment.userId"
                  class="ml-2 cursor-pointer flex hover:text-red-400"
                  @click="handleEditComment"
                >
                  <IconPen class="hover:text-red-400" size="w-4 h-4" />
                  <span class="text-xs font-thin">Chỉnh sửa</span>
                </div>
              </div>
              <p class="text-sm font-thin">
                {{ formatDate(comment.createdAt) }}
              </p>
            </div>
            <div>
              <p class="leading-4">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </template>
  <template v-else>
    <BaseLoading class="h-[100%]" />
  </template>
</template>

<style scoped>
.button-active {
  background-color: rgb(131, 166, 242);
}
</style>

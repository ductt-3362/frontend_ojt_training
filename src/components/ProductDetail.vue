<script setup>
import BaseButton from "@components/BaseButton.vue";
defineProps(["productDetail"]);
</script>

<template>
  <div class="flex mt-24 mb-12 grid grid-cols-5">
    <div class="col-span-2">
      <img :src="productDetail.image" />
    </div>
    <div class="detail-container pl-8 col-span-3">
      <div class="name font-bold text-xl pb-6">
        {{ productDetail.name }}
      </div>
      <div class="price text-xl text-red-700">{{ productDetail.price }}đ</div>
      <div class="detail">
        <ul class="mb-6">
          <li class="leading-8">
            Tác giả:
            <span class="text-red-700">{{ productDetail.author }}</span>
          </li>
          <li class="leading-8">
            Đối tượng:
            <span class="text-red-700">{{ productDetail.audience }}</span>
          </li>
          <li class="leading-8">
            Khuôn khổ: <span>{{ productDetail.size }}</span>
          </li>
          <li class="leading-8">
            Số trang: <span>{{ productDetail.page }}</span>
          </li>
          <li class="leading-8">
            Định dạng: <span>{{ productDetail.cover }}</span>
          </li>
          <li class="leading-8">
            Trọng lượng: <span>{{ productDetail.weight }}</span>
          </li>
        </ul>
        <BaseButton class="bg-red-700 hover:bg-red-400"
          >THÊM VÀO GIỎ HÀNG</BaseButton
        >
      </div>
    </div>
  </div>
  <div class="mb-12 border-2 border-t-0">
    <p class="bg-red-500 text-white px-4">MÔ TẢ - ĐÁNH GIÁ</p>
    <p class="p-4 mb-8 text-base">
      {{ productDetail.description }}
    </p>
  </div>
</template>

<script setup>
import BaseButton from "@components/BaseButton.vue";
import { formatPrice } from "@utils/function";
import { useToast } from "vue-toast-notification";
import { cartMessage } from "@locales/vi/messages";
import IconAddToCart from "@components/icons/IconAddToCart.vue";
import { useCartStore } from "@stores/cart";
import ProductComment from "@components/ProductComment.vue";
import BaseLoading from "@components/BaseLoading.vue";
const cartStore = useCartStore();

const props = defineProps(["productDetail"]);
const $toast = useToast();
const handleAddToCart = () => {
  try {
    cartStore.addToCart(props.productDetail);
    $toast.success(cartMessage.success);
  } catch ({ message: error }) {
    $toast.error(error);
  }
};
</script>

<template>
  <template v-if="productDetail.image">
    <div class="my-12 grid grid-cols-5">
      <div class="col-span-2">
        <img :src="productDetail.image" />
      </div>
      <div class="detail-container pl-8 col-span-3">
        <div class="name font-bold text-xl pb-6">
          {{ productDetail.name }}
        </div>
        <div class="price text-3xl font-bold text-red-700">
          {{ formatPrice(productDetail.price) }}
        </div>
        <div class="detail">
          <ul class="my-6">
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
            <li class="leading-8">
              Số lượng sản phẩm còn:
              <span class="text-lg font-bold">{{
                productDetail.quantity
              }}</span>
            </li>
          </ul>

          <BaseButton
            class="bg-red-700 hover:bg-red-800 py-4 flex items-center justify-center"
            @click="handleAddToCart"
          >
            <IconAddToCart />
            THÊM VÀO GIỎ HÀNG
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="mb-12 border-2 border-t-0">
      <p class="bg-red-500 text-white px-4">MÔ TẢ - ĐÁNH GIÁ</p>
      <p class="p-4 mb-8 text-base">
        {{ productDetail.description }}
      </p>
    </div>
    <div class="mb-12 border-2 border-t-0">
      <div class="flex bg-red-500 text-white">
        <p class="px-4">ĐÁNH GIÁ SẢN PHẨM</p>
      </div>
      <p class="p-4 mb-8 text-base">
        <ProductComment :product-detail="productDetail" />
      </p>
    </div>
  </template>
  <template v-else>
    <BaseLoading class="h-[80vh]" />
  </template>
</template>

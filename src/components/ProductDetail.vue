<script setup>
import BaseButton from "@components/BaseButton.vue";
import { formatPrice } from "@utils/function";
import { useToast } from "vue-toast-notification";
import { cartMessage } from "@locales/vi/messages";
import IconAddToCart from "@components/icons/IconAddToCart.vue";
import { useCartStore } from "@stores/cart";
import ProductComment from "@components/ProductComment.vue";
import BaseLoading from "@components/BaseLoading.vue";
import { reactive } from "vue";
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

const style = reactive({
  image: "w-[25%]  max-lg:w-[40%] max-sm:w-full max-sm:mb-2",
  contentContainer: "pl-8 w-[75%] max-sm:p-0",
  contentTitle: "leading-8 ",
  reviewAndDescription: "mb-12 border-2 border-t-0 ",
  button:
    "flex items-center justify-center bg-red-700 hover:bg-red-800 py-4 mt-4  max-lg:py-2",
});
</script>

<template>
  <template v-if="productDetail.image">
    <div class="flex mb-8 max-sm:flex-col">
      <div :class="style.image">
        <img :src="productDetail.image" />
      </div>
      <div :class="style.contentContainer">
        <div
          class="name font-bold text-xl pb-6 max-lg:pb-2 max-lg:text-lg max-sm:text-base"
        >
          {{ productDetail.name }}
        </div>
        <div class="price text-3xl font-bold text-red-700 max-lg:text-2xl">
          {{ formatPrice(productDetail.price) }}
        </div>
        <div>
          <ul>
            <li :class="style.contentTitle">
              Tác giả:
              <span class="text-red-700">{{ productDetail.author }}</span>
            </li>
            <li :class="style.contentTitle">
              Đối tượng:
              <span class="text-red-700">{{ productDetail.audience }}</span>
            </li>
            <li :class="style.contentTitle">
              Khuôn khổ: <span>{{ productDetail.size }}</span>
            </li>
            <li :class="style.contentTitle">
              Số trang: <span>{{ productDetail.page }}</span>
            </li>
            <li :class="style.contentTitle">
              Định dạng: <span>{{ productDetail.cover }}</span>
            </li>
            <li :class="style.contentTitle">
              Trọng lượng: <span>{{ productDetail.weight }}</span>
            </li>
            <li :class="style.contentTitle">
              Số lượng sản phẩm còn:
              <span class="text-lg font-bold">{{
                productDetail.quantity
              }}</span>
            </li>
          </ul>

          <BaseButton :class="style.button" @click="handleAddToCart">
            <IconAddToCart />
            THÊM VÀO GIỎ HÀNG
          </BaseButton>
        </div>
      </div>
    </div>
    <div :class="style.reviewAndDescription">
      <p class="bg-red-500 text-white px-4">MÔ TẢ</p>
      <p class="p-4 mb-8 text-base">
        {{ productDetail.description }}
      </p>
    </div>
    <div :class="style.reviewAndDescription">
      <p class="px-4 bg-red-500 text-white">ĐÁNH GIÁ SẢN PHẨM</p>
      <p class="p-4 mb-8 text-base">
        <ProductComment :product-detail="productDetail" />
      </p>
    </div>
  </template>
  <template v-else>
    <BaseLoading class="h-[80vh]" />
  </template>
</template>

<script setup>
import BaseButton from "@components/BaseButton.vue";
import { formatPrice } from "@utils/function";
import { useToast } from "vue-toast-notification";
import { cartMessage } from "@locales/vi/messages";
import IconAddToCart from "@components/icons/IconAddToCart.vue";
import { useCartStore } from "@stores/cart";
import ProductComment from "@components/ProductComment.vue";
import { reactive } from "vue";
import Breadcrumb from "@components/BreadCrumb.vue";
import { useRouter } from "vue-router";

const router = useRouter();
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
if (!props.productDetail) {
  router.push({ name: "404Page" });
}
const style = reactive({
  image: "w-[25%]  max-lg:w-[40%] max-sm:w-full max-sm:mb-2 ",
  contentContainer: "pl-8 w-[75%] max-sm:p-0",
  contentTitle: "leading-8 ",
  descriptionTitle: "mb-8 border-2 border-t-0 rounded-lg	overflow-hidden	 ",
  button:
    "flex items-center justify-center bg-red-700 hover:bg-red-800 py-3 mt-4  max-lg:py-2 rounded-lg px-3 text-sm ",
});
</script>

<template>
  <template v-if="productDetail">
    <div class="min-w-[320px]">
      <div class="mb-4">
        <Breadcrumb
          :category-slug="productDetail.category.slug"
          :category-name="productDetail.category.name"
          :book-name="productDetail.name"
        />
      </div>
      <div class="mb-8 flex max-sm:flex-col">
        <div :class="style.image">
          <img :src="productDetail.image" class="rounded-lg" />
        </div>
        <div :class="style.contentContainer">
          <div
            class="name pb-6 text-xl font-bold max-lg:pb-2 max-lg:text-lg max-sm:text-base"
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

            <BaseButton :style-prop="style.button" @click="handleAddToCart">
              <IconAddToCart />
              THÊM VÀO GIỎ HÀNG
            </BaseButton>
          </div>
        </div>
      </div>
      <div :class="style.descriptionTitle">
        <p class="bg-red-500 px-4 text-white">MÔ TẢ</p>
        <p class="mb-8 p-4 text-base">
          {{ productDetail.description }}
        </p>
      </div>
      <div :class="style.descriptionTitle">
        <p class="bg-red-500 px-4 text-white">ĐÁNH GIÁ SẢN PHẨM</p>
        <p class="mb-8 p-4 text-base">
          <ProductComment :product-detail="productDetail" />
        </p>
      </div>
    </div>
  </template>
</template>

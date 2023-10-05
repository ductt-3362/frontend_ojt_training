<script setup>
import IconFacebook from "@icons/IconFacebook.vue";
import IconYoutube from "@icons/IconYoutube.vue";
import { reactive } from "vue";
const style = reactive({
  li: "mt-2 text-sm leading-8",
  title: "font-medium text-lg",
});
</script>
<template>
  <div class="py-8">
    <div class="grid grid-cols-4 gap-6 max-lg:grid-cols-2">
      <div>
        <span :class="style.title">DỊCH VỤ</span>
        <ul :class="style.li">
          <li>Điều khoản sử dụng</li>
          <li>Chính sách bảo mật</li>
          <li>Liên hệ</li>
          <li>Hệ thống nhà sách</li>
        </ul>
      </div>
      <div>
        <span :class="style.title">HỖ TRỢ</span>
        <ul :class="style.li">
          <li>Hướng dẫn đặt hàng</li>
          <li>Chính sách đổi trả - hoàn tiền</li>
          <li>Phương thức vận chuyển</li>
          <li>Phương thức vận chuyển</li>
        </ul>
      </div>
      <div>
        <span :class="style.title">NHÀ XUẤT BẢN ĐỨC DUY</span>
        <ul :class="style.li">
          <li>Giám đốc: TRẦN DUY ANH</li>
          <li>Địa chỉ: TẦNG 13 LANDMARK 72</li>
          <li>Số điện thoại: (+84) 3489573489</li>
          <li>Email: cskh_online@nxbducduy.com.vn</li>
        </ul>
      </div>
      <div>
        <span :class="style.title">KẾT NỐI MẠNG XÃ HỘI</span>
        <div class="flex items-center mt-2">
          <div>
            <IconFacebook />
          </div>
          <div>
            <IconYoutube />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

import IconCart from "@icons/IconCart.vue";
import IconRegister from "@icons/IconRegister.vue";
import IconLogin from "@icons/IconLogin.vue";

const navbarItemsDetail = [
  {
    component: IconLogin,
    path: "/login",
    text: "Đăng nhập",
  },
  {
    component: IconRegister,
    path: "/register",
    text: "Đăng ký",
  },
  {
    component: IconCart,
    path: "/cart",
    text: "Giỏ hàng",
  },
];

export default navbarItemsDetail;

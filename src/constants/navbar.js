import IconCart from "@icons/IconCart.vue";
import IconRegister from "@icons/IconRegister.vue";
import IconLogin from "@icons/IconLogin.vue";
import IconLogout from "@icons/IconLogout.vue";

const NavbarItemsDetail = [
  {
    component: IconLogin,
    path: "/login",
    text: "Đăng nhập",
    status: 0,
  },
  {
    component: IconRegister,
    path: "/register",
    text: "Đăng ký",
    status: 0,
  },
  {
    component: IconCart,
    path: "/cart",
    text: "Giỏ hàng",
    status: 2,
  },
  {
    component: IconLogout,
    path: "/logout",
    text: "Đăng xuất",
    status: 1,
  },
];

export default NavbarItemsDetail;

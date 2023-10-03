import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@views/HomeView.vue";
import CartView from "@views/CartView.vue";
import LoginView from "@views/LoginView.vue";
import RegisterView from "@views/RegisterView.vue";
import ProductDetailView from "@views/ProductDetailView.vue";
import ProductsByCaterogy from "@views/ProductsByCaterogy.vue";
import SearchView from "@views/SearchView.vue";
import ProfileView from "@views/ProfileView.vue";
import OrderHistoryView from "@views/OrderHistoryView.vue";
import OrderDetailView from "@views/OrderDetailView.vue";
import { TOKEN_KEY } from "@constants/storage";
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/books/:slug",
      name: "books",
      component: ProductDetailView,
    },
    {
      path: "/collections/:slug",
      name: "collections",
      component: ProductsByCaterogy,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
      props: (route) => ({ query: route.query.q }),
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/order-history",
      name: "order-history",
      component: OrderHistoryView,
    },
    {
      path: "/order-detail/:id",
      name: "order-detail",
      component: OrderDetailView,
      beforeEnter: (_to, from, next) => {
        from.name !== "order-history" ? next("/") : next();
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  const token = Cookies.get(TOKEN_KEY);
  const authPath = ["/login", "/register"];
  if (token) {
    if (authPath.includes(to.path)) {
      next("/");
      return;
    }
  }

  next();
});

export default router;

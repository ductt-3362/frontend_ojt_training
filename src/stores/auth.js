import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "@constants/storage";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    setUserInfo(accessToken, userData) {
      Cookies.set(TOKEN_KEY, accessToken);
      this.userInfo = userData;
    },
    logout() {
      this.userInfo = null;
      Cookies.remove(TOKEN_KEY);
      window.location.replace("/");
    },
  },
  persist: true,
});

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ token: "", user: null }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    login(accessToken, data) {
      this.token = accessToken;
      this.user = data;
    },
  },
});

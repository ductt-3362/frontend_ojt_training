import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    seenProducts: [],
    favoriteProducts: [],
  }),

  actions: {
    addSeenProduct(product) {
      const seenProduct = this.seenProducts.find(
        (item) => item.id === product.id,
      );

      if (!seenProduct) {
        this.seenProducts.unshift(product);
      }
    },
    addFavoriteProduct(product) {
      const favoriteProducts = this.favoriteProducts.find(
        (item) => item.id === product.id,
      );

      if (!favoriteProducts) {
        this.favoriteProducts.unshift(product);
      } else {
        this.favoriteProducts = this.favoriteProducts.filter((item) => {
          return item.id !== product.id;
        });
      }
    },
    removeFavoriteProduct(product) {
      this.favoriteProducts = this.favoriteProducts.filter((item) => {
        return item.id !== product.id;
      });
    },
    removeFavoriteProducts() {
      this.favoriteProducts = [];
    },
    removeAllSeenProducts() {
      this.seenProducts = [];
    },
  },
  persist: true,
});

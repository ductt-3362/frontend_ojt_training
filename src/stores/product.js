import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    seenProducts: [],
    favoriteProducts: [],
  }),

  actions: {
    setFavoriteProducts(products) {
      this.favoriteProducts = products;
    },
    clearFavoriteProducts() {
      this.favoriteProducts = [];
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
    addSeenProduct(product) {
      const seenProduct = this.seenProducts.find(
        (item) => item.id === product.id,
      );

      if (!seenProduct) {
        this.seenProducts.unshift(product);
      }
    },
    removeAllSeenProducts() {
      this.seenProducts = [];
    },
  },
  persist: true,
});

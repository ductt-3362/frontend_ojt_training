import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    seenProducts: [],
  }),

  actions: {
    addSeenProduct(product) {
      const seenProduct = this.seenProducts.find(
        (item) => item.id === product.id,
      );

      if (!seenProduct) {
        this.seenProducts.push(product);
      }
    },

    removeAll() {
      this.seenProducts = [];
    },
  },
  persist: true,
});

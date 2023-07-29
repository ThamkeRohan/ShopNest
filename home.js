import { addFilteredProductsToDom } from "./productFilter.js";

export function addProductsToHome(addedProducts, products) {
  let topFourProducts = [];
  for (let i = 0; i < 4; i++) {
    topFourProducts = [...topFourProducts, products[i]];
  }
  addFilteredProductsToDom(topFourProducts, true, addedProducts, products);
}

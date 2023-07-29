import { updateCartSlider, updateCartCount } from "./cart.js";
import { saveToLocalStorage } from "./localStorage.js";
export function filtereProductsBySearchInput(products){
    const searchInput = document.querySelector(".filter-container .search-input")
    const filteredProducts = products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase());
    });
    return filteredProducts
}

export function filterProductsByCompany(products, company){
    const companyName = company.innerText
    if (companyName === "All") {
      return products
    }
    const filteredProducts = products.filter((product) => {
      return product.company.toLowerCase() === companyName.toLowerCase();
    });
    return filteredProducts
}

export function filteredProductsByPrice(products, maxPrice){
    const filteredProducts = products.filter((product) => {
      return product.price <= maxPrice;
    });
    return filteredProducts
}

export function addFilteredProductsToDom(filteredProducts, isHome, addedProducts, products) {
  
  let  homeProductsList = document.querySelector(".home-products-list")
  let productsList = document.querySelector(".products-list");
  if(isHome){
    homeProductsList.innerHTML = null
  }else{
    productsList.innerHTML = null
  }
  filteredProducts.forEach((product) => {

    const article = document.createElement("article")
    article.classList.add("product-container")
    article.dataset.id = product.id
    const img = document.createElement("img")
    img.setAttribute("src", product.img)
    const productInfo = document.createElement("div")
    productInfo.classList.add("product-info")
    const productName = document.createElement("div")
    productName.classList.add("product-name")
    productName.innerText = product.name
    const productPrice = document.createElement("div")
    productPrice.classList.add("product-price")
    productPrice.innerText = product.price
    const productCover = document.createElement("div")
    productCover.classList.add("product-cover")
    const cartBtn = document.createElement("span")
    cartBtn.classList.add("material-symbols-outlined")
    cartBtn.classList.add("add-to-cart-btn")
    cartBtn.innerText = "shopping_cart"

    productInfo.append(productName, productPrice)
    productCover.append(cartBtn)
    article.append(img, productInfo, productCover)

    cartBtn.addEventListener("click", () => {
      const productInCart = addedProducts.find((product) => {
        return (
          product.id ===
          Number(cartBtn.closest(".product-container").dataset.id)
        );
      });
      if (productInCart == null) {
        addedProducts.push({
          id: Number(cartBtn.closest(".product-container").dataset.id),
          count: 1,
        });
      } else {
        const updatedAddedProducts = addedProducts.map((product) => {
          if (
            product.id ===
            Number(cartBtn.closest(".product-container").dataset.id)
          ) {
            product.count += 1
          }
          return product
        });
        addedProducts.splice(0, addedProducts.length)
        updatedAddedProducts.forEach(updatedAddedProduct => {
          addedProducts.push(updatedAddedProduct)
        })
        
      }
  
      updateCartCount(addedProducts);
      updateCartSlider(products, addedProducts);
      const cartSlider = document.querySelector(".cart-slider");
      cartSlider.classList.add("show-cart-slider");
      const cartSliderBackground = document.querySelector(".cart-slider-background")
      cartSliderBackground.style.display = "block"
      saveToLocalStorage(addedProducts);
    });

    if (isHome === true) {
        homeProductsList.append(article)
    } else if (productsList != null) {
        productsList.append(article)
    }

  });

  
}
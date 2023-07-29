import { products } from "./products.js";
import { addProductsToHome } from "./home.js";
import { updateCartSlider } from "./cart.js";
import { filterProductsByCompany, filtereProductsBySearchInput, filteredProductsByPrice, addFilteredProductsToDom } from "./productFilter.js";
import { getInitialLocalStorageValue, setInitialLocalStorageValue } from "./localStorage.js";

const toggleBtn = document.querySelector(".toggle-btn");
const closeNavigationBtn = document.querySelector(".close-navigation-btn");
const navigationBackground = document.querySelector(".navigation-background");
const homeProductsList = document.querySelector(".home-products-list");
const productList = document.querySelector(".products-list")
const shoppingCartContainer = document.querySelector(".shopping-cart-container")
const searchInput = document.querySelector(".filter-container .search-input");
const rangeInput = document.querySelector(".filter-container .range-input")
const rangeValue = document.querySelector(".filter-container .range-value");
const companies = document.querySelectorAll(".companies-list li")
const cartSlider = document.querySelector(".cart-slider")
const openCartBtn = document.querySelector(".shopping-cart-container")
const closeCartBtn = document.querySelector(".close-cart-btn")
const cartSliderBackground = document.querySelector(".cart-slider-background")

let addedProducts = [];

setInitialLocalStorageValue()
addedProducts = getInitialLocalStorageValue()

shoppingCartContainer.dataset.cartCount = addedProducts.length
updateCartSlider(products, addedProducts)


if(homeProductsList != null){
  addProductsToHome(addedProducts, products);
}else if(productList != null){
  addFilteredProductsToDom(products, false, addedProducts, products);
}

if (rangeInput != null) {
  rangeValue.innerHTML = rangeInput.value;
}


if(searchInput != null){
  searchInput.addEventListener("input", () => {
    const filteredProducts = filtereProductsBySearchInput(products)
    addFilteredProductsToDom(filteredProducts, false, addedProducts);
    
  });
}

if(companies != null){
  companies.forEach((company) => {
    company.addEventListener("click", () => {
      const filteredProducts = filterProductsByCompany(products, company)
      console.log(filteredProducts);
      addFilteredProductsToDom(filteredProducts, false, addedProducts);
      
    });
  });
}

if(rangeInput != null){
  rangeInput.addEventListener("input", () => {
    rangeValue.innerHTML = rangeInput.value;
    const filteredProducts = filteredProductsByPrice(products, rangeInput.value)
    addFilteredProductsToDom(filteredProducts, false, addedProducts);
    
  });
}


openCartBtn.addEventListener("click",()=>{
  cartSlider.classList.add("show-cart-slider")
  cartSliderBackground.style.display = "block"
})
closeCartBtn.addEventListener("click",()=>{
  cartSlider.classList.remove("show-cart-slider")
  cartSliderBackground.style.display = "none";
})

toggleBtn.addEventListener("click",()=>{
    navigationBackground.classList.toggle("show-navigation-background");
    
})
closeNavigationBtn.addEventListener("click",()=>{
  navigationBackground.classList.toggle("show-navigation-background");
  
});












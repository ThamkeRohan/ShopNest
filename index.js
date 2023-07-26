import { products } from "./products.js";
const toggleBtn = document.querySelector(".toggle-btn");
const closeNavigationBtn = document.querySelector(".close-navigation-btn");
const navigationContainer = document.querySelector(".navigation-container");
const productsList = document.querySelector(".products-list");
const searchInput = document.querySelector(".filter-container .search-input");
const rangeInput = document.querySelector(".filter-container .range-input")
const rangeValue = document.querySelector(".filter-container .range-value");
const companies = document.querySelectorAll(".companies-list li")
const cartSlider = document.querySelector(".cart-slider")
const openCartBtn = document.querySelector(".shopping-cart-container")
const closeCartBtn = document.querySelector(".close-cart-btn")
const addedItemsList = document.querySelector(".added-items-list")
const shoppingCartContainer = document.querySelector(".shopping-cart-container")
const total = document.querySelector(".cart-slider-footer .total-value")
const homeProductsList = document.querySelector(".home-products-list")



let addedItems = [];
if (JSON.parse(localStorage.getItem("ADDED-ITEMS")) == null) {
  localStorage.setItem("ADDED-ITEMS", JSON.stringify([]));
}
addedItems = JSON.parse(localStorage.getItem("ADDED-ITEMS"))
shoppingCartContainer.dataset.cartCount = addedItems.length
updateCartSlider(addedItems)

if(rangeInput != null){
  rangeValue.innerHTML = rangeInput.value;
}
if(homeProductsList != null){
  addProductsToHome(products);
}

addFilteredProductsToDom(products,false);

let filteredProducts=[];
if(searchInput != null){
  searchInput.addEventListener("input", function () {
    filteredProducts = products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase());
    });
    addFilteredProductsToDom(filteredProducts,false);
    addAddToCartBtnsEvent()
  });
}

if(companies != null){
  companies.forEach((company) => {
    company.addEventListener("click", () => {
      let companyName = company.innerText;
      if (companyName === "All") {
        addFilteredProductsToDom(products);
        return;
      }
      filteredProducts = products.filter((product) => {
        return product.company.toLowerCase() === companyName.toLowerCase();
      });
      addFilteredProductsToDom(filteredProducts,false);
      addAddToCartBtnsEvent();
    });
  });
}

if(rangeInput != null){
  rangeInput.addEventListener("input", () => {
    rangeValue.innerHTML = rangeInput.value;
    filteredProducts = products.filter((product) => {
      return product.price <= rangeInput.value;
    });
    addFilteredProductsToDom(filteredProducts,false);
    addAddToCartBtnsEvent();
  });
}


openCartBtn.addEventListener("click",()=>{
  cartSlider.classList.add("show-cart-slider")
})
closeCartBtn.addEventListener("click",()=>{
  cartSlider.classList.remove("show-cart-slider")
})
toggleBtn.addEventListener("click",()=>{
    navigationContainer.classList.toggle("show-navigation-container");
})
closeNavigationBtn.addEventListener("click",()=>{
  navigationContainer.classList.toggle("show-navigation-container");
});

addAddToCartBtnsEvent()


function addRemoveFromCartBtnEvent(){
  const removeBtns = document.querySelectorAll(".remove-btn")
  removeBtns.forEach((removeBtn)=>{
    removeBtn.addEventListener("click",()=>{
      const id = Number(removeBtn.closest(".added-item").dataset.id)
      addedItems = addedItems.filter((addedItem)=>{
        return addedItem.id !== id
      })
      updateCartCount();
      updateCartSlider(addedItems);
      saveToLocalStorage(addedItems);

    })
  })
}

function addAddToCartBtnsEvent(){
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((addToCartBtn) => {
    addToCartBtn.addEventListener("click", () => {
      const itemInCart = addedItems.find((item) => {
        return (
          item.id ===
          Number(addToCartBtn.closest(".product-container").dataset.id)
        );
      });
      if (itemInCart == null) {
        addedItems = [
          ...addedItems,
          {
            id: Number(addToCartBtn.closest(".product-container").dataset.id),
            count: 1,
          },
        ];
      } else {
        addedItems = addedItems.map((item) => {
          if (
            item.id ===
            Number(addToCartBtn.closest(".product-container").dataset.id)
          ) {
            item.count += 1;
          }
          return item;
        });
      }
    
      updateCartCount();
      updateCartSlider(addedItems);
      cartSlider.classList.add("show-cart-slider");
      saveToLocalStorage(addedItems);
    });
  });
}


function updateTotal(){
  const totalPrice = addedItems.reduce((total,currentItem)=>{
    const item = products.find((product)=>product.id === currentItem.id)
    return total + currentItem.count * item.price
  },0)
  
  total.dataset.total = totalPrice.toFixed(2)
}
function saveToLocalStorage(addedItems){
  localStorage.setItem("ADDED-ITEMS", JSON.stringify(addedItems));
}
function updateCartCount(){
  shoppingCartContainer.dataset.cartCount = addedItems.length
}

function addCountBtnsEventListners() {
  const incrementBtns = document.querySelectorAll(".increment-btn");
  const decrementBtns = document.querySelectorAll(".decrement-btn");
  incrementBtns.forEach((incrementBtn) => {
    incrementBtn.addEventListener("click", () => {
      const item = products.find(
        (product) =>
          product.id === Number(incrementBtn.closest(".added-item").dataset.id)
      );
      addedItems = addedItems.map((addedItem) => {
        if (addedItem.id === item.id) {
          addedItem.count += 1;
        }
        return addedItem;
      });
      updateCartSlider(addedItems);
      saveToLocalStorage(addedItems);
    });
  });
  decrementBtns.forEach((decrementBtn) => {
    decrementBtn.addEventListener("click", () => {
      const item = products.find(
        (product) =>
          product.id === Number(decrementBtn.closest(".added-item").dataset.id)
      );
      addedItems = addedItems.map((addedItem) => {
        if (addedItem.id === item.id) {
          addedItem.count -= 1;
        }
        return addedItem;
      });
      addedItems = addedItems.filter((addedItem)=>addedItem.count > 0)
      
      updateCartCount()
      updateCartSlider(addedItems);
      saveToLocalStorage(addedItems);
    });
  });
  
}
function addProductsToHome(products){
  let topFourProducts = []
  for(let i=0; i<4; i++){
    topFourProducts = [...topFourProducts, products[i]]
  }
  addFilteredProductsToDom(topFourProducts,true)
}

function addFilteredProductsToDom(filteredProducts,isHome){
  let filteredProductsStr = "";
  filteredProducts.forEach((product) => {
    let productStr = `<article class="product-container" data-id=${product.id}><img src=${product.img} alt=""><div class="product-info"><div class="product-name">${product.name}</div><div class="product-price">${product.price}</div></div><div class="product-cover"><span class="material-symbols-outlined add-to-cart-btn">shopping_cart</span></div></article>`;
    filteredProductsStr += productStr;
  });
  
  if(isHome === true){
    homeProductsList.innerHTML = filteredProductsStr;
  }
  else if(productsList != null){
    productsList.innerHTML = filteredProductsStr;
  }
  
}

function updateCartSlider(addedItems){
  let allItemsStr = ""
  addedItems.forEach((addedItem)=>{
    const item = products.find((product)=>product.id === Number(addedItem.id));
    const itemStr = `
    <li class="added-item" data-id=${item.id}>
                <div class="img-container">
                    <img src=${item.img} alt="">
                </div>
                <div>
                    <div class="product-info">
                        <div class="product-name">${item.name}</div>
                        <div class="product-price">${item.price}</div>
                    </div>
                    <div>
                        <button type="button" class="remove-btn">remove</button>
                    </div>
                </div>
                <div class="counter-container">
                    <button class="increment-btn">
                        <span class="material-symbols-outlined up-logo">
                            expand_less
                        </span>
                    </button>
                    <div class="product-count">${addedItem.count}</div>
                    <button class="decrement-btn">
                        <span class="material-symbols-outlined down-logo">
                            expand_more
                        </span>
                    </button>
                </div>
      </li>          
    `
    allItemsStr += itemStr
  })
  addedItemsList.innerHTML = allItemsStr
  addCountBtnsEventListners()
  addRemoveFromCartBtnEvent()
  updateTotal();
}

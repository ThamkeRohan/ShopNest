import { saveToLocalStorage } from "./localStorage.js";

export function updateCartSlider(products, addedProducts) {

  const addedItemsList = document.querySelector(".added-items-list");
  addedItemsList.innerHTML = null
  addedProducts.forEach((addedProduct) => {
    const item = products.find(
      (product) => product.id === Number(addedProduct.id)
    );

    const li = document.createElement("li")
    li.classList.add("added-item")
    li.dataset.id = item.id
    const imgContainer = document.createElement("div")
    imgContainer.classList.add("img-container")
    const img = document.createElement("img")
    img.setAttribute("src", item.img)
    const div = document.createElement("div")
    const productInfo = document.createElement("div")
    productInfo.classList.add("product-info")
    const productName = document.createElement("div")
    productName.classList.add("product-name")
    productName.innerText = item.name
    const productPrice = document.createElement("div")
    productPrice.classList.add("product-price")
    productPrice.innerText = item.price
    const divBtn = document.createElement("div")
    const removeBtn = document.createElement("button")
    removeBtn.setAttribute("type", "button")
    removeBtn.classList.add("remove-btn")
    removeBtn.innerText = "remove"
    const counterContainer = document.createElement("div")
    counterContainer.classList.add("counter-container")
    const incrementBtn = document.createElement("button")
    incrementBtn.classList.add("increment-btn")
    const upLogo = document.createElement("span")
    upLogo.classList.add("material-symbols-outlined");
    upLogo.classList.add("up-logo");
    upLogo.innerText = "expand_less"
    const productCount = document.createElement("div")
    productCount.innerText = addedProduct.count
    const decrementBtn = document.createElement("button")
    decrementBtn.classList.add("decrement-btn")
    const downLogo = document.createElement("span")
    downLogo.classList.add("material-symbols-outlined");
    downLogo.classList.add("down-logo")
    downLogo.innerText = "expand_more"

    imgContainer.append(img)
    productInfo.append(productName, productPrice)
    divBtn.append(removeBtn)
    div.append(productInfo, divBtn)
    incrementBtn.append(upLogo)
    decrementBtn.append(downLogo)
    counterContainer.append(incrementBtn, productCount, decrementBtn)
    li.append(imgContainer, div, counterContainer)

    addedItemsList.append(li)
    
    removeBtn.addEventListener("click", () => {
      const id = Number(removeBtn.closest(".added-item").dataset.id);
      const newAddedProducts = addedProducts.filter((addedProduct) => {
        return addedProduct.id !== id;
      });
      addedProducts.splice(0, addedProducts.length);
      newAddedProducts.forEach((newAddedProduct) => {
        addedProducts.push(newAddedProduct);
      });

      updateCartCount(addedProducts);
      updateCartSlider(products, addedProducts);
      saveToLocalStorage(addedProducts);
    });

    incrementBtn.addEventListener("click", () => {
      const item = products.find(
        (product) =>
          product.id === Number(incrementBtn.closest(".added-item").dataset.id)
      );
      const newAddedProducts = addedProducts.map((addedItem) => {
        if (addedItem.id === item.id) {
          addedItem.count += 1;
        }
        return addedItem;
      });
      addedProducts.splice(0, addedProducts.length)
      newAddedProducts.forEach(newAddedProduct => {
        addedProducts.push(newAddedProduct)
      })
      
      updateCartSlider(products, addedProducts);
      saveToLocalStorage(addedProducts);
    
    });

    decrementBtn.addEventListener("click", () => {
      const item = products.find(
        (product) =>
          product.id === Number(decrementBtn.closest(".added-item").dataset.id)
      );
      let newAddedProducts = addedProducts.map((addedItem) => {
        if (addedItem.id === item.id) {
          addedItem.count -= 1;
        }
        return addedItem;
      });
      newAddedProducts = newAddedProducts.filter(newAddedProduct => {
        return newAddedProduct.count > 0
      })
      addedProducts.splice(0, addedProducts.length);
      newAddedProducts.forEach((newAddedProduct) => {
        addedProducts.push(newAddedProduct);
      });
      updateCartCount(addedProducts);
      updateCartSlider(products, addedProducts);
      saveToLocalStorage(addedProducts);
    });


  });

  
  updateTotal(products, addedProducts);
}


export function updateCartCount(addedProducts) {
  const shoppingCartContainer = document.querySelector(".shopping-cart-container")
  shoppingCartContainer.dataset.cartCount = addedProducts.length;
}

function updateTotal(products, addedProducts) {
  const total = document.querySelector(".cart-slider-footer .total-value");
  const totalPrice = addedProducts.reduce((total, currentItem) => {
    const item = products.find((product) => product.id === currentItem.id);
    return total + currentItem.count * item.price;
  }, 0);

  total.dataset.total = totalPrice.toFixed(2);
}
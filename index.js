import { products } from "./products.js";
const toggleBtn = document.querySelector(".toggle-btn");
const closeNavigationBtn = document.querySelector(".close-navigation-btn");
const navigationContainer = document.querySelector(".navigation-container");
const productsList = document.querySelector(".products-list");
const searchInput = document.querySelector(".filter-container .search-input");
const rangeInput = document.querySelector(".filter-container .range-input")
const rangeValue = document.querySelector(".filter-container .range-value");
const companies = document.querySelectorAll(".companies-list li")

if(rangeInput != null){
  rangeValue.innerHTML = rangeInput.value;
}

addFilteredProductsToDom(products);

let filteredProducts=[];
searchInput.addEventListener("input",function(){
  filteredProducts = products.filter((product)=>{
    return product.name.toLowerCase().includes(searchInput.value.toLowerCase())
  })
  addFilteredProductsToDom(filteredProducts)
})

companies.forEach((company)=>{
  company.addEventListener("click",()=>{
    let companyName = company.innerText;
    if(companyName === "All"){
      addFilteredProductsToDom(products);
      return
    }
    filteredProducts = products.filter((product)=>{
      return product.company.toLowerCase() === companyName.toLowerCase();
    })
    addFilteredProductsToDom(filteredProducts)
  })
})

rangeInput.addEventListener("input",()=>{
  rangeValue.innerHTML = rangeInput.value;
  filteredProducts = products.filter((product)=>{
    return product.price <= rangeInput.value;
  })
  addFilteredProductsToDom(filteredProducts)
})


toggleBtn.addEventListener("click",()=>{
    navigationContainer.classList.toggle("show-navigation-container");
})
closeNavigationBtn.addEventListener("click",()=>{
  navigationContainer.classList.toggle("show-navigation-container");
});

function addFilteredProductsToDom(filteredProducts){
  let filteredProductsStr = "";
  filteredProducts.forEach((product) => {
    let productStr = `<article class="product-container"><img src=${product.img} alt=""><div class="product-info"><div class="product-name">${product.name}</div><div class="product-price">${product.price}</div></div></article>`;
    filteredProductsStr += productStr;
  });
  productsList.innerHTML = filteredProductsStr;
}

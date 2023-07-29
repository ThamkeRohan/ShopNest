export function saveToLocalStorage(addedProducts) {
  localStorage.setItem("ADDED-PRODUCTS", JSON.stringify(addedProducts));
}

export function setInitialLocalStorageValue(){
  if (JSON.parse(localStorage.getItem("ADDED-PRODUCTS")) == null) {
    localStorage.setItem("ADDED-PRODUCTS", JSON.stringify([]));
  }
}
export function getInitialLocalStorageValue(){
  return JSON.parse(localStorage.getItem("ADDED-PRODUCTS"));
}
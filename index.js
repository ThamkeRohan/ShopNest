const toggleBtn = document.querySelector(".toggle-btn");
const closeNavigationBtn = document.querySelector(".close-navigation-btn");
const navigationContainer = document.querySelector(".navigation-container");

toggleBtn.addEventListener("click",function(){
    navigationContainer.classList.toggle("show-navigation-container");
})
closeNavigationBtn.addEventListener("click", function () {
  navigationContainer.classList.toggle("show-navigation-container");
});
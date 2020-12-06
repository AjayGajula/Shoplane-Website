
  function navSlide() {
    var burger = document.querySelector(".burger");
    var nav = document.querySelector(".menu-items");
  
    burger.addEventListener("click", function() {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });
  }
  navSlide();
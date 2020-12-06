
$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  });

  function onLoadcartNumber() {
    var productNumber = localStorage.getItem("cartNumbers");
    if (productNumber) {
      document.querySelector("#cart span").textContent = productNumber;
    } else {
      document.querySelector("#cart span").textContent = 0;
    }
  }

  onLoadcartNumber();

  function navSlide() {
    var burger = document.querySelector(".burger");
    var nav = document.querySelector(".menu-items");
  
    burger.addEventListener("click", function() {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });
  }
  navSlide();

  var productList = [];

  $.get(
    "https://5fc38a07e5c28f0016f54b09.mockapi.io/ajay/shoplane",
    function (data) {
      productList = data;
      for (var i = 0; i < productList.length; i++) {
        cards(productList[i]);
      }
    }
  );


  function cards(data) {
    if (data.isAccessory === false) {
      $("#Clothing").append(
        $("<div>")
          .attr({
            id: "card" + data.id,
            class: "card",
          })
          .append(
            $("<a>")
              .attr("href", "product.html?product_id=" + data.id)
              .append(
                $("<img>").attr({
                  class: "preview",
                  src: data.preview,
                  alt: "image-clothing",
                }),
                $("<div>")
                  .attr("class", "description")
                  .append(
                    $("<h3>").text(data.name),
                    $("<h4>").text(data.brand),
                    $("<h5>")
                      .attr("class", "price")
                      .text("RS" + " " + data.price)
                  )
              )
          )
      );
    } else {
      $("#Accessory").append(
        $("<div>")
          .attr({
            id: "card" + data.id,
            class: "card",
          })
          .append(
            $("<a>")
              .attr("href", "product.html?product_id=" + data.id)
              .append(
                $("<img>").attr({
                  class: "preview",
                  src: data.preview,
                  alt: "image-clothing",
                }),
                $("<div>")
                  .attr("class", "description")
                  .append(
                    $("<h3>").text(data.name),
                    $("<h4>").text(data.brand),
                    $("<h5>")
                      .attr("class", "price")
                      .text("RS" + " " + data.price)
                  )
              )
          )
      );
    }
  }
});



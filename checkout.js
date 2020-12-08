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

  burger.addEventListener("click", function () {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });
}
navSlide();

var myLocalStorage = JSON.parse(localStorage.getItem("productIncart"));

var costStorage = JSON.parse(localStorage.getItem("totalAmount"));
var countValue = JSON.parse(localStorage.getItem("cartNumbers") || 0);
$("#number-of-item").text(countValue);

function productContainer(productDetails) {
  $(".cart-items").append(
    $("<div>")
      .attr("class", "item")
      .append(
        $("<img>").attr({
          src: productDetails.preview,
          alt: "product-image",
        }),
        $("<div>")
          .attr("class", "details")
          .append(
            $("<h3>").text(productDetails.title),
            $("<p>")
              .attr("id", "count" + productDetails.id)
              .text("x" + productDetails.count),
            $("<p>")
              .attr("id", "tprice" + productDetails.id)
              .text("Amount: " + productDetails.price)
          ),
        $("<div>")
          .attr("id", "btns")
          .append(
            $("<button>")
              .attr("id", "leftbtn" + productDetails.id)
              .text("-"),
            $("<p>")
              .attr("id", "value" + productDetails.id)
              .text(productDetails.count),
            $("<button>")
              .attr("id", "rightbtn" + productDetails.id)
              .text("+")
          )
      )
  );
  $(`#leftbtn${productDetails.id}`).click(function () {
    decreaseNumber(productDetails, countValue);
  });
  $(`#rightbtn${productDetails.id}`).click(function () {
    increaseNumber(productDetails, costStorage);
  });
}

for (var i = 0; i < myLocalStorage.length; i++) {
  productContainer(myLocalStorage[i], costStorage, countValue);
}

function decreaseNumber(productDetails) {
  if (productDetails.count == 0) {
    alert("Negative values Not Allowed");
  }
  if (productDetails.count > 0) {
    productDetails.count = productDetails.count - 1;
    $(`#count${productDetails.id}`).text("x" + productDetails.count);
    $(`#value${productDetails.id}`).text(productDetails.count);
    var productNumber = localStorage.getItem("cartNumbers");
    productNumber = parseInt(productNumber);
    if (productNumber >= 0) {
      localStorage.setItem("cartNumbers", productNumber - 1);
      document.querySelector("#cart span").textContent = productNumber - 1;
      $("#number-of-item").text(productNumber - 1);
    }

    var totalCost = localStorage.getItem("totalAmount");
    if (totalCost != null) {
      totalCost = parseInt(totalCost);
      var amount = totalCost - productDetails.price;
      $("#total-amount").text(amount);
      localStorage.setItem("totalAmount", amount);
    }
  }
  var productIncart = JSON.stringify(myLocalStorage);
  localStorage.setItem("productIncart", productIncart);
}

function increaseNumber(productDetails) {
  productDetails.count = productDetails.count + 1;
  $(`#count${productDetails.id}`).text("x" + productDetails.count);
  $(`#value${productDetails.id}`).text(productDetails.count);
  var productNumber = localStorage.getItem("cartNumbers");
  productNumber = parseInt(productNumber);
  if (productNumber >= 0) {
    localStorage.setItem("cartNumbers", productNumber + 1);
    document.querySelector("#cart span").textContent = productNumber + 1;
    $("#number-of-item").text(productNumber + 1);
  }

  var totalCost = localStorage.getItem("totalAmount");
  if (totalCost != null) {
    totalCost = parseInt(totalCost);
    var amount = totalCost + productDetails.price;
    $("#total-amount").text(amount);
    localStorage.setItem("totalAmount", amount);
  }
  var productIncart = JSON.stringify(myLocalStorage);
  localStorage.setItem("productIncart", productIncart);
}

$("#total-amount").text(costStorage);

var placeOrder = document.getElementById("place-order");

placeOrder.addEventListener("click", function () {
  $.post(
    "https://5fc38a07e5c28f0016f54b09.mockapi.io/ajay/shoplaneItems",
    myLocalStorage,
    function () {
      window.location.assign("./orderconfirm.html");
      myLocalStorage = window.localStorage.removeItem("productIncart");
      countValue = window.localStorage.removeItem("cartNumbers");

      $("#number-of-item").text("0");
      totalAmount = window.localStorage.removeItem("totalAmount");
    }
  );
});

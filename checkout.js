function onLoadcartNumber() {
  var productNumber = localStorage.getItem("cartNumbers");
  if (productNumber) {
    document.querySelector("#cart span").textContent = productNumber;
  } else {
    document.querySelector("#cart span").textContent = 0;
  }
}

onLoadcartNumber();

var myLocalStorage = JSON.parse(localStorage.getItem("productIncart"));
var totalAmount = parseInt(localStorage.getItem('totalAmount'));


var costStorage = JSON.parse(localStorage.getItem("totalAmount"));
var countValue = JSON.parse(localStorage.getItem('cartNumbers') || 0);


$("#number-of-item").text(countValue);
$("#total-amount").text(costStorage);


function productContainer(productDetails) {
  $('.cart-items')
    .append(
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
          $("<p>").text("x" + productDetails.count),
          $("<p>").text("Amount: " + productDetails.price)
        )
      )
    )
}

for (var i = 0; i < myLocalStorage.length; i++) {
  productContainer(myLocalStorage[i], costStorage);
}


var placeOrder = document.getElementById('place-order');

placeOrder.addEventListener('click', function(){
  $.post('https://5fc38a07e5c28f0016f54b09.mockapi.io/ajay/shoplaneItems', myLocalStorage, function(){
    window.location.assign('./orderconfirm.html');
    myLocalStorage = window.localStorage.removeItem('productIncart');
    countValue = window.localStorage.removeItem('cartNumbers');
    
    $("#number-of-item").text('0');
    totalAmount = window.localStorage.removeItem('totalAmount');

})
})

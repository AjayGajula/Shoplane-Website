var container = document.getElementById("container");

function products(data) {
  var leftImg = document.createElement("div");
  leftImg.id = "left-img";
  var Preview = document.createElement("img");
  Preview.id = "preview";
  Preview.src = data.preview;
  leftImg.appendChild(Preview);
  container.appendChild(leftImg);
  var rightItem = document.createElement("div");
  rightItem.id = "right-items";
  var name = document.createElement("h1");
  name.innerHTML = data.name;
  rightItem.appendChild(name);
  var brand = document.createElement("h2");
  brand.innerHTML = data.brand;
  rightItem.appendChild(brand);
  var price = document.createElement("h3");
  price.innerHTML = "Price: Rs ";
  var cost = document.createElement("span");
  cost.innerHTML = data.price;
  price.appendChild(cost);
  rightItem.appendChild(price);
  var description = document.createElement("h3");
  description.innerHTML = "Description";
  rightItem.appendChild(description);
  var content = document.createElement("p");
  content.innerHTML = data.description;
  rightItem.appendChild(content);
  var sampleImg = document.createElement("div");
  sampleImg.id = "preview1";

  var btn = document.createElement("button");
  btn.id = "button";
  btn.innerHTML = "Add to cart";

  rightItem.appendChild(sampleImg);
  rightItem.appendChild(btn);
  container.appendChild(rightItem);

  var cartBtn = document.getElementById("button");
  cartBtn.addEventListener("click", function () {
    cartNumbers(productSection);
    totalAmount(productSection);
  });


  function onLoadcartNumber() {
    var productNumber = localStorage.getItem("cartNumbers");
    if (productNumber) {
      document.querySelector("#cart span").textContent = productNumber;
    }
  }

  function cartNumbers(product) {
    var productNumber = localStorage.getItem("cartNumbers");
    productNumber = parseInt(productNumber);
    if (productNumber) {
      localStorage.setItem("cartNumbers", productNumber + 1);
      document.querySelector("#cart span").textContent = productNumber + 1;
    } else {
      localStorage.setItem("cartNumbers", 1);
      document.querySelector("#cart span").textContent = 1;
    }

    setItems(product);
  }

  function setItems(product) {
    if (localStorage.getItem("productIncart") === null) {
      var myCartData = [];
    } else {
      myCartData = JSON.parse(localStorage.getItem("productIncart"));
    }

    if (myCartData.length === 0) {
      var myObj = {
        id: product.id,
        title: product.name,
        count: 1,
        price: product.price,
        preview: product.preview,
      };
      myCartData.push(myObj);
    } else if (myCartData.length != 0) {
      var w = 0;
      for (var i = 0; i < myCartData.length; i++) {
        if (myCartData[i].id == product.id) {
          myCartData[i].count = parseInt(myCartData[i].count) + 1;
          w += 1;
        }
      }
      if (w == 0) {
        var myObj = {
          id: product.id,
          title: product.name,
          count: 1,
          price: product.price,
          preview: product.preview,
        };
        myCartData.push(myObj);
      }
    }
    localStorage.setItem("productIncart", JSON.stringify(myCartData));
  }



  function totalAmount(productCost){
    var totalCost = localStorage.getItem('totalAmount');
    if(totalCost != null){
      totalCost = parseInt(totalCost);
      localStorage.setItem('totalAmount', totalCost + productCost.price)
    }else{
      localStorage.setItem('totalAmount', productCost.price)
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


  for (var i = 0; i < data.photos.length; i++) {
    var images = document.createElement("img");
    images.className = "active pics";
    images.id = "img" + i;
    images.src = data.photos[i];
    images.alt = "preview-images";
    sampleImg.appendChild(images);

    document.getElementById("img" + i).addEventListener("click", function (e) {
      $(".pics").removeClass("active");
      Preview.src = e.target.src;
      $(`#${e.target.id}`).addClass("active");
    });
  }
  $(".pics").removeClass("active");
  $("#img0").addClass("active");
}

var secId = window.location.search.split("=")[1];

var productSection = [];
var xhttp = new XMLHttpRequest();
xhttp.open(
  "GET",
  "https://5fc38a07e5c28f0016f54b09.mockapi.io/ajay/shoplane/" + secId,
  true
);
xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    productSection = JSON.parse(this.responseText);
    products(productSection);
  }
};
xhttp.send();

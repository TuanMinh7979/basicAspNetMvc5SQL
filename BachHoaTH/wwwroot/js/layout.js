// let curUrl = window.location.href;
// let lidx = curUrl.lastIndexOf("/")
// let oriUrl = curUrl;
// if (lidx > 6) {
//   oriUrl = curUrl.substring(0, curUrl.lastIndexOf("/"));
// }

function renderProduct(rs, purl) {
  let newList = [];
  rs.map((item) => {
    let productUrl = `${purl}/${item.alias}-${item.productId}.html`;
    newList.push(
      `    <div class="col-md-6 col-lg-3 mb-3 col-6  productList__item ">
      <a href="${productUrl}">
          <div class="productList__item-image">
              <img src="${purl}/images/products/${item.thumb}" class="card-img-top" alt="Laptop" />
  
          </div>
          <div class="productList__item-content">
              <div class="justify-content-between productList__item-info">
                  <div class="productList__item-name" >
                      <p class="mb-0 productNameP" style="padding: 6px">${item.productName}</p>
                  </div>
  
                  <div class="productList__item-price" style="padding: 6px;">
                     
                      <p class="mb-0 "><span>Giá: </span><span class="priceP">${item.price}</span></p>
  
                      <div class="post-info"
                      style="display: flex; justify-content:space-between; align-items:center">
                          <p class="mb-0 priceDate" style="font-size: 0.8rem;"><span>Ngày
                                  đăng: </span>${item.dateCreated}</p>
                      </div>
  
                  </div>
              </div>
           
          </div>
      </a>
  </div>`



    );
  });

  return newList;
}
function loadHeaderCart() {
  $("#miniCart").load("/AjaxContent/HeaderCart");
  $("#numberCart").load("/AjaxContent/NumberCart");
}

function remove(productid) {
  $.ajax({
    type: "POST",
    url: "/api/cart/remove",
    data: {
      productID: productid,
    },
    success: function (response) {
      alert("Đã xóa sản phẩm ra khỏi giỏ hàng");
      location.reload();
    },
  });
}
$(function () {
  $(document).on("click", ".add-to-card", function () {
    var productid = $("#ProductId").val();
    var soluong = $("#txtsoLuong").val();
    $.ajax({
      url: "/api/cart/add",
      type: "POST",
      dataType: "JSON",
      data: {
        productID: productid,
        amount: soluong,
      },
      success: function (response) {
        if (response.success) {
          loadHeaderCart();
          location.reload();
        }
      },
      error: function (error) {
        alert("Thêm sản phẩm không thành công");
      },
    });
  });

  $(document).on("click", ".cartItem", function () {
    var productid = $(this).attr("data-mahh");
    var soluong = parseInt($(this).val());
    $.ajax({
      url: "api/cart/update",
      type: "POST",
      dataType: "JSON",
      data: {
        productID: productid,
        amount: soluong,
      },
      success: function (result) {
        if (result.success) {
          loadHeaderCart();
          window.location = "cart.html";
        }
      },
      error: function (rs) {
        alert("Cập nhật giỏ hàng không thành công");
      },
    });
  });

  $(".xemdonhang").click(function () {
    var madonhang = $(this).attr("data-madonhang");
    $.ajax({
      type: "POST",
      url: "/api/checkout/details",
      dataType: "JSON",
      data: {
        id: madonhang,
      },
      success: function (response) {
        $("#records_table").html("");
        $("#records_table").html(response.donHang);

      },
    });
  });

  function startSpin() {
    $("#overlay").fadeIn();
  }
  function stopSpin() {
    $("#overlay").fadeOut();
  }


});

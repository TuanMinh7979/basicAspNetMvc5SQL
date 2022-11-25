let curUrl = window.location.href;
let lidx = curUrl.lastIndexOf("/");
let oriUrl = curUrl;
if (lidx > 6) {
  oriUrl = curUrl.substring(0, curUrl.lastIndexOf("/"));
}

var nofPage = $("#nofPage").val(); //total 4 page
var pageSize = $("#pageSize").val(); //6 item a page
// function renderProduct(rs) {
//   let newList = []
//   rs.map(item => {

//     let productUrl = `${oriUrl}/${item.alias}-${item.productId}.html`
//     newList.push(
//       `<div class="col-md-6 col-lg-3 mb-3 col-6  productList__item ">
//       <a href="${productUrl}">
//         <div class="productList__item-image">
//           <img src="${oriUrl}/images/products/${item.thumb}" class="card-img-top" alt="Laptop" />

//         </div>
//         <div class="productList__item-content">
//           <div class="justify-content-between productList__item-info">
//             <div class="productList__item-name" style="padding: 6px">
//               <p class="mb-0 ">${item.productName}</p>
//             </div>
//             <div class="productList__item-price" style="padding: 6px">
//               <p class="text-dark mb-0 "${item.price}</p>
//             </div>
//           </div>
//           <div class="d-flex justify-content-center addToCartDiv">
//             <button class="addToCartBtn">Add to cart</button>
//           </div>
//         </div>
//       </a>
//     </div>`
//     )

//   })

//   return newList;

// }

$(function ($) {
  $(document).on("click", ".pg-item", function () {
    let newPage = $(this).attr("data-page");
    changePage(newPage);
  });
  function changePage(nP) {
    let skip = (nP - 1) * pageSize;
    let newTop = pageSize;
    $.ajax({
      url: `/api/ProductApi/All?$top=${newTop}&$skip=${skip}`,
      type: "GET",
      success: function (res) {
        $("#pList").html(renderProduct(res, oriUrl));
      },
      error: function (e) {
        alert("error");
      },
    });
  }

  $(document).on("click", ".catForm", function () {
    $(this).submit();
  });
});

// alert(usrName)
$(".categories-slider").slick({
  centerMode: true,
  centerPadding: "60px",
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,

  prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
  nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,

  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        arrows: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        arrows: true,
        infinite: false,
      },
    },
  ],
  // autoplay: true,
  // autoplaySpeed: 1000,
});

//phan trang

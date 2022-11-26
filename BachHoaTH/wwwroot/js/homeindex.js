
var nofPage = $("#nofPage").val(); //total 4 page
var pageSize = $("#pageSize").val(); //6 item a page

// _________

$(function () {

  let curUrl = window.location.href;
  let lidx = curUrl.lastIndexOf("/");
  let oriUrl = curUrl;
  if (lidx > 6) {
    oriUrl = curUrl.substring(0, curUrl.lastIndexOf("/"));
  }


  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });


  let pricePs = $(document).find(".priceP");
  $(pricePs).each(function () {
    let rawPrice = $(this).text();
    $(this).text(formatter.format(rawPrice))
  })

  // _________

});


$(document).on("click", ".page-item", function () {
  let newPage = $(this).attr("data-page");
  changePage(parseInt(newPage));
});
function changePage(nP) {

  let skip = (nP - 1) * pageSize;

  let newTop = pageSize;
  $.ajax({
    url: `/api/ProductApi/All?$top=${newTop}&$skip=${skip}&$orderby=DateCreated desc`,
    type: "GET",
    success: function (res) {
      $("#pList").html(renderProduct(res, window.location.origin));
    },
    error: function (e) {
      alert("error");
    },
  });
}

$(document).on("click", ".catForm", function () {
  $(this).submit();
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



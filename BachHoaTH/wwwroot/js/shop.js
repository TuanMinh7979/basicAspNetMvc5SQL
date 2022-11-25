$(function () { });
// /api/ProductApi/All?$filter=contains(ProductName,'Honda') eq true and catId eq 13 and
//BY EVENT build api url
$(".priceFilterBtn").on("click", function () {
  //   + them vo param list can xu ly bang onlich button not url
  $("#priceFrom").val("");
  $("#priceFrom").text("");
  $("#priceTo").val("");
  $("#priceTo").text("");

  let selected = $(this).is(".act");
  $(".priceFilterBtn").removeClass("act");

  if (selected) {
    $(this).removeClass("act");
  } else {
    $(this).addClass("act");
  }




  let rsUrl = buildFilterApiUrl();
  getAndRenderFromApi(rsUrl);
});

$("#catIdSel").on("change", function () {

  let rsUrl = buildFilterApiUrl();

  getAndRenderFromApi(rsUrl);
});

$("#priceRangeSubmit").on("click", function () {
  $(".priceFilterBtn").removeClass("act");
  //


  let rsUrl = buildFilterApiUrl();


  getAndRenderFromApi(rsUrl);
});

//
function getAndRenderFromApi(apiUrl) {
  $.ajax({
    url: apiUrl,
    type: "GET",
    success: function (res) {
      console.log(res);
      $("#proList").html(renderProduct(res, window.location.origin));
    },
    error: function (e) {
      alert("error");
    },
  });
}
function buildFilterApiUrl(newFilterStr) {
  //xy ly arr param
  let arrFilterStr = [];
  let apiQueryUrl = "/api/ProductApi/All?$filter=";


  //cate
  let queryStr = ""
  let val = $("#catIdSel").val();
  if (val) val = val.trim();
  if (val != "" && val != "0" && val != 0) {
    queryStr = `catId eq ${val} and `;
    arrFilterStr.push(queryStr)
  }

  //tag price
  let queryStr1 = ""
  let val1 = $(".priceFilterBtn.act").val();
  if (val1) val1 = val1.trim();
  if (val1 == "l1") {
    queryStr1 = "Price lt 5000000 and ";

  } else if (val1 == "l2") {
    queryStr1 = "Price gt 5000000 and Price lt 15000000 and ";

  } else if (val1 == "l3") {
    queryStr1 = "Price gt 15000000 and ";

  }
  //price range

  let from = parseInt($("#priceFrom").val());
  let to = parseInt($("#priceTo").val());
  let queryStr2 = "";
  if (from && to) {
    queryStr2 = `Price gt ${from} and Price lt ${to} and `;
  } else if (from) {
    queryStr2 = `Price gt ${from} and `;
  } else if (to) {
    queryStr2 = `Price lt ${to} and `;
  }
  //




  if (queryStr2 != "") {
    arrFilterStr.push(queryStr2)
  } else if (queryStr1 != "") {
    arrFilterStr.push(queryStr1)
  }


  let filterStr = arrFilterStr.join("");
  apiQueryUrl += filterStr;
  if (apiQueryUrl.trim().endsWith("and")) {
    apiQueryUrl = apiQueryUrl.substring(0, apiQueryUrl.length - 4);
  }
  console.log(apiQueryUrl);
  return apiQueryUrl;
}


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


$("#searchNameBtn").on("click", function () {
  let rsUrl = buildFilterApiUrl();

  getAndRenderFromApi(rsUrl);
})

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


  //search name
  // contains(ProductName,'Honda') eq true
  let queryStrSearch = ""
  let valS = $("#searchInp").val();
  if (valS) valS = valS.trim();
  if (valS) {
    queryStrSearch = `contains(productName,'${valS}') eq true and `;
    arrFilterStr.push(queryStrSearch)
  }

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
    queryStr1 = "Price le 5000000 and ";

  } else if (val1 == "l2") {
    queryStr1 = "Price ge 5000000 and Price le 15000000 and ";

  } else if (val1 == "l3") {
    queryStr1 = "Price ge 15000000 and ";

  }
  //price range

  let from = parseInt($("#priceFrom").val());
  let to = parseInt($("#priceTo").val());
  let queryStr2 = "";
  if (from && to) {
    queryStr2 = `Price ge ${from} and Price le ${to} and `;
  } else if (from) {
    queryStr2 = `Price ge ${from} and `;
  } else if (to) {
    queryStr2 = `Price le ${to} and `;
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
  if (apiQueryUrl.trim() == "/api/ProductApi/All?$filter=") {
    apiQueryUrl = "/api/ProductApi/All"
  }
  console.log(apiQueryUrl);
  return apiQueryUrl;
}


$(function () {


  let catIdSelVal = $("#catCurVal").val();

  let opts = $("#catIdSel option")

  for (let item of opts) {
    console.log($(item).val().trim())
    console.log(catIdSelVal)
    if ($(item).val().trim() == catIdSelVal) {

      $(item).attr('selected', 'selected')
      return;
    }

  }


  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  $(".priceP").each(function () {
    let rawPrice = $(this).text();
    $(this).text(formatter.format(rawPrice))
  })

})

$("#resetBtn").on("click", function () {
  $("#priceFrom").val("");
  $("#priceFrom").text("");
  $("#priceTo").val("");
  $("#priceTo").text("");

  $("#searchInp").val("");
  $("#catIdSel").val("0");
  $(".priceFilterBtn").removeClass("act");

  let rsUrl = buildFilterApiUrl();


  getAndRenderFromApi(rsUrl);

})
let curUrl = window.location.href;
let lidx = curUrl.lastIndexOf("/")
let oriUrl = curUrl;
if (lidx > 6) {
    oriUrl = curUrl.substring(0, curUrl.lastIndexOf("/"));
}


let phoneStatus = {
    "0": "Mới",
    "1": "Đã sử dụng",
    "2": "Đã sửa chữa"
}
let laptopTinhTrang = {
    "0": "Mới",
    "1": "Đã sử dụng",
    "2": "Đã sửa chữa"
}


$(document).ready(function () {
    let productId = $("#idHInp").val();
    let kvValStr = $("#kvHInp").val();
    var kv = JSON.parse(kvValStr);
    let catId = $("#CatIDHInp").val();
    let thumb = $("#thumbHInp").val();


    let slideImgs = []
    slideImgs.push(window.location.origin + "/images/products/" + thumb)
    $.ajax({
        url: `/api/getcateview/${catId}`,
        type: "GET",
        dataType: "JSON",

        success: function (response) {

            $("#firstSection").append(eval('`' + response.showAtb + '`'))
        },
        error: function (error) {
            console.log(err)
        }
    });
    //get image and render 
    // $('.album-slider').slick('slickRemove');
    $.ajax({
        url: `/api/getimgs/${productId}`,
        type: "GET",
        dataType: "JSON",

        success: function (res) {
            res.forEach(item => {
                slideImgs.push(window.location.origin + "/images/products/" + item.fileName)
            })


            slideImgs.forEach(linkI => {
        
                $(".album-slider").append(
                    `<div class="album-slider__item" style="height: 60px; width: 60px">
                        <img class=""
                            src="${linkI}"
                            alt="" />

                    </div>`
                )

                setTimeout(() => {

                    $(".album-slider").slick({

                        arrows: true,
                        centerMode: true,
                        // centerPadding: "10px",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
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


                    $(".album-slider").on(
                        "afterChange",
                        function (event, slick, currentSlide, nextSlide) {

                            var CurrentImg = $(slick.$slides.get(currentSlide))
                                .find("img")
                                .attr("src")


                            $(".mainPhoto").attr('src', CurrentImg);
                        }
                    );
                }, 0)

                //parse string to html
                let rawString = $(".productMota").text();
               
                $(".productMota").html(eval('`' + rawString + '`'));



            })



        },
        error: function (error) {
            console.log(err)
        }
    });






});

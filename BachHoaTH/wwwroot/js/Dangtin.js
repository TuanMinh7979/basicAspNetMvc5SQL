

var dongxeData = [
    {
        gid: "Honda",
        name: "Winner",

    },
    {
        gid: "Honda",
        name: "Airblade",

    },

    {
        gid: "Yamaha",
        name: "Exciter",

    },
    {
        gid: "Yamaha",
        name: "NVX",

    },
    {
        gid: "Suzuki",
        name: "Satria",

    },
    {
        gid: "Suzuki",
        name: "Raider",

    },
]



$(document).on("change", "#hangxeSel", function () {
    let dongXeId = $(this).val();

    $("#dongxeSel option").remove();
    if (dongXeId == "0") {
        dongxeData.map(item => {

            $("#dongxeSel").append(`<option value="${item.name}">${item.name}</option>`);

        })
    } else {
        dongxeData.map(item => {

            if (item.gid == dongXeId) {

                $("#dongxeSel").append(`<option value="${item.name}">${item.name}</option>`);
            }
        })
    }
})





$(function () {




    document.getElementById("startModelBtn").click();





});

$(document).on("click", "#selectCatUl>div", function () {
    let catsModal = $(this).parent().parent().parent().parent().parent();
    catsModal.modal('hide')

    let catId = $(this).attr('id')
    let catName = $(this).text();

    $.ajax({
        url: `/api/getcateformdata/${catId}`,
        type: "GET",
        dataType: "JSON",
        success: function (results) {
            console.log(results.atb);

            $(".danhmucText").val(catName)
            $(".danhmucText").attr('id', catId)


            $("#Ttct").html(eval('`' + results.atb + '`'))
        },
        error: function (xhr) {
            alert('error');
        }
    });

})


$(".imgAdd").click(function () {
    $(this).closest(".row").find('.imgAdd').before('<div class=" imgUp"><div class="imagePreview"></div><label class="btn btn-primary">Upload<input type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>');
});
$(document).on("click", "i.del", function () {
    $(this).parent().remove();
});


$(document).on("change", ".uploadFile", function () {
    var uploadFile = $(this);
    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

    if (/^image/.test(files[0].type)) { // only image file
        var reader = new FileReader(); // instance of the FileReader
        reader.readAsDataURL(files[0]); // read the local file

        reader.onloadend = function () { // set image data as background of div
            //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
            uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url(" + this.result + ")");
        }
    }

});


function getKvData() {
    let data = $("#kvForm").serializeArray()

    let kv = {}
    data.map(obj => {
        kv[obj.name] = obj.value;
    })

    return kv;
}

$(document).on("click", "#dangtinBtn", function () {

    data = {}
    kvData = getKvData();
    data["ProductName"] = $("#ProductName").val();
    data["Price"] = $("#Price").val();

    let rawDesc = $("#Description").val();
    rawDesc = rawDesc.replaceAll("\n", "<br/>")
    data["Description"] = rawDesc;
    data["CatID"] = $(".danhmucText").attr('id');
    data["Kv"] = JSON.stringify(kvData);






    let allImage = $(".imagePreview")

    //
    let imageUrlBg1 = $(allImage[0]).css("background-image");
    let base64StrI1 = imageUrlBg1.substring(5, imageUrlBg1.length - 2);
    data["Thumb"] = base64StrI1
    //


    console.log(data["Thumb"])
    data["Imgs"] = [];
    for (let i = 1; i < allImage.length; i++) {
        let imageUrlBg = $(allImage[i]).css("background-image");
        let base64StrI = imageUrlBg.substring(5, imageUrlBg.length - 2);

        data["Imgs"].push(base64StrI);

    }



    console.log(data);

    startSpin();
    $.ajax({
        url: `/api/dang-tin/`,
        type: "post",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (results) {
            stopSpin();
            alert("Đăng bán thành công");
            window.location.href = "/"
            console.log(results)
        },
        error: function (xhr) {
            alert('error');
        }
    });



})


///laptop
var dongmayData = [
    {
        gid: "Apple",
        name: "Macbook",

    },
    {
        gid: "Apple",
        name: "Macbook Air",

    },

    {
        gid: "Asus",
        name: "AsusPro",

    },
    {
        gid: "Asus",
        name: "Vivobook",

    },
    {
        gid: "Acer",
        name: "Aspire",

    },
    {
        gid: "Acer",
        name: "Helio",

    },
]



$(document).on("change", "#hanglaptop", function () {

    let dongmayId = $(this).val();

    $("#dongmay option").remove();
    if (dongmayId == "0") {
        dongmayData.map(item => {

            $("#dongmay").append(`<option value="${item.name}">${item.name}</option>`);

        })
    } else {
        dongmayData.map(item => {

            if (item.gid == dongmayId) {

                $("#dongmay").append(`<option value="${item.name}">${item.name}</option>`);
            }
        })
    }

})
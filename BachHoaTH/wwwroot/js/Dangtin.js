$(document).on("click", "#selectCatUl>div", function () {
    let catsModal = $(this).parent().parent().parent().parent().parent();
    catsModal.modal('hide')

    let catId = $(this).attr('id')
    let catName = $(this).text();

    $.ajax({
        url: `/api/getcateformdata/${catId}`,
        type: "GET",
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

$(document).on("click", "#dangtinBtn", function () {

    data = {}
    kvData = getKvData();
    data["ProductName"] = $("#ProductName").val();
    data["Price"] = $("#Price").val();
    data["Description"] = $("#Description").val();
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

    // allImage.map(item => {

    //     console.log($(item).css('background-image'))
    // })

    console.log(data);

    $.ajax({
        url: `/api/dang-tin/`,
        type: "post",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (results) {
            console.log(results)
        },
        error: function (xhr) {
            alert('error');
        }
    });



})


function getKvData() {
    let data = $("#kvForm").serializeArray()

    let kv = {}
    data.map(obj => {
        kv[obj.name] = obj.value;
    })

    return kv;
}



$(function () {

    dongxeData.map(item => {

        console.log(`<option value="${item.gid}">${item.name}</option>`);

    })


    document.getElementById("startModelBtn").click();
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


});
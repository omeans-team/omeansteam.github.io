$(document).ready(function () {
    $('.change-img')
        .mouseover(function () {
        $(this).attr("src", "assets/images/svg/arrow-up-circle-fill-omeans-6-color-with-logo-plus-9-color.svg");
    })
        .mouseout(function () {
        $(this).attr("src", "assets/images/svg/arrow-up-circle-fill-omeans-6-color.svg");
    });
});
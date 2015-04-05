$(document).ready(function () {
    $(".main-menu-toggle").click(function (e) {
        e.preventDefault();
        if($(this).hasClass("menu-active")) {
            $(".main-nav").slideUp("fast");
            $(this).removeClass("menu-active");
        } else {
            $(".main-nav").slideDown("fast");
            $(this).addClass("menu-active");
        }
    });
});
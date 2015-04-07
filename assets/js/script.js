$(document).ready(function () {
    $(".main-menu-toggle").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("menu-active")) {
            $(".main-nav").slideUp("fast");
            $(this).removeClass("menu-active");
        } else {
            $(".main-nav").slideDown("fast");
            $(this).addClass("menu-active");
        }
    });
});

$(window).resize(function(){
    if($(window).width() > 768) {
        $(".main-nav").show();
    } else {
        $(".main-nav").hide();
    }
});
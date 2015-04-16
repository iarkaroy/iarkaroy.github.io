$(document).ready(function () {


    $(".js-force-center").wrap('<div class="text-center"></div>');

    $(".menu-collapse-toggle").on('click', function (ev) {
        ev.preventDefault();
        $(".main-menu").slideToggle();
    });

    $(".contact-form").on("submit", function (event) {
        event.preventDefault();

        var name_regex = /^([a-zA-Z0-9 ])+$/;
        var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        var name = $(this).find("#name").val().trim();
        var email = $(this).find("#email").val().trim();
        var subject = $(this).find("#subject").val().trim();
        
        if (!name_regex.test(name)) {
            $(this).find("#name").addClass("error");
            return false;
        } else {
            $(this).find("#name").removeClass("error");
        }
        if (!email_regex.test(email)) {
            $(this).find("#email").addClass("error");
            return false;
        } else {
            $(this).find("#email").removeClass("error");
        }
        if(subject == false) {
            $(this).find("#subject").addClass("error");
            return false;
        } else {
            $(this).find("#subject").removeClass("error");
        }

        var form_data = $(this).serialize();
        $.ajax({
            url: "//formspree.io/i.arkaroy@gmail.com",
            method: "POST",
            data: form_data,
            dataType: "json",
            beforeSend: function () {
                $(".contact-form").hide();
                $(".form-sending").show();
            },
            success: function (response) {
                if (response.success == 'email sent') {
                    $(".form-sending").hide();
                    $(".form-sent").show();
                }
            },
            error: function () {

            }
        });
    });
});

function getViewportWidth() {
    document.body.style.overflow = "hidden";
    var win_width = $(window).width();
    document.body.style.overflow = "";
    return parseInt(win_width);
}
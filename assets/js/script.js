$(document).ready(function () {
    
    $(".js-force-center").wrap('<div class="text-center"></div>')
    
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

    $(".contact-form").on("submit", function (event) {
        event.preventDefault();
        
        var name_regex = /^([a-zA-Z0-9 ])+$/;
        var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        var name = $(this).find("#name").val();
        var email = $(this).find("#email").val();
        if(!name_regex.test(name)) {
            $(this).find("#name").addClass("error");
            return false;
        } else {
            $(this).find("#name").removeClass("error");
        }
        if(!email_regex.test(email)) {
            $(this).find("#email").addClass("error");
            return false;
        } else {
            $(this).find("#email").removeClass("error");
        }
        
        var form_data = $(this).serialize();
        $.ajax({
            url: "//formspree.io/i.arkaroy@gmail.com",
            method: "POST",
            data: form_data,
            dataType: "json",
            beforeSend: function(){
                $(".contact-form").hide();
                $(".form-sending").show();
            },
            success: function(response){
                if(response.success == 'email sent') {
                    $(".form-sending").hide();
                    $(".form-sent").show();
                }
            },
            error: function(){
                
            }
        });
    });
});

$(window).resize(function () {
    if ($(window).width() > 768) {
        $(".main-nav").show();
    } else {
        $(".main-nav").hide();
    }
});
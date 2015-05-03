$(document).ready(function(){
    $(".social-popularity-analyzer-form").on("submit", function(ev){
        ev.preventDefault();
        var url = $("#url").val();
        var urlRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
        if(!urlRegExp.test(url)) {
            // Invalid URL
            $("#url").addClass("error");
            $("#url").focus();
        } else {
            // Valid URL
            getSocialPopularity(url);
        }
    });
});

function getSocialPopularity(url) {
    var twitter_count = getTwitterCount(url);
    alert(twitter_count);
}

function getTwitterCount(url) {
    $.ajax({
        url: "https://cdn.api.twitter.com/1/urls/count.json",
        method: "GET",
        data: {"url":url},
        dataType: "json",
        success: function(response) {
            if(response.count) {
                return response.count;
            } else {
                return 0;
            }
        },
    });
}
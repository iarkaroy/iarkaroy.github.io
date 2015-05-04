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
    getTwitterPopularity(url, function(response) {
        $("#twitter-share").html(response.count ? response.count : 0);
        $(".spa-result.twitter").fadeIn();
    });
    getFacebookPopularity(url, function(response) {
        $("#fb-share").html(response[0].share_count ? response[0].share_count : 0);
        $("#fb-like").html(response[0].share_count ? response[0].like_count : 0);
        $("#fb-comment").html(response[0].share_count ? response[0].comment_count : 0);
        $("#fb-total").html(response[0].share_count ? response[0].total_count : 0);
        $(".spa-result.facebook").fadeIn();
    });
    getLinkedInPopularity(url, function(response){
        $("#linkedin-share").html(response.count ? response.count : 0);
        $(".spa-result.linkedin").fadeIn();
    });
    getPinterestPopularity(url, function(response){
        $("#pinterest-share").html(response.count ? response.count : 0);
        $(".spa-result.pinterest").fadeIn();
    });
    /*
    getStumbleUponPopularity(url, function(response){
        $("#stumbleupon-view").html(response.result.url);
        $(".spa-result.stumbleupon").fadeIn();
    });
    */
    getBufferPopularity(url, function(response){
        console.log(response);
    });
}

function getTwitterPopularity(url, callback) {
    $.ajax({
        url: "https://cdn.api.twitter.com/1/urls/count.json",
        method: "GET",
        data: {"url":url},
        dataType: "jsonp",
        success: function(response) {
            callback(response);
        }
    });
}

function getFacebookPopularity(url, callback) {
    $.ajax({
        url: "http://api.facebook.com/restserver.php",
        method: "GET",
        data: {"method":"links.getStats", "urls":url, "format":"json"},
        dataType: "json",
        success: function(response) {
            callback(response);
        }
    });
}

function getLinkedInPopularity(url, callback) {
    $.ajax({
        url: "https://www.linkedin.com/countserv/count/share",
        method: "GET",
        data: {"url":url, "format":"jsonp"},
        dataType: "jsonp",
        success: function(response) {
            callback(response);
        }
    });
}

function getGooglePlusPopularity(url, callback) {
    /*
    $.ajax({
        url: "https://www.linkedin.com/countserv/count/share",
        method: "GET",
        data: {"url":url, "format":"jsonp"},
        dataType: "jsonp",
        success: function(response) {
            callback(response);
        }
    });
    */
}

function getPinterestPopularity(url, callback) {
    $.ajax({
        url: "https://api.pinterest.com/v1/urls/count.json",
        method: "GET",
        data: {"callback":"jsonp", "url":url},
        dataType: "jsonp",
        success: function(response) {
            callback(response);
        }
    });
}

function getStumbleUponPopularity(url, callback) {
    $.ajax({
        url: "https://www.stumbleupon.com/services/1.01/badge.getinfo",
        method: "GET",
        data: {"url":url},
        dataType: "json",
        success: function(response) {
            callback(response);
        }
    });
}

function getBufferPopularity(url, callback) {
    $.ajax({
        url: "https://api.bufferapp.com/1/links/shares.json",
        method: "GET",
        data: {"url":url},
        dataType: "json",
        success: function(response) {
            callback(response);
        }
    });
}
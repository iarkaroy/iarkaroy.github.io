$(document).ready(function () {

    if ($(".social-share").length > 0) {
        self_url = $(".social-share").attr('data-url');
        getSocialPopularity(self_url);
    }

    $(".social-popularity-analyzer-form").on("submit", function (ev) {
        ev.preventDefault();
        var url = $("#url").val();
        var urlRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
        if (!urlRegExp.test(url)) {
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
    $.ajax({
        url: "http://social-popularity.herokuapp.com/",
        method: "GET",
        data: {"url": url},
        contentType: "application/json",
        dataType: "jsonp",
        jsonpCallback: 'callback',
        beforeSend: function () {
            $(".social-popularity-analyzer-results").fadeOut();
            $("#social-popularity-analyzer-submit").html('<i class="fa fa-cog fa-spin fa-fw"></i>');
            $("#social-popularity-analyzer-submit").attr('disabled', 'disabled');
            $("#social-popularity-analyzer-submit").addClass('busy');
        },
        success: function (response) {
            popularizeSocialInfo(response);
            $("#url").val('');
            $(".social-popularity-analyzer-results").fadeIn();
            $("#social-popularity-analyzer-submit").html('<i class="fa fa-flask fa-fw"></i> <span>Analyze</span>');
            $("#social-popularity-analyzer-submit").removeAttr('disabled');
            $("#social-popularity-analyzer-submit").removeClass('busy');
        }
    });
}

function popularizeSocialInfo(data) {
    $("#analysis-report-heading").html("Analysis Report for " + decodeURIComponent(data.url));

    // Facebook
    $("#facebook-share").html(data.social.facebook.share);
    $("#facebook-like").html(data.social.facebook.like);
    $("#facebook-comment").html(data.social.facebook.comment);
    $("#facebook-total").html(data.social.facebook.total);
    $("#facebook-click").html(data.social.facebook.click);

    // Twitter
    $("#twitter-share").html(data.social.twitter.share);

    // Google Plus
    $("#googleplus-one").html(data.social.googleplus.one);

    // LinkedIn
    $("#linkedin-share").html(data.social.linkedin.share);

    // Pinterest
    $("#pinterest-pin").html(data.social.pinterest.pin);

    // StumbleUpon
    $("#stumbleupon-view").html(data.social.stumbleupon.view)

    // Delicious
    $("#delicious-bookmark").html(data.social.delicious.bookmark);

    // Reddit
    //$("#reddit-up").html(data.social.reddit.up);
    //$("#reddit-down").html(data.social.reddit.down);
    //$("#reddit-score").html(data.social.reddit.score);

    // Buffer
    $("#buffer-share").html(data.social.buffer.share);

    // All Shares
    $(".shares-facebook").html(data.social.shares.facebook);
    $(".shares-twitter").html(data.social.shares.twitter);
    $(".shares-googleplus").html(data.social.shares.googleplus);
    $(".shares-linkedin").html(data.social.shares.linkedin);
    $(".shares-pinterest").html(data.social.shares.pinterest);
    $(".shares-stumbleupon").html(data.social.shares.stumbleupon);
    $(".shares-delicious").html(data.social.shares.delicious);
    //$(".shares-reddit").html(data.social.shares.reddit);
    $(".shares-buffer").html(data.social.shares.buffer);
}
$(document).ready(function () {
    var q = getParam('q');
    if (q) {
        q = decodeURIComponent(q.replace(/\+/gi, ' '));
        var words = q.split(' ');
        console.log(words);
        console.log(BLOG_POSTS);
    }
});

function getParam(param) {
    var url_parts = window.location.href.split('?');
    if (url_parts[1]) {
        var params = url_parts[1].split('&');
        for (i = 0; i < params.length; i++) {
            var query = params[i].split('=');
            if (query[0] == param) {
                return query[1];
            }
        }
    }
}
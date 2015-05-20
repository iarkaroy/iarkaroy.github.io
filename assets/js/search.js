$(document).ready(function () {
    if (getParameterValues('q')) {
        var q = decodeURIComponent(getParameterValues('q').replace(/\+/ig, " "));
        $(".search-q").val(q);
        q = q.split(" ");
        $.get("/search/search.xml", function (response) {
            var results = [];
            $(response).find("item").each(function () {
                var $self = $(this);
                if(inItem(q, $self) && isCategory('blog', $self)) {
                    var r = [];
                    r['title'] = $self.find("title").text();
                    r['link'] = $self.find("link").text();
                    r['date'] = $self.find("pubDate").text();
                    r['excerpt'] = $self.find("excerpt").text();
                    results.push(r);
                }
            });
            for(var i = 0; i < results.length; i++) {
                var html = '<article class="entry post-entry index">';
                html += '<h2 class="entry-title">';
                html += '<a href="' + results[i]['link'] + '" title="Read more on ' + results[i]['title'] + '" rel="bookmark">' + results[i]['title'] + '</a>';
                html += '</h2>';
                html += '<div class="entry-excerpt">' + results[i]['excerpt'] + '</div>';
                html += '<div class="entry-meta"><em>' + results[i]['date'] + '</em></div>';
                html += '</article>';
                $("#search-results").append(html);
            }
            console.log(results);
        });
    }

});

function getParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}

function isCategory(category, item) {
    var found = false;
    $(item).find("category").each(function () {
        if ($(this).text() == category) {
            found = true;
        }
    });
    return found;
}

function inItem(q, item) {
    var title = $(item).find("title").text();
    var content = $(item).find("description").text();
    var found = true;
    for(var i = 0; i < q.length; i++) {
        found &= inText(q[i], title) || inText(q[i], content);
    }
    return found;
}

function inText(q, txt) {
    q = q.toLowerCase();
    txt = txt.toLowerCase();
    if (txt.search(q) < 0) {
        return false;
    } else {
        return true;
    }
}
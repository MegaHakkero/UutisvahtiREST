var i = 0;
var article_title;
var article_title_image;
var articlecount = 0;
var current_title;
var current_title_time;

var NewsTicker = function() {

  $.getJSON("http://localhost:8080/data.json", function(ret_json) {
    for (i = articlecount = 0; i < ret_json.data.length; i++) {

      articlecount++;

      if (articlecount > 7) {
        break;
      }

      current_title = document.createTextNode(ret_json.data[i].article.title);
      current_title_time = document.createElement("p");
      current_title_time.className = "timestamp-paragraph";
      current_title_time.appendChild(document.createTextNode(" - " + moment(ret_json.data[i].article.datePublished).format("DD.MM.YYYY, HH:mm")));

      article_title = document.createElement("div");
      article_title_image = document.createElement("img");
      article_title.className = "article";
      article_title_image.className = "article-image";
      article_title_image.id = "img_" + i;
      article_title.appendChild(current_title);
      article_title.appendChild(document.createElement("br"));
      article_title.appendChild(current_title_time);
      document.getElementById("image-component").appendChild(article_title_image);
      $("#img_" + i).attr("src", imagestatus[i]);
      document.getElementById("gfx-area").appendChild(article_title);
    }
    htmlconsole.sendmsg(log_prefix_newsticker + "Displaying titles and title images");
  });
}

var NewsTicker_refresh = function() {
  $(".article").remove();
  $(".article-image").remove();
  htmlconsole.sendmsg(log_prefix_newsticker + "Deleted HTML content and images");
  NewsTicker();
  htmlconsole.sendmsg(log_prefix_newsticker + "Re-initialized NewsTicker");
}

NewsTicker();

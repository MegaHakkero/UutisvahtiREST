var htmlconsole = {
  "sendmsg": function(msg) {
    $("#htmlconsole").html($("#htmlconsole").html() + "<br>" + msg);
  },
  "clear": function() {
    $("#htmlconsole").html("");
  }
}

var log_prefix_date = "[" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "]";
var log_prefix_image = log_prefix_date + "[IMAGEURL] ";
var log_prefix_other = log_prefix_date + "[CONSOLE] ";
var log_prefix_newsticker = log_prefix_date + "[NEWSTICKER] ";

var imagestatus = [];
var imagecount = 0;
var count = 0;

function printImageUri() {
  $.getJSON("http://localhost:8080/data.json", function(ret_json) {
    for (count = imagecount = 0; count <= ret_json.data.length; count++) {

      imagecount++;

      if (imagecount > 7) {
        break;
      }

      if (ret_json.data[count].article.image === undefined && count < ret_json.data.length) {
        imagestatus.push(null);
        htmlconsole.sendmsg(log_prefix_image + "No image");
      }
      else {
        imagestatus.push(ret_json.data[count].article.image.uri);
        htmlconsole.sendmsg(log_prefix_image + imagestatus[count]);
      }
    }
    htmlconsole.sendmsg(log_prefix_other + "Received image data");
  });
}

printImageUri();
setInterval(function() {
  imagestatus.length = 0;
  printImageUri();

  setTimeout(function() { NewsTicker_refresh(); }, 50);
}, 300*1000);

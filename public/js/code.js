function writeLine(fontSize, text) {
    document.write('<p style="font-size:' + fontSize + "px" +
            '; text-align: center; margin:0; padding:0; border:0">' + text +
            '</p>');
}

var selected;
function loadRandomFromList() {
    selected = geoidList[Math.floor(Math.random() * geoidList.length)];
    show_image('/images/' + selected, 200, 200, "Google", function() {
      document.getElementById("hotClicker").disabled = false;
      document.getElementById("notClicker").disabled = false;
      $.get("/voteson/" + selected, function(json) {
        document.getElementById("hotClicks").innerHTML = json[0];
        document.getElementById("notClicks").innerHTML = json[1];
      });
    });
}

function show_image(src, width, height, alt, callback) {
    var img = document.getElementById("myImage");
    img.onload = callback;
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
}

function onHotClick() {
  document.getElementById("hotClicker").disabled = true;
  document.getElementById("notClicker").disabled = true;
    document.getElementById("hotClicks").innerHTML = (document.getElementById("hotClicks").innerHTML * 1 + 1);
    $.get("/set/" + selected + "?hot=1", function() { });
    setTimeout(loadRandomFromList, 350);
};
function onNotClick() {
    document.getElementById("hotClicker").disabled = true;
    document.getElementById("notClicker").disabled = true;
    document.getElementById("notClicks").innerHTML = (document.getElementById("notClicks").innerHTML * 1 + 1);
    $.get("/set/" + selected + "?not=1", function() { });
    setTimeout(loadRandomFromList, 350);
};

loadRandomFromList();

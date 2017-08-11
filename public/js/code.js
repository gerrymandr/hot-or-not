function writeLine(fontSize, text) {
    document.write('<p style="font-size:' + fontSize + "px" +
            '; text-align: center; margin:0; padding:0; border:0">' + text +
            '</p>');
}

function loadRandomFromList() {
    var selected = geoidList[Math.floor(Math.random() * geoidList.length)];
    show_image('/images/' + selected, 200, 200, "Google");
}

function show_image(src, width, height, alt) {
    var img = document.getElementById("myImage");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
}
function show_rand_image(){
    var distName = randomFromList(geoidList);
    // var distPath = "C:\\\Users\\assaf\\Documents\\_Summer_2017\\Hackathon\\"+ distName + ".jpg";
    var distPath = '/images/bakeoff.jpg';
    show_image(distPath, 200, 200, "Google");
}

var hotClicks = 0;
var notClicks = 0;

function onHotClick() {
    console.log('hot');
    hotClicks += 1;
    document.getElementById("hotClicks").innerHTML = hotClicks;
    loadRandomFromList();
};
function onNotClick() {
    notClicks += 1;
    document.getElementById("notClicks").innerHTML = notClicks;
    loadRandomFromList();
};

loadRandomFromList();

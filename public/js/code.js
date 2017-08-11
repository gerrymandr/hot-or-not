function writeLine(fontSize, text) {
    document.write('<p style="font-size:' + fontSize + "px" +
            '; text-align: center; margin:0; padding:0; border:0">' + text +
            '</p>');
}

geoidList = ["Austin_Circle","Austin_Cracked","Dallas_Cracked","Dallas_Square","SanJose_Square"];

function randomFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}

var distName = randomFromList(geoidList);
// var distPath = "C:\\\Users\\assaf\\Documents\\_Summer_2017\\Hackathon\\"+ distName + ".jpg";
var distPath = '/images/bakeoff.jpg';

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
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
    var distName = randomFromList(geoidList);
    // var distPath = "C:\\\Users\\assaf\\Documents\\_Summer_2017\\Hackathon\\"+ distName + ".jpg";
    var distPath = '/images/bakeoff.jpg';
    document.getElementById("myImage").src = distPath;
};
function onNotClick() {
    notClicks += 1;
    document.getElementById("notClicks").innerHTML = notClicks;
    var distName = randomFromList(geoidList);
    // var distPath = "C:\\\Users\\assaf\\Documents\\_Summer_2017\\Hackathon\\"+ distName + ".jpg";
    var distPath = '/images/bakeoff.jpg';
    document.getElementById("myImage").src = distPath;
};
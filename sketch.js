
var cnv;
var txt;
var txtDim;
var txtAlpha;
var clrAll;
var txtColor;
var z;
var getKey;


function setup(){
    // create canvas
    cnv = createCanvas(windowWidth, windowHeight - 120);

    // every click on the canvas create a p element
    cnv.mouseClicked(createLetter);

    // size slider
    txtDim = createSlider(10, 900, 40);
    txtDim.position(width - 180, height + 15);
    txtDim.size(150);

    // alpha slider
    txtAlpha = createSlider(0, 255, 255);
    txtAlpha.position(width - 180, height + 35);
    txtAlpha.size(150);

    // get "delete all selected" button
    clrAll = select("#clr");
    clrAll.mousePressed(deleteLetters);
}


function draw(){
    background('black');

    // show the selected character on mousepos
    push();
    txtColor = color(255,255,255);
    txtColor.setAlpha(txtAlpha.value());
    fill(txtColor);
    textSize(txtDim.value());
    text(getKey, mouseX, mouseY);
    pop();


}

function createLetter() {
    // remapping the value to check mouse Y diversities on increasing letter size (idk why)
    var remapDim = map(txtDim.value(),10,900,10,831);

    // remapping alpha value to 0 1
    var remapAlpha = map(txtAlpha.value(),0,255,0,1);

    // p element creation
    var t = createElement("p",getKey);
    t.class(getKey);
    t.position(mouseX, mouseY-(txtDim.value()+remapDim));
    t.style("font-family", "Helvetica")
    t.style("color", "#FFF");
    t.style("font-size", txtDim.value()+"px");
    t.style("position", "absolute");
    t.style("opacity", remapAlpha);
    t.style("z-index", z);
    z++;

    // removing p element on click
    t.mouseClicked(function(){ if (keyIsDown(8)) {t.remove();} });
}

function keyTyped() {
    // get the pressed key
    getKey = key;

    // show the selected character on the display div
    var sel  = select("#selected");
    sel.html(getKey);
}

function deleteLetters(){
    // select all the p elements that match the selected character
    var all = selectAll("." + getKey);

    // delete each p element
    all.forEach(function(item){
        item.remove();
    })
}

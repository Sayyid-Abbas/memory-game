let sample = document.querySelector(".sample");
let card1 = document.querySelector(".card-1");
let card2 = document.querySelector(".card-2");

let clicked1 = false;
let clicked2 = false;

card1.onclick = () => {
    clicked1 = true;
    card1.style.cssText = "transform: rotateY(-180deg)";
    if(clicked1 && clicked2) {
        displayTrue();
    }
};
card2.onclick = () => {
    clicked2 = true;
    card2.style.cssText = "transform: rotateY(-180deg)";
    if(clicked1 && clicked2) {
        displayTrue();
    }
};
function displayTrue() {
    let sign = document.querySelector(".sign");
    setTimeout(() => {
        sign.style.cssText = "width: 200px; height: 200px; font-size: 100px";
    }, 300)
    setTimeout(() => {
        card1.style.cssText = "transform: rotateY(0deg)";
        card2.style.cssText = "transform: rotateY(0deg)";
        clicked1 = false;
        clicked2 = false;
        sign.style.cssText = "width: 0px; height: 0px; font-size: 0px";
    }, 2000);
};
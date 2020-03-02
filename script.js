let slider = document.getElementById('myRange');

slider.oninput = () => {
    document.body.style.background = `linear-gradient(90deg, #2b2e43 ${slider.value}%, #2b2e43 ${slider.value}%, #ffffff ${slider.value}.1%, #ffffff 100%)`;
}


function clickCounter() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

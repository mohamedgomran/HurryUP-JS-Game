var hidden = false;

setInterval(function(){
    document.getElementById("image").style.visibility= hidden ? "visible" : "hidden";
    hidden = !hidden;
},2000);


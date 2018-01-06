if ( navigator.platform.indexOf('Win') != -1 ) {
  window.document.getElementById("wrapper").setAttribute("class", "windows");
} else if ( navigator.platform.indexOf('Mac') != -1 ) {
  window.document.getElementById("wrapper").setAttribute("class", "mac");
}
/*
var hidden = false;

setInterval(function(){
    document.getElementById("coin").style.visibility= hidden ? "visible" : "hidden";
    hidden = !hidden;
},2000)

class badge
{
  showImage();

}

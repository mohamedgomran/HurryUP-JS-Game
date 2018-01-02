var mycanvas = document.getElementById("canvas")
var ctx = mycanvas.getContext("2d")
var penguin=document.getElementById("penguin")


var jump=function(event) {
		if(event.which==32)
		penguin.style.animationName="image";
		penguin.style.animationDuration=".5s"
}
var fall=function() {
		penguin.style.animationDuration="0s"
		penguin.style.animationName="";
}
window.addEventListener("keydown", jump);

window.addEventListener("keyup", fall);


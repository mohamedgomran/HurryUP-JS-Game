
// var foot1 = document.getElementById("footerdiv1")
// var foot2 = document.getElementById("footerdiv2")
// var obs = document.getElementById("obsdiv")

// var x1=0
// var x2=-750
// var o1=-100

// var move  = function () {
//   foot1.style.right = `${x1}px`
//   foot2.style.right = `${x2}px`
//   obs.style.right = `${o1}px`

//   x1+=5
//   x2+=5
//   o1+=5
//   if(x1 === 750){x1=-750}
//   if(x2 === 750){x2=-750}
// }

// var Moving = setInterval(move,16)

// var moving=null
// var SetInterval = function () {
//   if (moving===null) {moving = setInterval(move,20)}}
// var RemoveInterval = function(){clearInterval(moving);moving=null}

// document.addEventListener("keydown", SetInterval)
// document.addEventListener("click", RemoveInterval)

class Pos {
  constructor(x1=0,y1=0){
    this.X = x1
    this.Y = y1
  }
}


class Div{
  constructor(width1, height1, bottom1, right1, id1, class1){
    this.Width = width1
    this.Height = height1
    this.Bottom = bottom1
    this.Right = right1
    this.Id = id1
    this.Class=class1
  }
  create(){
    let CreatedDiv = document.createElement('div')
    let MainDiv = document.getElementById("main")

    CreatedDiv.style.width = `${this.Width}px`
    CreatedDiv.style.height = `${this.Height}px`
    CreatedDiv.style.bottom = `${this.Bottom}px`
    CreatedDiv.style.right = `${this.Right}px`
    CreatedDiv.style.zIndex = this.ZIndex
    CreatedDiv.style.position = "absolute"

    CreatedDiv.id = this.Id
    CreatedDiv.className = this.Class

    MainDiv.appendChild(CreatedDiv)
  }

}

class Picture{
  constructor(x1=0,y1=0, velocity1=0, ilink1=null, div1){
    this.Posistion = new Pos(x1,y1)
    this.ImgLink = ilink1
    this.Velocity = velocity1
    this.Div = div1
  }
  init(){
    let CurrentDiv = document.getElementById(this.Div.Id)
    let CreatedImg = document.createElement('img')
    CreatedImg.src = this.ImgLink
    CreatedImg.className = "imgindiv"
    console.log(CreatedImg)
    CurrentDiv.appendChild(CreatedImg)

  }

  move(){
    let CurrentDivMove = document.getElementById(this.Div.Id)
    CurrentDivMove.style.right = `${this.Posistion.X}px`
    this.Posistion.X += 5
    if(this.Posistion.X===CurrentDivMove.parentElement.offsetWidth){this.Posistion.X=-this.Div.Width}
  }
}


var xx = new Div(100,100,35,-100,"obsdivvvv","obs")
var yy = new Picture(-100,0,5,"obs.png",xx)

var xxx = new Div(760,70,0,0,"footerdiv1","footer")
var yyy = new Picture(0,0,5,"ground.png",xxx)

var xxxx = new Div(760,70,0,0,"footerdiv2","footer")
var yyyy = new Picture(-760,0,5,"ground.png",xxxx)
xx.create()
yy.init()
xxx.create()
yyy.init()
xxxx.create()
yyyy.init()


let SetInterval=null
document.addEventListener("keydown", function(){
  if(SetInterval===null){
    SetInterval = setInterval(function(){yy.move();yyy.move();yyyy.move()},16)
  }
})


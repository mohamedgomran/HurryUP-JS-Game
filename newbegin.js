
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



//**********************************************************************
class Pos {
  constructor(x1=0,y1=0){
    this.X = x1
    this.Y = y1
  }
}
//**********************************************************************

class Div{
  constructor(width1, height1, bottom1, right1, id1, class1){
    this.Width = width1
    this.Height = height1
    this.Bottom = bottom1
    this.Right = right1
    this.Id = id1
    this.Class=class1
    this.create()
  }

  create(){
    let CreatedDiv = document.createElement('div')
    let MainDiv = document.getElementById("main")

    CreatedDiv.style.width = `${this.Width}px`
    CreatedDiv.style.height = `${this.Height}px`
    CreatedDiv.style.bottom = `${this.Bottom}px`
    CreatedDiv.style.right = `${this.Right}px`
    CreatedDiv.style.position = "absolute"

    CreatedDiv.id = this.Id
    CreatedDiv.className = this.Class

    MainDiv.appendChild(CreatedDiv)
  }

}
//**********************************************************************
class Picture{
  constructor(div1, velocity1=5, ilink1=null){
    this.Origin = new Pos(div1.Right,div1.Bottom)
    this.Posistion = new Pos(div1.Right,div1.Bottom)
    this.ImgLink = ilink1
    this.Velocity = velocity1
    this.Div = div1
    this.init()
  }

  init(){
    let CurrentDiv = document.getElementById(this.Div.Id)
    let CreatedImg = document.createElement('img')
    CreatedImg.src = this.ImgLink
    CreatedImg.className = "imgindiv"
    CurrentDiv.appendChild(CreatedImg)
  }

  move(){
    let CurrentDivMove = document.getElementById(this.Div.Id)
    this.Posistion.X += this.Velocity
    if(this.Posistion.X>=CurrentDivMove.parentElement.offsetWidth){this.Posistion.X=-this.Div.Width}
    CurrentDivMove.style.right = `${this.Posistion.X}px`
  }
}



//*********************************************



//*********************************************
class coin extends Picture{
  constructor(div,velocity=0,ilink=null){
      super(div,velocity,ilink)
  }

 move(player){ 

    let CurrentDivMove = document.getElementById(this.Div.Id)
    CurrentDivMove.style.right = `${this.Posistion.X}px`
    
       if ( (player.Posistion.Y + player.Div.Height) >= this.Posistion.Y &&
       (player.Posistion.Y <= (this.Posistion.Y + this.Div.Height) ) &&
       (this.Posistion.X + this.Div.Width) >= (player.Posistion.X) &&
       (this.Posistion.X <= (player.Posistion.X + player.Div.Width)) )
      {
        player.CoinCollected++
        document.getElementById('demo').innerHTML = player.CoinCollected;
       
        this.Posistion.X=-this.Div.Width

      }else
       {

        if(this.Posistion.X===CurrentDivMove.parentElement.offsetWidth){this.Posistion.X=-this.Div.Width}
         this.Posistion.X += 5

       //new coin
     
      }

    

  }


}

//*********************************************

class Obstacle extends Picture{
  constructor(div1, velocity1=5, ilink1=null){
    super(div1, velocity1, ilink1)
  }

  move(Char1, i){
    let CurrentDivMove = document.getElementById(this.Div.Id)
    this.Posistion.X += this.Velocity
    if(this.Posistion.X>=CurrentDivMove.parentElement.offsetWidth){this.Posistion.X=-(testimg[2].Posistion.X+100)}
    CurrentDivMove.style.right = `${this.Posistion.X}px`
    
    if ( (Char1.Posistion.Y + Char1.Div.Height) >= this.Posistion.Y &&
       (Char1.Posistion.Y <= (this.Posistion.Y + this.Div.Height) ) &&
       (this.Posistion.X + this.Div.Width) >= (Char1.Posistion.X) &&
       (this.Posistion.X <= (Char1.Posistion.X + Char1.Div.Width)) )
    {

      if (!0)
        {alert("Game Over")
          location.reload();}
      else{
        alert("you still have lives, hurry up :D")
        location.reload();
      }
    }
  }
}
//**********************************************************************
class Character extends Picture{
  constructor(div1, velocity1=5, ilink1=null, jump1=0,name='player'){
    super(div1, velocity1, ilink1)
    this.Jump = jump1
    this.IsTop = 0
       
       this.Name=name
       this.Score = 0
       this.Life =  3
       this.CoinCollected = 0
  }

  move(){

    let CurrentDivMove = document.getElementById(this.Div.Id)

    if (this.Posistion.Y<this.Jump && !this.IsTop) {
      this.Posistion.Y+=this.Velocity
      if(this.Posistion.Y==this.Jump){this.IsTop=1}
    }
    else if (this.Posistion.Y>this.Div.Bottom) {
      this.Posistion.Y -= this.Velocity
      if(this.Posistion.Y==this.Div.Bottom){this.IsTop=0;clearInterval(SetIntervalChar);SetIntervalChar=null}
    }
    CurrentDivMove.style.bottom = `${this.Posistion.Y}px`

  }
    
    
    life()
    {
        //write code of life and high score and levels
        if(this.life == 0)
            {
             // print Game over   
            }
        
    }
    
    
    
}

//**********************************************************************
/*
class player {
   constructor(name='player'){
       this.Name=name
       this.Score = 0
       this.Life =  3
       this.CoinCollected = 0

  }
    
}*/


//**********************************************************************
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function CreatingRandom(MinDimention, MaxDimention, bottom, MinRight, MaxRight){
  var DivList = []
  var ImgList = []
  var RandRightIntOld = 0
  for(var i=0; i<3;i++){
    var RandWidthInt = getRandomInt(MinDimention,MaxDimention)
    var RandHeightInt = getRandomInt(MinDimention*1.5,MaxDimention*1.5)
    var RandRightInt = getRandomInt(0,1)
    RandRightInt = RandRightInt==0 ? MinRight : MaxRight
    RandRightIntOld = i==2 ? 760 : RandRightIntOld+RandRightInt
    DivList[i] = new Div(RandWidthInt, RandHeightInt, bottom, -(RandRightIntOld), `obsdivvvv${i}`, "obs")
    ImgList[i] = new Obstacle(DivList[i], 5 , "imgs/obs.png")
    console.log(RandRightIntOld)


  }

  return [DivList,ImgList]
}


var [testdiv, testimg] = CreatingRandom(30,50,45,20,300)


var createrandompos = (min, max) => {
  var RandRightInt = getRandomInt(min,max)


}


// createrandompos()
 //var Obsdiv = new Div(100,100,35,-100,"obsdivvvv","obs")
 //var Obsimg = new Obstacle(Obsdiv, 5, "imgs/obs.png")

var Footerdiv1 = new Div(760,70,0,0,"footerdiv1","footer")
var Footerimg1 = new Picture(Footerdiv1, 5, "imgs/ground.png")

var Footerdiv2 = new Div(760,70,0,-760,"footerdiv2","footer")
var Footerimg2 = new Picture(Footerdiv2, 5, "imgs/ground.png")


var Penguindiv = new Div(20,100,20,500,"characterdiv","character")
var Penguinimg = new Character(Penguindiv, 5, "imgs/penguin.png", 170,'Abdo')


          var dcoin=new Div(40,40,20,-100,"coin","coindiv")
          var coin1=new coin(dcoin,5,"imgs/co.jpg")
          dcoin.create()
          coin1.init()

          var dcoin2=new Div(40,40,100,-100,"coin2","coindiv")
          var coin2=new coin(dcoin2,5,"imgs/co.jpg")
          dcoin2.create()
          coin2.init()

        var dcoin3=new Div(40,40,170,-100,"coin3","coindiv")
        var coin3=new coin(dcoin3,5,"imgs/co.jpg")
        dcoin3.create()
        coin3.init()



        var dcoin4=new Div(40,40,250,-100,"coin4","coindiv")
        var coin4=new coin(dcoin4,5,"imgs/co.jpg")
        dcoin4.create()
        coin4.init()


         var dcoin5=new Div(40,40,300,-100,"coin5","coindiv")
        var coin5=new coin(dcoin5,5,"imgs/co.jpg")
        dcoin5.create()
        coin5.init()

// onstart



document.getElementById('demo').innerHTML = Penguinimg.CoinCollected;
document.getElementById('pname').innerHTML = Penguinimg.Name;

//*******************************************************


let SetInterval=null
let SetIntervalChar=null
document.addEventListener("keydown", function(e){
  
    
  if(SetIntervalChar===null){
    SetIntervalChar = setInterval(function(){
      if(e.keyCode==13){Penguinimg.move()}
    },16)
  }

  if(SetInterval===null){
    SetInterval = setInterval(function(){
          Footerimg1.move()
          Footerimg2.move()
          coin1.move(Penguinimg)  // coin1.move(playerposition_x ,playerposition_y )
          coin2.move(Penguinimg)
           coin3.move(Penguinimg)
           coin4.move(Penguinimg)
           coin5.move(Penguinimg)
          // Obsimg.move()
        for (i in testimg) {testimg[i].move(Penguinimg, i)}
    },16)
  }
})


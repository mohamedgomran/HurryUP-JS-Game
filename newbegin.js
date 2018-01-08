////////////////////////////////// getting that gets player parameters/////////////////////
var charType
var playerName

if (location.search.substring(1)==="") 
{
  charType="penguin"
  playerName="Player1"
}
else
{
  charType=location.search.substring(1).split("&")[0].split("=")[1]
  playerName=location.search.substring(1).split("&")[1].split("=")[1]
}

////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////changing the header dynamically////////////////////////////
var player=document.getElementById("player")
var level=document.getElementById("level")
var lives=document.getElementById("lives")
var coins=document.getElementById("coins")
var score=document.getElementById("score")

player.innerHTML=playerName

////////////////////////////////////////////////////////////////////////////////////////////
var hidden = false;

function newlife(){
    document.getElementById("1").style.visibility= hidden ? "visible" : "hidden";
    hidden = !hidden;
}

function hideNewLife(){
   document.getElementById("1").style.visibility= hidden ? "visible" : "hidden";
    hidden = hidden;
}


var hidden2 =false;
function highScore(){
    document.getElementById("Hscore").style.visibility= hidden2 ? "visible" : "hidden";
    hidden2 = !hidden2;
}


function hideHighScore(){
   document.getElementById("Hscore").style.visibility= hidden2 ? "visible" : "hidden";
    hidden2 = hidden2;
}

var hidden3 =false;
function gameOver(){
    document.getElementById("GameOver").style.visibility= hidden3 ? "visible" : "hidden";
    hidden3 = !hidden3;
    //setInterval(function(){} , 1000);
}


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

class Picture{
  constructor(div1, velocity1=5, ilink1=null){
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


class Obstacle extends Picture{
  constructor(div1, velocity1=5, ilink1=null){
    super(div1, velocity1, ilink1)
  }

  move(Char1, i){
    score.innerHTML="X"+ Char1.Score++ 
    if(Char1.Score == 500)
            {
              highScore();
              highScore();
              setInterval(hideHighScore , 2000);
            }
     ////////////// modification
     

    let CurrentDivMove = document.getElementById(this.Div.Id)
    this.Posistion.X += this.Velocity
    poslist[i] = this.Posistion.X
    CurrentDivMove.style.right = `${this.Posistion.X}px`

    if(this.Posistion.X>=CurrentDivMove.parentElement.offsetWidth){
      var NewRightPos = CreatingRandomPos(300,500)
      var [NewWidth, NewHeight] = CreatingRandomDim(30,50)
      this.Posistion.X=-NewRightPos+Math.min(...poslist)
      poslist[i] = this.Posistion.X
      CurrentDivMove.style.width = NewWidth
      CurrentDivMove.style.height = NewHeight
    }

    
    if ( (Char1.Posistion.Y + Char1.Div.Height) >= this.Posistion.Y &&
       (Char1.Posistion.Y <= (this.Posistion.Y + this.Div.Height) ) &&
       (this.Posistion.X + this.Div.Width) >= (Char1.Posistion.X) &&
       (this.Posistion.X <= (Char1.Posistion.X + Char1.Div.Width)) )
    {
      if (!Char1.Life)

        {gameOver();
          //gameOver();

          location.reload();}
      else{


          newlife();
          newlife();
          setInterval(hideNewLife , 2000);
          Char1.Life--
          lives.innerHTML="X"+Char1.Life
          var NewRightPos = CreatingRandomPos(300,500)
          var [NewWidth, NewHeight] = CreatingRandomDim(30,50)
          this.Posistion.X=-NewRightPos+Math.min(...poslist)
          poslist[i] = this.Posistion.X
          }
        }
    }
}


class Coin extends Obstacle{

  move(Char1, i){ 

    let CurrentDivMove = document.getElementById(this.Div.Id)
    this.Posistion.X += this.Velocity
    CoinPosList[i] = this.Posistion.X
    CurrentDivMove.style.right = `${this.Posistion.X}px`

    if(this.Posistion.X>=CurrentDivMove.parentElement.offsetWidth || 
       ((Char1.Posistion.Y + Char1.Div.Height) >= this.Posistion.Y &&
       (Char1.Posistion.Y <= (this.Posistion.Y + this.Div.Height) ) &&
       (this.Posistion.X + this.Div.Width) >= (Char1.Posistion.X) &&
       (this.Posistion.X <= (Char1.Posistion.X + Char1.Div.Width)))) {

      if(this.Posistion.X>=CurrentDivMove.parentElement.offsetWidth){}
      
      else{
            Char1.CoinCollected++;
            /**/
            coins.innerHTML="X"+Char1.CoinCollected;  
            

             ///modification
          }

      var NewRightPos = CreatingRandomPos(30,500)
      var NewBottom = CreatingRandomPos(45,250)
      var [NewWidth, NewHeight] = CreatingRandomDim(30,30)
      this.Posistion.X=-NewRightPos+Math.min(...CoinPosList)
      CoinPosList[i] = this.Posistion.X
      CurrentDivMove.style.width = NewWidth
      CurrentDivMove.style.height = NewHeight
      CurrentDivMove.style.bottom = NewBottom
    }
  }
}



class Character extends Picture{
  constructor(div1, velocity1=5, ilink1=null, jump1=0, life1=3){
    super(div1, velocity1, ilink1)
    this.Jump = jump1
    this.IsTop = 0
    this.CoinCollected = 0
    this.Life = life1
    this.Score = 0
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
}



function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}



var CreatingRandomPos = (min, max) => {
  var RandRightInt = getRandomInt(min,max)
  return RandRightInt
}

var CreatingRandomDim = (min, max) => {
  var RandWidthInt = getRandomInt(min, max)
  var RandHeightInt = getRandomInt(min, max)
  return [RandWidthInt, RandHeightInt]
}




function CreatingRandom(MinDimention, MaxDimention, MinBottom, MaxBottom, MinRight, MaxRight, num, ilink, id, class1){
  var DivList = []
  var ImgList = []
  var PosList = []
  var RandRightIntOld = 0
  for(var i=0; i<num;i++){
    var [RandWidthInt,RandHeightInt]  = CreatingRandomDim(MinDimention,MaxDimention)
    var RandRightInt = CreatingRandomPos(MinRight,MaxRight)
    var BottomInt = CreatingRandomPos(MinBottom, MaxBottom)
    RandRightIntOld+=RandRightInt
    PosList[i] = -RandRightIntOld
    DivList[i] = new Div(RandWidthInt, RandHeightInt, BottomInt, -(RandRightIntOld), `${id}${i}`, class1)
    if (class1=="obs") {
      ImgList[i] = new Obstacle(DivList[i], 5 , ilink)
    }
    else{
      ImgList[i] = new Coin(DivList[i], 5 , ilink)
    }
  }

  return [DivList, ImgList, PosList]
}


var [testdiv, testimg, poslist] = CreatingRandom(30,50,45,45,300,500, 3, "imgs/obs.png", "obsdivvvv", "obs")

var [CoinDiv, CoinImg, CoinPosList] = CreatingRandom(30,30,45,250,30,500, 5, "imgs/coin.png", "coindiv", "coin")






var Footerdiv1 = new Div(760,70,0,0,"footerdiv1","footer")
var Footerimg1 = new Picture(Footerdiv1, 5, "imgs/ground.png")

var Footerdiv2 = new Div(760,70,0,-760,"footerdiv2","footer")
var Footerimg2 = new Picture(Footerdiv2, 5, "imgs/ground.png")


var CharacterDiv = new Div(20,100,20,500,"CharacterDiv","character")

/////////////////////////////////////////generate a characater according to user input/////////
if (charType==="penguin") 
  {var CharacterImg = new Character(CharacterDiv, 5, "imgs/penguin.png", 170)} 
else 
  {var CharacterImg = new Character(CharacterDiv, 5, "imgs/cat.gif", 170)}


///////////////////////////////////////////////////////////////////////////////////////////////

let SetInterval=null
let SetIntervalChar=null
document.addEventListener("keydown", function(e){
  
  if(SetIntervalChar===null){
     if(e.keyCode==32){
      SetIntervalChar = setInterval(function(){
        CharacterImg.move()
      },16)
    }
    
  }

  if(SetInterval===null){
    SetInterval = setInterval(function(){
      Footerimg1.move()
      Footerimg2.move()
      // Obsimg.move()
      for (i in testimg) {testimg[i].move(CharacterImg, i)}
      for (j in CoinImg) {CoinImg[j].move(CharacterImg, j)}

    },16)
  }
})


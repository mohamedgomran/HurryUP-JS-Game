////////////////////////////////// getting that gets player parameters/////////////////////
var charType
var playerName
var Speed = 4
var showing=false

var firstCoinMaster=true
var firstGameMaster=true
let firstHighScore=true
var highScore = parseInt(localStorage.getItem('highScore')) || 500;
var highCoin = parseInt(localStorage.getItem('coins')) || 5;


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
var superDiv=document.getElementById('main')
var player=document.getElementById("player")
var level=document.getElementById("level")
var lives=document.getElementById("lives")
var coins=document.getElementById("coins")
var score=document.getElementById("score")
var level=document.getElementById("level")
var highScoreBadge=document.getElementById('highScoreBadge')
var coinMasterBadge=document.getElementById('coinMaster')
var gameMasterBadge=document.getElementById('gameMaster')

player.innerHTML=playerName

////////////////////////////////////////////////////////////////////////////////////////////
var messageDiv=document.getElementById("messageDiv")
var Message=document.getElementById("message")
// var button1=document.getElementById("continue")
var messageImg=document.getElementById("messageImg")

function ShowMessage (imgSrc,textMes) 
{
  if(!showing)
  {messageImg.src=imgSrc;
  Message.innerHTML=textMes;
  superDiv.style.opacity=0.4;
  clearInterval(SetIntervalChar)
  clearInterval(SetInterval)
  SetInterval=null
  SetIntervalChar=null
  messageDiv.style.visibility="visible"
  messageDiv.classList.add("messageAnimation")
  // button1.classList.add("button")
  showing=true}
}

function hideMessage ()
{
  messageDiv.classList.remove("messageAnimation")
  // button1.classList.remove("button")
  superDiv.style.opacity=1;
  messageDiv.style.visibility="hidden";
  showing=false;
  if(!parseInt(lives.innerHTML))
    {location.reload()}

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

  static createrandom(MinDimention, MaxDimention, MinBottom, MaxBottom, MinRight, MaxRight, num, id, class1){
  
    var DivList = []
    var ObsPosList = []
    var RandRightIntOld = 0
    for(var i=0; i<num;i++){
      var [RandWidthInt,RandHeightInt]  = CreatingRandomDim(MinDimention,MaxDimention)
      var RandRightInt = CreatingRandomPos(MinRight,MaxRight)
      var BottomInt = CreatingRandomPos(MinBottom, MaxBottom)
      RandRightIntOld+=RandRightInt
      ObsPosList[i] = -RandRightIntOld
      DivList[i] = new Div(RandWidthInt, RandHeightInt, BottomInt, -(RandRightIntOld), `${id}${i}`, class1)
    }
    return [DivList, ObsPosList]
  }


  static change(divlist1, poslist1, MinDimention, MaxDimention, MinBottom, MaxBottom, MinRight, MaxRight){
    var RandRightIntOld = 0
    
    for(var i=0; i<divlist1.length;i++){
      var [RandWidthInt,RandHeightInt]  = CreatingRandomDim(MinDimention,MaxDimention)
      var RandRightInt = CreatingRandomPos(MinRight,MaxRight)
      var BottomInt = CreatingRandomPos(MinBottom, MaxBottom)
      RandRightIntOld+=RandRightInt
      poslist1[i] = -RandRightIntOld
      divlist1[i].Right = -RandRightIntOld
      divlist1[i].Width = RandWidthInt
      divlist1[i].Height = RandHeightInt
      divlist1[i].Bottom = BottomInt
    }
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

  static createrandom(divlist1, velocity1, ilink1){
    
    var ImgList = []
    for(var i=0; i<divlist1.length;i++){
      ImgList[i] = new Picture(divlist1[i], velocity1 , ilink1)
    }
    return ImgList
  }


  static change(imglist1, velocity1, ilink1){
    for(var i=0; i<imglist1.length;i++){
      var CurrentDiv = document.getElementById(imglist1[i].Div.Id).firstChild
      imglist1[i].ImgLink = ilink1
      CurrentDiv.src = ilink1
      imglist1[i].Velocity = velocity1
    }
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
    if(this.Posistion.X>=CurrentDivMove.parentElement.clientWidth){this.Posistion.X=-this.Div.Width}
    CurrentDivMove.style.right = `${this.Posistion.X}px`
  }

}

class Obstacle extends Picture{
  constructor(div1, velocity1=5, ilink1=null){
    super(div1, velocity1, ilink1)
  }


  static createrandom(divlist1, velocity1, ilink1){
    
    var ImgList = []
    for(var i=0; i<divlist1.length;i++){
      ImgList[i] = new Obstacle(divlist1[i], velocity1 , ilink1)
    }
    return ImgList
  }


  move(Char1, i){
    score.innerHTML = Char1.Score++
    
    if(Char1.Score > highScore && firstHighScore)
    {ShowMessage("imgs/badge1.png","congratulations "+ playerName + "</br> you have exceeded the highest Score")
      highScoreBadge.style.opacity=1;
      firstHighScore=false
    }

    if(Char1.Score>highScore && Char1.Score>10000 && Char1.CoinCollected>highCoin && Char1.CoinCollected>50 && firstGameMaster)
    {
      ShowMessage("imgs/gameMaster.png","congratulations "+ playerName + "</br> you are now the Game Master")
      gameMasterBadge.style.opacity=1;
      firstGameMaster=false;
    }
    let CurrentDivMove = document.getElementById(this.Div.Id)
    this.Posistion.X += this.Velocity
    ObsPosList[i] = this.Posistion.X
    CurrentDivMove.style.right = `${this.Posistion.X}px`

    if(this.Posistion.X>=CurrentDivMove.parentElement.clientWidth){
      var NewRightPos = CreatingRandomPos(400,500)
      var [NewWidth, NewHeight] = CreatingRandomDim(30,50)
      this.Posistion.X=-NewRightPos+Math.min(...ObsPosList)
      ObsPosList[i] = this.Posistion.X
      CurrentDivMove.style.width = NewWidth
      CurrentDivMove.style.height = NewHeight
    }
    
    else if ( (Char1.Posistion.Y + Char1.Div.Height) >= this.Posistion.Y &&
       (Char1.Posistion.Y <= (this.Posistion.Y + this.Div.Height) ) &&
       (this.Posistion.X + this.Div.Width) >= (Char1.Posistion.X) &&
       (this.Posistion.X <= (Char1.Posistion.X + Char1.Div.Width)) )
    {
      if (Char1.Posistion.Y==Char1.Div.Bottom){Char1.IsTop=1;Char1.Posistion.Y+=20}
      if (Char1.Posistion.Y>Char1.Div.Bottom){Char1.IsTop=1}
        
      Char1.Life--;
      lives.innerHTML=Char1.Life
      if (!Char1.Life){
        if (Char1.Score > highScore){
          highScore = Char1.Score;
          localStorage.setItem('highScore', highScore);
          localStorage.setItem('username', playerName);
          localStorage.setItem('coins', Char1.CoinCollected)
          ShowMessage("imgs/badge1.png","congratulations <h4>"+ playerName + "</h4></br> you have reached a new high Score = </br>" +highScore);
        }
        else{
          // button1.innerHTML="Retry"
          ShowMessage("imgs/gameOver.png","Try Again </br><h4>"+ playerName + "</h4> Your Score = "+Char1.Score+ "</br> Your coins = "+Char1.CoinCollected)
        }

      }
      else{
        ShowMessage("imgs/brokenHeart.png","you still have "+ Char1.Life+ " extra lives </br> Hurry Up")

        var NewRightPos = CreatingRandomPos(400,500)
        var [NewWidth, NewHeight] = CreatingRandomDim(30,50)
        this.Posistion.X=-NewRightPos+Math.min(...ObsPosList)
        ObsPosList[i] = this.Posistion.X
      }
    }


    //Level Handling //

    if (Char1.Score>2000){
      if(!Char1.Level2)
      {
        Speed = 6
        FooterImg[0].Posistion.X=0
        var CurrentDiv1 = document.getElementById(FooterImg[0].Div.Id)
        CurrentDiv1.style.right = `${FooterImg[0].Posistion.X}px`

        FooterImg[1].Posistion.X=-840
        var CurrentDiv2 = document.getElementById(FooterImg[1].Div.Id)
        CurrentDiv2.style.right = `${FooterImg[1].Posistion.X}px`

        Obstacle.change(ObsImg, Speed, "imgs/obs.png")
        Coin.change(CoinImg, Speed, "imgs/coin.png")
        Picture.change(FooterImg, Speed, "imgs/ground.png")
        Char1.Level2 = 1
        level.innerHTML = 2
      }
      if(Char1.Score>5000&&!Char1.Level3){
        Speed = 8
        FooterImg[0].Posistion.X=0
        var CurrentDiv1 = document.getElementById(FooterImg[0].Div.Id)
        CurrentDiv1.style.right = `${FooterImg[0].Posistion.X}px`

        FooterImg[1].Posistion.X=-840
        var CurrentDiv2 = document.getElementById(FooterImg[1].Div.Id)
        CurrentDiv2.style.right = `${FooterImg[1].Posistion.X}px`

        Obstacle.change(ObsImg, Speed, "imgs/obs.png")
        Coin.change(CoinImg, Speed, "imgs/coin.png")
        Picture.change(FooterImg, Speed, "imgs/ground.png")
        Char1.Level3 = 1
        Char1.Velocity = 8
        level.innerHTML = 3

      }
    }
  }
}


class Coin extends Obstacle{

  static createrandom(divlist1, velocity1, ilink1){
    
    var ImgList = []
    for(var i=0; i<divlist1.length;i++){
      ImgList[i] = new Coin(divlist1[i], velocity1 , ilink1)
    }
    return ImgList
  }


  move(Char1, i){ 

    let CurrentDivMove = document.getElementById(this.Div.Id)
    this.Posistion.X += this.Velocity
    CoinPosList[i] = this.Posistion.X
    CurrentDivMove.style.right = `${this.Posistion.X}px`

    if(this.Posistion.X>=CurrentDivMove.parentElement.clientWidth || 
       ((Char1.Posistion.Y + Char1.Div.Height) >= this.Posistion.Y &&
       (Char1.Posistion.Y <= (this.Posistion.Y + this.Div.Height) ) &&
       (this.Posistion.X + this.Div.Width) >= (Char1.Posistion.X) &&
       (this.Posistion.X <= (Char1.Posistion.X + Char1.Div.Width)))) {

      if(this.Posistion.X>=CurrentDivMove.parentElement.clientWidth){}
      
      else{
            Char1.CoinCollected++;
            coins.innerHTML= Char1.CoinCollected;
            if(Char1.CoinCollected > highCoin && firstCoinMaster)
              {
                ShowMessage("imgs/coinMaster.jpg","congratulations "+ playerName + "</br> you have exceeded the highest coins recorded")
                coinMasterBadge.style.opacity=1;
                firstCoinMaster=false;
              }   ///modification
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
  constructor(div1, velocity1=5, ilink1=null, jump1=0, life1=5){
    super(div1, velocity1, ilink1)
    this.Jump = jump1
    this.IsTop = 0
    this.CoinCollected = 0
    this.Life = life1
    this.Score = 0
    this.Level2 = 0
    this.Level3 = 0
  }

  move(){

    let CurrentDivMove = document.getElementById(this.Div.Id)

    if (this.Posistion.Y<this.Jump && !this.IsTop) {
      this.Posistion.Y+=this.Velocity
      if(this.Posistion.Y>=this.Jump){this.IsTop=1}
    }
    else if (this.Posistion.Y>this.Div.Bottom) {
      this.Posistion.Y -= this.Velocity
      if(this.Posistion.Y<=this.Div.Bottom){this.IsTop=0;clearInterval(SetIntervalChar);SetIntervalChar=null}
    }
    CurrentDivMove.style.bottom = `${this.Posistion.Y}px`

  }
}

////////////////////////////////////////////////////////////////////////////////


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


////////////////////////////////////////////////////////////////////////////////

var [ObsDiv, ObsPosList] = Div.createrandom(30,50,45,45,300,500, 3, "obsdivvvv", "obs")
var ObsImg = Obstacle.createrandom(ObsDiv, Speed, "imgs/obs.png")


var [CoinDiv, CoinPosList] = Div.createrandom(30,30,45,250,30,500, 5, "coindiv", "coin")
var CoinImg = Coin.createrandom(CoinDiv, Speed, "imgs/coin.png")


var Footerdiv1 = new Div(840,70,0,0,"footerdiv1","footer")
var Footerimg1 = new Picture(Footerdiv1, Speed, "imgs/ground.png")

var Footerdiv2 = new Div(840,70,0,-840,"footerdiv2","footer")
var Footerimg2 = new Picture(Footerdiv2, Speed, "imgs/ground.png")

var CharacterDiv = new Div(20,100,20,500,"CharacterDiv","character")

var FooterImg = [Footerimg1, Footerimg2]

/////////////////////////////////////////generate a characater according to user input/////////
if (charType==="penguin") 
  {var CharacterImg = new Character(CharacterDiv, 5, "imgs/penguin.png", 170)} 
else 
  {var CharacterImg = new Character(CharacterDiv, 5, "imgs/cat.gif", 170)}


///////////////////////////////////////////////////////////////////////////////////////////////

let SetInterval=null
let SetIntervalChar=null
// var pause=false

var x=document.addEventListener("keydown", function(e){
  if (e.keyCode===27){
    {ShowMessage("imgs/pause.png","Pause");
    CharacterImg.Posistion.Y+=1;
    CharacterImg.IsTop=1;}
  }

  
  if(e.keyCode==32)
  {
    if(SetIntervalChar===null)
    {
      if(e.keyCode==32)
      {
        hideMessage();
        SetIntervalChar = setInterval(function()
        {
          CharacterImg.move()
        },16)
      }
    }

    if(SetInterval===null)
    {
      if(e.keyCode==32)
      {
        SetInterval = setInterval(function()
        {
          Footerimg1.move()
          Footerimg2.move()
          // Obsimg.move()
          for (i in ObsImg) {ObsImg[i].move(CharacterImg, i)}
          for (j in CoinImg) {CoinImg[j].move(CharacterImg, j)}

        },16)
      }
    }
  }
})

// var btn=button1.addEventListener("click",function() {
  
//   if(pause)
//     {hideMessage("imgs/pause.png","Pause");
//     pause=false;}

//   if(SetIntervalChar===null)
//     {
//         hideMessage();
//         SetIntervalChar = setInterval(function()
//         {
//           CharacterImg.move()
//         },16)
//     }

//     if(SetInterval===null)
//     {
//       SetInterval = setInterval(function()
//       {
//         Footerimg1.move()
//         Footerimg2.move()
//         // Obsimg.move()
//         for (i in ObsImg) {ObsImg[i].move(CharacterImg, i)}
//         for (j in CoinImg) {CoinImg[j].move(CharacterImg, j)}

//       },16)
//     }
// })
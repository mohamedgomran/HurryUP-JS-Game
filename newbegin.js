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

var [ObsDiv, ObsPosList] = Div.createrandom(40,60,45,45,300,500, 3, "obsdivvvv", "obs")
var ObsImg = Obstacle.createrandom(ObsDiv, Speed, "imgs/cactus.png")


var [CoinDiv, CoinPosList] = Div.createrandom(30,30,60,200,30,500, 5, "coindiv", "coin")
var CoinImg = Coin.createrandom(CoinDiv, Speed, "imgs/coin.png")


var Footerdiv1 = new Div(840,70,0,0,"footerdiv1","footer")
var Footerimg1 = new Picture(Footerdiv1, Speed, "imgs/ground.png")

var Footerdiv2 = new Div(840,70,0,-840,"footerdiv2","footer")
var Footerimg2 = new Picture(Footerdiv2, Speed, "imgs/ground.png")


var FooterImg = [Footerimg1, Footerimg2]

/////////////////////////////////////////generate a characater according to user input/////////
if (charType==="ninja") 
  {
  var CharacterDiv = new Div(30,50,40,500,"CharacterDiv","character") ////Modified
  var CharacterImg = new Character(CharacterDiv, 5, "imgs/ninja.png", 170)
  }
else{
  var CharacterDiv = new Div(50,30,40,500,"CharacterDiv","character") ////Modified
  var CharacterImg = new Character(CharacterDiv, 5, "imgs/cat.gif", 170)
}
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
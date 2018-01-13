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
    {ShowMessage("../imgs/badge1.png","congratulations "+ playerName + "</br> you have exceeded the highest Score")
      highScoreBadge.style.opacity=1;
      firstHighScore=false
    }

    if(Char1.Score>highScore && Char1.Score>10000 && Char1.CoinCollected>highCoin && Char1.CoinCollected>50 && firstGameMaster)
    {
      ShowMessage("../imgs/gameMaster.png","congratulations "+ playerName + "</br> you are now the Game Master")
      gameMasterBadge.style.opacity=1;
      firstGameMaster=false;
    }
    let CurrentDivMove = document.getElementById(this.Div.Id)
    this.Posistion.X += this.Velocity
    ObsPosList[i] = this.Posistion.X
    CurrentDivMove.style.right = `${this.Posistion.X}px`

    if(this.Posistion.X>=CurrentDivMove.parentElement.clientWidth){
      var NewRightPos = CreatingRandomPos(400,500)
      var [NewWidth, NewHeight] = CreatingRandomDim(40,60)
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
          ShowMessage("../imgs/badge1.png","congratulations <h4>"+ playerName + "</h4></br> you have reached a new high Score = </br>" +highScore);
        }
        else{
          // button1.innerHTML="Retry"
          ShowMessage("../imgs/gameOver.png","Try Again </br><h4>"+ playerName + "</h4> Your Score = "+Char1.Score+ "</br> Your coins = "+Char1.CoinCollected)
        }

      }
      else{
        ShowMessage("../imgs/brokenHeart.png","you still have "+ Char1.Life+ " extra lives </br> Hurry Up")

        var NewRightPos = CreatingRandomPos(400,500)
        var [NewWidth, NewHeight] = CreatingRandomDim(40,60)
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

        Obstacle.change(ObsImg, Speed, "../imgs/cactus.png")
        Coin.change(CoinImg, Speed, "../imgs/coin.png")
        Picture.change(FooterImg, Speed, "../imgs/ground.png")
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

        Obstacle.change(ObsImg, Speed, "../imgs/cactus.png")
        Coin.change(CoinImg, Speed, "../imgs/coin.png")
        Picture.change(FooterImg, Speed, "../imgs/ground.png")
        Char1.Level3 = 1
        Char1.Velocity = 8
        level.innerHTML = 3

      }
    }
  }
}
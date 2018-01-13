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
                ShowMessage("imgs/coinMaster.png","congratulations "+ playerName + "</br> you have exceeded the highest coins recorded")
                coinMasterBadge.style.opacity=1;
                firstCoinMaster=false;
              }   ///modification
          }


      var NewRightPos = CreatingRandomPos(30,500)
      var NewBottom = CreatingRandomPos(60,200)
      var [NewWidth, NewHeight] = CreatingRandomDim(30,30)
      this.Posistion.X=-NewRightPos+Math.min(...CoinPosList)
      CoinPosList[i] = this.Posistion.X
      CurrentDivMove.style.width = NewWidth
      CurrentDivMove.style.height = NewHeight
      CurrentDivMove.style.bottom = NewBottom
    }
  }
}
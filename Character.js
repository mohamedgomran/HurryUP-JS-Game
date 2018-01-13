
class Character extends Picture{
  constructor(div1, velocity1=5, ilink1=null, jump1=0, life1=3){
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
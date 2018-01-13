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
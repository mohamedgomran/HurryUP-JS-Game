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
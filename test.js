//   var canvas = document.getElementById('canvas')
//   var ctx = canvas.getContext('2d')
//   var raf


// var ball = {
//   x: 0,
//   y: 450,
//   vx: 10,
//   CanvasWidth : 600,
//   img : "ground.png",
//   draw: function() {
//     var img = new Image()
//     img.src = this.img
//     ctx.drawImage(img, this.x, this.y, this.CanvasWidth, 50);
//     ctx.drawImage(img, this.x+this.CanvasWidth, this.y, this.CanvasWidth, 50);
//     if (this.x===-this.CanvasWidth) {this.x=0}

//   }
//   };

// function draw() {
//   ctx.clearRect(0,0, canvas.width, canvas.height);
//   ball.draw();
//   ball.x -= ball.vx;
//   // ball.y += ball.vy;
//   raf = window.requestAnimationFrame(draw);
// }

// document.addEventListener('keydown', function(e) {
//   if(!raf){raf = window.requestAnimationFrame(draw);}
// });

// canvas.addEventListener('mouseout', function(e) {
//   window.cancelAnimationFrame(raf);
//   raf=null
// });

// draw();



class Pos {
  constructor(x1=0,y1=0){
    this.X = x1
    this.Y = y1
  }
  get x(){return this.X}
  set x(x1){this.X = x1}
  get y(){return this.Y}
  set y(y1){this.Y = y1}
}


class Canvas{
  constructor(width1, height1, id1){
    this.Width = width1
    this.Height = height1
    this.Id = id1
  }
  create(){
    let CreatedCanvas = document.createElement('canvas')
    let Body = document.getElementsByTagName("body")[0]

    CreatedCanvas.width = this.Width
    CreatedCanvas.height = this.Height
    CreatedCanvas.id = this.Id
    CreatedCanvas.style.display="block"
    CreatedCanvas.style.margin ="0 auto"
    Body.appendChild(CreatedCanvas)
  }

  }


class Picture{
  constructor(x1=0,y1=0, xvelocity1=0, ilink1=null, canvas1){
    this.Posistion = new Pos(x1,y1)
    this.ImgLink = ilink1
    this.XVelocity = xvelocity1
    this.Canvas = canvas1
    this.Img = new Image()
    this.CTX = null
    this.RAF = null
  }

  get position(){return this.Posistion}
  set position(position1){this.Posistion = position1}
  get imglink(){return this.ImgLink}
  set imglink(ilink1){this.ImgLink = ilink1}
  get imglink(){return this.XVelocity}
  set imglink(xvelocity1){this.XVelocity = xvelocity1}

  init(){
    // this.Canvas.create()
    let CanVas = document.getElementById(this.Canvas.Id)
    this.CTX = CanVas.getContext('2d')
    this.CTX.globalCompositeOperation='destination-over'
    this.Img.src = this.ImgLink
  }

  draw(){
    this.CTX.drawImage(this.Img, this.Posistion.X, this.Posistion.Y, 100, 100);
  }

  move(){
    this.CTX.clearRect(0,0, this.Canvas.Width, this.Canvas.Height)
    this.draw()
    this.Posistion.X -= this.XVelocity
    this.RAF = window.requestAnimationFrame(this.move.bind(this))
  }

}

class BGround extends Picture  {

  constructor(x1=0,y1=0, xvelocity1=0, ilink1=null, canvas1){
    super(x1,y1,xvelocity1, ilink1,canvas1)
  }

  draw(){
    this.CTX.drawImage(this.Img, this.Posistion.X, this.Posistion.Y, this.Canvas.Width, 50);
    this.CTX.drawImage(this.Img, this.Posistion.X+this.Canvas.Width, this.Posistion.Y, this.Canvas.Width, 50);
    if (this.Posistion.X<=-this.Canvas.Width) {this.Posistion.X=0}
  }
}



class Obstacle extends Picture{
  constructor(x1=0,y1=0, xvelocity1=0, ilink1=null, canvas1){
    super(x1,y1,xvelocity1, ilink1,canvas1)
  }


}

var raf
// let p = new Pos(0,450)
let can = new Canvas(750, 500, "cas")
let img = new BGround(0,450, 5, "ground.png", can)
let obs = new Obstacle(750,370, 5, "obs.png", can)

can.create()
img.init()
obs.init()

function move(){
  img.CTX.clearRect(0,0, 750, 500)
  img.draw()
  obs.draw()
  img.Posistion.X -= img.XVelocity
  obs.Posistion.X -= obs.XVelocity
  raf = window.requestAnimationFrame(move)
}


var caan = document.getElementById("cas")


document.addEventListener('keydown', function(e) {
  if(!raf){raf = window.requestAnimationFrame(move);}
});

caan.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
  raf=null
});


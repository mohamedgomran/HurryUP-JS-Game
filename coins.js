
     var btn=document.getElementById('btn1')
 
      var container = document.getElementById("container");
      container.style.width=innerWidth;
      container.style.height=innerHeight;


      var player = document.getElementById("player");
      var coin1 = document.getElementById("coin1");  
      var coin2 = document.getElementById("coin2"); 

      var score=0;


      document.getElementById('demo').innerHTML = score;

      

     
     //document.getElementById('score').textcontent='gogo'
   
  

     player.style.top=innerHeight-150+'px';
     coin1.style.right=1+'px';
     coin1.style.top=innerHeight-200+'px';
     coin1.style.height=70+'px';

     coin2.style.right=50+'px';

     player.style.width=100+'px';



   var playerposition=player.style.width;  //return string
   var ppos='';
 
          var i=0;
          while(playerposition[i] != 'p')
              {
                  ppos += playerposition[i]
                  i++;
              }
      

  //console.log('coin width',pcoin1);
  console.log("player width ",ppos);
  console.log("inner width",innerWidth);

   console.log("collision position",innerWidth - ppos )

   console.log(score);

 var coll=innerWidth - ppos -45
 console.log(coll)
var move = function ()
    {
      
        
    var pos =0;
    var pos2=0
    
      // var flag=false
      var id = setInterval(frame, 3);  
        
      function frame()
            {
                console.log(pos);
                console.log(score);


                //console.log(coin1.style.right,"coin",innerWidth - player.style.width +"player")
              document.getElementById('demo').innerHTML = score;
                 if (pos == coll) {
                          clearInterval(id);
                           //document.getElementById('demo').innerHTML = score;
                          score++;

                            pos=0
                            pos2=0
                       //  alert('b')
                            id = setInterval(frame, 3);
                            
                        } else {
                             pos++; 
                             pos2++;
                             coin1.style.right=pos + 'px'; 
                             coin2.style.right=pos2 + 'px'; 

                          }
                
    
         }
        
    }

btn.addEventListener('click',move);
    
    


var socket = io();


   
function sendData(obj){
    socket.emit(obj.channel, JSON.stringify(obj));
    console.log("trying to send " + JSON.stringify(obj) )
}

 function init() {
    lblUserType.innerHTML  = clientId
    console.log(clientId)
    socket.emit("channels", JSON.stringify({channel, angVel, sectors, owner: clientId}))
    socket.on(channel, function(msg){
        console.log("server recv", msg)
        let obj = JSON.parse(msg)
        if( obj.owner == clientId){
            return
        }
        if (obj.sectors == undefined){
            return
        }
        // if(obj.event == events.CREATE){
        //     rotate() // Initial rotation
        //     engine() // Start engin
        //     angVel = obj.angVel
        // }
        if(obj.event == events.REFRESH){
            sectors = obj.sectors
            refresh()
        }
        if(obj.event == events.START){
            angVel = obj.angVel
        }
        if(obj.event == events.END){
            lblWinner.innerHTML = "Winner: " + obj.label
            angVel = 0
        }
   
    });
    socket.on('disconnect', function(){
        console.log('server disconnected');
    });
    port1.postMessage("fdsfdsfsdfsdfsdfsd")
    port1.onmessage = onMessage
    function onMessage(e) {
      console.log("teste " + e)
      }

    // spinEl.addEventListener('click', () => {
    //     sendData({channel, owner:clientId, sectors, angVel, event: events.START})
    //   })
  }
  
init()
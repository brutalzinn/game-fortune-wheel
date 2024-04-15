

var socket = io();

function sendData(obj){
    socket.emit(obj.channel, JSON.stringify(obj));
    console.log("trying to send " + JSON.stringify(obj) )
}


 function init() {
    socket.emit("channels", JSON.stringify({channel}))

    socket.on(channel, function(msg){
        console.log('server: ' + JSON.stringify(msg));
    });
    socket.on('disconnect', function(){
        console.log('server disconnected');
    });

    // socket.on("channels", (channels) => {
    //     channels.forEach((channel) => {
    //       channel.self = channel.channelID === socket.id;
    //     //   initReactiveProperties(channel);
    //     });
    //     // put the current user first, and then sort by username
    //     this.channels = channels.sort((a, b) => {
    //       if (a.self) return -1;
    //       if (b.self) return 1;
    //       if (a.username < b.username) return -1;
    //       return a.username > b.username ? 1 : 0;
    //     });
    //   });

  }
  
init()
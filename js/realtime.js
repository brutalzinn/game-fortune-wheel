
const roomId = crypto.randomUUID()
function startChannel(){
    const socket = io();
    socket.io.opts.transports = ["websocket"];

    socket.on('connect', function(){
        console.log("connected")
    })
    socket.on('event', function(data){
        console.log("event connected")

    });
    socket.on('disconnect', function(){
        console.log("disconnect ")
    });

    socket.emit("event", "hello world")
}



function init() {
    shareBtn.addEventListener('click', () => {
        console.log("canal aberto" + crypto.randomUUID())
        startChannel()
    })
  }
  init()
  
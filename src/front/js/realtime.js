function sendData(obj) {
  socket.emit(obj.channel, JSON.stringify(obj));
  console.log("trying to send " + JSON.stringify(obj))
}

function sync() {
  socket.emit("channels", JSON.stringify({ channel, angVel, sectors, label: "", owner: clientId }))
  socket.on(channel, function (msg) {
    let obj = JSON.parse(msg)
    isOwner = obj.owner == clientId
    console.log("server recv", JSON.stringify(obj))
    applyOwnerVisualEffects()
    if (isOwner) {
      return
    }
    console.log("start env", obj.event)
    switch (obj.event) {
      case events.CREATE: {
        sectors = obj.sectors
        // angVel = obj.angVel
      }
      case events.RUNNING: {
        // sectors = obj.sectors
        // ang = obj.ang
        // angVel = obj.angVel
      }
      case events.REFRESH: {
        sectors = obj.sectors
        refresh()
      }
      case events.START: {
        angVel = obj.angVel
        ang = obj.ang
      }
      case events.END: {
        // lblWinner.innerHTML = "Winner: " + obj.label
        // angVel = 0
        // sendData({ channel, owner: clientId, sectors, label: "", angVel, event: events.CREATE });
        // refresh()
      }
    }
  });

  socket.on('disconnect', function () {
    console.log('server disconnected');
  });
}
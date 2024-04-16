const path = require('path');
const crypto = require('crypto');

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { v4 } = require("uuid")
const { Server } = require("socket.io");
const { channel } = require('diagnostics_channel');
const io = new Server(server);
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './src/front/views');


app.use('/js', express.static(path.join('src', 'front', 'js')))
app.use('/styles', express.static(path.join('src', 'front', 'styles')))

app.get('/:id', (req, res) => {
  res.render('home', { channel: req.params.id });
});

app.get('/', (req, res) => {
  res.render('home', { channel: crypto.randomUUID() });
});

const channels = []

function getChannelByName(name) {
  let channel = channels.find(item => item.channel == name)
  return channel
}
io.on('connection', function (socket) {

  socket.on('disconnect', () => {
    // for (let i = 0; i < channels.length; i++) {
    //   if (channels[i].users == 0) {
    //     channels.splice(i, 1)
    //     break
    //   }
    //   channels[i].users -= 1
    // }
    // console.log(channels)
  });

  socket.on('channels', function (msg) {
    let objChanRecv = JSON.parse(msg)
    let channelIdx = channels.findIndex(item => item.channel == objChanRecv.channel)
    if (channelIdx == -1) {
      channels.push({ channel: objChanRecv.channel, label: "", owner: objChanRecv.owner, users: 1, event: objChanRecv.event })
    } else {
      channels[channelIdx].users += 1
    }
    socket.on(objChanRecv.channel, function (msg) {
      let objRecv = JSON.parse(msg)
      let channelIdx = channels.findIndex(item => item.channel == objRecv.channel)
      if (channelIdx != -1) {
        if (channels[channelIdx].owner != objRecv.owner) {
          return
        }
        let channelData = channels[channelIdx]
        channels[channelIdx] = objRecv
        channels[channelIdx].users = channelData.users
      }
    });
    console.log('channels received' + msg);
  });

  setInterval(() => {
    for (let i = 0; i < channels.length; i++) {
      let channel = channels[i]
      socket.emit(channel.channel, JSON.stringify(channel))
    }
  }, 1000);
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
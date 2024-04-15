const path = require('path');
const crypto = require('crypto');

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const { channel } = require('diagnostics_channel');
const io = new Server(server);
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './src/front/views');


app.use('/js', express.static(path.join('src', 'front', 'js')))
app.use('/styles', express.static(path.join('src','front', 'styles')))

app.get('/:id', (req, res) => {
    res.render('home', {channel:   req.params.id});
});

app.get('/', (req, res) => {
    res.render('home', {channel: crypto.randomUUID() });
});

const channels = []

io.on('connection', function(socket){


     socket.on('disconnect', () => {
        console.log('user disconnected');
        for(let channelIdx = 0; channelIdx < channels.length; channelIdx++){
            for(let userIdx = 0; userIdx < channels[channelIdx].users.length; userIdx++){
                channels[channelIdx].users.splice(userIdx, 1) 
            }
        }
      });

      socket.on('channels', function(msg){
        let objChanRecv = JSON.parse(msg)
        let channelIdx = channels.findIndex(item => item.channel == objChanRecv.channel)
        if (channelIdx == -1){
          channels.push({channel: objChanRecv.channel, users: [socket.id], owner: socket.id})
        }else{
          channels[channelIdx] = {...channels[channelIdx], users: [ ...channels[channelIdx].users, socket.id]}
        }
        socket.on(objChanRecv.channel, function(msg){
            let objRecv = JSON.parse(msg)
            if(objRecv.owner != socket.id){
                return
            }   
            let channelIdx = channels.findIndex(item => item.channel == objRecv.channel)
            if (channelIdx != -1){
                channels[channelIdx].sectors = objRecv.sectors
              }
            console.log('channels received' + msg);
        });
      });

  

    //   socket.emit("channels", channels);


    // console.log('a user connected');
    // socket.on('disconnect', function(){
    //   console.log('user disconnected');
    // });
    // socket.us
  
    // socket.on('handshake', function(msg){
    //   let obj = JSON.parse(msg)
    //   socket.on(obj.channel, function(){
    //     console.log('message by channel' ,obj);
    //   });
    //   io.emit(obj.channel, JSON.stringify(obj));
    // });

    let repeater = setInterval(() => {
        for(let channelIdx = 0; channelIdx < channels.length; channelIdx++){
            let obj = channels[channelIdx]
            if(obj.users.length == 0){
                channels.splice(channelIdx, 1)
                break
            }
            socket.emit(obj.channel, JSON.stringify(obj))
        }
             console.log(channels)
        }, 5000);
  });

server.listen(port,() => {
    console.log(`Server running at ${port}`);
});
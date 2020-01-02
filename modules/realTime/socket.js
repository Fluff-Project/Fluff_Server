const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server);
  app.set('io', io);

  io.on('connection', (socket) => {
    const auctionId = socket.handshake.query.auctionId;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log(`New User 접속!! ${ip}, ${socket.id}, ${req.ip}`);
    
    socket.on('disconnect', () => {
      console.log(`Client 접속 해제!!! ${ip}, ${socket.id}`);
      clearInterval(socket.interval);
    });

    socket.on('error', (error) => {
      console.log(`Socket Error발생: ${error}`);
    });

    socket.on('joinAuction', (data) => {
      console.log(data);
    });

    socket.join(auctionId, () => {
      console.log(`Join Auction a new clien!!!`);
      io.to(auctionId).emit('joinAuction', { msg: '윤자이 멋쟁이' })
    });

    // socket.on('joinAuction', (data) => {
    //   console.log(data);
    //   io.to(auctionId).emit('joinAuction', data);
    // });

    // socket.on('leaveAuction', (auctionId, username) => {
    //   socket.leave(auctionId, () => {
    //     io.to(auctionId).emit('leaveRoom', username);
    //   });
    // });
    
  });
}
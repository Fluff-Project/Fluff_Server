const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path:'/socket.io' });
  app.set('io', io);

  io.on('connection', (socket) => {
    const req = socket.request;
    const auctionId = socket.handshake.query.auctionId;

    console.log(auctionId);
    
    const { headers: { referer }} = req;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`New User 접속!! ${ip}, ${socket.id}, ${req.ip}`);

    socket.on('disconnect', () => {
      console.log(`Client 접속 해제!!! ${ip}, ${socket.id}`);
      clearInterval(socket.interval);
    });

    socket.on('error', (error) => {
      console.log(`Socket Error발생: ${error}`);
    });

    // immediately join auction room
    socket.join(auctionId, () => {
      console.log(`join: ${auctionId}`);
      io.sockets.in(auctionId).emit('joinAuction',`${auctionId}님이 접속되었습니다.`);
      io.to(auctionId).emit('joinAuction', `${auctionId}님이 접속되었습니다.`)
      io.sockets.in(auctionId).emit('send:message', test);
    });

    socket.on('send:message', function(data) {
      io.sockets.in(auctionId).emit('send:message', data.message);
    });
    // join
    // socket.on('joinAuction', (auctionId, username) => {
    //   socket.join(auctionId, () => {
    //     io.to(auctionId).emit('joinAuction', username)
    //   });
    // });

    // leave
    socket.on('leaveAuction', (auctionId, username) => {
      socket.leave(auctionId, () => {
        io.to(auctionId).emit('leaveRoom', username);
      });
    });
  });
}
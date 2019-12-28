const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path:'/socket.io' });
  app.set('io', io);

  io.on('connection', (socket) => {
    const req = socket.request;
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

    socket.on('joinAuction', (auctionId, username) => {
      socket.join(auctionId, () => {
        io.to(auctionId).emit('joinAuction', username)
      });
    });

    socket.on('leaveAuction', (auctionId, username) => {
      socket.leave(auctionId, () => {
        io.to(auctionId).emit('leaveRoom', username);
      });
    });
  });
}
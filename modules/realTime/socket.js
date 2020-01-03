const SocketIO = require('socket.io');
const jwt = require('../../modules/auth/jwt');
const auction = require('./auction');

module.exports = async (server, app) => {
  const io = SocketIO(server);
  app.set('io', io);

  io.on('connection', (socket) => {
    const { auctionId, token } = socket.handshake.query;

    // debug
    console.log(`\n@@@ DEBUG`);
    console.log(`token: ${token}`);
    console.log(`Auction Id : ${auctionId}`);

    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(`New User 접속!! ${ip}, ${socket.id}, ${req.ip}`);
    // console.log(`New User 접속!! `);
     
    socket.on('disconnect', () => {
      // console.log(`Client 접속 해제!!! ${ip}, ${socket.id}`);
      console.log(`Client 접속 해제!!!`);
      clearInterval(socket.interval);
    });

    socket.on('error', (error) => {
      console.log(`Socket Error발생: ${error}`);
    });
    
    // 방 입장
    socket.join(auctionId, () => {
      console.log(`Join Auction a new client!!!`);
      io.to(auctionId).emit('joinAuction', `윤자이 멋쟁이~!`)
    });
    
    socket.on('joinAuction', () => {
      console.log(`경매에 입장하셨습니다.`);
      // io.to(auctionId).emit('joinAuction', data);
    });

    socket.on('leaveAuction', (auctionId, username) => {
      socket.leave(auctionId, () => {
        io.to(auctionId).emit('leaveRoom', username);
      });
    });

    socket.on('bid', async (bid) => {
      console.log(`${bid}원 입찰 요청이 들어왔습니다.`);
      const decoded = jwt.verify(token);
      const result = await auction.checkVaild(auctionId, bid, decoded);

      io.to(auctionId).emit('bid', Number(result));
    });

    

    // socket.on('joinAuction', (data) => {
    //   console.log(data);
    //   io.to(auctionId).emit('joinAuction', data);
    // });
    
  });
}
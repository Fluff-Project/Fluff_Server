const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    mongoose.connect(`mongodb+srv://fluffiness:${process.env.MONGOOSE_PWD}@fluff-kitpk.mongodb.net/fluff?retryWrites=true&w=majority`, {
      dbName: 'fluff',
    }, (err) => {
      if (err) {
        console.log(`몽고디비 연결 에러: ${err}`);
      }
      console.log(`몽고디비 연결 성공!!!`);
    });
  };
  connect();
  mongoose.connection.on('error', (err) => {
    console.log(`몽고DB 연결 에러!!!: ${err}`);
  });
  mongoose.connection.on('disconnected', (err) => {
    console.log(`몽고DB 연결이 끊겼습니다. 연결을 재시도 합니다...`);
    connect();
  });
  require('./User');
  require('./Goods');
}
// const { Auction } = require('../../models');

// module.exports = {
//   checkVaild: async (auctionId, bid, decoded) => {
//     const auction = await Auction.findById(auctionId);
//     if (!auction) {
//       return false;
//     }

//     if (new Date(auction.createdAt.valueOf() + (24 * 64 * 64 * 1000)) < new Date()) {
//       console.log(`경매가 이미 종료 되었습니다.`);
//       return false;
//     }

//     if (!bid) {
//       console.log(`입찰 정보가 유효하지 않습니다.`);
//       return false;
//     }

//     if (bid <= auction.startCost) {
//       console.log(`시작 가격보다 높게 입찰해야 합니다.`);
//       return false;
//     }

//     if (auction.bid[0] && auction.bid[-1] >= bid) {
//       console.log(`이전 입찰가보다 높아야 합니다.`);
//       return false;
//     }

//     const bidObj = {
//       userId: decoded._id,
//       bid: bid,
//     };
//     auction.bid.push(bidObj);
//     const result = await auction.save();
//     console.log(`${decoded.username}님의 ${bid}원 입찰이 완료 되었습니다.`);
//     console.log(`Result: ${result}`);

//     return bid;
//   }
// }
    
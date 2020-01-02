/*
  최종 주문 리스트 받기
  POST | order/goodsList

  주문 리스트 조회하기
  GET | order/goodsList
*/

let User = require('../../models/User');
let Order = require('../../models/Order');
// let ObjectId = require('mongodb').ObjectID;
const { au, sc, rm } = require('../../modules/utils');

exports.orderList = async (req,res)=>{
  const userId = req.decoded._id;
  const { orderList } = req.body;

  try{
    // order.orderList에 ["goodsId","goodsId"] 배열로 저장?
    let order = new Order();
    for (var i in orderList){
      order.orderList.push(orderList[i]);
    };
    const re = await order.save();
  
    if (order.nModified === 0) { 
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR,orderId)
      });
    } 
    const orderId = re._id;
    // user.order에다가 주문id를 넣은 것.
    let userOrder = await User.updateOne({$push:{ order: orderId }}).where({_id: userId});
    console.log(userOrder);
    let result = await User.findById(userId);
    const data = result.order;
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.CART_DELETE_SUCCESS,data) 
    });
    
  } catch(err){
    console.log(err);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
};

/* 
  주문 리스트 조회하기
  GET | order/goodsList
*/

// order 테이블 만들고 populate 2번써서 오더 id 타고 [] 타고 goods 정보 가져오기.(1월 2일 수정)
exports.readOrder = async (req, res)=>{
  const userId = req.decoded._id;

  try{
    const orderList = await User.findOne({ _id: userId });

    if (orderList.length == 0) { 
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      // 클라에게 줄 값 : img, createdAt, sellerName, goodsName, price
      const result = [];
      console.log(orderList.order[0]._id);
      for (var i=0;i< orderList.order.length; i++) {
        var t = await Goods.findById(orderList.order[i]);
        var createdAt = t.createdAt;
        var sellerName = orderList.username;
        var Img = t.mainImg;
        var goodsName = t.goodsName;
        var price = t.price;
        result.push({createdAt,sellerName,Img,goodsName,price});
      };

      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ORDER_READ_SUCCESS,result) 
      });
    };
  } catch(err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }

};
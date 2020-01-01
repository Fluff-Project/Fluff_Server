/*
  최종 주문 리스트 받기
  POST | order/goodsList

  주문 리스트 조회하기
  GET | order/goodsList
*/

let User = require('../../models/User');
const { au, sc, rm } = require('../../modules/utils');

exports.orderList = async (req,res)=>{
  const userId = req.decoded._id;
  const { orderList } = req.body;

  try{
    let order = await User.updateOne({$push:{ order: { orderList }}}).where({_id: userId},);
    console.log(order.order);

    if (order.nModified === 0) { 
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.CART_DELETE_SUCCESS,order.order) 
      });
    };
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
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ORDER_READ_SUCCESS,orderList.order) 
      });
    };
  } catch(err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }

};
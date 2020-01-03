/*
  정민 
  클라가 주는대로 아이템 user.cart에 추가
  POST | /cart
  
  장바구니 리스트 조회	
  GET	| /cart

  장바구니에서 상품 삭제	
  DELETE	| /cart
 */

let User = require('../../models/User');
let Goods = require('../../models/Goods');
let ObjectId = require('mongodb').ObjectID;
const { au, sc, rm } = require('../../modules/utils');

exports.cartAdd = async (req, res) => {
  const userId = req.decoded._id;
  const { cartId } = req.body;

  try {
    let cartList = await User.findById(userId);
    
    // 중복으로 들어가는 거 막기
    let goodsCheck = await User.findOne( {cart :{_id:cartId}}).where({_id:userId});
  
    if(goodsCheck){
      console.log("이미 장바구니에 담긴 상품입니다.")
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ITEM_ALREADY_EXIST)
      });
    }else{
      if (cartList.length === 0) {
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_CART_INPUT_FALSE)
      });
    } else{
      cartList.cart.push({_id: ObjectId(cartId)})
      cartList.save();
      
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.DB_CART_INPUT_SUCCESS,cartList.cart)
      });
    };
    }
    
  } catch (err) {
    console.log(err);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  };

};

/*
  장바구니 리스트 조회	
  GET	| /cart
*/

exports.cartList = async (req, res) => {
  const userId = req.decoded._id;

  try {
    const cartList = await User.findOne({
      _id: userId
    });

    if (cartList.length == 0) {
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      const c = await Goods.find({
        _id: {
          $in: cartList.cart
        }
      });
      const goodsList = [];
      console.log(c);

      for (var i=0;i< c.length; i++) {
        var user_name = await User.findById(c[i].sellerId);
        var userName = user_name.username;
        var sellerName = c[i].userName;
        var Img = c[i].img;
        var goodsId = c[i]._id;
        var goodsName = c[i].goodsName;
        var price = c[i].price;
        goodsList.push({userName,sellerName,Img,goodsId,goodsName,price});
      };
      
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.CART_READ_SUCCESS,goodsList)
      });
    };
  } catch (err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }

};

/*
  장바구니에서 일부 상품 삭제 
  DELETE | /cart
 */
exports.cartDelete = async (req, res) => {
  const userId = req.decoded._id;
  const {
    deleteId
  } = req.body;

  try {
    let cartList = await User.findOne({
      _id: userId
    });

    if (cartList.length === 0) {
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    }
  
    const cart = cartList.cart;

    if (cart.length === 0) {
      console.log('장바구니가 비어있음.');
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_CART_FALSE)
      });
    } else {
      const count = [];
     
      for (id in deleteId) {
        count.push(cart.findIndex(i => i._id == deleteId[id]));
      };

      for (var i= count.length-1; i>=0;i--) { 
        console.log(i);
        cart.splice(count[i], 1);
        count.slice(count[i]);
      };
     
      if (cartList.nModified === 0) {
        return res.json({
          code: sc.BAD_REQUEST,
          json: au.successFalse(rm.X_DELETE_FAIL('장바구니에서'))
        });
      } else {
        cartList.cart = cart;
        cartList.save();
        const data = cartList.cart

        res.json({
          code: sc.OK,
          json: au.successTrue(rm.X_DELETE_SUCCESS('장바구니에서'),data)
        });
      };
    };

  } catch (err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }

};

/*
  장바구니 수량 확인	
  GET	| cart/cartCnt
 */

exports.cartCnt = async (req, res) => {
  const userId = req.decoded._id;

  try {
    let cnt = await User.findOne({
      _id: userId
    }).count();
    console.log(cnt);

    if (cnt < 0) {
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.CART_READ_SUCCESS, '장바구니 수량: ' + cnt + '개')
      });
    };
  } catch (err) {
    console.log(err);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  };

};
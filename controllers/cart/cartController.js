/*
  정민 
  클라가 주는대로 아이템 user.cart에 담기
  POST | /cart

  장바구니 수량 확인	
  GET	cart/cartCnt

  장바구니 리스트 조회	
  GET	| /cart

  장바구니에서 상품 삭제	
  DELETE	| /cart
 */

 let User = require('../../models/User');
 const { au,sc,rm } = require('../../modules/utils');

exports.cartAdd = async (req, res) => {
  const userEmail = req.decoded.email; 
  const cartGoods = req.body;
  
  try{
    let cart = await User.updateOne({$push:{ cart:cartGoods }}).where({email: userEmail},);

    if (cart.length == 0) { 
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.CART_INPUT_SUCCESS)
      });
    };
  } catch(err) {
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

exports.cartList = async (req, res)=>{
  const userEmail = req.decoded.email;

  try{
    const cartList = await User.findOne({ email: userEmail });
    
    if (cartList.length == 0) { 
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.CART_READ_SUCCESS,cartList.cart) 
      });
    };
  } catch(err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }

};

/*
  장바구니에서 일부 상품 삭제  -> 12/29일 아직 해결 못함.
  DELETE | /cart
 */
exports.cartDelete = async (req, res)=>{
  const userEmail = req.decoded.email;
  const { deleteId } = req.body;   

  try{
    let cartList = await User.findOne({ email: userEmail });
    // 여기서 삭제하고 싶다고 요청이 들어온 값만 삭제할 것!!
    const cart = cartList.cart;
    const count=[];

    // for문으로 일단 하나씩 뽑아서 array.indexOf(n)=>일치하는 값의 idx 순서 찾아내기. 
    for (id in deleteId){
      count.push(cart.findIndex(i => i._id == deleteId[id])); 
    };

    // count라는 변수에 담아서 array.splice(0,1)
    for (i in count){
      i -= -1;
      cart.splice(count[i],1);
    };

    if (cartList.nModified === 0) { 
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_UPDATE_FAIL_ERROR)
      });
    } else {
      cartList.cart = cart;
      cartList.save();

      res.json({
        code: sc.OK,
        json: au.successTrue(rm.CART_DELETE_SUCCESS) 
      });
    };
  } catch(err) {
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
  const userEmail = req.decoded.email;
  
  try{
    let cnt = await User.findOne({ email: userEmail }).count();
    console.log(cnt);

    if (cnt < 0) { 
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.CART_READ_SUCCESS,'장바구니 수량: '+cnt+'개')
      });
    };
  } catch(err) {
    console.log(err);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  };
  
};
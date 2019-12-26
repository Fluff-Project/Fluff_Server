/** 상품 삭제
 * DELETE | management/delete
 */

const { management } = require('../../models/Goods');
const { au, sc, rm } = require('../../modules/utils');

exports.delete = async (req, res) => {
  const { name } = req.body;

  try{
    const remove = await management.remove()
      .where('goodsName').equals(name)

    console.log("success!");

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_DELETE_SUCCESS, remove)
    });
  } catch(err){
      console.log(`item delete failed error: ${err}`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ITEM_DELETE_FAIL)
      });
  }
}

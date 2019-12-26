const Item = require('../../models/Goods');

exports.filter = async (req, res) => {
  const { color, category, size } = req.body;
  try {
    const filter = 
      await Item.find()
        .where('color').equals(color)
        .where('category').equals(category)
        .where('size').equals(size)
        .sort('createAt')
        .select('goodsName mainImg prise')
        .limit(30);


      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ITEM_FILTERING_SUCESS, filter)
      });

  } catch (err) {
    console.log(`Internal server error: ${err}`);
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.ITEM_FILTERING_SUCESS)
    });
  }
};

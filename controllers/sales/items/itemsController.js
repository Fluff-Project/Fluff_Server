const { Item, Color, Category, Size } = require('../../../models/Goods');
const { au, sc, rm } = require('../../../modules/utils');

/*
  GET /sales/items/:id
*/
exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    const itemDetail = await Item.findOne({
      where: {id: id },
      attributes: ['name', 'image', 'prise', 'size', 'condition', 'like', 'comment']
    });

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_DETAIL_SUCESS, itemDetail)
    });
  } catch (err) {
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.ITEM_DETAIL_FAIL)
    });
  }
};

/*
  POST /sales/items/filter
  {
    color: 'red',
    category: 'outer',
    size: 'XXLarge'
  }
*/
exports.filter = async (req, res) => {
  const { color, category, size } = req.body;
  try {
    const filter = await Item.findAll({
      include: [
        { model: Color, where: { color: color }}, 
        { model: Category, where: { category: category }},
        { model: Size, where: { size: size }}
      ],
      limit: 30
    });
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

/*
  GET /sales/items/thumbnail
*/
exports.thumbnail = async (req, res) => {
  try {
    const thumbnail = await Item.findAll({
      order: 'createdAt desc',
      limit: 30
    });
    console.log(`제품 리스트를 성공적으로 load하였습니다!`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_LIST_SUCESS, thumbnail)
    });
  } catch (err) {
    console.log(`제품 리스트를 load를 실패하였습니다.!`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.ITEM_LIST_FAIL)
    });
  }
};

/*
  POST /sales/items/likes
  {
    like: '윤자이짱'
  }
*/
exports.likes = (req, res) => {
  const { like } = req.body;
}
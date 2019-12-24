//post.get.auth/login 이런거 다 적어놓기 주석으로
const { recommend } = require('../models');
const { au, sc, rm } = require('../modules/utils');

exports.rec = async() =>  {
  try{
    const result = await recommend.create({
      top1: 'test1',
      top2: 'test2',
      top3: 'test3',
    });
    console.log(result);
  }catch(err){
    console.log(err);
    res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.INTERNAL_SERVER_ERROR));
}

<<<<<<< HEAD
  
  
};
=======
Recommend.create({
  hashtag1: '  ',
  hashtag2:  '   ',
  hashtag3:  '   '
});
>>>>>>> 8aff965a25963da1b522b0327637e8663e6f0674

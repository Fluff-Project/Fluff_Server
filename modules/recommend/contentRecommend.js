const ContentBasedRecommender = require('content-based-recommender')
const { User, Goods } = require('../../models');

const shuffle = (arr) => {
  let delta;
  for (let i = arr.length; i; i -= 1) {
      delta = Math.floor(Math.random() * i);
      [arr[delta], arr[i-1]] = [arr[i-1], arr[delta]];
  }
  return arr;
}

/**
 * @author ooeunz
 * 
 * @param user $req.decoded
 * @param page $paging
 */
module.exports = async (user, page) => {
  const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100
  });

  // get top3 user style
  const savedUser = await User.findById(user._id);
  let styleList = savedUser.style;
  let topStyleList = styleList.sort((a, b) => { return a - b });
  
  // get user info and push style to content based recommend
  let documents = [];
  documents.push({
    id: user._id.toString(),
    content: topStyleList.join(' ')
  })
  
  // get goods list and convert element 
  let exDocuments = await Goods.find().select('_id style');

  for (let element in exDocuments) {
    if (exDocuments[element]._id === user._id.toString()) {
      continue;
    }

    // for raise accuracy
    let doc = exDocuments[element]
      .style.sort((a, b) => { return a - b })
      .join(' ')
    
    documents.push({
      id: exDocuments[element]._id,
      content: doc
    })
  }

  // start training
  recommender.train(documents);
  
  //get top 20 similar goods to document user._id
  const similarDocuments = recommender.getSimilarDocuments(user._id, 0, 30);
  let result = shuffle(similarDocuments);  

  return result.slice(0, page);
}
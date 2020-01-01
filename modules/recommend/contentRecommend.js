const ContentBasedRecommender = require('content-based-recommender')
const Goods = require('../../models/Goods');
const ObjectId = require('mongodb').ObjectID;

const shuffle = (arr) => {
  let delta;
  for (let i = arr.length; i; i -= 1) {
      delta = Math.floor(Math.random() * i);
      [arr[delta], arr[i-1]] = [arr[i-1], arr[delta]];
  }
  return arr;
}

module.exports = (user, page) => {
  const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100
  });

  // get top3 user style
  const styleList = user.style;
  let topStyleList = styleList.keys().sort((a, b) => { return b - a });

  // get user info and push style to content based recommend
  let documents = [];
  documents.push({
    _id: user._id.toString(),
    content: topStyleList.join(' ')
  })

  
  
  // get goods list and convert element 
  let exDocuments = Goods.find().select('_id style');
  exDocuments.forEach(element => element.style.sort());
  
  console.log(`[source list 불러오기]`);
  console.log(`Debug: ${exDocuments}`);

  for (document of exDocuments) {
    let content = document.style.join(' ');

    documents.push({
      _id: document._id.toString(),
      content: content
    });
  }

  console.log(`[training 전 list]`);
  console.log(`Debug: ${documents}`);


  // start training
  recommender.train(documents);
  
  //get top 20 similar goods to document user._id
  const similarDocuments = recommender.getSimilarDocuments(user._id, 0, 20);
  let result = shuffle(similarDocuments);

  console.log(`[contents-based-filter]`);
  console.log(`Debug: ${result}`);
  
  return result.slice(0, page);
}
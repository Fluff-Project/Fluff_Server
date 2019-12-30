const ContentBasedRecommender = require('content-based-recommender')
const Goods = require('../../models/Goods');

const shuffle = (arr) => {
  let delta;
  for (let i = arr.length; i; i -= 1) {
      delta = Math.floor(Math.random() * i);
      [arr[delta], arr[i-1]] = [arr[i-1], arr[delta]];
  }
  return arr;
}

module.exports = (user) => {

  const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100
  });

  // get user info and push hashtag to content based recommend
  let documents = [];
  documents.push({
    id: user._id,
    content: user.hashtag.join(' ')
  })
  
  // get goods list and convert element 
  const exDocuments = Goods.findById(user._id).select('_id style');
  exDocuments.style.sort();

  for (document of exDocuments) {
    let content = document.style.join(' ')

    documents.push({
      id: document._id,
      content: content
    });
  }

  // start training
  recommender.train(documents);
  
  //get top 20 similar goods to document user._id
  const similarDocuments = recommender.getSimilarDocuments(user._id, 0, 20);
  let result = shuffle(similarDocuments);
  
  return result.slice(0, 10);
}
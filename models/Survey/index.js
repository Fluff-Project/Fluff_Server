const mongoose = require('mongoose');
const Schema = mongoose.Schema

const surveySchema = new Schema({
  image1: {
    url: 'url1',
    keyword: [ 'modernchic','simple']
  },
  image2: {
    url: 'url1',
    keyword: [ 'lovely','simple' ]
  },
  image3: {
    url: 'url1',
    keyword: [ 'formal','modernchic' ]
  },
  image4: {
    url: 'url1',
    keyword: [ 'formal','lovely' ]
  },
  image5: {
    url: 'url1',
    keyword: [ 'sporty','street' ]
  },
  image6: {
    url: 'url1',
    keyword: [ 'street','unique' ]
  },
  image7: {
    url: 'url1',
    keyword: [ 'unique','ethnic' ]
  },
  image8: {
    url: 'url1',
    keyword: [ 'sporty','ethnic' ]
  },
  image9: {
    url: 'url1',
    keyword: [ 'oldschool','hiphop' ]
  },
  image10: {
    url: 'url1',
    keyword: [ 'oldschool','amekaji' ]
  },

})

module.exports = mongoose.model('Survey', surveySchema);

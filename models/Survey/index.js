const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  image: [{
    url: { 
      type: String,
      required: true
    },
    keyword: {
      type: [String],
      required: true
    }
  }]
})


module.exports = mongoose.model('Survey', surveySchema);

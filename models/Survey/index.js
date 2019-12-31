const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  surveyVersion: { type: String, required: true },
  surveyList: [
    { 
      img: { type: String, required: true }, 
      style: { type: [String], required: true}
    }
  ],
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Survey', surveySchema);

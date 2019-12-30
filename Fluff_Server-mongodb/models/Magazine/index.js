const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const magazineSchema = new Schema({
  articleImg : {
    type: String,
    required: true
  }
})
//이미지하나로 때려박음!


module.exports = mongoose.model('Magazine', magazineSchema);

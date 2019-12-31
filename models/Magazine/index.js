const mongoose = require('mongoose');
const { Schema } = mongoose;

const magazineSchema = new Schema({
  articleImg : {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Magazine', magazineSchema);

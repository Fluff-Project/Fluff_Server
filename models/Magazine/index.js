const mongoose = require('mongoose');
const { Schema } = mongoose;

const magazineSchema = new Schema({

  imgUrl : { type: String, required: true, unique: true}
});

module.exports = mongoose.model('Magazine', magazineSchema);

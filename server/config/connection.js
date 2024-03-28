const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = mongoose.connection;

//connection template
// mongodb+srv://<username>:<password>@cluster0.5k55w.mongodb.net/<dbname>?retryWrites=true&w=majority

// mongodb+srv://fanyilun456:<password>@cluster0.upf05mn.mongodb.net/
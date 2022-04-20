const mongoose = require('mongoose');

//use the global js 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true }).then(() => {
    console.log("connectef to MongoDB successfully");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

//to prevent description warnings from Mongodb native driver
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};
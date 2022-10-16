const mongoose=require('mongoose');

const url='mongodb+srv://Aakash:Aakash123@cluster0.xbcu1.mongodb.net/mern-pizza'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})

var db=mongoose.connection
db.on('connected',()=>{
    console.log('Mongo DB connection successfull');
})
db.on('error',()=>{
    console.log("Mongo DB connection failed");
})

module.exports=mongoose
const mongoose=require('mongoose');

const mongoURI="mongodb://localhost:27017/iNotebook";
mongoose.connect(mongoURI);
const connectT=()=>{
const con=mongoose.connection;
con.once('open',()=>{console.log("connected")});
}

module.exports=connectT;

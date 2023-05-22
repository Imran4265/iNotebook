const connectT=require('./db');
const mongoose=require('mongoose');
const express=require('express');
connectT();
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/auth/',require('./routes/auth'));
app.use('/api/notes/',require('./routes/notes'));

app.get('/',(req,res)=>{
    res.send("domo");
})
app.listen(5000);

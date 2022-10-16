const express=require('express');
const db=require('./db');
const pizzaModel=require('./models/pizzaModel')
const cors=require('cors')

const pizzasRoute=require('./routes/pizzasRoute')
const userRoute=require('./routes/userRoute')

const app=express()
app.use(express.json());
app.use(cors())

app.use('/api/pizzas/',pizzasRoute)
app.use('/api/users/',userRoute)

app.get("/",(req,res)=>{
    res.send("Server Working")
})



const PORT=5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

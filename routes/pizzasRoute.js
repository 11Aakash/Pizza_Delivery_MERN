const express=require('express')
const { route } = require('express/lib/router')
const router=express.Router()
const Pizza=require('../models/pizzaModel')

router.get('/getallpizzas',async (req,res)=>{
    try{
        const pizzas=await Pizza.find({})
        res.send(pizzas)
    }catch(err){
        return res.status(400).json({message:err})
    }
})

router.post('/addpizza',async (req,res)=>{
    const {name, varients, smallPrice, mediumPrice, largePrice, description, imgUrl, category}=req.body
    const pizza=new Pizza({name,varients,prices:[{small:smallPrice,medium:mediumPrice,large:largePrice},],category,image:imgUrl,description})
    try{
        const a1=await pizza.save()
        console.log('At server',a1);
        res.send('Pizza Added Successfully')
    }
    catch(error){
        res.status(400).json({message:error})
    }
})


router.post('/getpizzabyid',async (req,res)=>{
    const pizzaid=req.body.pizzaid
    try{
        const pizza=await Pizza.findOne({_id:pizzaid})
        res.send(pizza)
    }catch(err){
        return res.status(400).json({message:err})
    }
})




router.delete('/:id',async (req,res)=>{
    const id=req.params.id
    try{
        const pizza=Pizza.findById(id)
        await pizza.remove()
        // await Pizza.findOneAndDelete({_id:id})   or
        res.send("Pizza Deleted Successfully")
        console.log("Pizza Deleted Successfully");
    }
    catch(error){
        res.status(400).send(error)
    }
})


router.post('/editpizza',async (req,res)=>{
    const editedpizza=req.body.updatedPizza
    try {
        const pizza=await Pizza.findOne({_id:editedpizza._id})
        pizza.name=editedpizza.name
        pizza.description=editedpizza.description
        pizza.image=editedpizza.image
        pizza.category=editedpizza.category
        pizza.prices=[{'small':editedpizza.smallPrice,'medium':editedpizza.mediumPrice,'large':editedpizza.largePrice}]

        await pizza.save()
        res.send('Pizza Edited Successfully')

    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports=router
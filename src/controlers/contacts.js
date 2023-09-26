const express= require('express');

const route= express.Router();

const mongodb= require("../connection/connection");
const ObjectId= require('mongodb').ObjectId;

const getAllinfo = async(req,res)=>{
    
    const result = await mongodb.getDb().db('test').collection('contacts').find().toArray();
    
    console.log()

    try{
        if(result.length==0){
            res.status(404).json({message:'no data found'})
            
        }
        else{
            res.setHeader("Content-Type","application/json");
            res.status(200).json(result);

        }

    }
    catch(error){
        console.log("Error querying the database:" , error);
        res.status(500).json({message: "internal server error"});

    }

}

const getSingleId= async(req,res)=>{
    const userId= new ObjectId(req.params.id);


    const result = await mongodb.getDb().db('test').collection('contacts').find({_id: userId}).toArray();
    try{
        
        if (result.length === 0) {
            res.status(404).json({ message: "No data found" });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(result); // Return the first document in the array
          }
       
      
    }
    catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const createContact= async (req,res)=>{
    console.log(req.body.firstName)
    const contact= {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday

    }

   
     console.log('Received POST request with body:', req.body);
     
  
    const response= await mongodb.getDb().db('test').collection('contacts').insertOne(contact);

    try{
        if (response.acknowledged) {
            res.status(201).json(response);
            console.log(req.body)
        } 
        else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');}
    }catch(error){
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteContact= async(req,res)=>{
    const id = new ObjectId(req.params.id);
    const response= await mongodb.getDb().db('test').collection('contacts').deleteOne({_id: id})

    try{
        if (response.acknowledged) {
            res.status(201).json(response);
            console.log(id + ' item removed')
        } 
        else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');}
    }catch(error){
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateContact= async (req,res)=>{
    const newInfo={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const id= new ObjectId(req.params.id);

    const response= await mongodb.getDb().db('test').collection('contacts').replaceOne({_id: id}, newInfo)

    try{
        if (response.acknowledged) {
            res.status(201).json(response);
            console.log(id+ 'item updated')
        } 
        else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');}
    }catch(error){
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}



module.exports={
    getAllinfo,
    getSingleId,
    createContact,
    deleteContact,
    updateContact
}
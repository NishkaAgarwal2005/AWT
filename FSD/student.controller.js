const mongoose = require('mongoose');
const Student = require("../model/student.model")

 const  newUser = async(req,res)=>{
    try{
    const {id,name,email} = req.body
    const student = await Student.create({
        _id : id,
        name,
        email
    }
    );

    if(!student)
        res.status(404).json({message:"adding user failed"})

    else{
        res.status(201).json({message:"user added successfully",student})
    }
     
}
 catch(err){
    console.log(err);
}
 }

 const getUsers = async (req,res)=>{
    try{
        const students = await Student.find()
        res.status(200).json(students)
    }
 
 catch(err){
    console.log(err);
 }
}

const getUser = async (req,res)=>{
    try{
      const id = Number(req.params.id)
      const student = await Student.findById(id)

      if(!student)
          res.status(404).json({message:"student does not exist"})

      else{
        res.status(200).json(student)
      }
}catch(err){
    res.status(500).json(err.message)
}
}

const updateUser= async (req,res)=>{
    try{
        const id = Number(req.params.id)
         const student = await Student.findById(id)

      if(!student)
          res.status(404).json({message:"student does not exist"})
       
      else{
        

        await Student.findByIdAndUpdate(id,{name:req.body.name}, {new :true})
        res.status(200).json({message:"student updated successfully",student})
      }
    }
     catch(err){
        res.status(500).json(err)
     }
}

const updateUserDetails = async(req,res)=>{
    try{
        const id = Number(req.params.id)
          const student = await Student.findById(id)

      if(!student)
          res.status(404).json({message:"student does not exist"})
       
      else{
        await Student.findByIdAndUpdate(id,(req.body),{new:true})
        res.status(200).json({"message":"Successfully updated"})
      }
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteUser = async (req,res)=>{
    try{
        const id = Number(req.params.id)
        const student = await Student.findById(id)

       
      if(!student)
          res.status(404).json({message:"student does not exist"})
       
      else{
        await Student.findByIdAndDelete(id);
        res.status(200).json({"message":"Successfully deleted"},Student)
      }
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    newUser, getUsers , getUser,updateUser,updateUserDetails,deleteUser
};

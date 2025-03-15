const express = require("express");
const mongoose = require("mongoose");
var app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/ITB")
  .then(() => { console.log("Database Connection Successful") })
  .catch((err) => { console.log("Database Connection Failed Due to " + err) });
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  rollno: { type: Number, required: true }
});

const student = mongoose.model('student', studentSchema);
app.post("/addStudent", (req, res) => {
  let stu = new student(req.body);
  stu.save()
    .then(() => { res.status(200).json({ "message": "added" }) })
    .catch((err) => { res.status(400).json({ "message": "failed" }) });
});

 app.get("/student",(req,res)=>{
    student.find()
      .then((students)=>{
        if(students && students.length>0){
            res.json(students);
        }
        else{
            res.status(400).json({"message":"empty"})
        }
      })
      .catch(err=> res.status(500).json({error: err.message}));
 });

 app.get("/student/:rollno",(req,res)=>{
    const rollno = req.params.rollno
    student.findOne({rollno:rollno})
      .then((students)=>{
        if(students){
            res.json(students);
        }
        else{
            res.status(400).json({"message":"empty"})
        }
      })
      .catch(err=> res.status(500).json({error: err.message}));
 });

 
 app.delete("/student/:rollno",(req,res)=>{
    const rollno = req.params.rollno
    student.findOneAndDelete({rollno:rollno})
      .then((students)=>{
        if(students){
            res.json(students);
        }
        else{
            res.status(400).json({"message":"empty"})
        }
      })
      .catch(err=> res.status(500).json({error: err.message}));
 });

 app.put("/student/:name",(req,res)=>{
    const studentName = req.params.name;
    const updatedData = req.body;

    student.findOneAndUpdate(
        {name:studentName},
        {$set:updatedData},
        {new:true }
        )
        .then((updatedStudent)=>{
            if(updatedStudent){
                res.json({message:"Student updated successfully",student: updatedStudent});
            }else{
                res.status(404).json({message:"Student not found"})
            }
        })
        .catch(err=> res.status(500).json({error:err.message}))
 });
 



app.listen(2000, () => {
  console.log("server started");
});

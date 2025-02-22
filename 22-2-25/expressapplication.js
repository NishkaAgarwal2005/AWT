const express = require('express')
var app = express()
let students = [
  {"id":4,"name":"Nishka","lastname":"Agarwal"},
  {"id":3,"name":"Nishritha","lastname":"Goud"}
];

 app.get("/students",(req,res)=>{
    res.json(students)
})
 app.get("/student/:id",(req,res)=>{
     const id = req.params.id
    let student = students.find(s => s.id == id)
   if(student){
        res.status(200).json({
            "message":"student found",
           "student" : student
       })
   }
   else{
        res.status(404).json({"message":"Student not found"})
    }
 })

 app.delete("/deletestudent/:id",(req,res)=>{
   const id = req.params.id
   let stud = students.find(s=>s.id == id)
     if(stud){
    students = students.filter(s=>s.id!== id)
    res.status(200).json({
         "message":"Deleted successfully",
        "students": students
    
    })
  }  else{
            res.status(404).json({"message":"Student not found"})
   }
 })

app.use(express.json())

 app.post("/addStudent",(req,res)=>{
     let student = req.body
     students.push(student)
   res.status(200).json({
       "message":"student added successfully",
       "students":students 
    })
 })  

app.put("/updateStudent/:id",(req,res)=>{
    let id = req.params.id
    studentIndex = students.findIndex(s=>s.id==id)

    if(studentIndex != -1){
        students[studentIndex].name = req.body.name
        students[studentIndex].lastname = req.body.lastname


    res.status(200).json({
        "message":"updated",
        "students": students
    })
} else{
    res.status(404).json({"message":"Student not found"})
}

})


app.listen(2000,()=>{
    console.log("server started...")
})

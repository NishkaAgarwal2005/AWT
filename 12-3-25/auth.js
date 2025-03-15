const express = require('express')
const jwt = require('jsonwebtoken')

var app = express()
app.use(express.json())

app.post("/login",(req,res)=>{
    const{username,password}= req.body
    if((username=="cvr")&&(password=="cvr")){
        const token = jwt.sign((username,password),"cvrcollege")
        res.json(token)
    }
    else{
        res.status(400).json(token)
    }
})
app.get("/protected",authenticateToken,(req,res)=>{
    res.json({"message":"Welcome to my home page"})
})

app.get("/students",(req,res)=>{
    res.json({"message":"Hai"})
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    jwt.verify(token,"cvrcollege",(err,decoded)=>{
        if(err){
            return res.status(403).json({"message":"Invalid Token- login first"})
        }else{
            next()
        }
    })
}

app.listen(2000,()=>{
    console.log("server started...")
})

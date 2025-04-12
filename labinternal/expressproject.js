const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

var app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/ITB")
.then(()=>{console.log("Connected to mongodb")})
.catch((err)=>{console.log(err)});

const userSchema = new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true}
})

let user = mongoose.model('user',userSchema);

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:false},
    price:{type:String,required:true},
    category:{type:String},
    stock:{type:Number,default:0}
})

let product = mongoose.model('product',productSchema)


app.post("/products",(req,res)=>{
   
    product.create(req.body)
    .then((data)=>{
        res.json(data)
    }).catch((err)=> res.status(404).json({err:error.message}))
})

app.get("/products",(req,res)=>{
    product.find()
    .then((data)=>{
        if(data.length>0)
            res.json(data)
        else
           res.status(404).json({"message":"err"})
    }).catch((err)=>{res.status(500).json({err:error.message})})
})

app.get("/products/:id",(req,res)=>{
    
    product.findById(req.params.id)
    .then((data)=>{
        res.json(data)

       
    }).catch((err)=>{
       res.json(err) 
    }
    )
})

app.delete("/products/:id",(req,res)=>{ 
    product.findByIdAndDelete(req.params.id)
    .then((data)=>{
         res.json({"message":"deleted","products":data})
       // else
        // res.status(404).json({"message":"err"})
    }).catch((err)=>{ res.json(err)})
})

app.put("/products/:id",(req,res)=>{
    const id = req.params.id
    const Updatedproduct = req.body
    product.findByIdAndUpdate({id,Updatedproduct})
    .then((data)=>{
        if(data)
            res.json(data)
        else
         res.status(404).json({"message":"err"})
    }).catch((err)=>{console.log(err)})
})

app.post("/login",(req,res)=>{
    const{email,password} = req.body
    if((email=="cvr" && password=="cvr")){
        const token = jwt.sign({email,password},"cvrcollege")
        res.json({token})
    }
})

app.get("/protected",authenticateToken,(req,res)=>{
    res.json({message:"Welcome to Web page"})
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader.split("")[1]

    jwt.verify(token,"cvrcollege",(err,decoded)=>{
         if(err){
            return res.status(404).json({"message":"Invalid"})
         }
         else
         next()
    })
}

app.listen(2000,()=>{
    console.log("Server started...")
})

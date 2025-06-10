const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/student.route');

const app = express()
app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017/userDB")
.then(()=>{console.log("Connected to the database")
     app.listen(2000,()=>{
        console.log("Server started")
     })
    }).catch((err)=>console.log(err.message))

    app.use('/users', userRoutes)



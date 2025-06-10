const express = require('express');
const mongoose = require('mongoose');
const { newUser,getUser,getUsers,updateUser,updateUserDetails,deleteUser } = require('../controller/student.controller');
const routes = express.Router();

routes.use(express.json())
routes.post("/",newUser)
routes.get("/",getUsers)
routes.get("/:id",getUser)
routes.patch("/:id",updateUser)
routes.put("/:id",updateUserDetails)
routes.delete("/:id",deleteUser)

module.exports= routes;


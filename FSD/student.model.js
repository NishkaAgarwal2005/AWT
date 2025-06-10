const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    _id: {type:Number , required:true},
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true}
})

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;

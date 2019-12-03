
//To connect to mongodb
const mongoose = require('mongoose');
const express = require('express');
mongoose.connect('mongodb://localhost/Students', { useNewUrlParser: true, useUnifiedTopology: true })
//changed to promise
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
//creation of schema
const studentsSchema=new mongoose.Schema({
    name: {type: String, required: true},
    courses: {type:mongoose.Schema.Types.ObjectId,
        ref: 'Customer', required: true}
});
//create class 
const Students = mongoose.model('Students', studentsSchema);
async function createStudents(){
//create object inside the class
const students= new Students({
    name:'Mayar',
    courses:['Maths','English']
                             });
                             //validation
   try{                          
//to save the document
const result= students.save();
console.log(result);
} catch{
    res.status.send('error 404');
}

}
//to make query
async function getStudents(id){
    const student=await Students.findById(id);
    console.log(student);
};
//to update
async function updateStudents(id){
    const student=await Students.update({_id:id},{
        $set:{
            name:'Akram',
            courses:['fields','Italy']}
        })
    console.log(student);
};
//to remove
async function removeStudents(id){
    const student=await Students.findByIdAndRemove(id);
    console.log(student)
};

module.exports = Students;
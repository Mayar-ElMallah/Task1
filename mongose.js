
//To connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Students', { useNewUrlParser: true, useUnifiedTopology: true })
//changed to promise
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
//creation of schema
const coursesSchema=new mongoose.Schema({
    name: {type:[ String], required: true}
});
//create class 
const Courses = mongoose.model('Courses', coursesSchema);
async function createCourses(){
//create object inside the class
const courses= new Courses({

    name:['Maths','English']
                             });
                             //validation
   try{                          
//to save the document
const result= courses.save();
console.log(result);
} catch{
    res.status.send('error 404');
}

}
//to make query
async function getCourses(id){
    const course=await Courses.findById(id);
    console.log(course);
};
//to update
async function updateStudents(id){
    const course=await Courses.update({_id:id},{
        $set:{
            name:['fields','Italy']}
        })
    console.log(course);
};
//to remove
async function removeStudents(id){
    const course=await Courses.findByIdAndRemove(id);
    console.log(course)
};

module.exports = Courses;
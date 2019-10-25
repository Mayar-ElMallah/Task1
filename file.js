const express=require('express');
const app= express();
const joi=require('joi');
app.use(express.json());
const Students=[
    {id:1,   name:'Mayar',    courses:['Maths','Physics']},
    {id:2,   name:'Hadeer',   courses:['CO','Fields']},
    {id:3,   name:'Ahmed',    courses:['Software engineering','English']},
                ];
app.get('/api/Students',(_req,res)=>{res.send(Students)});
                app.get('/api/students/:id', (req,res) =>
                {const Student=Students.find(c => c.id===parseInt(req.params.id));
                   if (!Student) return res.status(404).send('Error404');
                   res.send(Student);});

app.post('/api/Students', (req,res) =>{
        const schema={name:joi.string().min(3).required(),
                      courses:joi.array().min(2).required()};
        const result=joi.validate(req.body, schema);
    if (result.error)return res.status(400).send(result.error.details[0].message);
const Student={id:Students.length+1,
                name:req.body.name,
                courses:req.body.courses};
    Students.push(Student);
        res.send(Student);
                                        });

app.put('/api/Students/:id', (req,res)=> {
                                            //Look up the course
                                            //If it's not exist, return error(404)
                                        const Student=Students.find(c => c.id===parseInt(req.params.id));
                                        if (!Student) return res.status(404).send('Error404');
                                            //validate
                                            //If invaled, return error(404)
                                        const schema={name:joi.string().min(3).required(),
                                                courses:joi.array().min(2).required()};
                                        const result=joi.validate(req.body, schema);
                                        if (result.error)return res.status(400).send(result.error.details[0].message);
                                            //Update the course
                                        Students[req.params.id].name = req.body.name;
                                        Students[req.params.id].courses=req.body.courses;

                                            //Response
                                            res.send (Students[req.params.id]);
         }); 
    
    app.delete('/api/Students/:id', (req,res)=> {
            //Look up the course
            //If it's not exist, return error(404)
        const Student=Students.find(c => c.id===parseInt(req.params.id));
        if (!Student) return res.status(404).send('Error404');
//Delete The course
const index = Students.indexOf (Student);
Students.splice (index, 1);

//Response
res.send (Student);
});

                  
                  









app.listen (3000,()=>console.log('listening on port3000...'));
const express=require('express');
const path=require('path'); //inbuilt module
const port=8000;

//database
const db=require('./config/mongoose');
const Contact=require('./models/contact');//this Contact variable will be used to populate the database

const app=express();

app.use(express.urlencoded());  //parser
app.use(express.static('assets'));

var contactList=[ 
    {
        name:"Sachin",
        phone:"1234567890"
    },
    {
        name:"Test1",
        phone:"5834580423"
    },
    {
        name:"Test2",
        phone:"49543958453"
    }
 ]


//telling express we will be using EJS as template engine

app.set('view engine','ejs');
//MVC->view part
app.set('views',path.join(__dirname,'views'));


app.get('/',function(req,res){

    //name:"Sachin"  -> query
    Contact.find({}, function(err,allContacts){

        if(err){
            console.log('Error in fetching data from the server');
            return;
        }

        //allContacts->it will contain all the documents it is collection of contacts document
        return res.render('home', {
            title:"Sachin's list",
            contact_list:allContacts
        });

    });

});


app.get('/practice',function(req,res){

    return res.render('practice',{
        title:"Let's play with EJS"
    });
});


app.post('/create-contact',function(req,res){


    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    // contactList.push(req.body);

    // res.redirect('/');

    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('Error in creatin a contact');
            return;
        }

        console.log('#####',newContact);
        res.redirect('back');
        //we have created a contact in the database but it will not print yet
    });


});

//query params and string params

app.get('/delete-contact/',function(req,res){

    /*
    console.log(req.query);
    let phone=req.query.phone;

    let contactIndex=contactList.findIndex(contact => contact.phone==phone);

    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }
    */

    let id=req.query.id;

    //find the object by using id and delete the object

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting the contact from database');
        }

        return res.redirect('back');
    });

});



app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);

    }

    console.log('My express server is running on port',port);
});
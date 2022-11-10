//require the library
const mongoose=require('mongoose');


//connectiong mongoose to the database 
mongoose.connect('mongodb://localhost/contacts_list_db');

//now to access the database
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'Error coonceting to database'));

//up and running
db.once('open',function(){
    console.log('Successfully connected to the database');
});


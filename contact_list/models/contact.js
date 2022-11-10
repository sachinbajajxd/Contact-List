const mongoose=require('mongoose');

const ContactSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true

    }
})

//Now we have created the schema now we have to populate it in the index.js

//here model signifies the collection

const Contact = mongoose.model('Contact',ContactSchema);

//exporting it

module.exports=Contact;
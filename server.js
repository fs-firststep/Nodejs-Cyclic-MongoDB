const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const Customer = require('./models/customer');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const staticPath = path.join(__dirname + "/Public");

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({extended : false}));



app.set('view engine', 'hbs');



mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    username: {
        type: String,
        required: true ,
    },

    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },

});

const Customer =  mongoose.model('Customer', CustomerSchema);







app.get('/', (req, resp) => {
    resp.render('index');
});

app.post("/registration", async (req, resp) => {
    
    const data = new Customer({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        gender : req.body.gender,
    
    })

    const result = await data.save();
    resp.status(201).render("index");

    console.log(result); 
});



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})
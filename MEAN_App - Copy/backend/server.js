import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import User from './models/user';
import Excercise from './models/excercise';
import { runInNewContext } from 'vm';

const app = express();
const router = express.Router();
app.use(cors()); //attaching the cors to the express app
app.use(bodyParser.json()); // the body data might be in json this is why we call .json

mongoose.connect('mongodb+srv://edinaj:edinajpass@physapp-ejf1b.mongodb.net/ionic-jwt?retryWrites=true&w=majority'); // connecting to MongoDB (parameter - url to the MongoDB instance).
//mongoose.connect('mongodb://localhost:27017/Test'); // connecting to MongoDB (parameter - url to the MongoDB instance).

const connection = mongoose.connection; //the active DB connection

connection.once('open', () => {
    console.log("Database connection successful!");
}); //add event listener when starting the server

//var mongoUrl = "mongodb://physapp-ejf1b.mongodb.net:27017/Test.User";
//var mongoose = require('mongoose');
//mongoose.connect(mongoUrl);
//mongoose.connection.on('error', err => console.log('MongoDB connection error: ${err}'));

//ENDPOINT - GET LIST OF USERS
router.route('/users').get((req,res) => {
    User.find((err, users) => {  //if you find users, get the json
        if(err)
            console.log(err);
        else
            res.json(users);
    }).populate({path:'excercises',model:'Excercise'});

}) ;   

//ENDPOINT - GET USER BY ID
router.route('/users/:id').get((req,res) => {
    User.findById(req.params.id, (err,user)  => {  //if you find user by ID, get the json
        if(err)
            console.log(err);
        else
            res.json(user);
    }).populate({path:'excercises',model:'Excercise'});
}) ;   



//ENDPOINT - ADD A USER
router.route('/users/add').post((req,res) => {
    let user = new User(req.body); //new user object available
    user.save()
        .then (user => { 
            res.status(200).json({'user':'Added Successfully!'});
        })
        .catch (err => {
            res.status(400).send('Cannot create user!')
        });
});

//ENDPOINT - EDIT USER
router.route('/users/update/:id').post((req,res) => { //first we get user 
    User.findById(req.params.id, (err,user) => {
        if(!user)
            return next(new Error('Could not find user with this ID!'));
        else  {//we update
            user.name = req.body.name;
            user.cpr = req.body.cpr;
            user.diagnose = req.body.diagnose;
            user.condition = req.body.condition;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.excercises = req.body.excercises;
            user.progress = req.body.progress;

        user.save().then(user => {  //save changes and storing in DB
            res.json('Update Successful!');
        }) .catch(err => {
            res.status(400).send('Update Failed!');
        });
    }
    });
});

//ENDPOINT - DELETE USER BY ID

router.route('/users/delete/:id').get((req,res) => {
    User.findByIdAndRemove({_id: req.params.id}, (err, User) => {
        if(err)
            res.json(err);
        else
            res.json('User Removed Successfully');
    });
});





//EXERCISE FUNCTIONALITY






//ENDPOINT - GET LIST OF Exercises
router.route('/excercises').get((req,res) => {
    Excercise.find((err, excercises) => {  //if you find Exercises, get the json
        if(err)
            console.log(err);
        else
            res.json(excercises);
    });
}) ;   


//ENDPOINT - GET Excersise BY ID
router.route('/excercises/:id').get((req,res) => {
    Excercise.findById(req.params.id, (err,excercise)  => {  //if you find exercise by ID, get the json
        if(err)
            console.log(err);
        else
            res.json(excercise);
    });
}) ;   


//ENDPOINT - ADD A Exercise
router.route('/excercises/add').post((req,res) => {
    let excercise = new Excercise(req.body); //new exercise object available
    excercise.save()
        .then (excercise => { 
            res.status(200).json({'exercise':'Added Successfully!'});
        })
        .catch (err => {
            res.status(400).send('Cannot create exercise!')
        });
});

//ENDPOINT - EDIT Excercise
router.route('/excercises/update/:id').post((req,res) => { //first we get exercise 
    Excercise.findById(req.params.id, (err,excercise) => {
        if(!excercise)
            return next(new Error('Could not find exercise with this ID!'));
        else  {//we update
            excercise.Name = req.body.Name;
            excercise.Description = req.body.Description;
            excercise.imgURI = req.body.imgURI;
            excercise.liked = req.body.liked;

        excercise.save().then(excercise => {  //save changes and storing in DB
            res.json('Update Successful!');
        }) .catch(err => {
            res.status(400).send('Update Failed!');
        });
    }
    });
});

//ENDPOINT - DELETE Exercise BY ID

router.route('/excercises/delete/:id').get((req,res) => {
    Excercise.findByIdAndRemove({_id: req.params.id}, (err, Excercise) => {
        if(err)
            res.json(err);
        else
            res.json('Exercise Removed Successfully');
    });
});


app.use('/', router);  //another middleware

app.listen(4000, () => console.log('Express is running on port 4000!'));
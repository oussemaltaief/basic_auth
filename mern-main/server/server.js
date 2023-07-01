// CREATE SERVER
const express = require("express")
const app = express()
const _PORT = process.env.PORT;
const cors = require("cors")

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

app.use(cors())
app.use(express.json())
//PASSWORD=TqdPjz4twfgJPhul
//USERNAME=mohamedoussema10
//DB=mernDB


// CONNECT TO DB
const   username = process.env.USERNAME,
        password = process.env.PASSWORD,
        database = process.env.DB;

const mongoose = require("mongoose")
//mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.1qkmtpq.mongodb.net/$////{database}?retryWrites=true&w=majority`)

const uri = ('mongodb+srv://mohamedoussema10:TqdPjz4twfgJPhul@cluster0.xlvcmry.mongodb.net/mernDB?retryWrites=true&w=majority')

const options = {
    // ...
    serverSelectionTimeoutMS: 30000, // Set a longer timeout period (30 seconds)
  };
  
  mongoose.connect(uri, options);
  


// USER MODEL
const UserModel = require('./models/Users')


// get request
app.get("/users", async (req, res)=>{
    const users = await UserModel.find();
    res.json(users)
})


// create user
app.post("/createUser", async (req, res) => {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.json(req.body)
})

// ADMIN MODEL
const AdminModel = require('./models/Admins')

//register post
app.post("/register", async (req, res) => {
    const { username, password } = req.body
    
    const admin = await AdminModel.findOne({username})

  ///// if admin exist
    admin &&  res.json({message: "user already exists!"})
    

    const hashedPassword= bcrypt.hashSync(password, 10)


    const newAdmin = new AdminModel({username,  
        password: hashedPassword
    });
    await newAdmin.save();

    return res.json({message: "Admin created succefully"})

});

app.post('/login', async (req, res) => {
    const {username, password} = req.body

    const admin = await AdminModel.findOne({username})
    !admin && res.json({message: "Admin doesn't exist!"})
    
    const isPasswordValid = await bcrypt.compare(password,admin.password);
    !isPasswordValid && res.json({message: "Username or Password is not correct!"})

    const token = jwt.sign({id: admin._id}," oussema")
})



app.listen(_PORT, ()=>{
    console.log("Server Works")
})
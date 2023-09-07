import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

// connect express and define port
const app = express();
const port = process.env.PORT || 5000;

// middlewere
app.use(cors());
app.use(express.json());
dotenv.config();

// mongodb uri
const uri = process.env.URI;


// connect database
const run = async () => {
    try {
        // connect with uri
        mongoose.connect(uri);

        // all api endpoints

        // get all user
        app.get("/api/users", async (req, res) => {
            try {
                const users = await User.find();
                res.status(200).send({ users, message: "Successfully Fetch All Users!" });
            } catch (error) {
                console.log(error.message);
                res.status(400).send({ message: "Failed to Fetch Users!" });
            }
        })
        // sign up user
        app.post("/api/user/signup", async (req, res) => {
            try {
                const {
                    name, username, email, password, photo, bio
                } = await req.body;

                // hassed password
                const hassedPassword = await bcrypt.hash(password, 10);

                const newUser = {
                    name,
                    username,
                    email,
                    password: hassedPassword,
                    photo,
                    bio
                }

                // create user
                const result = await User.create(newUser);
                res.status(200).send({ result, message: "Successfully Sign Sp!" });
                console.log(result);

            } catch (error) {
                console.log(error.message);
                res.status(400).send({ message: "Failed to Sign Up!" });
            }
        })


        // check connection
        console.log("database connected!");

    } catch (error) {
        console.log(error.message);
    }
}

// invoke run function
run();

// root directory
app.get("/", (req, res) => {
    res.send(`Taskify Server Is Running`);
})

// listen server
app.listen(port, () => {
    console.log(`Taskify Server Is Running On Port: ${port}`);
})
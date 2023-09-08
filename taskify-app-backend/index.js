import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Task from "./models/Task.js";

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
        app.post("/api/users", async (req, res) => {
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
                res.status(200).send({ result, message: "Successfully Sign Up!" });
            } catch (error) {
                console.log(error.message);
                res.status(400).send({ message: "Failed to Sign Up!" });
            }
        })


        // create a task
        app.post("/api/tasks", async (req, res) => {
            try {
                const getTaskData = await req.body;
                const task = await Task.create(getTaskData);
                res.status(200).send({ task, message: "Successfully Created Task!" });
            } catch (error) {
                console.log(error.message);
                res.status(400).send({ message: "Failed to Create Task!" });
            }
        })

        // get all tasks
        app.get("/api/tasks", async (req, res) => {
            try {
                const tasks = await Task.find();
                res.status(200).send({ tasks, message: "Successfully Fetch All Tasks!" });
            } catch (error) {
                console.log(error.message);
                res.status(400).send({ message: "Failed to Fetch Tasks!" });
            }
        })

        // update task status
        app.patch("/api/tasks/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const { status } = req.body;

                let updatedStatus;
                if (status === "pending") {
                    updatedStatus = "in-progress";
                } else if (status === "in-progress") {
                    updatedStatus = "complete";
                } else {
                    updatedStatus = "archive";
                }


                const updatedTask = await Task.findByIdAndUpdate(id, { status: updatedStatus }, { new: true });

                console.log(updatedTask);
                res.status(200).send({ updatedTask, message: "Successfully Upadate This Task!" });


            } catch (error) {
                console.log(error.message);
                res.status(400).send({ message: "Failed to Update Task Status!" });
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
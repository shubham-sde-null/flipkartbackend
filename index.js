import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import User from "./User.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(DATABASE, () => {
  console.log("mongosee atlas  connection successful");
});
app.get("/", (req, res) => {
  res.send("flipkart backend testing");
});
app.get("/users", async (req, res) => {
  const allData = await User.find();
  res.json(allData);
});
app.post("/registeruser", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.log("ERROR : " + res.json({ message: err }));
  }
});
app.post("/loginuser", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = user._id;
      // res.send("user is valid");
      res.send(token);
    } else {
      res.send("invalid");
    }
  } catch (err) {
    res.json(err);
  }
});
app.listen(PORT, () => {
  console.log("server started at 8000");
});

// app.post("/loginuser", async (req, res) => {
//   const user = await User.find({
//     name: req.body.name,
//     age: req.body.age,
//   });
//   if (user) {
//     res.send("user is valid");
//   } else {
//     res.send("invalid user");
//   }
// });

// app.post("/loginuser", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     // const user = await User.find({ name: req.body.name });
//     if (user) {
//       const result = await bcrypt.compare(req.body.password, user.password);
//       if (result) {
//         const token = jwt.sign({ email: user.email }, "secret");
//         res.json({ token });
//       } else {
//         res.status(400).json({ error: "password doesn't match" });
//       }
//     } else {
//       res.status(400).json({ error: "User doesn't exist" });
//     }
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });
// app.listen(8000, () => {
//   console.log("server started at 8000");
// });

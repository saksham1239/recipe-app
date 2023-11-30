import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // used for authentication
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  const plen = password.length;
  console.log(plen);

  if (user) {
    return res.json({ message: "User already exists", code: "403" });
  } else if (username.length < 3) {
    return res.json({
      message: "Username can't be less than 3 characters",
      code: "ul",
    });
  } else if (plen < 8 || plen > 16) {
    return res.json({
      message: "Password must be 8-16 characters long",
      code: "pl",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User Registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); // this compares the password from the database to the password entered by the user

  if (!isPasswordValid) {
    return res.json({
      message: "Username or Password you entered is Incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

router.post("/updateUser", async (req, res) => {
  const { username, password, updatedUser } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      message: "Username or Password you entered is Incorrect",
    });
  }

  if (updatedUser.length < 3) {
    return res.json({
      message: "Username cannot be less than 3 characters",
    });
  }

  if (updatedUser === username) {
    return res.json({
      message: "New Username cannot be your last Username",
    });
  }

  await UserModel.updateOne(
    { username },
    {
      $set: { username: updatedUser },
    }
  );

  res.json({ message: "Username updated successfully", code: 200 });
});

router.post("/updatePassword", async (req, res) => {
  const { username, password, reEnteredPassword, newPassword } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      message: "Username or Password you entered is Incorrect",
    });
  }

  if (password !== reEnteredPassword) {
    res.json({
      message: "Passwords do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await UserModel.updateOne(
    { username },
    {
      $set: { password: hashedPassword },
    }
  );

  res.json({ message: "Password updated successfully", code: 200 });
});

export { router as userRouter };

//middleware
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

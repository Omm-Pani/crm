const express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { sendEmail } = require("../sendEmail");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { username, company_name, email, mobile_number } = req.body;

    const check = await prisma.user.findUnique({ where: { email: email } });

    if (check) {
      return res.status(400).send("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        username: username,
        password: "",
        company_name: company_name,
        email: email,
        mobile_number: mobile_number,
      },
    });
    sendEmail(user.email);

    res.send({
      username: user.username,
      company_name: user.company_name,
      email: user.email,
      mobile_number: user.mobile_number,
      message: "Invitation is sent",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json("User does not exist");
    }

    const check = bcrypt.compareSync(password, user.password);
    if (!check) {
      return res.status(400).json("Incorrect password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({
      username: user.username,
      company_name: user.company_name,
      email: user.email,
      token: token,
      message: "logged In successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/set-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const check = await prisma.user.findUnique({ where: { email: email } });

    if (!check) {
      return res.status(400).json("User does not exist");
    }

    const user = await prisma.user.update({
      where: { email: email },
      data: {
        password: hash,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({
      username: user.username,
      company_name: user.company_name,
      email: user.email,
      token: token,
      message: "account created successfully",
    });
    // return res.status(200).json({ message: "password set successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/create-campaign", async (req, res) => {
  try {
    const { name, duration, goal, status } = req.body;
    const campaign = await prisma.campaign.create({
      data: {
        name: name,
        duration: duration,
        goal: goal,
        date: `${
          new Date().getMonth() + 1
        }/${new Date().getDate()}/${new Date().getFullYear()}`,
        status: status,
      },
    });
    res.send(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/get-campaigns", async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany();
    res.send(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = userRouter;

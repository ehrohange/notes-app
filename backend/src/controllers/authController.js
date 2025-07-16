import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function verifyUser(request, response) {
  try {
    const token = request.query.token;

    if (!token) {
      return response.status(400).json({
        message: "Link is invalid.",
      });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return response.status(404).json({
        message: "Verification is invalid or user does not exist.",
      });
    }

    user.isVerified = true;
    user.verificationToken = "";

    await user.save();

    return response.status(200).json({
      message: "Your account has been successfully verified",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(400)
      .json({ message: "There was an error verifying user account." });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User does not exist." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({ message: "Invalid password." });
    }

    if (!user.isVerified) {
      return res.status(200).send({message: "Please verify your account before logging in. Thank you."});
    }

    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}
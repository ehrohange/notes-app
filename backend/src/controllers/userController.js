import User from "../model/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/mailer.js";

export async function getAllUsers(_, res) {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: "No users found." });
    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching all users." });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return response.status(404).json({ message: "User not found." });
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching user." });
  }
}

export async function createUser(req, res) {
  const { email, firstName, lastName, password } = req.body;
  try {
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationLink = `http://localhost:3000/api/auth/verify?token=${verificationToken}`;

    await sendEmail(
      email,
      "Verify your account",
      `<p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`
    );

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      isVerified: false,
      verificationToken: verificationToken,
    });

    return res.status(201).json({ message: "User has been created.", newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "There was an error creating user." });
  }
}

export async function updatePassword(req, res) {
  try {
    const { password, newPassword } = req.body;

    if (!password || !newPassword)
      return res.status(400).json({ message: "All fields are required." });

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found." });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).json({ message: "Old Password incorrect." });

    if (password === newPassword)
      return res
        .status(400)
        .json({ message: "New Password cannot be the same as old password." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating password." });
  }
}

export async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    return res.status(200).json({ message: "User has been deleted." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting user." });
  }
}

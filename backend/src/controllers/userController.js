import User from "../model/User";

export async function createUser(req, res) {
  const { email, firstName, lastName, password } = req.body;
  try {
    const existing = User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email is already in use." });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    console.log("Sending email to: ", email);

    const verificationLink = `http://localhost:3000/api/verify?token=${verificationToken}`;

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
      isVerified,
      verificationToken: verificationToken,
    });

    return res.status(201).json({ message: "User has been created." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "There was an error creating user." });
  }
}

import User from "../model/User.js";

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
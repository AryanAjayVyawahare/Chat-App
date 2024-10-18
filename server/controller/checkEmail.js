const UserModel = require("../models/UserModel");

async function checkEmail(request, response) {
  try {
    const { email } = request.body;

    const user = await UserModel.findOne({ email }).select("-password");

    if (!user) {
      return response.status(404).json({  // Changed 400 to 404, as it's a more suitable status code for "not found"
        message: "User not found",
        error: true
      });
    }

    return response.status(200).json({
      message: "Email verified",
      success: true,
      data: user
    });

  } catch (error) {
    console.error(error);  // Added console.error to log the error
    return response.status(500).json({
      message: error.message || error,
      error: true
    });
  }
}

module.exports = checkEmail;
const { UserModel: userModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
const crypto = require("crypto")

/**
* - user register controller
* - POST /api/auth/register
*/

async function userRegisterController(req, res) {
  const { email, password, name } = req.body

  const isExist = await userModel.findOne({
    email: email
  })

  if (isExist) {
    return res.status(422).json({
      message: "User already exists with this email",
      status: "failed"
    })
  }
  const user = await userModel.create({
    email, password, name
  })

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

  res.cookie("token", token)
  res.status(201).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name
    },
    token
  })

  await emailService.sendRegistrationEmail(user.email, user.name)
}

/**
 * - user login controller
 * - POST /api/auth/login
 */

async function userLoginController(req, res) {
  const { email, password } = req.body

  const user = await userModel.findOne({
    email: email
  }).select("+password")

  if (!user) {
    return res.status(401).json({
      message: "Email or Password is INVALID",
      status: "failed"
    })
  }

  const isPasswordValid = await user.comparePassword(password)

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Email or Password is INVALID",
      status: "failed"
    })
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

  res.cookie("token", token)
  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name
    },
    token: token,
    success: true
  })
}


// Forgot Password Controller
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Email could not be sent" });
    }

    // Get Reset Token
    const resetToken = user.getResetPasswordToken();

    // Save user to DB with the new token
    await user.save({ validateBeforeSave: false });

    // Create the Link (Points to Frontend)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;


    try {
      // 4. Send Email using the specific function we made in email.service.js
      await emailService.sendResetPasswordEmail(user.email, resetUrl);

      res.status(200).json({ success: true, message: "Email Sent Successfully" });
    } catch (error) {
      // If email fails, clear the DB fields so the user isn't locked out
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, message: "Email could not be sent" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* --- RESET PASSWORD CONTROLLER --- */
const resetPasswordController = async (req, res) => {
  // Hash the token from URL to compare with DB


  try {
    // Hash the token sent in the URL (to match what is in the DB)
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");




    // Find user with this token AND ensure token hasn't expired ($gt = greater than)
    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });


    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or Expired Token" });
    }

    // Set new password
    user.password = req.body.password;

    // Clear reset fields (Token used)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save (Middleware will hash the new password)    await user.save();
    await user.save();

    res.status(200).json({
      success: true,
      data: "Password Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* --- GET CURRENT LOGGED IN USER --- */
const getUserProfile = async (req, res) => {
  try {
    // req.user is provided by our auth middleware
    console.log("User from DB:", req.user);
    const user = await userModel.findById(req.user._id);


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//------------------------------------------------------------------------------------------------------
module.exports = {
  userRegisterController,
  userLoginController,
  forgotPasswordController,
  resetPasswordController,
  getUserProfile
}
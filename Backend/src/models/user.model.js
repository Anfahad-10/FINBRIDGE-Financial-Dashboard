const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto") //Node module for generating tokens


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating a user"],
        trim:true,
        lowercase:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email address"],
        unique:[true, "Email already exists."]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating an account"]
    },
    password:{
        type:String,
        required:[true, "Password is required for creating an account"],
        minlength:[6, "Password must be at least 6 characters long"],
        maxlength:[30, "Password must be at most 30 characters long"],
        select: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {timestamps:true});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return
});


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};




const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    type: {
        type: String,
        enum:["income", "expense"],
        required: [true, "Type is required (income or expense)"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });



const UserModel = mongoose.model("user", userSchema)
const TransactionModel = mongoose.model("Transaction", transactionSchema)

module.exports = {UserModel, TransactionModel}

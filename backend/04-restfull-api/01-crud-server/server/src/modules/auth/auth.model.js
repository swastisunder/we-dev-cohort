import mongoose from "mongoose";
import USERROLES from "../../common/constants/userRole.js";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z\s'-]*$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name cannot exceed 50 characters"],
      match: [
        NAME_REGEX,
        "First name can only contain letters, spaces, hyphens and apostrophes",
      ],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
      match: [
        NAME_REGEX,
        "Last name can only contain letters, spaces, hyphens and apostrophes",
      ],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
      match: [EMAIL_REGEX, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 4 characters long"],
      maxlength: [128, "Password cannot exceed 128 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: {
        values: Object.values(USERROLES),
        message: "Please select a valid role.",
      },
      default: USERROLES.USER,
    },

    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },

    refreshToken: { type: String, select: false },

    resetPasswordToken: { type: String, select: false },
    resetPasswordTokenExpire: { type: Date, select: false },

    isActive: { type: Boolean, default: true },

    isDeleted: { type: Boolean, default: false },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile_picture: string;
  is_online: boolean;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profile_picture: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1580125066/samples/people/default-profile.jpg",
    },
    is_online: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // This automatically adds created_at and updated_at
  }
);

// Index for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ is_online: 1 });

export default mongoose.model<IUser>("User", UserSchema);



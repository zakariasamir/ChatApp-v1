import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
  description?: string;
  is_private: boolean;
  created_at: Date;
  updated_at: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    is_private: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // This automatically adds created_at and updated_at
  }
);

// Index for better query performance
RoomSchema.index({ name: 1 });
RoomSchema.index({ is_private: 1 });

export default mongoose.model<IRoom>("Room", RoomSchema);



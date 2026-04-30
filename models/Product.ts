import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // New multiple image system
    images: {
      type: [String],
      default: [],
    },

    // Old single image system - keep for backward compatibility
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
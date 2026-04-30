import mongoose, { Schema } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    organization: { type: String, default: "" },
    productName: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);
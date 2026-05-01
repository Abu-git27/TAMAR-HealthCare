import { connectDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, phone, organization, productName, message } = body;

    if (!name || !phone || !productName || !message) {
      return Response.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      organization: organization || "",
      productName,
      message,
      status: "new",
    });

    return Response.json(
      { message: "Enquiry submitted successfully", enquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry API POST error:", error);
    return Response.json(
      { message: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();

    return Response.json(enquiries);
  } catch (error) {
    console.error("Enquiry API GET error:", error);
    return Response.json(
      { message: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { id } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { message: "Valid enquiry ID is required" },
        { status: 400 }
      );
    }

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return Response.json(
        { message: "Enquiry not found" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("Enquiry API DELETE error:", error);
    return Response.json(
      { message: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();

    const { id, status } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { message: "Valid enquiry ID is required" },
        { status: 400 }
      );
    }

    if (!status || !["new", "contacted"].includes(status)) {
      return Response.json(
        { message: "Valid status is required" },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return Response.json(
        { message: "Enquiry not found" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Enquiry status updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Enquiry API PATCH error:", error);
    return Response.json(
      { message: "Failed to update enquiry status" },
      { status: 500 }
    );
  }
}
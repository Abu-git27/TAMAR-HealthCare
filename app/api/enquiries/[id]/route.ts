import { connectDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid enquiry ID" }, { status: 400 });
    }

    const deleted = await Enquiry.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json({ message: "Enquiry not found" }, { status: 404 });
    }

    return Response.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    return Response.json(
      { message: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { status } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid enquiry ID" }, { status: 400 });
    }

    if (!status || !["new", "contacted"].includes(status)) {
      return Response.json({ message: "Invalid status" }, { status: 400 });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return Response.json({ message: "Enquiry not found" }, { status: 404 });
    }

    return Response.json({
      message: "Enquiry status updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Update enquiry error:", error);
    return Response.json(
      { message: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}
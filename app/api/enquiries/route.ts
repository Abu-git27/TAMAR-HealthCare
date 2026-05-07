import { connectDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

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

    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(enquiries, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    console.error("Enquiry API GET error:", error);

    return Response.json(
      { message: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { addIntake, getRecentIntakes, type IntakeData } from "@/lib/intakes";

// POST - Create new intake
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Determine required fields based on status
    let requiredFields: string[];
    if (body.status === "pending_call") {
      requiredFields = ["setupType"];
    } else if (body.status === "paid") {
      // Post-payment: name/email/useCases from form, OS may be lost after Stripe redirect
      requiredFields = ["name", "email", "useCases"];
    } else {
      requiredFields = ["email", "name", "setupType", "useCases"];
    }

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate setupType
    if (!["local", "vps", "cloud", "managed"].includes(body.setupType)) {
      return NextResponse.json(
        { error: "Invalid setupType. Must be 'local', 'cloud', or 'managed'." },
        { status: 400 }
      );
    }

    // Create intake data object
    const intakeData: Omit<IntakeData, "id" | "timestamp" | "status"> = {
      sessionId: body.sessionId || "",
      email: body.email || "", // Optional for pending_call
      name: body.name || "", // Optional for pending_call
      setupType: body.setupType,
      operatingSystem: body.operatingSystem,
      specs: body.specs || body.ramAmount || "", // Accept ramAmount as specs
      useCases: body.useCases || "", // Optional for pending_call
    };

    // Add server-specific fields if applicable
    if (["vps", "cloud", "managed"].includes(body.setupType)) {
      intakeData.domainPreference = body.domainPreference || "";
      intakeData.modelSizePreference = body.modelSizePreference || "small";
    }

    const intake = await addIntake(intakeData, body.status === "pending_call" ? "pending_call" : undefined);

    console.log(`[Intake Created] ${intake.id} - ${intake.setupType} - ${body.status === "pending_call" ? "pending_call" : intake.email}`);

    return NextResponse.json({
      success: true,
      id: intake.id,
    });
  } catch (error) {
    console.error("Intake creation error:", error);
    return NextResponse.json(
      { error: "Failed to create intake" },
      { status: 500 }
    );
  }
}

// GET - Get recent intakes (admin endpoint, requires ADMIN_API_KEY)
export async function GET(request: NextRequest) {
  try {
    // Require Bearer token authentication
    const authHeader = request.headers.get("authorization");
    const adminKey = process.env.ADMIN_API_KEY;

    if (!adminKey) {
      // If ADMIN_API_KEY is not configured, deny all access
      console.error("[Intakes GET] ADMIN_API_KEY not configured - denying access");
      return NextResponse.json({ error: "Endpoint not configured" }, { status: 503 });
    }

    if (!authHeader || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const limitParam = request.nextUrl.searchParams.get("limit") || "50";
    const limit = Math.min(Math.max(parseInt(limitParam, 10) || 50, 1), 200);
    const intakes = await getRecentIntakes(limit);

    return NextResponse.json({
      count: intakes.length,
      intakes,
    });
  } catch (error) {
    console.error("Intake fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch intakes" },
      { status: 500 }
    );
  }
}

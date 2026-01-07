import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all spaces
export async function GET() {
    try {
        const spaces = await prisma.space.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(spaces);
    } catch (error) {
        console.error("Error fetching spaces:", error);
        return NextResponse.json({ error: "Failed to fetch spaces" }, { status: 500 });
    }
}

// POST create new space
export async function POST(request) {
    try {
        // Import auth helpers
        const { verifyAdmin, validateSpaceData } = await import("@/lib/auth-helpers");

        // Verify admin authentication
        const { isAdmin, error } = await verifyAdmin();

        if (!isAdmin) {
            return NextResponse.json(
                { error: error || "Unauthorized - Admin access required" },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Validate and sanitize input data
        let validatedData;
        try {
            validatedData = validateSpaceData(body);
        } catch (validationError) {
            return NextResponse.json(
                { error: validationError.message },
                { status: 400 }
            );
        }

        const space = await prisma.space.create({
            data: validatedData,
        });

        return NextResponse.json(space, { status: 201 });
    } catch (error) {
        console.error("Error creating space:", error);
        return NextResponse.json({ error: "Failed to create space" }, { status: 500 });
    }
}

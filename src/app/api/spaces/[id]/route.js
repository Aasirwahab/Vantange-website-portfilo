import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single space
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const space = await prisma.space.findUnique({
            where: { id: parseInt(id) },
        });

        if (!space) {
            return NextResponse.json({ error: "Space not found" }, { status: 404 });
        }

        return NextResponse.json(space);
    } catch (error) {
        console.error("Error fetching space:", error);
        return NextResponse.json({ error: "Failed to fetch space" }, { status: 500 });
    }
}

// PUT update space
export async function PUT(request, { params }) {
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

        const { id } = await params;
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

        // Update space
        const space = await prisma.space.update({
            where: { id: parseInt(id) },
            data: validatedData,
        });

        return NextResponse.json(space);
    } catch (error) {
        console.error("Error updating space:", error);
        return NextResponse.json({ error: "Failed to update space" }, { status: 500 });
    }
}

// DELETE space
export async function DELETE(request, { params }) {
    try {
        // Import auth helpers
        const { verifyAdmin } = await import("@/lib/auth-helpers");

        // Verify admin authentication
        const { isAdmin, error } = await verifyAdmin();

        if (!isAdmin) {
            return NextResponse.json(
                { error: error || "Unauthorized - Admin access required" },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Check if space exists before deleting
        const existingSpace = await prisma.space.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingSpace) {
            return NextResponse.json(
                { error: "Space not found" },
                { status: 404 }
            );
        }

        await prisma.space.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Space deleted successfully" });
    } catch (error) {
        console.error("Error deleting space:", error);
        return NextResponse.json({ error: "Failed to delete space" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth-helpers";

export const dynamic = 'force-dynamic';

// GET /api/pages/[page] - Fetch all sections for a specific page
export async function GET(request, { params }) {
    try {
        const { page } = await params;

        const sections = await prisma.pageContent.findMany({
            where: { page }
        });

        // Transform array to object for easier consumption
        const content = sections.reduce((acc, section) => {
            acc[section.section] = section.content;
            return acc;
        }, {});

        return NextResponse.json(content);
    } catch (error) {
        console.error("Error fetching page content:", error);
        return NextResponse.json(
            { error: "Failed to fetch page content" },
            { status: 500 }
        );
    }
}

// PUT /api/pages/[page] - Update a specific section
export async function PUT(request, { params }) {
    try {
        // Verify admin authentication
        const { isAdmin, error: authError } = await verifyAdmin();

        if (!isAdmin) {
            return NextResponse.json(
                { error: authError || "Unauthorized - Admin access required" },
                { status: 401 }
            );
        }

        const { page } = await params;
        const body = await request.json();
        const { section, content } = body;

        if (!section || !content) {
            return NextResponse.json(
                { error: "Section and content are required" },
                { status: 400 }
            );
        }

        // Find existing record
        const existing = await prisma.pageContent.findFirst({
            where: {
                page,
                section
            }
        });

        let updated;
        if (existing) {
            // Update existing
            updated = await prisma.pageContent.update({
                where: { id: existing.id },
                data: { content }
            });
        } else {
            // Create new
            updated = await prisma.pageContent.create({
                data: {
                    page,
                    section,
                    content
                }
            });
        }

        return NextResponse.json({
            success: true,
            data: updated
        });
    } catch (error) {
        console.error("Error updating page content:", error);
        return NextResponse.json(
            { error: "Failed to update page content" },
            { status: 500 }
        );
    }
}

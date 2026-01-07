import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const settings = await prisma.setting.findMany();
        // Convert array to object for easier consumption { key: value }
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        return NextResponse.json(settingsMap);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Import auth helpers
        const { verifyAdmin, validateSettings } = await import("@/lib/auth-helpers");

        // Verify admin role (not just authentication)
        const { isAdmin, error } = await verifyAdmin();

        if (!isAdmin) {
            return NextResponse.json(
                { error: error || "Forbidden - Admin access required" },
                { status: 403 }
            );
        }

        const body = await request.json();

        // Validate settings data
        let validatedSettings;
        try {
            validatedSettings = validateSettings(body);
        } catch (validationError) {
            return NextResponse.json(
                { error: validationError.message },
                { status: 400 }
            );
        }

        const updates = Object.entries(validatedSettings);

        // Transactional update for multiple settings
        await prisma.$transaction(
            updates.map(([key, value]) =>
                prisma.setting.upsert({
                    where: { key },
                    update: { value: String(value) },
                    create: { key, value: String(value) },
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Settings update error:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}

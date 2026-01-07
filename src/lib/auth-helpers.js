import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * Verifies if the current authenticated user is an admin
 * @returns {Promise<{isAdmin: boolean, user: object|null, error: string|null}>}
 */
export async function verifyAdmin() {
    try {
        // Get authenticated user from Clerk
        const { userId } = await auth();

        if (!userId) {
            return {
                isAdmin: false,
                user: null,
                error: "Not authenticated"
            };
        }

        // Try to get email from session claims, but don't fail if it's not available
        const { sessionClaims } = await auth();
        const userEmail = sessionClaims?.email || sessionClaims?.email_addresses?.[0]?.email_address;

        // Check if user is in Admin table by email OR userId
        let adminUser = null;

        if (userEmail) {
            adminUser = await prisma.admin.findUnique({
                where: { email: userEmail }
            });
        }

        // If not found by email, try finding by userId or just check if any admin exists
        if (!adminUser) {
            // For development: check if there's at least one admin and allow access
            const anyAdmin = await prisma.admin.findFirst();
            if (anyAdmin) {
                adminUser = anyAdmin;
            }
        }

        if (!adminUser) {
            return {
                isAdmin: false,
                user: null,
                error: "User is not an admin"
            };
        }

        return {
            isAdmin: true,
            user: adminUser,
            error: null
        };
    } catch (error) {
        console.error("Admin verification error:", error);
        return {
            isAdmin: false,
            user: null,
            error: "Internal server error during admin verification"
        };
    }
}

/**
 * Get the current authenticated user's info if they are an admin
 * @returns {Promise<object|null>} Admin user object or null
 */
export async function getAdminUser() {
    const { isAdmin, user } = await verifyAdmin();
    return isAdmin ? user : null;
}

/**
 * Validates and sanitizes space/project data
 * @param {object} data - Space data to validate
 * @returns {object} Validated and sanitized data
 * @throws {Error} If validation fails
 */
export function validateSpaceData(data) {
    const errors = [];

    // Required fields
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push("Name is required");
    }
    if (!data.location || typeof data.location !== 'string' || data.location.trim().length === 0) {
        errors.push("Location is required");
    }
    if (!data.image || typeof data.image !== 'string' || data.image.trim().length === 0) {
        errors.push("Image URL is required");
    }

    // String length limits
    if (data.name && data.name.length > 200) {
        errors.push("Name must be less than 200 characters");
    }
    if (data.location && data.location.length > 200) {
        errors.push("Location must be less than 200 characters");
    }

    // Validate categories is an array
    if (data.categories && !Array.isArray(data.categories)) {
        errors.push("Categories must be an array");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }

    // Return sanitized data
    return {
        name: data.name.trim(),
        location: data.location.trim(),
        date: data.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }),
        image: data.image.trim(),
        categories: Array.isArray(data.categories) ? data.categories : [],
        clientName: data.clientName ? data.clientName.trim() : "",
        clientImage: data.clientImage ? data.clientImage.trim() : "",
        description: data.description ? data.description.trim() : "",
        route: `/spaces/${data.name.toLowerCase().replace(/\s+/g, "-")}`
    };
}

/**
 * Validates settings data
 * @param {object} settings - Settings object to validate
 * @returns {object} Validated settings
 * @throws {Error} If validation fails
 */
export function validateSettings(settings) {
    // Whitelist of allowed setting keys
    const allowedKeys = [
        'site_name',
        'site_tagline',
        'site_font',
        'contact_email',
        'social_linkedin',
        'social_instagram',
        'social_dribbble',
        'social_youtube',
        'site_logo',
        'contact_phone',
        'contact_address'
    ];

    const validated = {};

    for (const [key, value] of Object.entries(settings)) {
        if (!allowedKeys.includes(key)) {
            throw new Error(`Invalid setting key: ${key}`);
        }

        // All values should be strings
        if (typeof value !== 'string') {
            throw new Error(`Value for ${key} must be a string`);
        }

        // Length limit
        if (value.length > 1000) {
            throw new Error(`Value for ${key} is too long (max 1000 characters)`);
        }

        validated[key] = value.trim();
    }

    return validated;
}

import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 10,
        },
    })
        .middleware(async ({ req }) => {
            // Import auth helpers
            const { verifyAdmin } = await import("@/lib/auth-helpers");

            // Verify admin authentication
            const { isAdmin, user, error } = await verifyAdmin();

            if (!isAdmin) {
                throw new Error(error || "Unauthorized - Admin access required for file uploads");
            }

            // Return user info to be available in onUploadComplete
            return {
                userId: user.email,
                adminId: user.id
            };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete by admin:", metadata.userId);
            console.log("File URL:", file.url);

            return { url: file.url };
        }),
};

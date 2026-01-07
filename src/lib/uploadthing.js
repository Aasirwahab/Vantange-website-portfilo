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
                throw new Error("Unauthorized - Admin login required");
            }

            // Return metadata
            return {
                userId: user?.email || user?.id || 'admin',
            };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete by:", metadata.userId);
            console.log("File URL:", file.url);

            // UploadThing automatically optimizes images to WebP
            return { url: file.url };
        }),
};

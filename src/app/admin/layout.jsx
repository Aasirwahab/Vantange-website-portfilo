import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminSidebarLayout from "./client-layout";

export default async function AdminLayout({ children }) {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Check if user email exists in Admin table
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
        return <div style={{ padding: "2rem", color: "white" }}>Error: No email found for user.</div>;
    }

    const adminUser = await prisma.admin.findUnique({
        where: {
            email: email,
        },
    });

    if (!adminUser) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#0a0a0a",
                color: "white"
            }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Access Denied</h1>
                <p>You are not authorized to access the Admin Panel.</p>
                <p style={{ marginTop: "1rem", color: "#666" }}>User: {email}</p>
            </div>
        );
    }

    // If authorized, render the client layout (sidebar etc)
    return <AdminSidebarLayout>{children}</AdminSidebarLayout>;
}

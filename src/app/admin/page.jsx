import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default async function AdminDashboard() {
    // Fetch counts from database
    const [spacesCount, testimonialsCount, mediaCount] = await Promise.all([
        prisma.space.count(),
        prisma.testimonial.count(),
        prisma.media.count(),
    ]);

    return (
        <>
            <div className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Welcome to the VANTAGE Admin Panel</p>
            </div>

            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <h3>Total Spaces</h3>
                    <div className="value">{spacesCount}</div>
                </div>
                <div className="admin-stat-card">
                    <h3>Testimonials</h3>
                    <div className="value">{testimonialsCount}</div>
                </div>
                <div className="admin-stat-card">
                    <h3>Media Files</h3>
                    <div className="value">{mediaCount}</div>
                </div>
            </div>

            <div className="admin-card">
                <h2 style={{ marginBottom: "1rem" }}>Quick Actions</h2>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <Link href="/admin/spaces/new" className="admin-btn admin-btn-primary">
                        <FiPlus /> Add New Space
                    </Link>
                    <Link href="/admin/testimonials/new" className="admin-btn admin-btn-primary">
                        <FiPlus /> Add Testimonial
                    </Link>
                    <Link href="/admin/media" className="admin-btn admin-btn-secondary">
                        Manage Media
                    </Link>
                </div>
            </div>
        </>
    );
}

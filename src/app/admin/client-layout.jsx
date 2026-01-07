"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import {
    FiHome,
    FiGrid,
    FiMessageSquare,
    FiImage,
    FiSettings,
    FiMenu,
    FiX
} from "react-icons/fi";
import "./admin.css";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: FiHome },
    { name: "Spaces", href: "/admin/spaces", icon: FiGrid },
    { name: "Testimonials", href: "/admin/testimonials", icon: FiMessageSquare },
    { name: "Media", href: "/admin/media", icon: FiImage },
    { name: "Settings", href: "/admin/settings", icon: FiSettings },
];

function AdminLayoutContent({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-layout">
            {/* Mobile Header */}
            <header className="admin-mobile-header">
                <button
                    className="admin-menu-btn"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <FiX /> : <FiMenu />}
                </button>
                <span className="admin-logo">VANTAGE ADMIN</span>
                <UserButton afterSignOutUrl="/" />
            </header>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="admin-sidebar-header">
                    <h2>VANTAGE</h2>
                    <span>Admin Panel</span>
                </div>

                <nav className="admin-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`admin-nav-item ${isActive ? "active" : ""}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="admin-sidebar-footer">
                    <UserButton afterSignOutUrl="/" />
                    <Link href="/" className="admin-view-site">
                        View Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {children}
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="admin-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default function AdminSidebarLayout({ children }) {
    return (
        <ClerkProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </ClerkProvider>
    );
}

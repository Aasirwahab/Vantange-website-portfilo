import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

export default async function SpacesPage() {
    const spaces = await prisma.space.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Spaces</h1>
                    <p>Manage your project spaces</p>
                </div>
                <Link href="/admin/spaces/new" className="admin-btn admin-btn-primary">
                    <FiPlus /> Add New Space
                </Link>
            </div>

            <div className="admin-card">
                {spaces.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem" }}>
                        <p style={{ color: "var(--admin-text-muted)", marginBottom: "1rem" }}>
                            No spaces found. Create your first space!
                        </p>
                        <Link href="/admin/spaces/new" className="admin-btn admin-btn-primary">
                            <FiPlus /> Add New Space
                        </Link>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Categories</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spaces.map((space) => (
                                <tr key={space.id}>
                                    <td>
                                        <img
                                            src={space.image}
                                            alt={space.name}
                                            style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                                        />
                                    </td>
                                    <td>{space.name}</td>
                                    <td>{space.location}</td>
                                    <td>{space.categories.join(", ")}</td>
                                    <td>
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <Link
                                                href={`/admin/spaces/${space.id}`}
                                                className="admin-btn admin-btn-secondary"
                                                style={{ padding: "0.5rem" }}
                                            >
                                                <FiEdit />
                                            </Link>
                                            <form action={`/api/spaces/${space.id}`} method="POST">
                                                <input type="hidden" name="_method" value="DELETE" />
                                                <button
                                                    type="submit"
                                                    className="admin-btn admin-btn-danger"
                                                    style={{ padding: "0.5rem" }}
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

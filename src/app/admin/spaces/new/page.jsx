"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiSave } from "react-icons/fi";

const categories = ["Commercial", "Residential", "Hospitality", "Office", "Retail", "Hotel", "Loft", "Villa", "Apartment", "Restaurant", "Workspace", "Showroom", "Lounge", "Resort", "Cottage"];

export default function NewSpacePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        date: "",
        image: "",
        categories: [],
        clientName: "",
        clientImage: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryToggle = (category) => {
        setFormData((prev) => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter((c) => c !== category)
                : [...prev.categories, category],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/spaces", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/spaces");
                router.refresh();
            } else {
                alert("Failed to create space");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="admin-page-header">
                <Link href="/admin/spaces" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--admin-text-muted)", marginBottom: "1rem", textDecoration: "none" }}>
                    <FiArrowLeft /> Back to Spaces
                </Link>
                <h1>Add New Space</h1>
                <p>Create a new project space</p>
            </div>

            <div className="admin-card">
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <div className="admin-form-group">
                            <label>Space Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="admin-input"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Location *</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="admin-input"
                                placeholder="e.g., USA, New York"
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Date</label>
                            <input
                                type="text"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="admin-input"
                                placeholder="e.g., November 05, 2020"
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Image URL *</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="admin-input"
                                placeholder="https://..."
                                required
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Client Name</label>
                            <input
                                type="text"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                className="admin-input"
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Client Image URL</label>
                            <input
                                type="text"
                                name="clientImage"
                                value={formData.clientImage}
                                onChange={handleChange}
                                className="admin-input"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label>Categories</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleCategoryToggle(cat)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        borderRadius: "20px",
                                        border: formData.categories.includes(cat)
                                            ? "1px solid var(--admin-accent)"
                                            : "1px solid var(--admin-border)",
                                        background: formData.categories.includes(cat)
                                            ? "var(--admin-accent)"
                                            : "transparent",
                                        color: formData.categories.includes(cat)
                                            ? "white"
                                            : "var(--admin-text-muted)",
                                        cursor: "pointer",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="admin-textarea"
                            placeholder="Project description..."
                        />
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                        <button
                            type="submit"
                            className="admin-btn admin-btn-primary"
                            disabled={loading}
                        >
                            <FiSave /> {loading ? "Saving..." : "Save Space"}
                        </button>
                        <Link href="/admin/spaces" className="admin-btn admin-btn-secondary">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

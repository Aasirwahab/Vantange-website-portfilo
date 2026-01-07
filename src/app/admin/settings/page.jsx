"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaGlobe, FaLinkedin, FaInstagram, FaDribbble, FaYoutube } from "react-icons/fa";

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null); // Toast state
    const [settings, setSettings] = useState({
        site_name: "",
        site_tagline: "",
        contact_email: "",
        social_linkedin: "",
        social_instagram: "",
        social_dribbble: "",
        social_youtube: "",
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setSettings((prev) => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
    };

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (!res.ok) throw new Error("Failed to save");

            router.refresh();
            showToast("Settings saved successfully!", "success");
        } catch (error) {
            console.error("Error saving settings:", error);
            showToast("Failed to save settings. Please try again.", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="admin-loading">Loading settings...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Settings</h1>
                <p>Manage global website configuration and social links.</p>
            </div>

            <form onSubmit={handleSubmit} className="settings-form-container">
                {/* Site Information */}
                <div className="admin-card">
                    <div className="card-header">
                        <h3><FaGlobe /> Site Information</h3>
                    </div>
                    <div className="form-group">
                        <label>Site Name</label>
                        <input
                            type="text"
                            name="site_name"
                            value={settings.site_name}
                            onChange={handleChange}
                            placeholder="e.g. VANTAGE"
                        />
                    </div>
                    <div className="form-group">
                        <label>Tagline</label>
                        <input
                            type="text"
                            name="site_tagline"
                            value={settings.site_tagline}
                            onChange={handleChange}
                            placeholder="e.g. UNYIELDING FORM..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Email</label>
                        <input
                            type="email"
                            name="contact_email"
                            value={settings.contact_email}
                            onChange={handleChange}
                            placeholder="info@vantage.com"
                        />
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="admin-card">
                    <div className="card-header">
                        <h3>Social Media Links</h3>
                        <p className="description">Leave empty to hide from footer.</p>
                    </div>

                    <div className="form-group icon-input">
                        <label><FaLinkedin /> LinkedIn</label>
                        <input
                            type="url"
                            name="social_linkedin"
                            value={settings.social_linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>

                    <div className="form-group icon-input">
                        <label><FaInstagram /> Instagram</label>
                        <input
                            type="url"
                            name="social_instagram"
                            value={settings.social_instagram}
                            onChange={handleChange}
                            placeholder="https://instagram.com/..."
                        />
                    </div>

                    <div className="form-group icon-input">
                        <label><FaDribbble /> Dribbble</label>
                        <input
                            type="url"
                            name="social_dribbble"
                            value={settings.social_dribbble}
                            onChange={handleChange}
                            placeholder="https://dribbble.com/..."
                        />
                    </div>

                    <div className="form-group icon-input">
                        <label><FaYoutube /> YouTube</label>
                        <input
                            type="url"
                            name="social_youtube"
                            value={settings.social_youtube}
                            onChange={handleChange}
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                </div>

                <div className="form-actions sticky-actions">
                    <button type="submit" className="btn-primary" disabled={saving}>
                        {saving ? "Saving..." : <><FaSave /> Save Changes</>}
                    </button>
                </div>
            </form>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    {toast.message}
                </div>
            )}

            <style jsx>{`
                .settings-form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    max-width: 800px;
                }
                .form-group.icon-input label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .sticky-actions {
                    position: sticky;
                    bottom: 2rem;
                    background: #0a0a0a;
                    padding: 1rem;
                    border-top: 1px solid #333;
                    margin-top: 1rem;
                    display: flex;
                    justify-content: flex-end;
                    z-index: 10;
                }
                .description {
                    font-size: 0.85rem;
                    color: #666;
                    margin-top: -0.5rem;
                    margin-bottom: 1rem;
                }
                /* Toast Styles */
                .toast {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    animation: slideUp 0.3s ease;
                    z-index: 9999;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                .toast-success {
                    background: #10b981;
                }
                .toast-error {
                    background: #ef4444;
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "@/components/admin/ImageUploadField";
import toast, { Toaster } from 'react-hot-toast';

export default function HomePageEditor() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    // Content state
    const [heroContent, setHeroContent] = useState({
        title: '',
        tagline: '',
        bgImage: '',
        buttonText: '',
        buttonRoute: ''
    });

    const [statsContent, setStatsContent] = useState({
        stats: [
            { count: '', label: '' },
            { count: '', label: '' },
            { count: '', label: '' },
            { count: '', label: '' }
        ]
    });

    // Fetch existing content
    useEffect(() => {
        async function fetchContent() {
            try {
                const res = await fetch('/api/pages/home');
                const data = await res.json();

                if (data.hero) setHeroContent(data.hero);
                if (data.stats) setStatsContent(data.stats);

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch content:', error);
                toast.error('Failed to load content');
                setLoading(false);
            }
        }
        fetchContent();
    }, []);

    // Save section
    const saveSection = async (section, content) => {
        setSaving(true);
        try {
            const res = await fetch(`/api/pages/home`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, content })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('✅ Content updated successfully!', {
                    duration: 3000,
                    position: 'top-right',
                    style: {
                        background: '#10b981',
                        color: '#fff',
                    },
                });
            } else {
                toast.error(` ❌ ${data.error || 'Failed to update content'}`, {
                    duration: 4000,
                    style: {
                        background: '#ef4444',
                        color: '#fff',
                    },
                });
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('❌ Save failed. Please try again.', {
                duration: 4000,
                style: {
                    background: '#ef4444',
                    color: '#fff',
                },
            });
        }
        setSaving(false);
    };

    if (loading) {
        return <div className="admin-page-header"><h1>Loading...</h1></div>;
    }

    return (
        <>
            <Toaster position="top-right" />
            <div className="admin-page-header">
                <h1>Edit Home Page</h1>
                <p>Manage your homepage content and sections</p>
            </div>

            {/* Section Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid #333' }}>
                <button
                    onClick={() => setActiveSection('hero')}
                    style={{
                        padding: '1rem 1.5rem',
                        background: activeSection === 'hero' ? '#fff' : 'transparent',
                        color: activeSection === 'hero' ? '#000' : '#fff',
                        border: 'none',
                        borderBottom: activeSection === 'hero' ? '2px solid #fff' : 'none',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    Hero Section
                </button>
                <button
                    onClick={() => setActiveSection('stats')}
                    style={{
                        padding: '1rem 1.5rem',
                        background: activeSection === 'stats' ? '#fff' : 'transparent',
                        color: activeSection === 'stats' ? '#000' : '#fff',
                        border: 'none',
                        borderBottom: activeSection === 'stats' ? '2px solid #fff' : 'none',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    Stats Section
                </button>
            </div>

            {/* Hero Section Editor */}
            {activeSection === 'hero' && (
                <div className="admin-card">
                    <h2 style={{ marginBottom: '1.5rem' }}>Hero Section</h2>

                    <div className="admin-form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="admin-input"
                            value={heroContent.title}
                            onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                            placeholder="ARCHITECTURE THAT COMMANDS THE HORIZON"
                        />
                        <small style={{ opacity: 0.7 }}>{heroContent.title.length} characters</small>
                    </div>

                    <div className="admin-form-group">
                        <label>Tagline</label>
                        <textarea
                            className="admin-input"
                            rows="3"
                            value={heroContent.tagline}
                            onChange={(e) => setHeroContent({ ...heroContent, tagline: e.target.value })}
                            placeholder="VANTAGE defines the skyline..."
                        />
                    </div>

                    <ImageUploadField
                        label="Background Image"
                        value={heroContent.bgImage}
                        onChange={(url) => setHeroContent({ ...heroContent, bgImage: url })}
                        onUpload={(url) => setHeroContent({ ...heroContent, bgImage: url })}
                    />

                    <div className="admin-form-group">
                        <label>Button Text</label>
                        <input
                            type="text"
                            className="admin-input"
                            value={heroContent.buttonText}
                            onChange={(e) => setHeroContent({ ...heroContent, buttonText: e.target.value })}
                            placeholder="INQUIRE"
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Button Route</label>
                        <input
                            type="text"
                            className="admin-input"
                            value={heroContent.buttonRoute}
                            onChange={(e) => setHeroContent({ ...heroContent, buttonRoute: e.target.value })}
                            placeholder="/studio"
                        />
                    </div>

                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => saveSection('hero', heroContent)}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Hero Section'}
                    </button>
                </div>
            )}

            {/* Stats Section Editor */}
            {activeSection === 'stats' && (
                <div className="admin-card">
                    <h2 style={{ marginBottom: '1.5rem' }}>Stats Section</h2>

                    {statsContent.stats.map((stat, index) => (
                        <div key={index} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#1a1a1a', borderRadius: '8px' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Stat {index + 1}</h4>
                            <div className="admin-form-group">
                                <label>Count/Number</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={stat.count}
                                    onChange={(e) => {
                                        const newStats = [...statsContent.stats];
                                        newStats[index].count = e.target.value;
                                        setStatsContent({ stats: newStats });
                                    }}
                                    placeholder="45"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Label</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={stat.label}
                                    onChange={(e) => {
                                        const newStats = [...statsContent.stats];
                                        newStats[index].label = e.target.value;
                                        setStatsContent({ stats: newStats });
                                    }}
                                    placeholder="MONUMENTAL PROJECTS"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => saveSection('stats', statsContent)}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Stats Section'}
                    </button>
                </div>
            )}

            <div style={{ marginTop: '2rem', padding: '1rem', background: '#1a1a1a', borderRadius: '8px' }}>
                <p style={{ opacity: 0.7, margin: 0 }}>
                    💡 Changes will appear on your live website immediately after saving.
                </p>
            </div>
        </>
    );
}

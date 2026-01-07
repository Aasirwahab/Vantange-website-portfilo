"use client";
import { useState, useEffect } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function StudioPageEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    // Content state
    const [heroContent, setHeroContent] = useState({
        description: '',
        title: '',
        image: ''
    });

    const [factsContent, setFactsContent] = useState({
        facts: [
            { label: '', count: '' },
            { label: '', count: '' },
            { label: '', count: '' },
            { label: '', count: '' },
            { label: '', count: '' }
        ]
    });

    // Fetch existing content
    useEffect(() => {
        async function fetchContent() {
            try {
                const res = await fetch('/api/pages/studio');
                const data = await res.json();

                if (data.hero) setHeroContent(data.hero);
                if (data.facts) setFactsContent(data.facts);

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch content:', error);
                setLoading(false);
            }
        }
        fetchContent();
    }, []);

    // Save section
    const saveSection = async (section, content) => {
        setSaving(true);
        try {
            const res = await fetch(`/api/pages/studio`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section, content })
            });

            if (res.ok) {
                alert('✅ Content updated successfully!');
            } else {
                alert('❌ Failed to update content');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('❌ Save failed');
        }
        setSaving(false);
    };

    if (loading) {
        return <div className="admin-page-header"><h1>Loading...</h1></div>;
    }

    return (
        <>
            <div className="admin-page-header">
                <h1>Edit Studio Page</h1>
                <p>Manage your studio/about page content</p>
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
                    onClick={() => setActiveSection('facts')}
                    style={{
                        padding: '1rem 1.5rem',
                        background: activeSection === 'facts' ? '#fff' : 'transparent',
                        color: activeSection === 'facts' ? '#000' : '#fff',
                        border: 'none',
                        borderBottom: activeSection === 'facts' ? '2px solid #fff' : 'none',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    Facts Section
                </button>
            </div>

            {/* Hero Section Editor */}
            {activeSection === 'hero' && (
                <div className="admin-card">
                    <h2 style={{ marginBottom: '1.5rem' }}>Hero Section</h2>

                    <div className="admin-form-group">
                        <label>Description (Top Text)</label>
                        <textarea
                            className="admin-input"
                            rows="3"
                            value={heroContent.description}
                            onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                            placeholder="We see design as more than construction..."
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Main Title</label>
                        <textarea
                            className="admin-input"
                            rows="4"
                            value={heroContent.title}
                            onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                            placeholder="Our studio exists to create spaces..."
                        />
                    </div>

                    <ImageUploadField
                        label="Hero Image"
                        value={heroContent.image}
                        onChange={(url) => setHeroContent({ ...heroContent, image: url })}
                        onUpload={(url) => setHeroContent({ ...heroContent, image: url })}
                    />

                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => saveSection('hero', heroContent)}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Hero Section'}
                    </button>
                </div>
            )}

            {/* Facts Section Editor */}
            {activeSection === 'facts' && (
                <div className="admin-card">
                    <h2 style={{ marginBottom: '1.5rem' }}>Facts/Stats Section</h2>

                    {factsContent.facts.map((fact, index) => (
                        <div key={index} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#1a1a1a', borderRadius: '8px' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Fact {index + 1}</h4>
                            <div className="admin-form-group">
                                <label>Label</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={fact.label}
                                    onChange={(e) => {
                                        const newFacts = [...factsContent.facts];
                                        newFacts[index].label = e.target.value;
                                        setFactsContent({ facts: newFacts });
                                    }}
                                    placeholder="Models crafted"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Count/Number</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={fact.count}
                                    onChange={(e) => {
                                        const newFacts = [...factsContent.facts];
                                        newFacts[index].count = e.target.value;
                                        setFactsContent({ facts: newFacts });
                                    }}
                                    placeholder="120+"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => saveSection('facts', factsContent)}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Facts Section'}
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

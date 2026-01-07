"use client";
import { useState, useEffect } from "react";
import { PREMIUM_FONTS, DEFAULT_FONT } from "@/lib/premium-fonts";
import toast, { Toaster } from 'react-hot-toast';

export default function TypographySettings() {
    const [selectedFont, setSelectedFont] = useState('System Default');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');

    // Fetch current font setting
    useEffect(() => {
        async function fetchFont() {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (data.site_font) {
                    setSelectedFont(data.site_font);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to load font setting:', error);
                setLoading(false);
            }
        }
        fetchFont();
    }, []);

    // Save font selection
    const handleSaveFont = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ site_font: selectedFont })
            });

            if (res.ok) {
                toast.success('✅ Font updated successfully! Refresh to see changes.', {
                    duration: 4000,
                    style: { background: '#10b981', color: '#fff' },
                });
            } else {
                toast.error('❌ Failed to update font');
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('❌ Save failed');
        }
        setSaving(false);
    };

    // Filter fonts by category
    const filteredFonts = filterCategory === 'all'
        ? PREMIUM_FONTS
        : PREMIUM_FONTS.filter(f => f.category.toLowerCase() === filterCategory);

    const allFonts = [DEFAULT_FONT, ...PREMIUM_FONTS];
    const currentFont = allFonts.find(f => f.name === selectedFont) || DEFAULT_FONT;

    if (loading) {
        return <div className="admin-page-header"><h1>Loading...</h1></div>;
    }

    return (
        <>
            <Toaster position="top-right" />

            <div className="admin-page-header">
                <h1>Typography Settings</h1>
                <p>Choose from award-winning Google Fonts used by top designers</p>
            </div>

            {/* Current Selection */}
            <div className="admin-card" style={{ marginBottom: '2rem', background: '#1a1a1a' }}>
                <h3 style={{ marginBottom: '1rem' }}>Current Font</h3>
                <div style={{
                    padding: '2rem',
                    background: '#0a0a0a',
                    borderRadius: '8px',
                    border: '2px solid #333'
                }}>
                    <h2 style={{
                        fontFamily: currentFont.cssValue,
                        marginBottom: '0.5rem',
                        fontSize: '2rem'
                    }}>
                        {currentFont.name}
                    </h2>
                    <p style={{ opacity: 0.7, marginBottom: '1rem' }}>{currentFont.description}</p>
                    {currentFont.awards && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {currentFont.awards.map((award) => (
                                <span key={award} style={{
                                    padding: '0.25rem 0.75rem',
                                    background: '#333',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem'
                                }}>
                                    🏆 {award}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Filter */}
            <div className="admin-card">
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setFilterCategory('all')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: filterCategory === 'all' ? '#fff' : '#333',
                            color: filterCategory === 'all' ? '#000' : '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        All Fonts ({PREMIUM_FONTS.length})
                    </button>
                    <button
                        onClick={() => setFilterCategory('sans-serif')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: filterCategory === 'sans-serif' ? '#fff' : '#333',
                            color: filterCategory === 'sans-serif' ? '#000' : '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Sans-serif
                    </button>
                    <button
                        onClick={() => setFilterCategory('serif')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: filterCategory === 'serif' ? '#fff' : '#333',
                            color: filterCategory === 'serif' ? '#000' : '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Serif
                    </button>
                    <button
                        onClick={() => setFilterCategory('monospace')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: filterCategory === 'monospace' ? '#fff' : '#333',
                            color: filterCategory === 'monospace' ? '#000' : '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Monospace
                    </button>
                </div>

                {/* Font Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1rem'
                }}>
                    {/* System Default */}
                    <div
                        onClick={() => setSelectedFont(DEFAULT_FONT.name)}
                        style={{
                            padding: '1.5rem',
                            background: selectedFont === DEFAULT_FONT.name ? '#333' : '#1a1a1a',
                            border: selectedFont === DEFAULT_FONT.name ? '2px solid #fff' : '1px solid #333',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <h4 style={{ marginBottom: '0.5rem' }}>✓ {DEFAULT_FONT.name}</h4>
                        <p style={{
                            fontFamily: DEFAULT_FONT.cssValue,
                            fontSize: '1.25rem',
                            marginBottom: '0.5rem'
                        }}>
                            The quick brown fox
                        </p>
                        <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>
                            {DEFAULT_FONT.description}
                        </p>
                    </div>

                    {/* Premium Fonts */}
                    {filteredFonts.map((font) => (
                        <div
                            key={font.name}
                            onClick={() => setSelectedFont(font.name)}
                            style={{
                                padding: '1.5rem',
                                background: selectedFont === font.name ? '#333' : '#1a1a1a',
                                border: selectedFont === font.name ? '2px solid #fff' : '1px solid #333',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                <h4>{font.name}</h4>
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '0.25rem 0.5rem',
                                    background: '#444',
                                    borderRadius: '4px'
                                }}>
                                    {font.category}
                                </span>
                            </div>
                            <p style={{
                                fontFamily: font.cssValue,
                                fontSize: '1.25rem',
                                marginBottom: '0.5rem'
                            }}>
                                The quick brown fox
                            </p>
                            <p style={{ opacity: 0.7, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                {font.description}
                            </p>
                            {font.awards && (
                                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                    {font.awards.slice(0, 2).map((award) => (
                                        <span key={award} style={{
                                            fontSize: '0.65rem',
                                            padding: '0.15rem 0.5rem',
                                            background: '#555',
                                            borderRadius: '3px'
                                        }}>
                                            🏆 {award}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    className="admin-btn admin-btn-primary"
                    onClick={handleSaveFont}
                    disabled={saving}
                    style={{ marginTop: '2rem' }}
                >
                    {saving ? 'Saving...' : 'Apply Font to Website'}
                </button>
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: '#1a1a1a', borderRadius: '8px' }}>
                <p style={{ opacity: 0.7, margin: 0 }}>
                    💡 Fonts are loaded from Google Fonts and applied site-wide. Refresh the page after saving to see changes.
                </p>
            </div>
        </>
    );
}

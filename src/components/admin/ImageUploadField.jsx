"use client";
import { UploadButton } from "@uploadthing/react";
import toast from 'react-hot-toast';

export default function ImageUploadField({ label, value, onChange, onUpload }) {
    return (
        <div className="admin-form-group">
            <label>{label}</label>

            {/* URL Input */}
            <input
                type="text"
                className="admin-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="/home/hero.jpg or https://..."
                style={{ marginBottom: '1rem' }}
            />

            {/* Upload Button */}
            <div style={{ marginBottom: '1rem' }}>
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                            onUpload(res[0].url);
                            toast.success('✅ Image uploaded successfully!', {
                                duration: 3000,
                                style: {
                                    background: '#10b981',
                                    color: '#fff',
                                },
                            });
                        }
                    }}
                    onUploadError={(error) => {
                        toast.error(`❌ Upload  failed: ${error.message}`, {
                            duration: 4000,
                            style: {
                                background: '#ef4444',
                                color: '#fff',
                            },
                        });
                    }}
                    appearance={{
                        button: {
                            background: '#fff',
                            color: '#000',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            border: 'none',
                            width: 'auto',
                        },
                        container: {
                            marginBottom: '0.5rem',
                        },
                        allowedContent: {
                            color: '#999',
                            fontSize: '0.75rem',
                            marginTop: '0.5rem',
                        }
                    }}
                />
            </div>

            {/* Image Preview */}
            {value && (
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>Preview:</p>
                    <img
                        src={value}
                        alt="Preview"
                        style={{
                            maxWidth: '300px',
                            maxHeight: '200px',
                            borderRadius: '8px',
                            border: '1px solid #333'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            toast.error('Image failed to load. Check the URL.');
                        }}
                    />
                </div>
            )}
        </div>
    );
}

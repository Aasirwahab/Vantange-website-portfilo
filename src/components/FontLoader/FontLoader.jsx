"use client";
import { useEffect, useState } from 'react';
import { PREMIUM_FONTS, DEFAULT_FONT } from '@/lib/premium-fonts';

export default function FontLoader() {
    const [fontUrl, setFontUrl] = useState(null);
    const [fontFamily, setFontFamily] = useState(null);

    useEffect(() => {
        async function loadFont() {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();

                if (data.site_font) {
                    const allFonts = [DEFAULT_FONT, ...PREMIUM_FONTS];
                    const selectedFont = allFonts.find(f => f.name === data.site_font);

                    if (selectedFont && selectedFont.googleFontUrl) {
                        setFontUrl(selectedFont.googleFontUrl);
                        setFontFamily(selectedFont.cssValue);
                    } else if (selectedFont) {
                        // System font, no URL needed
                        setFontFamily(selectedFont.cssValue);
                    }
                }
            } catch (error) {
                console.error('Failed to load font:', error);
            }
        }
        loadFont();
    }, []);

    useEffect(() => {
        if (fontFamily) {
            document.documentElement.style.setProperty('--site-font', fontFamily);
        }
    }, [fontFamily]);

    return (
        <>
            {fontUrl && (
                <link
                    rel="stylesheet"
                    href={fontUrl}
                    crossOrigin="anonymous"
                />
            )}
        </>
    );
}

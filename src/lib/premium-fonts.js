// Curated list of award-winning and popular Google Fonts
// Used by top design agencies and award-winning websites

export const PREMIUM_FONTS = [
    {
        name: 'Inter',
        category: 'Sans-serif',
        description: 'Modern, clean, and highly legible. Used by Figma, GitHub, and many design systems.',
        weights: [300, 400, 500, 600, 700],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        cssValue: "'Inter', sans-serif",
        popularity: 'Very High',
        awards: ['Awwwards', 'CSS Design Awards']
    },
    {
        name: 'Playfair Display',
        category: 'Serif',
        description: 'Elegant and sophisticated. Perfect for luxury brands and editorial design.',
        weights: [400, 500, 600, 700, 800],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap',
        cssValue: "'Playfair Display', serif",
        popularity: 'High',
        awards: ['Awwwards', 'FWA']
    },
    {
        name: 'Manrope',
        category: 'Sans-serif',
        description: 'Geometric and modern. Used by Stripe, Notion, and premium SaaS products.',
        weights: [300, 400, 500, 600, 700, 800],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap',
        cssValue: "'Manrope', sans-serif",
        popularity: 'Very High',
        awards: ['FWA', 'CSS Design Awards']
    },
    {
        name: 'Space Grotesk',
        category: 'Sans-serif',
        description: 'Bold and distinctive. Popular in tech and creative industries.',
        weights: [300, 400, 500, 600, 700],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
        cssValue: "'Space Grotesk', sans-serif",
        popularity: 'High',
        awards: ['Awwwards']
    },
    {
        name: 'DM Sans',
        category: 'Sans-serif',
        description: 'Clean and professional. Favored by designers for web applications.',
        weights: [400, 500, 700],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
        cssValue: "'DM Sans', sans-serif",
        popularity: 'Very High',
        awards: ['CSS Design Awards']
    },
    {
        name: 'Cormorant Garamond',
        category: 'Serif',
        description: 'Classic and refined. Ideal for editorial and luxury websites.',
        weights: [300, 400, 500, 600, 700],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap',
        cssValue: "'Cormorant Garamond', serif",
        popularity: 'High',
        awards: ['Awwwards']
    },
    {
        name: 'Syne',
        category: 'Sans-serif',
        description: 'Bold and contemporary. Used in creative portfolios and studios.',
        weights: [400, 500, 600, 700, 800],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap',
        cssValue: "'Syne', sans-serif",
        popularity: 'Medium',
        awards: ['Awwwards', 'FWA']
    },
    {
        name: 'Archivo',
        category: 'Sans-serif',
        description: 'Versatile and modern. Great for both body and display text.',
        weights: [300, 400, 500, 600, 700],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&display=swap',
        cssValue: "'Archivo', sans-serif",
        popularity: 'High',
        awards: ['CSS Design Awards']
    },
    {
        name: 'Crimson Pro',
        category: 'Serif',
        description: 'Traditional and readable. Perfect for content-heavy sites.',
        weights: [300, 400, 500, 600, 700],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;500;600;700&display=swap',
        cssValue: "'Crimson Pro', serif",
        popularity: 'Medium',
        awards: ['Awwwards']
    },
    {
        name: 'JetBrains Mono',
        category: 'Monospace',
        description: 'Tech-focused and modern. Popular for developer tools and tech brands.',
        weights: [400, 500, 600, 700],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
        cssValue: "'JetBrains Mono', monospace",
        popularity: 'High',
        awards: ['CSS Design Awards']
    },
    {
        name: 'Outfit',
        category: 'Sans-serif',
        description: 'Rounded and friendly. Used by modern startups and apps.',
        weights: [300, 400, 500, 600, 700],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
        cssValue: "'Outfit', sans-serif",
        popularity: 'Very High',
        awards: ['Awwwards']
    },
    {
        name: 'Fraunces',
        category: 'Serif',
        description: 'Quirky and expressive. Perfect for brands with personality.',
        weights: [400, 500, 600, 700, 800],
        googleFontUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&display=swap',
        cssValue: "'Fraunces', serif",
        popularity: 'Medium',
        awards: ['FWA', 'Awwwards']
    }
];

// Default font (what the site currently uses)
export const DEFAULT_FONT = {
    name: 'System Default',
    category: 'Sans-serif',
    description: 'Your current website font',
    cssValue: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    googleFontUrl: null
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const settings = [
        { key: "site_name", value: "VANTAGE", type: "text" },
        { key: "site_tagline", value: "UNYIELDING FORM. ABSOLUTE PRECISION.", type: "text" },
        { key: "contact_email", value: "info@vantage.com", type: "text" },
        { key: "social_linkedin", value: "https://linkedin.com", type: "text" },
        { key: "social_instagram", value: "https://instagram.com", type: "text" },
        { key: "social_dribbble", value: "https://dribbble.com", type: "text" },
        { key: "social_youtube", value: "https://youtube.com", type: "text" },
    ];

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: {}, // Don't overwrite if exists
            create: setting,
        });
    }

    console.log('✅ Default settings seeded');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

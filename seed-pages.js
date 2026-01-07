const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding page content from hardcoded values...');

    // Home Page - Hero Section
    await prisma.pageContent.upsert({
        where: {
            page_section: {
                page: 'home',
                section: 'hero'
            }
        },
        update: {},
        create: {
            page: 'home',
            section: 'hero',
            content: {
                title: 'ARCHITECTURE THAT COMMANDS THE HORIZON',
                tagline: 'VANTAGE defines the skyline with unyielding form and absolute precision. We build for the bold.',
                bgImage: '/home/hero.jpg',
                buttonText: 'INQUIRE',
                buttonRoute: '/studio'
            }
        }
    });

    // Home Page - Stats Section
    await prisma.pageContent.upsert({
        where: {
            page_section: {
                page: 'home',
                section: 'stats'
            }
        },
        update: {},
        create: {
            page: 'home',
            section: 'stats',
            content: {
                stats: [
                    { count: '45', label: 'MONUMENTAL PROJECTS' },
                    { count: '12', label: 'URBAN DEVELOPMENTS' },
                    { count: '08', label: 'GLOBAL AWARDS' },
                    { count: '100%', label: 'STRUCTURAL INTEGRITY' }
                ]
            }
        }
    });

    // Home Page - What We Do Section
    await prisma.pageContent.upsert({
        where: {
            page_section: {
                page: 'home',
                section: 'whatWeDo'
            }
        },
        update: {},
        create: {
            page: 'home',
            section: 'whatWeDo',
            content: {
                title: 'WE ENGINEER STRUCTURES THAT DEFY CONVENTION. RAW CONCRETE, STEEL, AND GLASS FORGED INTO ICONS OF MODERNITY.',
                methodLabel: 'OUR METHOD',
                methodText: 'We reject the ornamental. Our work is stripped back to the essential elements of structure and light. Every project is a statement of power and permanence.',
                tags: ['BRUTALISM', 'SCALE', 'CONCRETE', 'MONOLITHIC', 'INDUSTRIAL', 'PRECISION']
            }
        }
    });

    // Home Page - Gallery Callout
    await prisma.pageContent.upsert({
        where: {
            page_section: {
                page: 'home',
                section: 'gallery'
            }
        },
        update: {},
        create: {
            page: 'home',
            section: 'gallery',
            content: {
                images: [
                    '/gallery-callout/gallery-callout-1.jpg',
                    '/gallery-callout/gallery-callout-2.jpg',
                    '/gallery-callout/gallery-callout-3.jpg',
                    '/gallery-callout/gallery-callout-4.jpg'
                ],
                stat: '500+',
                statLabel: 'ARCHITECTURAL DETAILS',
                description: 'EXPLORE THE RAW MATERIALS AND STRUCTURAL FORMS THAT DEFINE OUR AESTHETIC. FROM SKYSCRAPERS TO BUNKERS.',
                buttonText: 'VIEW ARCHIVE',
                buttonRoute: 'blueprints'
            }
        }
    });

    // Studio Page - Hero Section
    await prisma.pageContent.upsert({
        where: {
            page_section: {
                page: 'studio',
                section: 'hero'
            }
        },
        update: {},
        create: {
            page: 'studio',
            section: 'hero',
            content: {
                description: 'We see design as more than construction. It is an ongoing dialogue between people, material, and place, shaped with care, and built to endure.',
                title: 'Our studio exists to create spaces that feel honest, lived in, and quietly transformative. Every project begins with listening and ends with an environment.',
                image: '/studio/about-hero.png'
            }
        }
    });

    // Studio Page - Facts Section
    await prisma.pageContent.upsert({
        where: {
            page_section: {
                page: 'studio',
                section: 'facts'
            }
        },
        update: {},
        create: {
            page: 'studio',
            section: 'facts',
            content: {
                facts: [
                    { label: 'Models crafted', count: '120+' },
                    { label: 'Materials explored', count: '60' },
                    { label: 'Workshops hosted', count: '25+' },
                    { label: 'Hours logged', count: '3k+' },
                    { label: 'Prototypes build', count: '724' }
                ]
            }
        }
    });

    console.log('✅ Page content seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

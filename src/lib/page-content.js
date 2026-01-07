import { prisma } from "@/lib/prisma";

/**
 * Fetch all content sections for a specific page
 * @param {string} page - Page name (e.g., 'home', 'studio')
 * @returns {Promise<Object>} Object with section names as keys and content as values
 */
export async function getPageContent(page) {
    try {
        const sections = await prisma.pageContent.findMany({
            where: { page }
        });

        // Transform array to object for easier consumption
        const content = sections.reduce((acc, section) => {
            acc[section.section] = section.content;
            return acc;
        }, {});

        return content;
    } catch (error) {
        console.error(`Error fetching content for page "${page}":`, error);
        return {};
    }
}

/**
 * Fetch a specific section for a page
 * @param {string} page - Page name
 * @param {string} section - Section name
 * @returns {Promise<Object|null>} Section content or null
 */
export async function getPageSection(page, section) {
    try {
        const content = await prisma.pageContent.findUnique({
            where: {
                page_section: {
                    page,
                    section
                }
            }
        });

        return content?.content || null;
    } catch (error) {
        console.error(`Error fetching section "${section}" for page "${page}":`, error);
        return null;
    }
}
